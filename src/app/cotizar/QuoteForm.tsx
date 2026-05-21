'use client';

import { CheckCircle } from 'lucide-react';
import { useQuoteForm, showCantidadEquipos, showTipoEquipo } from './useQuoteForm';
import styles from './page.module.css';

const tiposServicio = [
  { value: 'instalacion',           label: 'Instalación de aire acondicionado' },
  { value: 'mantencion-preventiva', label: 'Mantención preventiva' },
  { value: 'mantencion-correctiva', label: 'Mantención correctiva 24/7' },
  { value: 'auditoria',             label: 'Auditoría y eficiencia energética' },
  { value: 'otros',                 label: 'Otros' },
];

const tiposEquipo = [
  { value: 'industrial', label: 'Industrial' },
  { value: 'hogar',      label: 'Hogar' },
  { value: 'oficina',    label: 'Oficina' },
];

export function QuoteForm() {
  const { values, errors, isPending, isSuccess, numeroCotizacion, handleChange, handleSubmit, reset } =
    useQuoteForm();

  const verEquipos   = showCantidadEquipos(values.tipoServicio);
  const verTipoEquipo = showTipoEquipo(values.tipoServicio);

  if (isSuccess) {
    return (
      <div className={styles.success}>
        <CheckCircle className={styles.successIcon} strokeWidth={1.5} />
        {numeroCotizacion && <p className={styles.successNumero}>{numeroCotizacion}</p>}
        <h2 className={styles.successTitle}>Cotización recibida.</h2>
        <p className={styles.successText}>
          Te enviamos una confirmación a tu correo con el número de seguimiento.
          Nos pondremos en contacto dentro de los próximos 5 días hábiles con una
          propuesta detallada.
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

      {/* Nombre + Empresa */}
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="nombre" className={styles.label}>
            Nombre <span className={styles.required}>*</span>
          </label>
          <input
            id="nombre"
            type="text"
            autoComplete="name"
            maxLength={30}
            value={values.nombre}
            onChange={(e) => handleChange('nombre', e.target.value)}
            className={`${styles.input} ${errors.nombre ? styles.inputError : ''}`}
            placeholder="Juan Pérez"
          />
          {errors.nombre && <span className={styles.error}>{errors.nombre}</span>}
        </div>

        <div className={styles.field}>
          <label htmlFor="empresa" className={styles.label}>
            Empresa <span className={styles.optional}>(opcional)</span>
          </label>
          <input
            id="empresa"
            type="text"
            autoComplete="organization"
            maxLength={50}
            value={values.empresa ?? ''}
            onChange={(e) => handleChange('empresa', e.target.value)}
            className={`${styles.input} ${errors.empresa ? styles.inputError : ''}`}
            placeholder="Razón social o nombre"
          />
          {errors.empresa && <span className={styles.error}>{errors.empresa}</span>}
        </div>
      </div>

      {/* Email + Teléfono */}
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>
            Correo electrónico <span className={styles.required}>*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            maxLength={254}
            value={values.email ?? ''}
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
          <div className={styles.phoneWrap} data-error={!!errors.telefono}>
            <span className={styles.phonePrefix}>+56</span>
            <input
              id="telefono"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              maxLength={9}
              value={values.telefono.replace('+56', '')}
              onChange={(e) => {
                const raw = e.target.value.replace(/\D/g, '');
                const digits = raw.startsWith('56') && raw.length > 9 ? raw.slice(2) : raw;
                handleChange('telefono', '+56' + digits.slice(0, 9));
              }}
              className={styles.phoneInput}
              placeholder="912345678"
            />
          </div>
          {errors.telefono && <span className={styles.error}>{errors.telefono}</span>}
        </div>
      </div>

      {/* Tipo de servicio */}
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
          <option value="" disabled>Selecciona un tipo de servicio…</option>
          {tiposServicio.map((tipo) => (
            <option key={tipo.value} value={tipo.value}>{tipo.label}</option>
          ))}
        </select>
        {errors.tipoServicio && <span className={styles.error}>{errors.tipoServicio}</span>}
      </div>

      {/* Campos condicionales */}
      {(verTipoEquipo || verEquipos) && (
        <div className={styles.row}>
          {verTipoEquipo && (
            <div className={styles.field}>
              <label htmlFor="tipoEquipo" className={styles.label}>
                Tipo de equipo <span className={styles.optional}>(opcional)</span>
              </label>
              <select
                id="tipoEquipo"
                value={values.tipoEquipo ?? ''}
                onChange={(e) => handleChange('tipoEquipo', e.target.value || undefined)}
                className={`${styles.select} ${errors.tipoEquipo ? styles.inputError : ''}`}
              >
                <option value="">Seleccionar…</option>
                {tiposEquipo.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
              {errors.tipoEquipo && <span className={styles.error}>{errors.tipoEquipo}</span>}
            </div>
          )}

          {verEquipos && (
            <div className={styles.field}>
              <label htmlFor="cantidadEquipos" className={styles.label}>
                N.º de equipos <span className={styles.optional}>(opcional)</span>
              </label>
              <input
                id="cantidadEquipos"
                type="number"
                min={1}
                max={999}
                value={values.cantidadEquipos ?? ''}
                onChange={(e) =>
                  handleChange(
                    'cantidadEquipos',
                    e.target.value ? Math.min(999, Number(e.target.value)) : undefined
                  )
                }
                className={`${styles.input} ${errors.cantidadEquipos ? styles.inputError : ''}`}
                placeholder="Ej: 12"
              />
              {errors.cantidadEquipos && <span className={styles.error}>{errors.cantidadEquipos}</span>}
            </div>
          )}
        </div>
      )}

      {/* Descripción */}
      <div className={styles.field}>
        <label htmlFor="descripcion" className={styles.label}>
          Descripción del requerimiento <span className={styles.optional}>(opcional)</span>
        </label>
        <textarea
          id="descripcion"
          maxLength={300}
          value={values.descripcion ?? ''}
          onChange={(e) => handleChange('descripcion', e.target.value)}
          className={`${styles.textarea} ${errors.descripcion ? styles.inputError : ''}`}
          placeholder="Describe tu instalación actual, superficie, número de pisos, tipo de uso, etc."
        />
        <div className={styles.fieldFooter}>
          {errors.descripcion
            ? <span className={styles.error}>{errors.descripcion}</span>
            : <span />}
          <span className={`${styles.counter} ${(values.descripcion?.length ?? 0) >= 300 ? styles.counterLimit : ''}`}>
            {values.descripcion?.length ?? 0} / 300
          </span>
        </div>
      </div>

      <div className={styles.submitRow}>
        <button type="submit" disabled={isPending} className={styles.submitBtn}>
          {isPending ? 'Enviando...' : 'Solicitar cotización'}
          {!isPending && <span>→</span>}
        </button>
      </div>
    </form>
  );
}
