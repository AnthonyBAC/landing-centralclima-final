'use client';

import Link from 'next/link';
import { m } from 'framer-motion';
import styles from './Hero.module.css';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <div className={styles.heroWrapper}>
      <header className={styles.hero}>
        <m.span
          className={styles.eyebrow}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Climatización industrial · 14 años
        </m.span>

        <m.h1
          className={styles.title}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Climatización perfecta<br />para cada espacio.
        </m.h1>

        <m.p
          className={styles.subtitle}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Instalación y mantención de aire acondicionado para empresas, industrias y hogares.
          Cobertura completa en la Región Metropolitana.
        </m.p>

        <m.div
          className={styles.ctaRow}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link href="/cotizar" className={styles.btn}>
            Solicitar cotización <span>&#8594;</span>
          </Link>
          <Link href="/servicios" className={styles.btnGhost}>
            Ver servicios
          </Link>
        </m.div>
      </header>

      {/* Contenedor con padding en todos los lados — apto para foto o video */}
      <m.div
        className={styles.mediaWrapper}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className={styles.photoPlaceholder}>
          <span className={styles.photoLabel}>Foto / Video · planta industrial / sala de máquinas</span>
        </div>
      </m.div>
    </div>
  );
}
