import React from 'react';
import { cva } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 gap-2",
  {
    variants: {
      variant: {
        filled: "bg-primary text-white hover:bg-primary/90 shadow-[var(--elevation-1)] hover:shadow-[var(--elevation-2)]",
        tonal: "bg-[var(--primary-container)] text-primary hover:bg-primary/10",
        outlined: "border-2 border-[var(--outline)] text-primary hover:border-primary hover:bg-[var(--primary-container)]",
        text: "text-primary hover:bg-[var(--primary-container)]",
        ghost: "hover:bg-[var(--surface-container)] hover:text-foreground",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 rounded-full px-4",
        lg: "h-12 rounded-full px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "filled",
      size: "default",
    },
  }
);

export const PremiumButton = React.forwardRef(({ className, variant, size, children, ...props }, ref) => {
  return (
    <motion.button
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      {...props}
    >
      {children}
    </motion.button>
  );
});

PremiumButton.displayName = "PremiumButton";
