import { z } from 'zod';

export const quoteSchema = z.object({
  nombre: z.string().min(2, 'Ingresa tu nombre completo'),
  empresa: z.string().min(2, 'Ingresa el nombre de tu empresa'),
  email: z.string().email('Ingresa un correo electrónico válido'),
  telefono: z
    .string()
    .min(8, 'Ingresa un teléfono válido')
    .regex(/^[\d\s+\-()]+$/, 'Formato de teléfono inválido'),
  tipoServicio: z.enum([
    'instalacion',
    'mantencion-preventiva',
    'mantencion-correctiva',
    'auditoria',
  ]),
  descripcion: z.string().min(10, 'Describe brevemente tu requerimiento (mínimo 10 caracteres)'),
  cantidadEquipos: z.number().int().positive().optional(),
});

export type QuoteInput = z.infer<typeof quoteSchema>;
