import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar/Navbar';
import { Footer } from '@/components/layout/Footer/Footer';
import { BackButton } from '@/components/ui/BackButton/BackButton';
import styles from '@/styles/page.module.css';

export const metadata: Metadata = {
  title: 'Servicios — CentralClima',
};

export default function ServiciosPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.inner}>
          <BackButton />
          <span className={styles.eyebrow}>Servicios</span>
          <h1 className={styles.title}>Servicios</h1>
          <p className={styles.lede}>Página en construcción.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
