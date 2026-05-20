'use client';

import { m } from 'framer-motion';
import type { CoverageRegion } from '@/types';
import { CoverageMap } from './CoverageMap';
import styles from './Coverage.module.css';

const comunas: CoverageRegion[] = [
  { nombre: 'Las Condes' },
  { nombre: 'Vitacura' },
  { nombre: 'Providencia' },
  { nombre: 'Santiago' },
  { nombre: 'Ñuñoa' },
  { nombre: 'La Reina' },
  { nombre: 'Maipú' },
  { nombre: 'San Bernardo' },
  { nombre: 'Quilicura' },
  { nombre: 'Puente Alto' },
  { nombre: 'Pudahuel' },
  { nombre: '+ 21 comunas' },
];

export function Coverage() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <m.div
          className={styles.mapWrap}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <CoverageMap />
        </m.div>

        <m.div
          className={styles.right}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className={styles.eyebrow}>Cobertura</span>
          <h2 className={styles.title}>
            Toda la Región Metropolitana, sin sub-contratos.
          </h2>
          <p className={styles.lede}>
            Equipos técnicos propios distribuidos en 32 comunas.
            Tiempos de respuesta garantizados por SLA.
          </p>
          <div className={styles.comunasList}>
            {comunas.map((c) => (
              <span key={c.nombre}>{c.nombre}</span>
            ))}
          </div>
        </m.div>
      </div>
    </section>
  );
}
