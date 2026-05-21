'use client';

import dynamic from 'next/dynamic';

const AntdProviderClient = dynamic(
  () => import('@/components/providers/AntdProvider').then((m) => ({ default: m.AntdProvider })),
  { ssr: false }
);

export function AntdProviderWrapper({ children }: { children: React.ReactNode }) {
  return <AntdProviderClient>{children}</AntdProviderClient>;
}
