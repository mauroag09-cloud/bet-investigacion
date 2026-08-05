'use client';

import Link from 'next/link';
import { Calendar, User } from 'lucide-react';

// Datos de ejemplo (puedes reemplazarlos con datos reales)
const mockNews = [
  {
    id: '1',
    title: 'BetMaster Casino lanza nueva plataforma móvil',
    excerpt: 'La plataforma líder en Latinoamérica anuncia su nueva app con más de 500 juegos.',
    image: 'https://via.placeholder.com/800x400',
    author: 'Carlos Ruiz',
    date: '2024-03-15',
    category: 'Tecnología',
  },
  {
    id: '2',
    title: 'Royal Casino bajo investigación por retrasos en pagos',
    excerpt: 'Usuarios denuncian retrasos de hasta 5 días en sus retiros.',
    image: 'https://via.placeholder.com/800x400',
    author: 'María González',
    date: '2024-03-14',
    category: 'Investigación',
  },
  {
    id: '3',
    title: 'Lucky Spin celebra torneo con premios de 50.000€',
    excerpt: 'El casino organiza un torneo exclusivo para sus jugadores más activos.',
    image: 'https://via.placeholder.com/800x400',
    author: 'Juan Pérez',
    date: '2024-03-13',
    category: 'Promociones',
  },
];

export const LatestNews = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          📰 Últimas Noticias
        </h2>
        <Link href="/noticias" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
          Ver todas →
        </Link>
      </div>

      <div className="space-y-6">
        {mockNews.map((news) => (
          <Link
            key={news.id}
            href={`/noticias/${news.id}`}
            className="block group"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="md:w-48 flex-shrink-0">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
                  <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full">
                    {news.category}
                  </span>
                  <span>•</span>
                  <span>{new Date(news.date).toLocaleDateString('es-ES')}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {news.title}
                </h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {news.excerpt}
                </p>
                <div className="mt-2 flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" /> {news.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {news.date}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
