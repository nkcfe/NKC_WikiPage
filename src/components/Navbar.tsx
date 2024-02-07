'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import Button from './Button';
import { TiPencil } from 'react-icons/ti';
import Link from 'next/link';

const Navbar = () => {
  const router = useRouter();

  const handleWrite = () => {
    router.push('/write');
  };

  return (
    <div className="absolute top-0 flex h-14 w-screen items-center justify-between bg-white px-4 font-lilita sm:px-10">
      <div className="text-2xl">
        <Link href="/">CODING HUB</Link>
      </div>
      <Button
        variant="blue"
        size="medium"
        shape="primary"
        onClick={handleWrite}
      >
        글 작성
      </Button>
    </div>
  );
};

export default Navbar;
