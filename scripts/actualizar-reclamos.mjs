// ============================================================
// actualizar-reclamos.mjs  (costo cero)
// Busca reclamos/estafas de casas de apuestas destacados usando
// feeds RSS GRATUITOS (Google Noticias + Yogonet), filtra por
// relevancia (prioriza reclamos reales de jugadores) y los guarda
// en la tabla reclamos de Supabase con origen='rss', estado='pending'.
//
// Uso:
//   node scripts/actualizar-reclamos.mjs
//   DEMO=1 node scripts/actualizar-reclamos.mjs   (datos de ejemplo)
// ============================================================

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://zwrdnhrtqkyvmuslelfm.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3cmRuaHJ0cWt5dm11c2xlbGZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5Nzc1MjgsImV4cCI6MjEwMTU1MzUyOH0.IL8tLTs4bwFRHynP5g2BSIkPcSg6tADUVLrBst8W7Vo';
const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;
const DEMO = process.env.DEMO === '1';
const MAX_RESULTADOS = 6;
const MAX_DIAS_ANTIGUEDAD = 3; // solo noticias de las últimas 72 hs

const headers = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
};

// ---------- Fuentes RSS gratuitas ----------
const FEEDS = [
  'https://news.google.com/rss/search?q=estafa%20casino%20online%20argentina&hl=es-419&gl=AR&ceid=AR:es-419',
  'https://news.google.com/rss/search?q=denuncia%20casa%20de%20apuestas&hl=es-419&gl=AR&ceid=AR:es-419',
  'https://news.google.com/rss/search?q=casino%20online%20retiro%20bloqueado&hl=es-419&gl=AR&ceid=AR:es-419',
  'https://news.google.com/rss/search?q=apuestas%20online%20estafa%20latinoamerica&hl=es-419&gl=MX&ceid=MX:es-419',
  'https://www.yogonet.com/latinoamerica/rss',
];

// ---------- Palabras clave ----------
// Indica un reclamo real de jugador (peso 2)
const KW_RECLAMO = [
  'estafa', 'denuncia', 'fraude', 'reclamo', 'retiro', 'bloqueo', 'bloqueada',
  'bloqueado', 'queja', 'victima', 'usuario', 'jugador', 'apostador', 'cuenta',
  'cobrar', 'pago', 'demanda', 'investigaci', 'clausur', 'ilegal', 'pirata',
  'clandestin', 'sin licencia', 'no paga', 'impago',
];
// Indica que es del sector apuestas/casinos (peso 1)
const KW_SECTOR = [
  'casino', 'apuesta', 'tragamoneda', 'slots', 'igaming', 'iGaming', 'bet',
  'ruleta', 'poker', 'poquer', 'juego online', 'juegos online', 'plataforma de juego',
];
// Cualquier coincidencia descarta la noticia (ruido)
const KW_NEGATIVA = [
  'españa', 'espan', 'mejores casas', 'sin restricc', 'top 10', 'ranking',
  'bonus', 'promoci', 'oferta', 'registro gratis', 'gratuito', 'app nueva',
  'torneo', 'premio de', 'sorteo', 'mundial', 'eurocopa', 'copa américa',
  'futbol', 'fútbol', 'cuota', 'pronostico', 'prediccion', 'winning', 'jackpot',
];

// ---------- Utilidades ----------
function normalizar(s) {
  return (s || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function parsearRSS(xml) {
  const items = [];
  const regex = /<item>([\s\S]*?)<\/item>/g;
  let m;
  while ((m = regex.exec(xml))) {
    const it = m[1];
    const get = (tag) => {
      const t = it.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
      return t
        ? t[1]
            .replace(/<!\[CDATA\[|\]\]>/g, '')
            .replace(/<[^>]+>/g, '')
            .replace(/&amp;/g, '&')
            .replace(/&quot;/g, '"')
            .replace(/&#39;|&apos;/g, "'")
            .trim()
        : '';
    };
    items.push({
      title: get('title'),
      link: get('link'),
      description: get('description'),
      fecha: get('pubDate'),
    });
  }
  return items;
}

// Puntaje de relevancia: exige sector + reclamo, descarta negativas
function calcularScore(item) {
  const texto = normalizar(`${item.title} ${item.description}`);
  if (KW_NEGATIVA.some((k) => texto.includes(k))) return 0;
  const sector = KW_SECTOR.filter((k) => texto.includes(k)).length;
  const reclamo = KW_RECLAMO.filter((k) => texto.includes(k)).length;
  if (sector === 0 || reclamo === 0) return 0;
  return Math.min(2 * reclamo + sector, 10);
}

function esReciente(fechaRSS) {
  const d = new Date(fechaRSS);
  if (isNaN(d.getTime())) return true; // si no se puede parsear, no descartar
  return (Date.now() - d.getTime()) / 86400000 <= MAX_DIAS_ANTIGUEDAD;
}

function aISO(fechaRSS) {
  const d = new Date(fechaRSS);
  return isNaN(d.getTime()) ? new Date().toISOString().slice(0, 10) : d.toISOString().slice(0, 10);
}

// ---------- 1) Obtener noticias ----------
async function obtenerDeRSS() {
  const resultados = [];
  for (const feed of FEEDS) {
    try {
      const res = await fetch(feed, { redirect: 'follow' });
      if (!res.ok) continue;
      const xml = await res.text();
      const items = parsearRSS(xml)
        .filter(esReciente)
        .map((it) => ({ ...it, score: calcularScore(it) }))
        .filter((it) => it.score > 0);
      resultados.push(...items);
      console.log(`✓ ${feed.split('/')[2]} → ${items.length} relevante(s)`);
    } catch (e) {
      console.error(`✗ Error en feed ${feed}: ${e.message}`);
    }
  }

  // Dedupe por URL y por título normalizado (mismo artículo con links distintos)
  const unicos = new Map();
  for (const it of resultados) {
    const clave = it.link || normalizar(it.title).slice(0, 60);
    if (unicos.has(clave)) continue;
    // ¿Ya vimos un título muy parecido?
    const yaVisto = [...unicos.values()].some(
      (u) => normalizar(u.title).slice(0, 50) === normalizar(it.title).slice(0, 50)
    );
    if (yaVisto) continue;
    unicos.set(clave, it);
  }

  return [...unicos.values()]
    .sort((a, b) => b.score - a.score || new Date(b.fecha) - new Date(a.fecha))
    .slice(0, MAX_RESULTADOS)
    .map((it) => ({
      plataforma: 'Noticias de apuestas',
      titulo: it.title.slice(0, 90),
      descripcion: it.description.slice(0, 300) || it.title,
      url: it.link,
      fecha: aISO(it.fecha),
      score: it.score,
    }));
}

async function obtenerDePerplexity() {
  const res = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${PERPLEXITY_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'sonar',
      messages: [
        {
          role: 'user',
          content: `Buscá en la web noticias y reclamos sobre estafas o problemas con casas de apuestas y casinos online (últimas 48 horas) en Argentina y Latinoamérica. Seleccioná los ${MAX_RESULTADOS} más destacados. Respondé SOLO con un JSON array válido: [{"plataforma":"...","titulo":"... (máx 60 chars)","descripcion":"... 1-2 frases","url":"..."}]. Si no hay nada, respondé [].`,
        },
      ],
    }),
  });
  if (!res.ok) throw new Error(`Perplexity ${res.status}`);
  const data = await res.json();
  const contenido = data.choices?.[0]?.message?.content || '[]';
  const ini = contenido.indexOf('[');
  const fin = contenido.lastIndexOf(']');
  return JSON.parse(ini >= 0 && fin > ini ? contenido.slice(ini, fin + 1) : '[]');
}

// ---------- 2) Guardar en Supabase ----------
async function guardarEnSupabase(items) {
  // Traer una sola vez lo ya guardado (para dedupe por URL y título)
  const ya = await fetch(`${SUPABASE_URL}/rest/v1/reclamos?select=enlace,titulo&limit=200`, { headers });
  const existentes = await ya.json();
  const enlacesPrevios = new Set(Array.isArray(existentes) ? existentes.map((r) => r.enlace) : []);
  const titulosPrevios = Array.isArray(existentes) ? existentes.map((r) => normalizar(r.titulo).slice(0, 50)) : [];

  let insertados = 0;
  let duplicados = 0;
  for (const item of items) {
    const tituloNorm = normalizar(item.titulo).slice(0, 50);
    if (
      enlacesPrevios.has(item.url) ||
      titulosPrevios.some((t) => t === tituloNorm)
    ) {
      duplicados++;
      continue;
    }
    const body = {
      nombre_plataforma: item.plataforma || 'Noticias de apuestas',
      titulo: item.titulo || '',
      descripcion: item.descripcion || '',
      estado: 'pending',
      fecha: item.fecha || new Date().toISOString().slice(0, 10),
      enlace: item.url || null,
      pruebas: [],
      origen: 'rss',
    };
    const res = await fetch(`${SUPABASE_URL}/rest/v1/reclamos`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });
    if (res.status === 201 || res.status === 200) {
      insertados++;
      console.log(`✓ [score ${item.score}] ${body.titulo.slice(0, 70)}`);
    } else {
      console.error(`✗ Error: ${await res.text()}`);
    }
  }
  return { insertados, duplicados };
}

// ---------- Main ----------
try {
  let items;
  if (DEMO) {
    items = [
      { plataforma: 'Casino Demo AR', titulo: 'Denuncian demoras de más de 30 días en retiros', descripcion: 'Varios usuarios reportan retiros "en proceso" desde hace un mes.', url: 'https://ejemplo.com/demo-1', fecha: new Date().toISOString().slice(0, 10), score: 8 },
      { plataforma: 'Apuestas Test', titulo: 'Bono de bienvenida no acreditado', descripcion: 'El bono prometido no se acreditó tras el primer depósito.', url: 'https://ejemplo.com/demo-2', fecha: new Date().toISOString().slice(0, 10), score: 6 },
    ];
    console.log('→ Modo DEMO');
  } else if (PERPLEXITY_API_KEY) {
    console.log('→ Usando Perplexity Sonar...');
    items = await obtenerDePerplexity();
  } else {
    console.log('→ Modo RSS gratuito (costo $0)...');
    items = await obtenerDeRSS();
  }

  console.log(`→ ${items.length} noticia(s) encontrada(s)`);
  if (items.length === 0) {
    console.log('→ No hay nada nuevo. Fin.');
    process.exit(0);
  }

  const { insertados, duplicados } = await guardarEnSupabase(items);
  console.log(`\nResumen: ${insertados} nuevo(s), ${duplicados} duplicado(s).`);
} catch (err) {
  console.error('ERROR:', err.message);
  process.exit(1);
}
