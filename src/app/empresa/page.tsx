import { Navbar } from '@/components/layout/Navbar/Navbar';
import { Footer } from '@/components/layout/Footer/Footer';
import { BackButton } from '@/components/ui/BackButton/BackButton';
import styles from './empresa.module.css';

export const metadata = {
  title: 'Empresa — CentralClima',
};

export default function EmpresaPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.inner}>
          <BackButton />
          <span className={styles.eyebrow}>Empresa</span>
          <h1 className={styles.title}>Nosotros</h1>
          <p className={styles.lede}>Página en construcción.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
