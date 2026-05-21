'use client';

import { ConfigProvider } from 'antd';
import esES from 'antd/locale/es_ES';
import theme from './theme';

export function AntdProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider theme={theme} locale={esES}>
      {children}
    </ConfigProvider>
  );
}
