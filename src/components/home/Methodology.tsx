'use client';

export const Methodology = () => {
  const steps = [
    { number: '01', title: 'Licencia', desc: 'Verificamos la validez y jurisdicción de cada licencia.' },
    { number: '02', title: 'RTP', desc: 'Auditamos los porcentajes de retorno al jugador publicados.' },
    { number: '03', title: 'Retiros', desc: 'Medimos tiempos reales de pago y límites.' },
    { number: '04', title: 'Atención', desc: 'Evaluamos calidad y tiempos de respuesta al cliente.' },
  ];

  return (
    <section id="metodologia" className="py-16 bg-tinta text-papel">
      <div className="container mx-auto px-6">
        <h2 className="font-fraunces text-3xl md:text-4xl font-bold mb-4">Metodología</h2>
        <p className="font-inter text-papel/60 mb-10 max-w-2xl">
          Así es como verificamos cada plataforma. Un proceso riguroso en 4 pasos.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="border-l-2 border-oro/30 pl-4">
              <span className="font-ibm-mono text-3xl font-bold text-oro">{step.number}</span>
              <h3 className="font-fraunces text-xl font-bold mt-1">{step.title}</h3>
              <p className="font-inter text-sm text-papel/60 mt-1">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
