'use client';

import Navbar from '@/components/Navbar';
import { usePathname } from 'next/navigation';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  children: React.ReactNode;
}

const client = new QueryClient();

export const NextProvider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={client}>
      <ToastContainer autoClose={2000} pauseOnFocusLoss={false} />
      {children}
    </QueryClientProvider>
  );
};

export const NextLayout = ({ children }: Props) => {
  const path = usePathname();

  return (
    <React.Fragment>
      {path === '/' && <Navbar />}
      <main className="h-full w-screen">{children}</main>
    </React.Fragment>
  );
};
