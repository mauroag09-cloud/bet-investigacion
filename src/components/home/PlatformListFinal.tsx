import { unstable_noStore as noStore } from 'next/cache';
import { supabase } from '@/lib/supabase';
import { Stamp } from '@/components/ui/Stamp';
import Link from 'next/link';

// Este es un Server Component - se ejecuta en el servidor
export default async function PlatformListFinal() {
  noStore(); // ← Evita caché en el servidor

  // Obtener datos directamente desde Supabase (sin API intermediaria)
  const { data: platforms, error } = await supabase
    .from('plataformas')
    .select('*')
    .order('rating', { ascending: false });

  if (error) {
    console.error('Error al obtener plataformas:', error);
    return <div className="py-16 text-center text-red-500">Error al cargar plataformas</div>;
  }

  if (!platforms || platforms.length === 0) {
    return <div className="py-16 text-center text-gray-500">No hay plataformas disponibles.</div>;
  }

  return (
    <section className="py-16 bg-papel">
      <div className="container mx-auto px-6">
        <h2 className="font-fraunces text-3xl md:text-4xl text-tinta font-bold mb-4">
          Índice de plataformas analizadas
        </h2>
        <p className="font-inter text-tinta/60 mb-10 max-w-2xl">
          Cada plataforma pasa por nuestro proceso de verificación en 5 etapas.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((platform) => {
            // Usar notación de corchetes para acceder a la propiedad con guión
            const link = platform['link-fuente'];

            return (
              <div
                key={platform.id}
                className="bg-papel-light border border-oro/20 rounded-lg p-6 relative hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="absolute top-4 right-4">
                  <Stamp
                    variant={
                      platform.estado === 'verificada'
                        ? 'verified'
                        : platform.estado === 'revision'
                        ? 'warning'
                        : 'danger'
                    }
                    size="sm"
                    rotation={-6}
                  >
                    <span className="text-[8px] font-ibm-mono tracking-wider">
                      {platform.estado === 'verificada'
                        ? 'VERIFICADO'
                        : platform.estado === 'revision'
                        ? 'EN REVISIÓN'
                        : 'NO RECOMENDADA'}
                    </span>
                  </Stamp>
                </div>

                <h3 className="font-fraunces text-xl font-bold text-tinta pr-16">
                  {platform.nombre}
                </h3>

                <div className="mt-2 font-ibm-mono text-3xl font-bold text-tinta">
                  {platform.rating || '—'}
                  <span className="text-sm font-inter font-normal text-tinta/50">/10</span>
                </div>

                {platform.resumen && (
                  <p className="mt-3 text-sm font-inter text-tinta/70 line-clamp-2">
                    {platform.resumen}
                  </p>
                )}

                {/* ENLACE: si link existe, muestra <a> externo, si no, Link interno */}
                {link ? (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-sm font-inter font-medium text-tinta hover:text-oro transition-colors"
                  >
                    Ver expediente completo →
                  </a>
                ) : (
                  <Link
                    href={`/plataformas/${platform.slug}`}
                    className="mt-4 inline-block text-sm font-inter font-medium text-tinta hover:text-oro transition-colors"
                  >
                    Ver expediente completo →
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
