'use client';

import React from 'react';
import Dropdown from './dropdown';

const Filter = () => {
  const [category, setCategory] = React.useState<string>('null');
  return (
    <div className="sticky top-0 flex h-28 w-screen items-center justify-center gap-4 bg-gray-100">
      <div className="text-sm">필터</div>
      <Dropdown data={['리액트', '넥스트', 'JS', 'Web']} />
      <Dropdown data={['2024', '2023']} />
      <Dropdown data={['1월', '2월']} />
    </div>
  );
};

export default Filter;
