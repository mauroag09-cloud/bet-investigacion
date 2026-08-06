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

export const GameProviders = () => {
  // Duplicamos la lista para crear el efecto infinito
  const duplicatedProviders = [...providers, ...providers, ...providers];

  return (
    <div className="w-full py-8 bg-black/30 backdrop-blur-sm border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-4">
        <p className="text-center text-xs uppercase tracking-wider text-gray-500 mb-4">
          Proveedores de juegos disponibles
        </p>
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-8 items-center"
            animate={{
              x: ['0%', '-33.33%'],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {duplicatedProviders.map((provider, index) => (
              <div
                key={`${provider.name}-${index}`}
                className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300"
              >
                <img
                  src={provider.logo}
                  alt={provider.name}
                  className="h-10 w-auto opacity-60 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
