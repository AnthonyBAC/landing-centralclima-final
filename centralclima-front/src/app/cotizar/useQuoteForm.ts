'use client';

import { useState, useTransition } from 'react';
import { quoteSchema, type QuoteInput } from '@/schemas/quoteSchema';
import { submitQuote } from './quoteProxy';

type FormErrors = Partial<Record<keyof QuoteInput, string>>;

const MUESTRA_EQUIPOS = ['instalacion', 'mantencion-preventiva', 'mantencion-correctiva'] as const;
const MUESTRA_TIPO_EQUIPO = ['instalacion', 'mantencion-preventiva', 'mantencion-correctiva'] as const;

export function showCantidadEquipos(tipo: string) {
  return MUESTRA_EQUIPOS.includes(tipo as (typeof MUESTRA_EQUIPOS)[number]);
}

export function showTipoEquipo(tipo: string) {
  return MUESTRA_TIPO_EQUIPO.includes(tipo as (typeof MUESTRA_TIPO_EQUIPO)[number]);
}

interface UseQuoteFormReturn {
  values: QuoteInput;
  errors: FormErrors;
  isPending: boolean;
  isSuccess: boolean;
  numeroCotizacion: string;
  handleChange: (field: keyof QuoteInput, value: string | number | undefined) => void;
  handleSubmit: (e: React.FormEvent) => void;
  reset: () => void;
}

const defaultValues: QuoteInput = {
  nombre: '',
  empresa: '',
  email: '',
  telefono: '',
  tipoServicio: '' as QuoteInput['tipoServicio'],
  tipoEquipo: undefined,
  cantidadEquipos: undefined,
  descripcion: '',
};

export function useQuoteForm(): UseQuoteFormReturn {
  const [values, setValues] = useState<QuoteInput>(defaultValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [numeroCotizacion, setNumeroCotizacion] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleChange = (field: keyof QuoteInput, value: string | number | undefined) => {
    setValues((prev) => {
      const next = { ...prev, [field]: value };
      // Limpiar campos condicionales cuando cambia tipoServicio
      if (field === 'tipoServicio' && typeof value === 'string') {
        if (!showCantidadEquipos(value)) next.cantidadEquipos = undefined;
        if (!showTipoEquipo(value)) next.tipoEquipo = undefined;
      }
      return next;
    });
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!values.tipoServicio) {
      setErrors({ tipoServicio: 'Selecciona un tipo de servicio' });
      return;
    }

    const result = quoteSchema.safeParse(values);

    if (!result.success) {
      const fieldErrors: FormErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof QuoteInput;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    startTransition(async () => {
      try {
        const numero = await submitQuote(result.data);
        setNumeroCotizacion(numero);
        setIsSuccess(true);
        setValues(defaultValues);
      } catch (err) {
        setErrors({ nombre: (err as Error).message });
      }
    });
  };

  const reset = () => {
    setValues(defaultValues);
    setErrors({});
    setIsSuccess(false);
    setNumeroCotizacion('');
  };

  return { values, errors, isPending, isSuccess, numeroCotizacion, handleChange, handleSubmit, reset };
}
