import type { QuoteInput } from '@/schemas/quoteSchema';

interface QuoteResponse {
  success: boolean;
  message: string;
  data?: { numero: string };
}

export async function submitQuote(data: QuoteInput): Promise<string> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, '');

  if (!backendUrl) {
    throw new Error('Falta configurar NEXT_PUBLIC_BACKEND_URL');
  }

  const res = await fetch(`${backendUrl}/api/cotizar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const json: QuoteResponse = await res.json();

  if (!res.ok) {
    throw new Error(json.message ?? 'Error al enviar la cotización');
  }

  return json.data?.numero ?? '';
}
