'use client';

import { m } from 'framer-motion';
import { BackButton } from '@/components/ui/BackButton/BackButton';

interface PagePlaceholderProps {
  eyebrow: string;
  title: string;
  lede: string;
  backLabel?: string;
  css: Record<string, string>;
}

export function PagePlaceholder({ eyebrow, title, lede, backLabel, css }: PagePlaceholderProps) {
  return (
    <>
      <m.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <BackButton label={backLabel} />
      </m.div>
      <m.span
        className={css.eyebrow}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        {eyebrow}
      </m.span>
      <m.h1
        className={css.title}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {title}
      </m.h1>
      <m.p
        className={css.lede}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {lede}
      </m.p>
    </>
  );
}
