// ============================================================
// actualizar-reclamos.mjs  (costo cero — solo Argentina)
// Busca reclamos/denuncias de casas de apuestas en ARGENTINA
// usando feeds RSS GRATUITOS de Google Noticias (gl=AR), con foco
// en: reclamos, denuncias, falta de pago y promociones fraudulentas.
// Guarda en la tabla reclamos de Supabase (origen='rss', pending).
//
// Uso:
//   node scripts/actualizar-reclamos.mjs
//   DEMO=1 node scripts/actualizar-reclamos.mjs
// ============================================================

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://zwrdnhrtqkyvmuslelfm.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3cmRuaHJ0cWt5dm11c2xlbGZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5Nzc1MjgsImV4cCI6MjEwMTU1MzUyOH0.IL8tLTs4bwFRHynP5g2BSIkPcSg6tADUVLrBst8W7Vo';
const DEMO = process.env.DEMO === '1';
const MAX_RESULTADOS = 6;
// Máximo 3 meses de antigüedad (90 días)
const MAX_DIAS_ANTIGUEDAD = 90;

const headers = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
};

// ---------- Feeds: Google Noticias SOLO Argentina ----------
const AR = 'hl=es-419&gl=AR&ceid=AR:es-419';
const FEEDS = [
  `https://news.google.com/rss/search?q=reclamo%20casa%20de%20apuestas%20argentina&${AR}`,
  `https://news.google.com/rss/search?q=denuncia%20casino%20online%20argentina&${AR}`,
  `https://news.google.com/rss/search?q=apuestas%20online%20falta%20de%20pago%20retiro&${AR}`,
  `https://news.google.com/rss/search?q=casino%20online%20bono%20promocion%20fraudulenta&${AR}`,
  `https://news.google.com/rss/search?q=estafa%20apuestas%20online%20argentina&${AR}`,
  `https://news.google.com/rss/search?q=casas%20de%20apuestas%20ilegales%20argentina&${AR}`,
  // Ampliación: fraudes con casas de apuestas (siempre Argentina)
  `https://news.google.com/rss/search?q=fraude%20casa%20de%20apuestas%20argentina&${AR}`,
  `https://news.google.com/rss/search?q=estafa%20casino%20apuestas%20juegos%20argentina&${AR}`,
  `https://news.google.com/rss/search?q=apuestas%20online%20fraude%20banca%20dinero%20argentina&${AR}`,
  `https://news.google.com/rss/search?q=casa%20de%20apuestas%20fraude%20jugadores%20argentina&${AR}`,
  `https://news.google.com/rss/search?q=apuestas%20ilegales%20fraude%20argentina&${AR}`,
];

// ---------- Palabras clave ----------
// Foco del usuario: reclamos, denuncias, falta de pago, promos fraudulentas
const KW_RECLAMO = [
  'reclamo', 'denuncia', 'denunci', 'estafa', 'estaf', 'fraude', 'fraudulent',
  'falta de pago', 'no paga', 'impago', 'retiro', 'bloqueo', 'bloqueada',
  'bloqueado', 'demora', 'reembolso', 'devolucion', 'devolución',
  'bono no acreditado', 'no acredit', 'premio', 'promocion fraudulenta',
  'promoción fraudulenta', 'publicidad enganosa', 'publicidad engañosa',
  'victima', 'queja', 'cobrar', 'cuenta', 'clausur', 'ilegal', 'pirata',
  'clandestin', 'sin licencia', 'robo', 'timadores', 'timador', 'defraudac',
  'estafador', 'engano', 'engaño', 'phishing', 'suplantac', 'no me paga',
  'no pago', 'deja de pagar', 'sin pagar', 'incumple', 'usurp', 'apropi',
];
const KW_SECTOR = [
  'casino', 'apuesta', 'tragamoneda', 'slots', 'igaming', 'iGaming', 'ruleta',
  'poker', 'poquer', 'juego online', 'juegos online', 'plataforma de juego',
  'bet', 'bookmaker',
];
// Indica Argentina (peso +1). Sin esto, igual puede pasar si el feed es AR.
const KW_ARGENTINA = [
  'argentina', 'argentino', 'bonaerense', 'iplyc', 'lotería de la ciudad',
  'loteria de la ciudad', 'buenos aires', 'córdoba', 'cordoba', 'rosario',
  'mendoza', 'tucuman', 'tucumán', 'salta', 'neuquen', 'neuquén', 'misiones',
  'entre rios', 'entre ríos', 'santa fe', 'la plata', 'lotería nacional',
  'loteria nacional', 'loterias', 'loterías', 'lotería de la provincia',
  'lotería bonaerense', 'loteria bonaerense', 'aress', 'argentina gobierno',
];
// Cualquier mención a otro país descarta (solo Argentina)
const KW_PAIS_NEGATIVO = [
  'chile', 'colombia', 'mexico', 'méxico', 'peru', 'perú', 'uruguay',
  'bolivia', 'paraguay', 'venezuela', 'ecuador', 'guatemala', 'honduras',
  'el salvador', 'nicaragua', 'costa rica', 'panama', 'panamá',
  'republica dominicana', 'puerto rico', 'españa', 'espan', 'brasil',
  'valdivia', 'betplay', 'superintendencia de casinos', 'fiscalia de chile',
];
// Ruido genérico
const KW_NEGATIVA = [
  'mejores casas', 'mejores casinos', 'mejor casino', 'billetera virtual',
  'sin restricc', 'top 10', 'top 5', 'ranking', 'bonus', 'promoci',
  'oferta', 'registro gratis', 'gratuito', 'torneo', 'sorteo', 'mundial',
  'eurocopa', 'copa américa', 'copa america', 'futbol', 'fútbol', 'cuota',
  'pronostico', 'prediccion', 'winning', 'jackpot', 'entrevista', 'opinion',
  'metodos de pago', 'métodos de pago', 'depositos rapidos', 'depósitos rápidos',
  'bono de bienvenida del', 'apk', 'apps para apostar', 'paga con',
];

// ---------- Utilidades ----------
function normalizar(s) {
  return (s || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

// Parsing simple con indexOf (sin regex frágiles)
function parsearRSS(xml) {
  const items = [];
  let pos = 0;
  while (true) {
    const ini = xml.indexOf('<item>', pos);
    if (ini === -1) break;
    const fin = xml.indexOf('</item>', ini);
    if (fin === -1) break;
    const bloque = xml.slice(ini + 6, fin);
    const get = (tag) => {
      const a = bloque.indexOf('<' + tag + '>');
      const b = bloque.indexOf('</' + tag + '>');
      if (a === -1 || b === -1 || b < a) return '';
      return bloque
        .slice(a + tag.length + 2, b)
        .replace(/<!\[CDATA\[|\]\]>/g, '')
        .replace(/<[^>]+>/g, '')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;|&apos;/g, "'")
        .trim();
    };
    items.push({ title: get('title'), link: get('link'), description: get('description'), fecha: get('pubDate') });
    pos = fin + 8;
  }
  return items;
}

function calcularScore(item) {
  const texto = normalizar(`${item.title} ${item.description}`);
  if (KW_NEGATIVA.some((k) => texto.includes(k))) return 0;
  if (KW_PAIS_NEGATIVO.some((k) => texto.includes(k))) return 0; // solo Argentina
  const sector = KW_SECTOR.filter((k) => texto.includes(k)).length;
  const reclamo = KW_RECLAMO.filter((k) => texto.includes(k)).length;
  if (sector === 0 || reclamo === 0) return 0;
  const esAR = KW_ARGENTINA.some((k) => texto.includes(k));
  return Math.min(2 * reclamo + sector + (esAR ? 1 : 0), 10);
}

function esReciente(fechaRSS) {
  const d = new Date(fechaRSS);
  // Sin fecha válida se descarta (antes se dejaba pasar y entraban artículos viejos)
  if (isNaN(d.getTime())) return false;
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
      const parseados = parsearRSS(xml)
      const items = parseados
        .filter((it) => esReciente(it.fecha))
        .map((it) => ({ ...it, score: calcularScore(it) }))
        .filter((it) => it.score > 0);
      resultados.push(...items);
      console.log(`✓ ${feed.match(/q=([^&]+)/)?.[1] || 'feed'} → ${items.length} relevante(s)`);
    } catch (e) {
      console.error(`✗ Error en feed ${feed}: ${e.message}`);
    }
  }

  // Dedupe por URL y por título normalizado
  const unicos = new Map();
  for (const it of resultados) {
    const clave = it.link || normalizar(it.title).slice(0, 60);
    if (unicos.has(clave)) continue;
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

// ---------- 2) Guardar en Supabase ----------
async function guardarEnSupabase(items) {
  const ya = await fetch(`${SUPABASE_URL}/rest/v1/reclamos?select=enlace,titulo&limit=200`, { headers });
  const existentes = await ya.json();
  const enlacesPrevios = new Set(Array.isArray(existentes) ? existentes.map((r) => r.enlace) : []);
  const titulosPrevios = Array.isArray(existentes) ? existentes.map((r) => normalizar(r.titulo).slice(0, 50)) : [];

  let insertados = 0;
  let duplicados = 0;
  for (const item of items) {
    // Salvaguarda: doble chequeo de antigüedad antes de insertar
    const dias = (Date.now() - new Date(item.fecha).getTime()) / 86400000;
    if (isNaN(dias) || dias > MAX_DIAS_ANTIGUEDAD) continue;
    const tituloNorm = normalizar(item.titulo).slice(0, 50);
    if (enlacesPrevios.has(item.url) || titulosPrevios.some((t) => t === tituloNorm)) {
      duplicados++;
      continue;
    }
    const body = {
      nombre_plataforma: item.plataforma,
      titulo: item.titulo,
      descripcion: item.descripcion,
      estado: 'pending',
      fecha: item.fecha,
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
      { plataforma: 'Casino Demo AR', titulo: 'Denuncian falta de pago en retiros', descripcion: 'Varios usuarios reportan retiros impagos.', url: 'https://ejemplo.com/demo-1', fecha: new Date().toISOString().slice(0, 10), score: 8 },
    ];
    console.log('→ Modo DEMO');
  } else {
    console.log('→ Modo RSS gratuito — SOLO Argentina (costo $0)...');
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
