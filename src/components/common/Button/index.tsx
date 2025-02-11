// src/components/common/Button/index.tsx
'use client';

import { FC, ReactNode } from 'react';

interface CtaButtonProps {
  children: ReactNode;
  className?: string;
}

const CtaButton: FC<CtaButtonProps> = ({ children, className }) => {
  return (
    <button
      className={`
        bg-gradient-to-r from-cyan-500 to-blue-500 
        hover:from-cyan-600 hover:to-blue-600
        text-white font-bold py-4 px-8 rounded-lg 
        transition-all duration-300
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default CtaButton;