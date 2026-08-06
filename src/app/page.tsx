import { Hero } from '@/components/home/Hero';
import { ProviderCarousel } from '@/components/home/ProviderCarousel';
import { PlatformVerifier } from '@/components/home/PlatformVerifier';
import { PromotionsListList } from '@/components/home/PromotionsListList';
import { ClaimsSection } from '@/components/home/ClaimsSection';
import { PlatformGrid } from '@/components/home/PlatformGrid';
import { Methodology } from '@/components/home/Methodology';
import { Values } from '@/components/home/Values';
import { ResponsibleGaming } from '@/components/home/ResponsibleGaming';
import { Newsletter } from '@/components/home/Newsletter';

// Esto desactiva la caché de la página completa

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProviderCarousel />
      <PlatformVerifier />
      <PromotionsListList />
      <ClaimsSection />
      <PlatformGrid />
      <Methodology />
      <Values />
      <ResponsibleGaming />
      <Newsletter />
    </>
  );
}

export const revalidate = 0;
