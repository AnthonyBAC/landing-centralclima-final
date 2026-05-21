import { Navbar } from '@/components/layout/Navbar/Navbar';
import { Footer } from '@/components/layout/Footer/Footer';
import { Hero } from '@/components/home/Hero/Hero';
import { Stats } from '@/components/home/Stats/Stats';
import { Clients } from '@/components/home/Clients/Clients';
import { Sectors } from '@/components/home/Sectors/Sectors';
import { Services } from '@/components/home/Services/Services';
import { Coverage } from '@/components/home/Coverage/Coverage';
import { Certifications } from '@/components/home/Certifications/Certifications';
import { Team } from '@/components/home/Team/Team';
import { FinalCta } from '@/components/home/FinalCta/FinalCta';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Clients />
        <Sectors />
        <Services />
        <Coverage />
        <Certifications />
        <Team />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
