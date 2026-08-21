import React from 'react';
import { cn } from '@/lib/utils';

export default function SectionLabel({ children, className }) {
  return (
    <p className={cn("text-label text-neutral-400", className)}>
      {children}
    </p>
  );
}
