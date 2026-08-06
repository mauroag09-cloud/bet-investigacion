"use client";

import './globals.css';
import { Poppins } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion, MotionConfig } from 'framer-motion';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className={`${poppins.className} min-h-screen flex flex-col bg-gray-950`}>
        <Header />
        <main className="flex-1">
          <MotionConfig transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="w-full"
            >
              {children}
            </motion.div>
          </MotionConfig>
        </main>
        <Footer />
      </body>
    </html>
  );
}
