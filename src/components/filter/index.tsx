'use client';

import React from 'react';
import Dropdown from './dropdown';
import { useQuery } from 'react-query';
import axios from 'axios';

const Filter = () => {
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await axios('/api/categories');
      return response.data;
    },
  });

  return (
    <div className="sticky top-0 flex h-28 w-screen items-center justify-center gap-4 bg-gray-100">
      <div className="text-sm">필터</div>
      <Dropdown data={categories} />
      <Dropdown data={['2024', '2023']} />
      <Dropdown data={['1월', '2월']} />
    </div>
  );
};

export default Filter;
