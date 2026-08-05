'use client';

import Link from 'next/link';
import { AlertCircle, Clock, CheckCircle, XCircle } from 'lucide-react';

// Datos de ejemplo (puedes reemplazarlos con datos reales de tu API)
const mockClaims = [
  {
    id: '1',
    title: 'Retiro de 500€ bloqueado en Royal Casino',
    status: 'PENDING',
    platform: 'Royal Casino',
    user: 'Usuario123',
    date: '2024-03-14',
  },
  {
    id: '2',
    title: 'Bono de bienvenida no aplicado en Lucky Spin',
    status: 'REVIEWING',
    platform: 'Lucky Spin',
    user: 'Jugador456',
    date: '2024-03-13',
  },
  {
    id: '3',
    title: 'Cuenta bloqueada sin explicación en BetMaster',
    status: 'RESOLVED',
    platform: 'BetMaster Casino',
    user: 'Apostador789',
    date: '2024-03-12',
  },
];

export const RecentClaims = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'REVIEWING':
        return <AlertCircle className="w-4 h-4 text-blue-500" />;
      case 'RESOLVED':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'ARCHIVED':
        return <XCircle className="w-4 h-4 text-gray-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'Pendiente';
      case 'REVIEWING':
        return 'En revisión';
      case 'RESOLVED':
        return 'Resuelto';
      case 'ARCHIVED':
        return 'Archivado';
      default:
        return status;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          📋 Reclamos Recientes
        </h2>
        <Link href="/reclamos" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
          Ver todos →
        </Link>
      </div>

      <div className="space-y-3">
        {mockClaims.map((claim) => (
          <Link
            key={claim.id}
            href={`/reclamos/${claim.id}`}
            className="block p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">
                    {claim.title}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    {getStatusIcon(claim.status)}
                    {getStatusText(claim.status)}
                  </span>
                  <span>•</span>
                  <span>{claim.platform}</span>
                  <span>•</span>
                  <span>{claim.user}</span>
                  <span>•</span>
                  <span>{new Date(claim.date).toLocaleDateString('es-ES')}</span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                  #{claim.id}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
