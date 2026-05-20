import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../../generated/prisma/client';
import { quoteSchema } from '../../../schemas/quoteSchema';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const resend = new Resend(process.env.RESEND_API_KEY);

const TIPO_LABEL: Record<string, string> = {
  instalacion: 'Instalación de aire acondicionado',
  'mantencion-preventiva': 'Mantención preventiva programada',
  'mantencion-correctiva': 'Mantención correctiva 24/7',
  auditoria: 'Auditoría y eficiencia energética',
};

async function generarNumeroCotizacion(): Promise<string> {
  const year = new Date().getFullYear();
  const rows = await prisma.$queryRaw<[{ nextval: bigint }]>`SELECT nextval('quote_secuencial_seq')`;
  return `CC-${year}-${Number(rows[0].nextval)}`;
}

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

  const data = result.data;
  const numero = await generarNumeroCotizacion();
  const tipoLabel = TIPO_LABEL[data.tipoServicio] ?? data.tipoServicio;
  const from = process.env.RESEND_FROM ?? 'CentralClima <onboarding@resend.dev>';
  const companyEmail = process.env.COMPANY_EMAIL ?? '';

  try {
    await prisma.quote.create({
      data: {
        numeroCotizacion: numero,
        nombre:           data.nombre,
        empresa:          data.empresa ?? null,
        email:            data.email || null,
        telefono:         data.telefono,
        tipoServicio:     data.tipoServicio,
        tipoEquipo:       data.tipoEquipo ?? null,
        cantidadEquipos:  data.cantidadEquipos ?? null,
        descripcion:      data.descripcion ?? null,
      },
    });
  } catch (err) {
    console.error('[cotizar] error guardando en BD:', err);
    return NextResponse.json(
      { success: false, message: 'Error al guardar la cotización. Intenta nuevamente.' },
      { status: 500 }
    );
  }

  const emailTargets: Promise<unknown>[] = [
    resend.emails.send({
      from,
      to: data.email,
      subject: `Cotización ${numero} recibida — CentralClima`,
      html: emailCliente({ ...data, numero, tipoLabel }),
    }),
  ];

  if (companyEmail) {
    emailTargets.push(
      resend.emails.send({
        from,
        to: companyEmail,
        subject: `Nueva cotización ${numero} — ${data.empresa ?? data.nombre}`,
        html: emailEmpresa({ ...data, numero, tipoLabel }),
      })
    );
  }

  const emailResults = await Promise.allSettled(emailTargets);
  emailResults.forEach((r, i) => {
    if (r.status === 'rejected') {
      console.error(`[cotizar] email[${i}] falló:`, r.reason);
    } else {
      console.log(`[cotizar] email[${i}] enviado:`, (r.value as { data?: { id?: string } })?.data?.id);
    }
  });

  return NextResponse.json(
    { success: true, message: 'Cotización recibida correctamente', data: { numero } },
    { status: 201 }
  );
}

// ── Templates ────────────────────────────────────────────────────────────────

interface EmailData {
  nombre: string;
  empresa?: string;
  email: string;
  telefono: string;
  tipoLabel: string;
  cantidadEquipos?: number;
  descripcion?: string;
  numero: string;
}

function emailCliente(d: EmailData): string {
  return `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F0F4F8;font-family:'Helvetica Neue',Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F0F4F8;padding:40px 0">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border:1px solid #C8D4E0">
        <tr>
          <td style="background:#003162;padding:28px 40px">
            <p style="margin:0;color:#fff;font-size:18px;font-weight:700;letter-spacing:-0.01em">CentralClima</p>
            <p style="margin:4px 0 0;color:rgba(255,255,255,0.6);font-size:11px;letter-spacing:0.18em;text-transform:uppercase">Climatización industrial · 14 años</p>
          </td>
        </tr>
        <tr>
          <td style="padding:40px">
            <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#4A6A8A">Cotización recibida</p>
            <h1 style="margin:0 0 24px;font-size:28px;color:#003162;line-height:1.1">${d.numero}</h1>
            <p style="margin:0 0 24px;font-size:16px;color:#003162;line-height:1.6">
              Hola ${d.nombre}, hemos recibido tu solicitud. Nuestro equipo revisará tu requerimiento
              y te contactará dentro de los próximos <strong>5 días hábiles</strong> con una propuesta detallada.
            </p>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #C8D4E0;margin-bottom:32px">
              <tr style="background:#F0F4F8">
                <td style="padding:10px 16px;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#4A6A8A;font-weight:600">Resumen de tu solicitud</td>
              </tr>
              ${d.empresa ? fila('Empresa', d.empresa) : ''}
              ${fila('Servicio', d.tipoLabel)}
              ${d.cantidadEquipos ? fila('N.º de equipos', String(d.cantidadEquipos)) : ''}
              ${d.descripcion ? fila('Descripción', d.descripcion) : ''}
            </table>
            <p style="margin:0;font-size:13px;color:#4A6A8A;line-height:1.55">
              Si tienes alguna consulta urgente puedes contactarnos directamente respondiendo este correo.
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 40px;border-top:1px solid #C8D4E0">
            <p style="margin:0;font-size:11px;color:#4A6A8A">© ${new Date().getFullYear()} CentralClima · Región Metropolitana</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function emailEmpresa(d: EmailData): string {
  return `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F0F4F8;font-family:'Helvetica Neue',Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F0F4F8;padding:40px 0">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border:1px solid #C8D4E0">
        <tr>
          <td style="background:#CD0000;padding:20px 40px">
            <p style="margin:0;color:#fff;font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase">Nueva cotización entrante</p>
          </td>
        </tr>
        <tr>
          <td style="padding:40px">
            <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#4A6A8A">Número</p>
            <h1 style="margin:0 0 32px;font-size:28px;color:#003162">${d.numero}</h1>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #C8D4E0">
              <tr style="background:#F0F4F8">
                <td style="padding:10px 16px;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#4A6A8A;font-weight:600">Datos del cliente</td>
              </tr>
              ${fila('Nombre', d.nombre)}
              ${d.empresa ? fila('Empresa', d.empresa) : ''}
              ${fila('Email', `<a href="mailto:${d.email}" style="color:#003162">${d.email}</a>`)}
              ${fila('Teléfono', `<a href="tel:${d.telefono}" style="color:#003162">${d.telefono}</a>`)}
              ${fila('Servicio', d.tipoLabel)}
              ${d.cantidadEquipos ? fila('N.º de equipos', String(d.cantidadEquipos)) : ''}
              ${d.descripcion ? fila('Descripción', d.descripcion) : ''}
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 40px;border-top:1px solid #C8D4E0">
            <p style="margin:0;font-size:11px;color:#4A6A8A">CentralClima · Sistema de cotizaciones</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function fila(label: string, value: string): string {
  return `
    <tr style="border-top:1px solid #C8D4E0">
      <td style="padding:10px 16px;font-size:12px;color:#4A6A8A;white-space:nowrap;vertical-align:top;width:140px">${label}</td>
      <td style="padding:10px 16px;font-size:13px;color:#003162;line-height:1.5">${value}</td>
    </tr>`;
}
