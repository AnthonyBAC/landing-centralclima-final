import { z } from 'zod';

export const quoteSchema = z.object({
  nombre: z.string().min(2, 'Ingresa tu nombre completo').max(30, 'Máximo 30 caracteres'),
  empresa: z.string().max(50, 'Máximo 50 caracteres').optional(),
  email: z
    .string()
    .max(254, 'Correo demasiado largo')
    .email('Ingresa un correo electrónico válido')
    .refine(
      (v) => /\.[a-zA-Z]{2,}$/.test(v),
      'Ingresa un correo con dominio válido (ej: nombre@empresa.com)'
    ),
  telefono: z
    .string()
    .regex(/^\+56\d{9}$/, 'Ingresa los 9 dígitos de tu teléfono'),
  tipoServicio: z.enum([
    'instalacion',
    'mantencion-preventiva',
    'mantencion-correctiva',
    'auditoria',
    'otros',
  ]),
  tipoEquipo: z.enum(['industrial', 'hogar', 'oficina']).optional(),
  cantidadEquipos: z.number().int().min(1).max(999).optional(),
  descripcion: z.string().max(300, 'Máximo 300 caracteres').optional(),
});

export type QuoteInput = z.infer<typeof quoteSchema>;
