'use client';

import { m } from 'framer-motion';
import styles from './Team.module.css';

export function Team() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <m.div
          className={styles.photoPlaceholder}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.photoLabel}>Foto · equipo técnico en terreno</span>
        </m.div>

        <m.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <span className={styles.eyebrow}>Nosotros</span>
          <h2 className={styles.title}>
            Una empresa chilena especializada, sin intermediarios.
          </h2>
          <p className={styles.lede}>
            CentralClima Spa nació en 2012 con un equipo técnico propio. Hoy mantenemos
            climatización para algunas de las empresas más grandes del país, con la misma
            cercanía con la que empezamos.
          </p>
          <p className={styles.signoff}>Fundador y equipo técnico</p>
        </m.div>
      </div>
    </section>
  );
}
