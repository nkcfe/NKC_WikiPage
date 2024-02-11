'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import Button from './Button';
import Link from 'next/link';
import Logo from '@/assets/logo.svg';

const Navbar = () => {
  const router = useRouter();

  const handleWrite = () => {
    router.push('/write');
  };

  return (
    <div className="mx-auto flex h-20 items-center justify-between px-4 md:max-w-4xl">
      <Link href="/" className="border-none bg-white">
        <Logo className="w-24" />
      </Link>

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
