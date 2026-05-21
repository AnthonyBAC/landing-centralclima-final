'use client';

import { useRouter } from 'next/navigation';
import styles from './BackButton.module.css';

interface BackButtonProps {
  label?: string;
}

export function BackButton({ label = 'Volver' }: BackButtonProps) {
  const { back } = useRouter();

  return (
    <button onClick={() => back()} className={styles.backBtn}>
      <span className={styles.arrow}>←</span>
      {label}
    </button>
  );
}
