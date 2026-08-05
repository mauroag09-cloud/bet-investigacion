'use client';
import { motion } from 'framer-motion';
import { Search, Shield, Zap, Headphones, FileCheck } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useState } from 'react';
export const Hero = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = (e: React.FormEvent) => { e.preventDefault(); if(searchTerm.trim()) window.location.href = '/plataformas?search='+searchTerm; };
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-blue-900/20 pt-20 pb-32">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaC0ydi0yaDJ6bTAgLTR2MmgtMnYtMmgyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50 -z-10" />
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.6}}>
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold text-blue-400 bg-blue-500/10 rounded-full border border-blue-500/20">🔍 Análisis independiente desde 2024</span>
        </motion.div>
        <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1,duration:0.6}} className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
          Investigación y Reputación de
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-blue-400">Plataformas de Apuestas</span>
        </motion.h1>
        <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.2,duration:0.6}} className="mt-4 text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
          Análisis en profundidad, rankings en tiempo real y sistema de reclamos. Información transparente para tomar decisiones seguras.
        </motion.p>
        <motion.form initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.3,duration:0.6}} onSubmit={handleSearch} className="mt-8 max-w-xl mx-auto flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input type="text" placeholder="Buscar plataforma..." value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} className="pl-10 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 h-12" />
          </div>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white h-12 px-8"><Search className="w-4 h-4 mr-2" /> Buscar</Button>
        </motion.form>
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.4,duration:0.6}} className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
          <span className="inline-flex items-center gap-2 text-gray-300 bg-white/5 px-3 py-1.5 rounded-full border border-white/10"><Shield className="w-4 h-4 text-blue-400" /> Seguridad</span>
          <span className="inline-flex items-center gap-2 text-gray-300 bg-white/5 px-3 py-1.5 rounded-full border border-white/10"><Zap className="w-4 h-4 text-yellow-400" /> Pagos rápidos</span>
          <span className="inline-flex items-center gap-2 text-gray-300 bg-white/5 px-3 py-1.5 rounded-full border border-white/10"><Headphones className="w-4 h-4 text-green-400" /> Atención 24/7</span>
          <span className="inline-flex items-center gap-2 text-gray-300 bg-white/5 px-3 py-1.5 rounded-full border border-white/10"><FileCheck className="w-4 h-4 text-violet-400" /> Licencias</span>
        </motion.div>
      </div>
    </section>
  );
};
