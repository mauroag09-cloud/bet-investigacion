'use client';

import { motion } from 'framer-motion';

interface StampProps {
  variant?: 'verified' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  rotation?: number;
  children?: React.ReactNode;
}

export const Stamp = ({
  variant = 'verified',
  size = 'md',
  className = '',
  rotation = -8,
  children,
}: StampProps) => {
  const variants = {
    verified: {
      border: '#2D6A4F',
      text: '#2D6A4F',
      inner: '#2D6A4F',
    },
    warning: {
      border: '#C9A84C',
      text: '#C9A84C',
      inner: '#C9A84C',
    },
    danger: {
      border: '#9B2226',
      text: '#9B2226',
      inner: '#9B2226',
    },
  };

  const sizes = {
    sm: 'w-20 h-20 text-[10px]',
    md: 'w-28 h-28 text-xs',
    lg: 'w-40 h-40 text-sm',
  };

  const color = variants[variant];

  return (
    <motion.div
      className={`relative rounded-full border-2 border-[${color.border}] flex items-center justify-center ${sizes[size]} ${className}`}
      style={{ transform: `rotate(${rotation}deg)`, borderColor: color.border }}
      animate={{ rotate: rotation }}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      }}
    >
      {/* Círculo interior */}
      <div
        className="absolute inset-[6px] rounded-full border-2"
        style={{ borderColor: color.border, opacity: 0.5 }}
      />

      {/* Texto curvo (usamos SVG para texto circular) */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        <defs>
          <path
            id={`stamp-text-${variant}`}
            d="M 20, 50 a 30,30 0 1,1 60,0 a 30,30 0 1,1 -60,0"
          />
        </defs>
        <text
          fill={color.text}
          fontSize="10"
          fontWeight="700"
          letterSpacing="2"
          className="font-ibm-mono"
        >
          <textPath href={`#stamp-text-${variant}`} startOffset="0%">
            INFOBET · VERIFICADO ·
          </textPath>
        </text>
      </svg>

      {/* Contenido central */}
      <div className="relative z-10 font-fraunces font-bold text-center" style={{ color: color.inner }}>
        {children || (
          <span className="text-2xl">✓</span>
        )}
      </div>
    </motion.div>
  );
};
