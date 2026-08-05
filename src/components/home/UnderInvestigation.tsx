'use client';

import Link from 'next/link';
import { AlertTriangle, Clock, Eye } from 'lucide-react';

// Datos de ejemplo
const mockPlatforms = [
  {
    id: '1',
    name: 'Royal Casino',
    slug: 'royal-casino',
    logo: 'https://via.placeholder.com/100x100',
    overallScore: 78,
    reputationHistory: [{ score: 90 }, { score: 78 }],
  },
];

export const UnderInvestigation = () => {
  const underInvestigation = mockPlatforms.filter(p => p.overallScore < 80);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border border-yellow-200 dark:border-yellow-900/50 border-l-4 border-l-yellow-500">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          <AlertTriangle className="inline-block w-6 h-6 mr-2 text-yellow-500" />
          Casinos Bajo Investigación
        </h2>
        <Link href="/investigacion" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
          Ver todos →
        </Link>
      </div>

      {underInvestigation.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No hay casinos bajo investigación en este momento.</p>
      ) : (
        <div className="space-y-4">
          {underInvestigation.map((platform) => (
            <Link
              key={platform.id}
              href={`/plataformas/${platform.slug}`}
              className="flex items-center gap-4 p-3 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/20 transition-colors"
            >
              <img
                src={platform.logo}
                alt={platform.name}
                className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-700"
              />
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {platform.name}
                  </p>
                  <span className="flex items-center gap-1 text-xs text-yellow-700 dark:text-yellow-400 bg-yellow-200 dark:bg-yellow-900/50 px-2 py-0.5 rounded-full">
                    <Clock className="w-3 h-3" /> En revisión
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-1 text-xs text-gray-600 dark:text-gray-400">
                  <span>Score actual: {platform.overallScore}%</span>
                  <span>•</span>
                  <span>Antes: {platform.reputationHistory[platform.reputationHistory.length - 2]?.score || '—'}%</span>
                </div>
              </div>
              <Eye className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
