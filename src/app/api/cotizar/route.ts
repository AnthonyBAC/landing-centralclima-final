import { NextRequest, NextResponse } from 'next/server';
import { quoteSchema } from '@/schemas/quoteSchema';

export async function POST(req: NextRequest) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, message: 'Cuerpo de la solicitud inválido' },
      { status: 400 }
    );
  }

  const result = quoteSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { success: false, message: 'Datos inválidos', errors: result.error.issues },
      { status: 422 }
    );
  }

  // TODO: guardar en base de datos cuando se defina el schema
  console.log('[cotizar] nueva solicitud:', result.data);

  return NextResponse.json(
    { success: true, message: 'Cotización recibida correctamente' },
    { status: 201 }
  );
}
