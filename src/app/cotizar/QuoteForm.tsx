'use client';

import { CheckCircle } from 'lucide-react';
import { useQuoteForm } from '@/hooks/useQuoteForm';
import styles from './cotizar.module.css';

const tiposServicio = [
  { value: 'instalacion', label: 'Instalación de aire acondicionado' },
  { value: 'mantencion-preventiva', label: 'Mantención preventiva' },
  { value: 'mantencion-correctiva', label: 'Mantención correctiva 24/7' },
  { value: 'auditoria', label: 'Auditoría y eficiencia energética' },
] as const;

export function QuoteForm() {
  const { values, errors, isPending, isSuccess, handleChange, handleSubmit, reset } =
    useQuoteForm();

  if (isSuccess) {
    return (
      <div className={styles.success}>
        <CheckCircle className={styles.successIcon} strokeWidth={1.5} />
        <h2 className={styles.successTitle}>Cotización recibida.</h2>
        <p className={styles.successText}>
          Nos pondremos en contacto contigo dentro de los próximos 5 días hábiles con una
          propuesta detallada para tu operación.
        </p>
        <div className={styles.divider} />
        <button type="button" className={styles.successBack} onClick={reset}>
          ← Enviar otra cotización
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="nombre" className={styles.label}>
            Nombre <span className={styles.required}>*</span>
          </label>
          <input
            id="nombre"
            type="text"
            autoComplete="name"
            value={values.nombre}
            onChange={(e) => handleChange('nombre', e.target.value)}
            className={`${styles.input} ${errors.nombre ? styles.inputError : ''}`}
            placeholder="Juan Pérez"
          />
          {errors.nombre && <span className={styles.error}>{errors.nombre}</span>}
        </div>

        <div className={styles.field}>
          <label htmlFor="empresa" className={styles.label}>
            Empresa <span className={styles.required}>*</span>
          </label>
          <input
            id="empresa"
            type="text"
            autoComplete="organization"
            value={values.empresa}
            onChange={(e) => handleChange('empresa', e.target.value)}
            className={`${styles.input} ${errors.empresa ? styles.inputError : ''}`}
            placeholder="Razón social o nombre"
          />
          {errors.empresa && <span className={styles.error}>{errors.empresa}</span>}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>
            Correo electrónico <span className={styles.required}>*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
            placeholder="correo@empresa.cl"
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </div>

        <div className={styles.field}>
          <label htmlFor="telefono" className={styles.label}>
            Teléfono <span className={styles.required}>*</span>
          </label>
          <input
            id="telefono"
            type="tel"
            autoComplete="tel"
            value={values.telefono}
            onChange={(e) => handleChange('telefono', e.target.value)}
            className={`${styles.input} ${errors.telefono ? styles.inputError : ''}`}
            placeholder="+56 9 0000 0000"
          />
          {errors.telefono && <span className={styles.error}>{errors.telefono}</span>}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="tipoServicio" className={styles.label}>
            Tipo de servicio <span className={styles.required}>*</span>
          </label>
          <select
            id="tipoServicio"
            value={values.tipoServicio}
            onChange={(e) => handleChange('tipoServicio', e.target.value)}
            className={`${styles.select} ${errors.tipoServicio ? styles.inputError : ''}`}
          >
            {tiposServicio.map((tipo) => (
              <option key={tipo.value} value={tipo.value}>
                {tipo.label}
              </option>
            ))}
          </select>
          {errors.tipoServicio && <span className={styles.error}>{errors.tipoServicio}</span>}
        </div>

        <div className={styles.field}>
          <label htmlFor="cantidadEquipos" className={styles.label}>
            N.º de equipos <span style={{ color: 'var(--muted)' }}>(opcional)</span>
          </label>
          <input
            id="cantidadEquipos"
            type="number"
            min={1}
            value={values.cantidadEquipos ?? ''}
            onChange={(e) =>
              handleChange(
                'cantidadEquipos',
                e.target.value ? Number(e.target.value) : (undefined as unknown as number)
              )
            }
            className={styles.input}
            placeholder="Ej: 12"
          />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="descripcion" className={styles.label}>
          Descripción del requerimiento <span className={styles.required}>*</span>
        </label>
        <textarea
          id="descripcion"
          value={values.descripcion}
          onChange={(e) => handleChange('descripcion', e.target.value)}
          className={`${styles.textarea} ${errors.descripcion ? styles.inputError : ''}`}
          placeholder="Describe tu instalación actual, superficie, número de pisos, tipo de uso, etc."
        />
        {errors.descripcion && <span className={styles.error}>{errors.descripcion}</span>}
      </div>

      <div className={styles.submitRow}>
        <button type="submit" disabled={isPending} className={styles.submitBtn}>
          {isPending ? 'Enviando...' : 'Solicitar cotización'}
          {!isPending && <span>→</span>}
        </button>
        {isPending && <span className={styles.loadingText}>Procesando...</span>}
      </div>
    </form>
  );
}
