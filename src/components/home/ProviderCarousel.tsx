'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const providers = [
  { name: 'IMG_4035', logo: '/providers/IMG_4035.png' },
  { name: 'IMG_4037', logo: '/providers/IMG_4037.png' },
  { name: 'IMG_4038', logo: '/providers/IMG_4038.png' },
  { name: 'IMG_4039', logo: '/providers/IMG_4039.png' },
  { name: 'IMG_4040', logo: '/providers/IMG_4040.png' },
  { name: 'IMG_4041', logo: '/providers/IMG_4041.png' },
  { name: 'IMG_4042', logo: '/providers/IMG_4042.png' },
  { name: 'IMG_4045', logo: '/providers/IMG_4045.png' },
  { name: 'IMG_4046', logo: '/providers/IMG_4046.png' },
  { name: 'IMG_4047', logo: '/providers/IMG_4047.png' },
  { name: 'IMG_4048', logo: '/providers/IMG_4048.png' },
  { name: 'IMG_4049', logo: '/providers/IMG_4049.png' },
  { name: 'IMG_4051', logo: '/providers/IMG_4051.png' },
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
                <Image
                  src={provider.logo}
                  alt={provider.name}
                  width={120}
                  height={40}
                  className="h-8 w-auto object-contain"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
