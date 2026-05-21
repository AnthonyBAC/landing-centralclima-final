import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar/Navbar';
import { Footer } from '@/components/layout/Footer/Footer';
import { CotizarContent } from './CotizarContent';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Solicitar cotización — CentralClima',
};

export default function CotizarPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.inner}>
          <CotizarContent css={styles} />
        </div>
      </main>
      <Footer />
    </>
  );
}
