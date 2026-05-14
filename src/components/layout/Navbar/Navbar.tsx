import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';

const navLinks = [
  { label: 'Empresa', href: '/empresa' },
  { label: 'Sectores', href: '/sectores' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Clientes', href: '/clientes' },
  { label: 'Contacto', href: '/contacto' },
];

export function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        <Image
          src="/logo.svg"
          alt="CentralClima"
          width={180}
          height={40}
          priority
        />
      </Link>

      <div className={styles.links}>
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </div>

      <Link href="/cotizar" className={styles.cta}>
        Cotizar <span>→</span>
      </Link>
    </nav>
  );
}
