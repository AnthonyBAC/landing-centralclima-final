'use client';

import { useRouter } from 'next/navigation';
import styles from './BackButton.module.css';

interface BackButtonProps {
  label?: string;
}

export function BackButton({ label = 'Volver' }: BackButtonProps) {
  const router = useRouter();

  return (
    <button onClick={() => router.back()} className={styles.backBtn}>
      <span className={styles.arrow}>←</span>
      {label}
    </button>
  );
}
