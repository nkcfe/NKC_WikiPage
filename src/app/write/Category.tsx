import Input from '@/components/Input';
import React, { useRef } from 'react';

interface CategoryProps {
  category: string;
}

const Category = (props: CategoryProps) => {
  const { category } = props;
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div className="w-auto cursor-pointer rounded-lg p-2 text-center transition hover:bg-gray-200">
      {category}
    </div>
  );
};

export default Category;
