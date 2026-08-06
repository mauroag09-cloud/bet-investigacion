import { ArticleLayout } from '@/components/layout/ArticleLayout';
import { Stamp } from '@/components/ui/Stamp';

export default function SobreNosotrosPage() {
  const values = [
    {
      title: 'Transparencia',
      desc: 'Publicamos todo lo que encontramos, sin filtros ni intereses. Creemos que la información clara es la base de la confianza.'
    },
    {
      title: 'Integridad',
      desc: 'No aceptamos pagos por modificar reseñas. Nuestra opinión es independiente y siempre basada en evidencia verificable.'
    },
    {
      title: 'Innovación',
      desc: 'Usamos tecnología para auditar de forma más precisa y rápida. Estamos en constante evolución para ofrecer mejores herramientas.'
    },
    {
      title: 'Empoderamiento',
      desc: 'Te damos la información que necesitas para decidir con confianza. Nuestro objetivo es que tomes el control de tus decisiones.'
    }
  ];

  return (
    <ArticleLayout title="Sobre Nosotros" lastUpdated="Agosto 2026">
      <h2>Misión</h2>
      <p>
        En Infobet nos dedicamos a verificar y analizar plataformas de iGaming para que los usuarios puedan tomar decisiones informadas y seguras. Creamos un espacio de transparencia donde cada casino, casa de apuestas o plataforma de juegos sea evaluada con rigor e independencia.
      </p>

      <h2>Visión</h2>
      <p>
        Ser el referente en investigación de iGaming en español, reconocido por nuestra honestidad, precisión y compromiso con el jugador. Queremos construir una comunidad donde el juego responsable y la información confiable sean la norma.
      </p>

      <h2>Nuestros Valores</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {values.map((v, i) => (
          <div key={i} className="bg-papel-light border border-oro/20 rounded-lg p-5 flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              <Stamp variant="verified" size="sm" rotation={-4}>
                <span className="text-[10px] font-ibm-mono">✓</span>
              </Stamp>
            </div>
            <div>
              <h3 className="font-fraunces text-lg font-bold text-tinta">{v.title}</h3>
              <p className="font-inter text-sm text-tinta/60 mt-0.5">{v.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </ArticleLayout>
  );
}
