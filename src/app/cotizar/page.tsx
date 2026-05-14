import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar/Navbar';
import { Footer } from '@/components/layout/Footer/Footer';
import { BackButton } from '@/components/ui/BackButton/BackButton';
import { QuoteForm } from './QuoteForm';
import styles from './cotizar.module.css';

export const metadata: Metadata = {
  title: 'Solicitar cotización — CentralClima',
};

export default function CotizarPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.inner}>
          <BackButton />
          <div className={styles.header}>
            <span className={styles.eyebrow}>Cotización</span>
            <h1 className={styles.title}>Solicita tu cotización.</h1>
            <p className={styles.lede}>
              Completa el formulario y nuestro equipo te entregará una propuesta en menos
              de 5 días hábiles.
            </p>
          </div>
          <QuoteForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
