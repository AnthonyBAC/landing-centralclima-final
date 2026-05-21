'use client';

import { Form, Input, Select, Button, Result } from 'antd';
import { useQuoteForm, showCantidadEquipos, showTipoEquipo } from './useQuoteForm';
import styles from './page.module.css';

const tiposServicio = [
  { value: 'instalacion', label: 'Instalación de aire acondicionado' },
  { value: 'mantencion-preventiva', label: 'Mantención preventiva' },
  { value: 'mantencion-correctiva', label: 'Mantención correctiva 24/7' },
  { value: 'auditoria', label: 'Auditoría y eficiencia energética' },
  { value: 'otros', label: 'Otros' },
];

const tiposEquipo = [
  { value: 'industrial', label: 'Industrial' },
  { value: 'hogar', label: 'Hogar' },
  { value: 'oficina', label: 'Oficina' },
];

export function QuoteForm() {
  const { values, errors, isPending, isSuccess, numeroCotizacion, handleChange, handleSubmit, reset } =
    useQuoteForm();

  const verEquipos = showCantidadEquipos(values.tipoServicio);
  const verTipoEquipo = showTipoEquipo(values.tipoServicio);

  if (isSuccess) {
    return (
      <Result
        status="success"
        title={numeroCotizacion ? `Cotización ${numeroCotizacion}` : 'Cotización recibida.'}
        subTitle="Te enviamos una confirmación a tu correo con el número de seguimiento. Nos pondremos en contacto dentro de los próximos 5 días hábiles con una propuesta detallada."
        extra={
          <Button type="link" onClick={reset}>
            ← Enviar otra cotización
          </Button>
        }
      />
    );
  }

  return (
    <Form layout="vertical" onFinish={handleSubmit} className={styles.form} requiredMark="optional">
      <div className={styles.row}>
        <Form.Item
          label="Nombre"
          required
          validateStatus={errors.nombre ? 'error' : undefined}
          help={errors.nombre}
        >
          <Input
            maxLength={30}
            value={values.nombre}
            onChange={(e) => handleChange('nombre', e.target.value)}
            placeholder="Juan Pérez"
          />
        </Form.Item>

        <Form.Item
          label="Empresa"
          validateStatus={errors.empresa ? 'error' : undefined}
          help={errors.empresa}
        >
          <Input
            maxLength={50}
            value={values.empresa ?? ''}
            onChange={(e) => handleChange('empresa', e.target.value)}
            placeholder="Razón social o nombre"
          />
        </Form.Item>
      </div>

      <div className={styles.row}>
        <Form.Item
          label="Correo electrónico"
          required
          validateStatus={errors.email ? 'error' : undefined}
          help={errors.email}
        >
          <Input
            type="email"
            maxLength={254}
            value={values.email ?? ''}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="correo@empresa.cl"
          />
        </Form.Item>

        <Form.Item
          label="Teléfono"
          required
          validateStatus={errors.telefono ? 'error' : undefined}
          help={errors.telefono}
        >
          <Input
            addonBefore="+56"
            maxLength={9}
            value={values.telefono.replace('+56', '')}
            onChange={(e) => {
              const raw = e.target.value.replace(/\D/g, '');
              const digits = raw.startsWith('56') && raw.length > 9 ? raw.slice(2) : raw;
              handleChange('telefono', '+56' + digits.slice(0, 9));
            }}
            placeholder="912345678"
          />
        </Form.Item>
      </div>

      <Form.Item
        label="Tipo de servicio"
        required
        validateStatus={errors.tipoServicio ? 'error' : undefined}
        help={errors.tipoServicio}
      >
        <Select
          value={values.tipoServicio || undefined}
          onChange={(value) => handleChange('tipoServicio', value)}
          placeholder="Selecciona un tipo de servicio…"
          options={tiposServicio}
        />
      </Form.Item>

      {(verTipoEquipo || verEquipos) && (
        <div className={styles.row}>
          {verTipoEquipo && (
            <Form.Item
              label="Tipo de equipo"
              validateStatus={errors.tipoEquipo ? 'error' : undefined}
              help={errors.tipoEquipo}
            >
              <Select
                value={values.tipoEquipo || undefined}
                onChange={(value) => handleChange('tipoEquipo', value || undefined)}
                placeholder="Seleccionar…"
                options={tiposEquipo}
                allowClear
              />
            </Form.Item>
          )}

          {verEquipos && (
            <Form.Item
              label="N.º de equipos"
              validateStatus={errors.cantidadEquipos ? 'error' : undefined}
              help={errors.cantidadEquipos}
            >
              <Input
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
                placeholder="Ej: 12"
              />
            </Form.Item>
          )}
        </div>
      )}

      <Form.Item
        label="Descripción del requerimiento"
        validateStatus={errors.descripcion ? 'error' : undefined}
        help={errors.descripcion}
      >
        <Input.TextArea
          value={values.descripcion ?? ''}
          onChange={(e) => handleChange('descripcion', e.target.value)}
          placeholder="Describe tu instalación actual, superficie, número de pisos, tipo de uso, etc."
          rows={4}
          maxLength={300}
          showCount
          style={{ resize: 'none' }}
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={isPending}
          size="large"
        >
          {isPending ? 'Enviando...' : 'Solicitar cotización →'}
        </Button>
      </Form.Item>
    </Form>
  );
}
