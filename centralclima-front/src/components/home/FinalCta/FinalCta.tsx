'use client';

import Link from 'next/link';
import { m } from 'framer-motion';
import styles from './FinalCta.module.css';

export function FinalCta() {
  return (
    <section className={styles.section} id="cotizar">
      <m.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
      >
        <span className={styles.eyebrow}>Cotización</span>
        <h2 className={styles.title}>Conversemos sobre tu operación.</h2>
        <p className={styles.description}>
          Revisamos tu sistema actual y entregamos una propuesta de mantención o instalación
          en menos de 5 días hábiles.
        </p>
        <Link href="/cotizar" className={styles.cta}>
          Solicitar cotización <span>&#8594;</span>
        </Link>
      </m.div>
    </section>
  );
}
