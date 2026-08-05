'use client';

import Link from 'next/link';
import { Shield, CheckCircle } from 'lucide-react';

// Datos de ejemplo (puedes reemplazarlos con datos reales de tu API)
const mockPlatforms = [
  { id: '1', name: 'BetMaster Casino', slug: 'betmaster-casino', logo: 'https://via.placeholder.com/100x100', overallScore: 92, paymentMethods: ['Visa', 'PayPal', 'Bitcoin'] },
  { id: '2', name: 'Lucky Spin', slug: 'lucky-spin', logo: 'https://via.placeholder.com/100x100', overallScore: 88, paymentMethods: ['PayPal', 'Skrill', 'Neteller'] },
  { id: '3', name: 'Golden Tiger', slug: 'golden-tiger', logo: 'https://via.placeholder.com/100x100', overallScore: 85, paymentMethods: ['Visa', 'Mastercard', 'Bank Transfer'] },
  { id: '4', name: 'Star Casino', slug: 'star-casino', logo: 'https://via.placeholder.com/100x100', overallScore: 82, paymentMethods: ['PayPal', 'Bitcoin', 'Ethereum'] },
];

export const TrustedCasinos = () => {
  const trusted = mockPlatforms
    .filter(p => p.overallScore >= 80)
    .slice(0, 4);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          <Shield className="inline-block w-6 h-6 mr-2 text-green-500" />
          Casinos Más Confiables
        </h2>
        <Link href="/plataformas?filter=confiables" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
          Ver todos →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {trusted.map((platform) => (
          <Link
            key={platform.id}
            href={`/plataformas/${platform.slug}`}
            className="group p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="flex items-center gap-3">
              <img
                src={platform.logo}
                alt={platform.name}
                className="w-12 h-12 rounded-full object-cover border border-gray-200 dark:border-gray-700"
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 dark:text-white truncate">
                  {platform.name}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                    {platform.overallScore}% confiable
                  </span>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1">
              {platform.paymentMethods.slice(0, 3).map((method) => (
                <span
                  key={method}
                  className="text-xs px-2 py-0.5 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded"
                >
                  {method}
                </span>
              ))}
              {platform.paymentMethods.length > 3 && (
                <span className="text-xs px-2 py-0.5 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
                  +{platform.paymentMethods.length - 3}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
