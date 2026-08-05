import { Hero } from '@/components/home/Hero';
import { LatestNews } from '@/components/home/LatestNews';
import { TrustedCasinos } from '@/components/home/TrustedCasinos';
import { UnderInvestigation } from '@/components/home/UnderInvestigation';
import { RecentClaims } from '@/components/home/RecentClaims';
import { PromotionsWidget } from '@/components/home/PromotionsWidget';
import { RankingWidget } from '@/components/home/RankingWidget';
import { NewsletterSignup } from '@/components/home/NewsletterSignup';

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <LatestNews />
            <RecentClaims />
            <TrustedCasinos />
            <UnderInvestigation />
          </div>
          <aside className="space-y-6">
            <RankingWidget />
            <PromotionsWidget />
            <NewsletterSignup />
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-800">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">📊 Estadísticas</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Plataformas analizadas</span>
                  <span className="font-semibold text-gray-900 dark:text-white">24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Reclamos resueltos</span>
                  <span className="font-semibold text-green-600">89%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Puntuación promedio</span>
                  <span className="font-semibold text-gray-900 dark:text-white">84%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Usuarios activos</span>
                  <span className="font-semibold text-gray-900 dark:text-white">1,247</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
