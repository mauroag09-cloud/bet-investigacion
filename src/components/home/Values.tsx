'use client';
import { Container } from "@/components/ui/Container";

import { Stamp } from '@/components/ui/Stamp';

const values = [
  {
    title: 'Transparencia',
    desc: 'Publicamos todo lo que encontramos, sin filtros ni intereses.',
  },
  {
    title: 'Integridad',
    desc: 'No aceptamos pagos por modificar reseñas. Nuestra opinión es independiente.',
  },
  {
    title: 'Innovación',
    desc: 'Usamos tecnología para auditar de forma más precisa y rápida.',
  },
  {
    title: 'Empoderamiento',
    desc: 'Te damos la información que necesitas para decidir con confianza.',
  },
];

export const Values = () => {
  return (
    <section className="py-16 bg-papel-light border-y border-oro/10">
      <Container>
        <h2 className="font-fraunces text-3xl md:text-4xl text-tinta font-bold mb-4">
          Nuestra Misión y Valores
        </h2>
        <p className="font-inter text-tinta/60 mb-10 max-w-2xl">
          Lo que nos guía en cada investigación.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, idx) => (
            <div key={idx} className="text-center">
              <div className="flex justify-center mb-3">
                <Stamp variant="verified" size="sm" rotation={-4}>
                  <span className="text-[10px] font-ibm-mono">✓</span>
                </Stamp>
              </div>
              <h3 className="font-fraunces text-xl font-bold text-tinta">
                {value.title}
              </h3>
              <p className="font-inter text-sm text-tinta/60 mt-1">
                {value.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
