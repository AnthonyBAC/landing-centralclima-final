'use client';

import { m, type Variants } from 'framer-motion';
import { COMUNAS_RM } from './comunas-rm';
import styles from './Coverage.module.css';

// Nombres exactos según el GeoJSON fuente (capitalización especial en tildes)
const HIGHLIGHTED = new Set([
  'Santiago', 'Providencia', 'Las Condes', 'Vitacura',
  'ñUñOa', 'La Reina', 'Macul', 'PeñAloléN', 'La Florida',
  'San JoaquíN', 'San Miguel', 'La Cisterna', 'El Bosque', 'La Granja',
  'La Pintana', 'San RamóN', 'Pedro Aguirre Cerda', 'Lo Espejo',
  'Cerrillos', 'Maipú', 'Pudahuel', 'Cerro Navia', 'Lo Prado',
  'EstacióN Central', 'Quinta Normal', 'Renca', 'Conchalí', 'Recoleta',
  'Independencia', 'Huechuraba', 'Quilicura', 'San Bernardo', 'Puente Alto',
]);

const cx = COMUNAS_RM.reduce((s, c) => s + c.cx, 0) / COMUNAS_RM.length;
const cy = COMUNAS_RM.reduce((s, c) => s + c.cy, 0) / COMUNAS_RM.length;

const sorted = COMUNAS_RM.toSorted((a, b) => {
  const da = (a.cx - cx) ** 2 + (a.cy - cy) ** 2;
  const db = (b.cx - cx) ** 2 + (b.cy - cy) ** 2;
  return da - db;
});

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const item: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: 'easeOut' as const } },
};

export function CoverageMap() {
  return (
    <m.svg
      viewBox="190 115 240 190"
      preserveAspectRatio="xMidYMid slice"
      className={styles.mapSvg}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      aria-label="Mapa de cobertura — Región Metropolitana de Santiago"
    >
      {sorted.map((c) => (
        <m.path
          key={c.nombre}
          d={c.path}
          className={
            HIGHLIGHTED.has(c.nombre) ? styles.communeHighlighted : styles.commune
          }
          variants={item}
        >
          <title>{c.nombre}</title>
        </m.path>
      ))}
    </m.svg>
  );
}
