'use client';

import Link from 'next/link';
import { Gift, Sparkles, Calendar, Percent, Coins } from 'lucide-react';

// Datos de ejemplo (puedes reemplazarlos con datos reales de tu API)
const mockPromotions = [
  {
    id: '1',
    title: 'Bono de bienvenida 200% en Royal Casino',
    description: 'Recibe un 200% de bono en tu primer depósito hasta 1000€.',
    type: 'BONUS',
    platform: 'Royal Casino',
    startDate: '2024-03-01',
  },
  {
    id: '2',
    title: 'Cashback 10% en pérdidas en Lucky Spin',
    description: 'Recibe un 10% de cashback en tus pérdidas semanales.',
    type: 'CASHBACK',
    platform: 'Lucky Spin',
    startDate: '2024-03-01',
  },
  {
    id: '3',
    title: '100 Free Spins en BetMaster Casino',
    description: 'Recibe 100 free spins en el juego Starburst al registrarte.',
    type: 'FREE_SPINS',
    platform: 'BetMaster Casino',
    startDate: '2024-03-01',
  },
];

export const PromotionsWidget = () => {
  const activePromotions = mockPromotions.slice(0, 3);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'BONUS':
        return <Percent className="w-4 h-4 text-green-500" />;
      case 'CASHBACK':
        return <Coins className="w-4 h-4 text-blue-500" />;
      case 'FREE_SPINS':
        return <Sparkles className="w-4 h-4 text-yellow-500" />;
      default:
        return <Gift className="w-4 h-4 text-purple-500" />;
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'BONUS':
        return 'Bono';
      case 'CASHBACK':
        return 'Cashback';
      case 'FREE_SPINS':
        return 'Free Spins';
      default:
        return type;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          <Gift className="inline-block w-5 h-5 mr-2 text-purple-500" />
          Promociones Vigentes
        </h3>
        <Link href="/promociones" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
          Ver todas →
        </Link>
      </div>

      <div className="space-y-4">
        {activePromotions.map((promotion) => (
          <Link
            key={promotion.id}
            href={`/promociones/${promotion.id}`}
            className="block p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                {getTypeIcon(promotion.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                  {promotion.title}
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1 px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full">
                    {getTypeText(promotion.type)}
                  </span>
                  <span>•</span>
                  <span>{promotion.platform}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(promotion.startDate).toLocaleDateString('es-ES')}
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
