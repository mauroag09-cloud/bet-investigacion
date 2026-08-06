'use client';

import { motion } from 'framer-motion';

const providers = [
  { name: 'AMING', logo: 'https://via.placeholder.com/120x40/1a1a2e/white?text=AMING' },
  { name: 'NETENT', logo: 'https://via.placeholder.com/120x40/1a1a2e/white?text=NETENT' },
  { name: 'NOLIMIT', logo: 'https://via.placeholder.com/120x40/1a1a2e/white?text=NOLIMIT' },
  { name: 'CASINO GURU', logo: 'https://via.placeholder.com/120x40/1a1a2e/white?text=CASINO+GURU' },
  { name: 'PR&NETGAMING', logo: 'https://via.placeholder.com/120x40/1a1a2e/white?text=PR%26NETGAMING' },
  { name: 'PRAGMATIC', logo: 'https://via.placeholder.com/120x40/1a1a2e/white?text=PRAGMATIC' },
  { name: 'SPRIBE', logo: 'https://via.placeholder.com/120x40/1a1a2e/white?text=SPRIBE' },
  { name: 'CRYPTOVEGA', logo: 'https://via.placeholder.com/120x40/1a1a2e/white?text=CRYPTOVEGA' },
  { name: 'Ezugi', logo: 'https://via.placeholder.com/120x40/1a1a2e/white?text=Ezugi' },
  { name: 'Evolution', logo: 'https://via.placeholder.com/120x40/1a1a2e/white?text=Evolution' },
  { name: 'bluepr', logo: 'https://via.placeholder.com/120x40/1a1a2e/white?text=bluepr' },
];

export const ProviderCarousel = () => {
  const duplicated = [...providers, ...providers, ...providers];

  return (
    <section className="py-6 bg-papel border-y border-oro/10">
      <div className="container mx-auto px-6 overflow-hidden">
        <div className="relative">
          <motion.div
            className="flex gap-10 items-center"
            animate={{ x: ['0%', '-33.33%'] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {duplicated.map((provider, idx) => (
              <div
                key={`${provider.name}-${idx}`}
                className="flex-shrink-0 opacity-30 hover:opacity-70 transition-opacity"
              >
                <img
                  src={provider.logo}
                  alt={provider.name}
                  className="h-8 w-auto"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
