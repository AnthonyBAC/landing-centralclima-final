import styles from './Certifications.module.css';

interface Certificacion {
  nombre: string;
}

const certificaciones: Certificacion[] = [
  { nombre: 'ISO 9001' },
  { nombre: 'ISO 14001' },
  { nombre: 'ISO 45001' },
  { nombre: 'SEC · Cl. A' },
  { nombre: 'Mutual' },
];

export function Certifications() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <div>
            <span className={styles.eyebrow}>Certificaciones · SLA · Seguridad</span>
            <h2 className={styles.title}>Cumplimiento que tu compliance ya conoce.</h2>
          </div>
          <button type="button" className={styles.downloadBtn}>
            Descargar fichas →
          </button>
        </div>

        <div className={styles.listWrapper}>
          <ol className={styles.list}>
            {certificaciones.map((cert, i) => (
              <li key={cert.nombre} className={styles.item}>
                <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.name}>{cert.nombre}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
