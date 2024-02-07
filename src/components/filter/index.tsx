'use client';

import React from 'react';
import Dropdown from '../Dropdown';

const Filter = () => {
  const [category, setCategory] = React.useState<string>('null');
  return (
    <div className="sticky top-0 flex h-28 w-screen items-center justify-center bg-gray-100">
      <div>필터</div>
      <Dropdown />
    </div>
  );
};

export default Filter;
