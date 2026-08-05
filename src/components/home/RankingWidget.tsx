'use client';

import Link from 'next/link';
import { Trophy, TrendingUp, TrendingDown } from 'lucide-react';

// Datos de ejemplo (puedes reemplazarlos con datos reales de tu API)
const mockPlatforms = [
  { id: '1', name: 'BetMaster Casino', slug: 'betmaster-casino', logo: 'https://via.placeholder.com/100x100', overallScore: 92, status: 'ACTIVE' },
  { id: '2', name: 'Royal Casino', slug: 'royal-casino', logo: 'https://via.placeholder.com/100x100', overallScore: 78, status: 'UNDER_INVESTIGATION' },
  { id: '3', name: 'Lucky Spin', slug: 'lucky-spin', logo: 'https://via.placeholder.com/100x100', overallScore: 88, status: 'ACTIVE' },
  { id: '4', name: 'Golden Tiger', slug: 'golden-tiger', logo: 'https://via.placeholder.com/100x100', overallScore: 85, status: 'ACTIVE' },
  { id: '5', name: 'Star Casino', slug: 'star-casino', logo: 'https://via.placeholder.com/100x100', overallScore: 72, status: 'SUSPENDED' },
];

export const RankingWidget = () => {
  const topPlatforms = [...mockPlatforms]
    .sort((a, b) => b.overallScore - a.overallScore)
    .slice(0, 5);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          <Trophy className="inline-block w-5 h-5 mr-2 text-yellow-500" />
          Top Ranking
        </h3>
        <Link href="/ranking" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
          Ver más →
        </Link>
      </div>

      <div className="space-y-3">
        {topPlatforms.map((platform, index) => (
          <Link
            key={platform.id}
            href={`/plataformas/${platform.slug}`}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="flex-shrink-0 w-8 text-center">
              {index === 0 && <span className="text-yellow-500 font-bold">🥇</span>}
              {index === 1 && <span className="text-gray-400 font-bold">🥈</span>}
              {index === 2 && <span className="text-amber-600 font-bold">🥉</span>}
              {index > 2 && <span className="text-gray-500 text-sm">#{index + 1}</span>}
            </div>

            <img
              src={platform.logo}
              alt={platform.name}
              className="w-8 h-8 rounded-full object-cover border border-gray-200 dark:border-gray-700"
            />

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {platform.name}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">{platform.overallScore}%</span>
                <span className="text-xs text-gray-400">•</span>
                <span className={`text-xs ${platform.status === 'ACTIVE' ? 'text-green-500' : platform.status === 'UNDER_INVESTIGATION' ? 'text-yellow-500' : 'text-red-500'}`}>
                  {platform.status === 'ACTIVE' ? '✅' : platform.status === 'UNDER_INVESTIGATION' ? '⚠️' : '❌'}
                </span>
              </div>
            </div>

            {platform.overallScore > 85 && (
              <TrendingUp className="w-4 h-4 text-green-500" />
            )}
            {platform.overallScore < 70 && (
              <TrendingDown className="w-4 h-4 text-red-500" />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};
