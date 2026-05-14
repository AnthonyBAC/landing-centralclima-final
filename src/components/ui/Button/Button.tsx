import Link from 'next/link';
import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'ghost';
  size?: 'default' | 'sm';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
}

export function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'default',
  type = 'button',
  disabled = false,
  className = '',
}: ButtonProps) {
  const baseClass = variant === 'ghost' ? styles.btnGhost : styles.btn;
  const sizeClass = size === 'sm' ? styles.sm : '';
  const disabledClass = disabled ? styles.disabled : '';
  const classes = [baseClass, sizeClass, disabledClass, className].filter(Boolean).join(' ');

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
