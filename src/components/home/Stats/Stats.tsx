'use client';

import { m } from 'framer-motion';
import type { Stat } from '@/types';
import styles from './Stats.module.css';

const stats: Stat[] = [
  { num: '14+', label: 'Años de experiencia' },
  { num: '2.400', label: 'Equipos en mantención' },
  { num: '32', label: 'Comunas con cobertura' },
  { num: '24/7', label: 'Respuesta de emergencia' },
];

export function Stats() {
  return (
    <div className={styles.statsGrid}>
      {stats.map((stat, i) => (
        <m.div
          key={stat.label}
          className={styles.stat}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
        >
          <div className={styles.num}>{stat.num}</div>
          <div className={styles.label}>{stat.label}</div>
        </m.div>
      ))}
    </div>
  );
}
