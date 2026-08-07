// ============================================================
// actualizar-reclamos.mjs  (costo cero)
// Busca noticias/reclamos de casas de apuestas destacados usando
// feeds RSS GRATUITOS (Google Noticias + Yogonet) y los guarda
// en la tabla reclamos de Supabase con origen='rss', estado='pending'.
//
// Si existe PERPLEXITY_API_KEY, usa Perplexity Sonar en su lugar
// (opcional). Sin key, funciona igual con RSS → costo $0.
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

// Palabras que hacen relevante una noticia (debe tener 1 de "sector" + 1 de "problema")
const KW_SECTOR = ['casino', 'apuesta', 'juego', 'tragamoneda', 'bet', 'sport', 'iGaming', 'igaming', 'slots'];
const KW_PROBLEMA = [
  'estafa', 'denuncia', 'fraude', 'retiro', 'bloqueo', 'bloqueado', 'ilegal', 'licencia',
  'reclamo', 'problema', 'demanda', 'investigaci', 'sanción', 'sancion', 'multa', 'alerta',
  'queja', 'deuda', 'pirata', 'clandestin',
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
    const pubDate = get('pubDate');
    const fecha = pubDate ? pubDate.slice(0, 16) : '';
    items.push({ title: get('title'), link: get('link'), description: get('description'), fecha });
  }
  return items;
}

function esRelevante(item) {
  const texto = normalizar(`${item.title} ${item.description}`);
  const sector = KW_SECTOR.some((k) => texto.includes(k));
  const problema = KW_PROBLEMA.some((k) => texto.includes(k));
  return sector && problema;
}

function aISO(fechaRSS) {
  // Convierte "Wed, 06 Aug 2026 14:30:00 GMT" a "2026-08-06"
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
      const items = parsearRSS(xml).filter(esRelevante);
      resultados.push(...items);
      console.log(`✓ ${feed.split('/')[2]} → ${items.length} relevante(s)`);
    } catch (e) {
      console.error(`✗ Error en feed ${feed}: ${e.message}`);
    }
  }

  // Dedupe por link entre feeds y ordenar por fecha
  const unicos = new Map();
  for (const it of resultados) {
    if (!it.link || unicos.has(it.link)) continue;
    unicos.set(it.link, it);
  }
  return [...unicos.values()]
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
    .slice(0, MAX_RESULTADOS)
    .map((it) => ({
      plataforma: 'Noticias de apuestas',
      titulo: it.title.slice(0, 90),
      descripcion: it.description.slice(0, 300) || it.title,
      url: it.link,
      fecha: aISO(it.fecha),
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
  let insertados = 0;
  let duplicados = 0;
  for (const item of items) {
    if (item.url) {
      const check = await fetch(
        `${SUPABASE_URL}/rest/v1/reclamos?select=id&enlace=eq.${encodeURIComponent(item.url)}&limit=1`,
        { headers }
      );
      const existentes = await check.json();
      if (Array.isArray(existentes) && existentes.length > 0) {
        duplicados++;
        continue;
      }
    }
    const body = {
      nombre_plataforma: item.plataforma || 'Noticias de apuestas',
      titulo: item.titulo || '',
      descripcion: item.descripcion || '',
      estado: 'pending',
      fecha: item.fecha || new Date().toISOString().slice(0, 10),
      enlace: item.url || null,
      pruebas: [],
      origen: PERPLEXITY_API_KEY ? 'ia' : 'rss',
    };
    const res = await fetch(`${SUPABASE_URL}/rest/v1/reclamos`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });
    if (res.status === 201 || res.status === 200) {
      insertados++;
      console.log(`✓ ${body.titulo.slice(0, 70)}`);
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
      { plataforma: 'Casino Demo AR', titulo: 'Denuncian demoras de más de 30 días en retiros', descripcion: 'Varios usuarios reportan retiros "en proceso" desde hace un mes.', url: 'https://ejemplo.com/demo-1', fecha: new Date().toISOString().slice(0, 10) },
      { plataforma: 'Apuestas Test', titulo: 'Bono de bienvenida no acreditado', descripcion: 'El bono prometido no se acreditó tras el primer depósito.', url: 'https://ejemplo.com/demo-2', fecha: new Date().toISOString().slice(0, 10) },
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
