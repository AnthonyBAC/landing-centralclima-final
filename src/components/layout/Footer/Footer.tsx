import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer>
      <div className={styles.footer}>
        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            <Image
              src="/logo.svg"
              alt="CentralClima"
              width={160}
              height={36}
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </Link>
          <p className={styles.lede}>
            Climatización para empresas, industrias y hogares en la Región Metropolitana.
          </p>
        </div>

        <div>
          <h5>Empresa</h5>
          <ul>
            <li><Link href="/empresa">Nosotros</Link></li>
            <li><Link href="/empresa">Equipo</Link></li>
            <li><Link href="/empresa">Trabaja con nosotros</Link></li>
          </ul>
        </div>

        <div>
          <h5>Servicios</h5>
          <ul>
            <li><Link href="/servicios">Instalación</Link></li>
            <li><Link href="/servicios">Mantención preventiva</Link></li>
            <li><Link href="/servicios">Mantención correctiva</Link></li>
            <li><Link href="/servicios">Auditoría energética</Link></li>
          </ul>
        </div>

        <div>
          <h5>Contacto</h5>
          <ul>
            <li><a href="mailto:contacto@centralclima.cl">contacto@centralclima.cl</a></li>
            <li>+56 9 0000 0000</li>
            <li>Santiago, Chile</li>
          </ul>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <span>© 2026 CentralClima Spa</span>
        <span>Región Metropolitana, Chile</span>
      </div>
    </footer>
  );
}
