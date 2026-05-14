import type { QuoteInput } from '@/schemas/quoteSchema';
import type { ApiResponse } from '@/types';

export async function submitQuote(data: QuoteInput): Promise<ApiResponse> {
  const res = await fetch('/api/cotizar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const json: ApiResponse = await res.json();

  if (!res.ok) {
    throw new Error(json.message ?? 'Error al enviar la cotización');
  }

  return json;
}
