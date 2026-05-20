'use client';

import type { ElementType } from 'react';
import Link from 'next/link';
import { m } from 'framer-motion';
import { Factory, Store, Building2 } from 'lucide-react';
import type { Sector } from '@/types';
import styles from './Sectors.module.css';

const sectores: (Sector & { icon: ElementType })[] = [
  {
    id: 'industrial',
    eyebrow: '01 · Industrial',
    titulo: 'Industrial',
    descripcion:
      'Plantas productivas, bodegas, frigoríficos. Diseño térmico, mantención predictiva y respuesta de emergencia 24/7.',
    items: [],
    icon: Factory,
  },
  {
    id: 'retail',
    eyebrow: '02 · Retail y Comercial',
    titulo: 'Retail y Comercial',
    descripcion:
      'Locales, sucursales, malls. Planes multi-sitio con SLA y reporte centralizado para cadenas de cualquier tamaño.',
    items: [],
    icon: Store,
  },
  {
    id: 'corporativo',
    eyebrow: '03 · Corporativo y Oficinas',
    titulo: 'Corporativo y Oficinas',
    descripcion:
      'Edificios, data centers, salas críticas. Climatización de precisión y eficiencia energética medida por zona.',
    items: [],
    icon: Building2,
  },
];

export function Sectors() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>Sectores</span>
        <h2 className={styles.title}>
          Soluciones según el tamaño y exigencia de tu operación.
        </h2>
      </div>

      <div className={styles.grid}>
        {sectores.map((sector, i) => (
          <m.div
            key={sector.id}
            className={styles.card}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className={styles.iconWrap} aria-hidden="true">
              <sector.icon size={24} strokeWidth={1.5} />
            </div>
            <h3 className={styles.cardTitle}>{sector.titulo}</h3>
            <p className={styles.cardDesc}>{sector.descripcion}</p>
            <Link href="/sectores" className={styles.cardLink}>
              Conocer &#8594;
            </Link>
          </m.div>
        ))}
      </div>
    </section>
  );
}
