import { Hero } from '@/components/home/Hero';
import { ProviderCarousel } from '@/components/home/ProviderCarousel';
import { PlatformVerifier } from '@/components/home/PlatformVerifier';
import { Promotions } from '@/components/home/Promotions';
import { ClaimsSection } from '@/components/home/ClaimsSection';
import { PlatformGrid } from '@/components/home/PlatformGrid';
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
      <Promotions />
      <ClaimsSection />
      <PlatformGrid />
      <Methodology />
      <Values />
      <ResponsibleGaming />
      <Newsletter />
    </>
  );
}

function TestApi() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('/api/plataformas')
      .then(res => res.json())
      .then(setData)
      .catch(() => setData({error: 'falló'}));
  }, []);
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
