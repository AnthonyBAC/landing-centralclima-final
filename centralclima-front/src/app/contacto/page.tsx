import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar/Navbar';
import { Footer } from '@/components/layout/Footer/Footer';
import { PagePlaceholder } from '@/components/ui/AnimatedPageSection/AnimatedPageSection';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Contacto — CentralClima',
};

export default function ContactoPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.inner}>
          <PagePlaceholder
            eyebrow="Contacto"
            title="Contacto"
            lede="Página en construcción."
            css={styles}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
