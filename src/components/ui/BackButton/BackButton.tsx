import Link from 'next/link';
import styles from './BackButton.module.css';

interface BackButtonProps {
  href?: string;
  label?: string;
}

export function BackButton({ href = '/', label = 'Volver' }: BackButtonProps) {
  return (
    <Link href={href} className={styles.backBtn}>
      <span className={styles.arrow}>←</span>
      {label}
    </Link>
  );
}
