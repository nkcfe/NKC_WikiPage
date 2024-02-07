import { cn } from '@/utils/style';
import { VariantProps, cva } from 'class-variance-authority';
import React, { ButtonHTMLAttributes } from 'react';

const ButtonVariants = cva('', {
  variants: {
    variant: {
      blue: 'bg-blue-500 text-white transition hover:bg-blue-400',
      white: 'bg-white text-black transition hover:bg-gray-200',
    },
    shape: {
      primary: 'rounded',
      full: 'rounded-full',
    },
    size: {
      small: 'px-2 py-1 text-xs',
      medium: 'px-3 py-1.5 text-sm',
      large: 'px-6 py-3 text-lg',
    },
    weight: {
      light: 'font-light',
      normal: 'font-normal',
      bold: 'font-bold',
    },
    defaultVariants: {
      variant: 'blue',
      shape: 'primary',
      size: 'small',
      weight: 'normal',
    },
  },
});

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ButtonVariants> {
  children: React.ReactNode;
}

const Button = (props: ButtonProps) => {
  const { variant, shape, size, weight, children } = props;
  return (
    <button
      className={cn(ButtonVariants({ variant, shape, size, weight }))}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
