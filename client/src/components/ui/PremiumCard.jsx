import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export const PremiumCard = React.forwardRef(({ className, children, hoverEffect = true, ...props }, ref) => {
  return (
    <motion.div
      ref={ref}
      className={cn(
        "rounded-[var(--radius-medium)] bg-surface text-on-surface shadow-[var(--elevation-1)] overflow-hidden border border-transparent",
        "dark:bg-surface-container dark:border-[var(--outline-variant)]",
        className
      )}
      whileHover={hoverEffect ? { y: -4, boxShadow: 'var(--elevation-3)' } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      {...props}
    >
      {children}
    </motion.div>
  );
});
PremiumCard.displayName = "PremiumCard";

export const PremiumCardHeader = ({ className, children, ...props }) => (
  <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props}>
    {children}
  </div>
);

export const PremiumCardTitle = React.forwardRef(({ className, children, ...props }, ref) => (
  <h3 ref={ref} className={cn("text-[var(--text-title-large)] font-semibold leading-none tracking-tight font-display", className)} {...props}>
    {children}
  </h3>
));
PremiumCardTitle.displayName = "PremiumCardTitle";

export const PremiumCardDescription = React.forwardRef(({ className, children, ...props }, ref) => (
  <p ref={ref} className={cn("text-[var(--text-body-medium)] text-on-surface-variant", className)} {...props}>
    {children}
  </p>
));
PremiumCardDescription.displayName = "PremiumCardDescription";

export const PremiumCardContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props}>
    {children}
  </div>
));
PremiumCardContent.displayName = "PremiumCardContent";

export const PremiumCardFooter = React.forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props}>
    {children}
  </div>
));
PremiumCardFooter.displayName = "PremiumCardFooter";
