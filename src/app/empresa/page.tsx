import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar/Navbar';
import { Footer } from '@/components/layout/Footer/Footer';
import { PagePlaceholder } from '@/components/ui/AnimatedPageSection/AnimatedPageSection';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Empresa — CentralClima',
};

export default function EmpresaPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.inner}>
          <PagePlaceholder
            eyebrow="Empresa"
            title="Nosotros"
            lede="Página en construcción."
            css={styles}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
