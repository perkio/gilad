'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

export function NavigateButton({
  path,
  className,
  children,
}: React.PropsWithChildren<{
  path: string,
  className?: string;
}>) {
  const router = useRouter();
  return (
    <button className={className} onClick={() => router.push(path)}>
      {children}
    </button>
  );
}

export default NavigateButton;