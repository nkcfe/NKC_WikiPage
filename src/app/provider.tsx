'use client';

import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const client = new QueryClient();

const NextProvider = ({ children }: { children: ReactNode }) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export default NextProvider;
