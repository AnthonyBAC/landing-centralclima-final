'use client';

import { m } from 'framer-motion';
import { BackButton } from '@/components/ui/BackButton/BackButton';
import { QuoteForm } from './QuoteForm';

interface CotizarContentProps {
  css: Record<string, string>;
}

export function CotizarContent({ css }: CotizarContentProps) {
  return (
    <>
      <m.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <BackButton />
      </m.div>

      <div className={css.header}>
        <m.span
          className={css.eyebrow}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          Cotización
        </m.span>
        <m.h1
          className={css.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Solicita tu cotización.
        </m.h1>
        <m.p
          className={css.lede}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Completa el formulario y nuestro equipo te entregará una propuesta en menos
          de 5 días hábiles.
        </m.p>
      </div>

      <m.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <QuoteForm />
      </m.div>
    </>
  );
}
