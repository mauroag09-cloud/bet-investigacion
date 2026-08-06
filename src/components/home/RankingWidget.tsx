'use client';

import Link from 'next/link';
import { Trophy, TrendingUp, TrendingDown, Medal } from 'lucide-react';

const mockPlatforms = [
  { id: '1', name: 'BetMaster Casino', slug: 'betmaster-casino', logo: 'https://via.placeholder.com/100x100', overallScore: 92, status: 'ACTIVE' },
  { id: '2', name: 'Lucky Spin', slug: 'lucky-spin', logo: 'https://via.placeholder.com/100x100', overallScore: 88, status: 'ACTIVE' },
  { id: '3', name: 'Golden Tiger', slug: 'golden-tiger', logo: 'https://via.placeholder.com/100x100', overallScore: 85, status: 'ACTIVE' },
  { id: '4', name: 'Royal Casino', slug: 'royal-casino', logo: 'https://via.placeholder.com/100x100', overallScore: 78, status: 'UNDER_INVESTIGATION' },
  { id: '5', name: 'Star Casino', slug: 'star-casino', logo: 'https://via.placeholder.com/100x100', overallScore: 72, status: 'SUSPENDED' },
];

export const RankingWidget = () => {
  const topPlatforms = [...mockPlatforms]
    .sort((a, b) => b.overallScore - a.overallScore)
    .slice(0, 5);

  const getMedal = (index: number) => {
    if (index === 0) return <Medal className="w-5 h-5 text-yellow-400" />;
    if (index === 1) return <Medal className="w-5 h-5 text-gray-400" />;
    if (index === 2) return <Medal className="w-5 h-5 text-amber-600" />;
    return <span className="text-gray-500 text-sm font-bold">#{index + 1}</span>;
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-6 border border-gray-800 shadow-xl shadow-blue-900/5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-400" />
          Top Ranking
        </h3>
        <Link href="/ranking" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
          Ver más →
        </Link>
      </div>

      <div className="space-y-3">
        {topPlatforms.map((platform, index) => (
          <Link
            key={platform.id}
            href={`/plataformas/${platform.slug}`}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group"
          >
            <div className="flex-shrink-0 w-8 text-center">
              {getMedal(index)}
            </div>

            <img
              src={platform.logo}
              alt={platform.name}
              className="w-8 h-8 rounded-full object-cover border border-gray-700"
            />

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate group-hover:text-blue-400 transition-colors">
                {platform.name}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">{platform.overallScore}%</span>
                <span className="text-xs text-gray-600">•</span>
                <span className={`text-xs ${
                  platform.status === 'ACTIVE' ? 'text-green-400' :
                  platform.status === 'UNDER_INVESTIGATION' ? 'text-yellow-400' :
                  'text-red-400'
                }`}>
                  {platform.status === 'ACTIVE' ? '✅ Activo' :
                   platform.status === 'UNDER_INVESTIGATION' ? '⚠️ En revisión' :
                   '❌ Suspendido'}
                </span>
              </div>
            </div>

            {platform.overallScore > 85 && (
              <TrendingUp className="w-4 h-4 text-green-400" />
            )}
            {platform.overallScore < 70 && (
              <TrendingDown className="w-4 h-4 text-red-400" />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};
