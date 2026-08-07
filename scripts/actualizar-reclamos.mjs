// ============================================================
// actualizar-reclamos.mjs
// Busca reclamos/estafas de casas de apuestas destacados en la
// web (vía Perplexity Sonar) y los guarda en la tabla reclamos
// de Supabase con origen = 'ia' y estado = 'pending'.
//
// Uso:
//   PERPLEXITY_API_KEY=xxx SUPABASE_KEY=xxx node scripts/actualizar-reclamos.mjs
//   DEMO=1 node scripts/actualizar-reclamos.mjs   (sin llamar a Perplexity)
// ============================================================

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://zwrdnhrtqkyvmuslelfm.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3cmRuaHJ0cWt5dm11c2xlbGZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5Nzc1MjgsImV4cCI6MjEwMTU1MzUyOH0.IL8tLTs4bwFRHynP5g2BSIkPcSg6tADUVLrBst8W7Vo';
const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;
const DEMO = process.env.DEMO === '1';
const MAX_RESULTADOS = 5;

const headers = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
};

const PROMPT = `Buscá en la web noticias y reclamos sobre estafas, problemas o denuncias con casas de apuestas y casinos online (últimas 48 horas) en Argentina y Latinoamérica. Seleccioná los ${MAX_RESULTADOS} más destacados y relevantes. Respondé SOLO con un JSON array válido, sin texto adicional, ni markdown, con esta estructura exacta por elemento: {"plataforma": "nombre de la casa de apuestas", "titulo": "título corto del reclamo (máximo 60 caracteres)", "descripcion": "resumen de 1 a 2 frases", "url": "URL de la noticia o fuente original"}. Si no encontrás ningún reclamo relevante, respondé exactamente [].`;

// ---------- Demo (para probar el pipeline sin Perplexity) ----------
const DEMO_ITEMS = [
  {
    plataforma: 'Casino Demo AR',
    titulo: 'Denuncian demoras de más de 30 días en retiros',
    descripcion: 'Varios usuarios reportan que sus retiros están "en proceso" desde hace más de un mes sin respuesta del soporte.',
    url: 'https://ejemplo.com/demo-1',
  },
  {
    plataforma: 'Apuestas Test',
    titulo: 'Bono de bienvenida no acreditado a nuevos usuarios',
    descripcion: 'Usuarios denuncian que el bono prometido nunca se acreditó tras el primer depósito.',
    url: 'https://ejemplo.com/demo-2',
  },
];

// ---------- 1) Obtener reclamos de Perplexity ----------
async function obtenerDePerplexity() {
  if (DEMO) return DEMO_ITEMS;

  if (!PERPLEXITY_API_KEY) {
    throw new Error('Falta PERPLEXITY_API_KEY (y DEMO no está activado)');
  }

  const res = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${PERPLEXITY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'sonar',
      messages: [{ role: 'user', content: PROMPT }],
    }),
  });

  if (!res.ok) {
    throw new Error(`Perplexity respondió ${res.status}: ${(await res.text()).slice(0, 300)}`);
  }

  const data = await res.json();
  const contenido = data.choices?.[0]?.message?.content || '[]';
  const inicio = contenido.indexOf('[');
  const fin = contenido.lastIndexOf(']');
  const items = JSON.parse(inicio >= 0 && fin > inicio ? contenido.slice(inicio, fin + 1) : '[]');

  return items
    .map((item) => ({
      plataforma: item.plataforma || 'Desconocida',
      titulo: item.titulo || '',
      descripcion: item.descripcion || '',
      url: item.url || '',
    }))
    .filter((i) => i.titulo);
}

// ---------- 2) Guardar en Supabase (con dedupe por URL) ----------
async function guardarEnSupabase(items) {
  let insertados = 0;
  let duplicados = 0;

  for (const item of items) {
    // Dedupe: si ya existe un reclamo con la misma URL fuente, no repetir
    if (item.url) {
      const check = await fetch(
        `${SUPABASE_URL}/rest/v1/reclamos?select=id&enlace=eq.${encodeURIComponent(item.url)}&limit=1`,
        { headers }
      );
      const existentes = await check.json();
      if (Array.isArray(existentes) && existentes.length > 0) {
        duplicados++;
        console.log(`↷ Duplicado (ya existe): ${item.plataforma}`);
        continue;
      }
    }

    const body = {
      nombre_plataforma: item.plataforma,
      titulo: item.titulo,
      descripcion: item.descripcion,
      estado: 'pending',
      fecha: new Date().toISOString().slice(0, 10),
      enlace: item.url || null,
      pruebas: [],
      origen: 'ia',
    };

    const res = await fetch(`${SUPABASE_URL}/rest/v1/reclamos`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    if (res.status === 201 || res.status === 200) {
      insertados++;
      console.log(`✓ Guardado: ${item.plataforma} — ${item.titulo}`);
    } else {
      console.error(`✗ Error guardando ${item.plataforma}: ${await res.text()}`);
    }
  }

  return { insertados, duplicados };
}

// ---------- Main ----------
try {
  console.log(DEMO ? '→ Modo DEMO (sin Perplexity)' : '→ Consultando Perplexity Sonar...');
  const items = await obtenerDePerplexity();
  console.log(`→ ${items.length} reclamo(s) encontrado(s)`);

  if (items.length === 0) {
    console.log('→ No hay nada nuevo para guardar.');
    process.exit(0);
  }

  const { insertados, duplicados } = await guardarEnSupabase(items);
  console.log(`\nResumen: ${insertados} nuevo(s), ${duplicados} duplicado(s).`);
} catch (err) {
  console.error('ERROR:', err.message);
  process.exit(1);
}
