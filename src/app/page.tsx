import { Hero } from '@/components/home/Hero';
import { ProviderCarousel } from '@/components/home/ProviderCarousel';
import { PlatformVerifier } from '@/components/home/PlatformVerifier';
import { PromotionsList } from '@/components/home/PromotionsList';
import { ClaimsSection } from '@/components/home/ClaimsSection';
import { PlatformList } from '@/components/home/PlatformList';
import { Methodology } from '@/components/home/Methodology';
import { Values } from '@/components/home/Values';
import { ResponsibleGaming } from '@/components/home/ResponsibleGaming';
import { Newsletter } from '@/components/home/Newsletter';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProviderCarousel />
      <PlatformVerifier />
      <PromotionsList />
      <ClaimsSection />
      <PlatformList />
      <Methodology />
      <Values />
      <ResponsibleGaming />
      <Newsletter />
    </>
  );
}
