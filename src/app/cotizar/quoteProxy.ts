import type { QuoteInput } from '@/schemas/quoteSchema';

interface QuoteResponse {
  success: boolean;
  message: string;
  data?: { numero: string };
}

export async function submitQuote(data: QuoteInput): Promise<string> {
  const res = await fetch('/api/cotizar', {
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
