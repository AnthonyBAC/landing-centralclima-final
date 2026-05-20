'use client';

import Link from 'next/link';
import { m } from 'framer-motion';
import type { Servicio } from '@/types';
import styles from './Services.module.css';

const servicios: Servicio[] = [
  {
    num: '01',
    titulo: 'Instalación de aire acondicionado',
    descripcion: 'Diseño térmico, especificación e instalación llave en mano.',
  },
  {
    num: '02',
    titulo: 'Mantención preventiva programada',
    descripcion: 'Planes anuales con visitas según criticidad del equipo.',
  },
  {
    num: '03',
    titulo: 'Mantención correctiva 24/7',
    descripcion: 'Respuesta de emergencia con SLA garantizado.',
  },
  {
    num: '04',
    titulo: 'Auditoría y eficiencia energética',
    descripcion: 'Diagnóstico energético y seguimiento de KPIs.',
  },
];

export function Services() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <m.div
          className={styles.left}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <span className={styles.eyebrow}>Servicios</span>
          <h2 className={styles.title}>Todo el ciclo de vida de tu sistema de climatización.</h2>
          <p className={styles.lede}>
            Desde el diseño y la instalación hasta la mantención correctiva y preventiva.
            Un solo proveedor, contrato simple.
          </p>
          <Link href="/servicios" className={styles.viewAll}>
            Ver todos los servicios &#8594;
          </Link>
        </m.div>

        <m.div
          className={styles.grid}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {servicios.map((servicio) => (
            <Link key={servicio.num} href="/servicios" className={styles.card}>
              <div>
                <div className={styles.cardNum}>{servicio.num}</div>
                <h4 className={styles.cardTitle}>{servicio.titulo}</h4>
              </div>
              <span className={styles.cardLink}>Conocer &#8594;</span>
            </Link>
          ))}
        </m.div>
      </div>
    </section>
  );
}
