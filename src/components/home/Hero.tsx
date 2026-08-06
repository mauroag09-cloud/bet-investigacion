'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Stamp } from '@/components/ui/Stamp';
import { Container } from '@/components/ui/Container';

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-papel pt-24 pb-16">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxQTFBMkUiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItaC0ydi0yaDJ6bTAgLTR2MmgtMnYtMmgyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50 -z-10" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Columna izquierda: texto */}
          <div className="lg:col-span-3">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="font-fraunces text-4xl md:text-5xl lg:text-6xl text-tinta leading-[1.1] tracking-tight max-w-3xl"
            >
              La verificación que necesitás antes de confiar en una plataforma de iGaming.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-6 font-inter text-lg text-tinta/60 max-w-xl leading-relaxed"
            >
              Análisis independiente, licencias verificadas, pagos auditados. Cada plataforma pasa por nuestro proceso de certificación.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Link href="/reseñas">
                <button className="px-6 py-3 bg-tinta text-white text-sm font-inter font-medium rounded transition-all hover:bg-tinta/90">
                  Ver reseñas →
                </button>
              </Link>
              <Link href="#metodologia" className="text-sm font-inter text-tinta/60 hover:text-tinta transition-colors">
                Cómo verificamos ↓
              </Link>
            </motion.div>
          </div>

          {/* Columna derecha: sello */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -12 }}
            animate={{ opacity: 1, scale: 1, rotate: -6 }}
            transition={{ delay: 0.4, duration: 0.6, type: 'spring' }}
            className="lg:col-span-2 flex justify-center lg:justify-end"
          >
            <Stamp variant="verified" size="lg" rotation={-6}>
              <div className="text-center">
                <span className="block text-3xl font-bold font-fraunces">✓</span>
                <span className="block text-[10px] font-ibm-mono tracking-wider mt-1">VERIFICADO</span>
              </div>
            </Stamp>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
