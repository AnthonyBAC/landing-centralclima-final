import Link from 'next/link';
import type { Cliente } from '@/types';
import styles from './Clients.module.css';

const clientes: Cliente[] = [
  { nombre: 'CCU' },
  { nombre: 'Andina' },
  { nombre: 'Falabella' },
  { nombre: 'Sodimac' },
  { nombre: 'Cencosud' },
  { nombre: 'Walmart' },
  { nombre: 'Latam' },
  { nombre: 'Codelco' },
  { nombre: 'Entel' },
  { nombre: 'Clínica RM' },
  { nombre: 'UC' },
  { nombre: '+ 80 más' },
];

export function Clients() {
  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <div>
          <span className={styles.eyebrow}>Clientes</span>
          <h2 className={styles.title}>Empresas que ya confían en nosotros.</h2>
        </div>
        <Link href="/clientes" className={styles.viewAll}>
          Ver clientes →
        </Link>
      </div>

      <div className={styles.listWrapper}>
        <ol className={styles.list}>
          {clientes.map((cliente, i) => (
            <li key={cliente.nombre} className={styles.item}>
              <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
              <span className={styles.name}>{cliente.nombre}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
