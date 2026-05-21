import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar/Navbar';
import { Footer } from '@/components/layout/Footer/Footer';
import { PagePlaceholder } from '@/components/ui/AnimatedPageSection/AnimatedPageSection';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Clientes — CentralClima',
};

export default function ClientesPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.inner}>
          <PagePlaceholder
            eyebrow="Clientes"
            title="Clientes"
            lede="Página en construcción."
            css={styles}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
