'use client';

import Link from 'next/link';

export const ResponsibleGaming = () => {
  return (
    <section className="py-16 bg-tinta text-papel">
      <div className="container mx-auto px-6 text-center max-w-3xl">
        <span className="inline-block font-ibm-mono text-xs tracking-[0.2em] text-oro mb-4">
          JUEGO RESPONSABLE
        </span>
        <h2 className="font-fraunces text-3xl md:text-4xl font-bold">
          Apostá con conciencia
        </h2>
        <p className="font-inter text-papel/70 mt-4 leading-relaxed">
          El juego es entretenimiento, no una forma de ganar dinero. Si sentís que perdés el control,
          hay ayuda disponible.
        </p>
        <Link
          href="/juego-responsable"
          className="inline-block mt-6 px-6 py-3 border border-oro text-oro font-inter font-medium rounded transition-all hover:bg-oro hover:text-tinta"
        >
          Conocé más →
        </Link>
      </div>
    </section>
  );
};
