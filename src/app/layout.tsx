import type { Metadata } from 'next';
import { Montserrat, Roboto, Roboto_Mono } from 'next/font/google';
import './globals.css';
import { MotionProvider } from '@/components/providers/MotionProvider';
import { AntdProvider } from '@/components/providers/AntdProvider';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['300', '400', '500', '700'],
  display: 'swap',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  weight: ['400', '500'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'CentralClima — Climatización industrial y empresarial',
  description:
    'Instalación y mantención de aire acondicionado para empresas, industrias y hogares. Cobertura completa en la Región Metropolitana. 14 años de experiencia.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className={`${montserrat.variable} ${roboto.variable} ${robotoMono.variable}`}
    >
      <body>
        <AntdProvider>
          <MotionProvider>
            <div className="page-wrapper">
              {children}
            </div>
          </MotionProvider>
        </AntdProvider>
      </body>
    </html>
  );
}
