import type { Metadata } from 'next';
import { Noto_Sans_KR, Bebas_Neue } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import { cn } from '@/utils/style';
import Filter from '@/components/filter';
import NextProvider from './provider';

const notoSansKr = Noto_Sans_KR({
  weight: ['500'],
  subsets: ['latin'],
});

const bebas = Bebas_Neue({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--bebas',
});

export const metadata: Metadata = {
  title: 'Coding Hub',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(notoSansKr.className, bebas.variable)}>
        <NextProvider>
          <Navbar />
          <main className="mt-14 h-full w-screen ">
            <Filter />
            {children}
          </main>
        </NextProvider>
      </body>
    </html>
  );
}
