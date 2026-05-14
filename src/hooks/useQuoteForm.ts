'use client';

import { useState, useTransition } from 'react';
import { quoteSchema, type QuoteInput } from '@/schemas/quoteSchema';
import { submitQuote } from '@/proxy/quoteProxy';

type FormErrors = Partial<Record<keyof QuoteInput, string>>;

interface UseQuoteFormReturn {
  values: QuoteInput;
  errors: FormErrors;
  isPending: boolean;
  isSuccess: boolean;
  handleChange: (field: keyof QuoteInput, value: string | number) => void;
  handleSubmit: (e: React.FormEvent) => void;
  reset: () => void;
}

const defaultValues: QuoteInput = {
  nombre: '',
  empresa: '',
  email: '',
  telefono: '',
  tipoServicio: 'instalacion',
  descripcion: '',
  cantidadEquipos: undefined,
};

export function useQuoteForm(): UseQuoteFormReturn {
  const [values, setValues] = useState<QuoteInput>(defaultValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleChange = (field: keyof QuoteInput, value: string | number) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = quoteSchema.safeParse(values);

    if (!result.success) {
      const fieldErrors: FormErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof QuoteInput;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    startTransition(async () => {
      try {
        await submitQuote(result.data);
        setIsSuccess(true);
        setValues(defaultValues);
      } catch (err) {
        setErrors({ descripcion: (err as Error).message });
      }
    });
  };

  const reset = () => {
    setValues(defaultValues);
    setErrors({});
    setIsSuccess(false);
  };

  return { values, errors, isPending, isSuccess, handleChange, handleSubmit, reset };
}
