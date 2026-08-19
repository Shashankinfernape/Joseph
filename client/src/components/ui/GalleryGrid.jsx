import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function GalleryGrid({ images, className }) {
  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[var(--space-2)] auto-rows-[200px]", className)}>
      {images.map((image, index) => (
        <motion.div
          key={index}
          className="group relative overflow-hidden rounded-[var(--radius-small)] bg-surface-container"
          style={{
            gridColumn: `span ${image.colSpan || 1}`,
            gridRow: `span ${image.rowSpan || 1}`,
          }}
          whileHover="hover"
          initial="initial"
        >
          <motion.img
            src={image.src}
            alt={image.alt || 'Gallery image'}
            className="h-full w-full object-cover"
            variants={{
              initial: { scale: 1 },
              hover: { scale: 1.05 }
            }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            loading="lazy"
          />
          
          <motion.div 
            className="absolute inset-0 gradient-photo-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4"
          >
            {image.label && (
              <span className="text-white font-medium text-[var(--text-title-medium)] translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                {image.label}
              </span>
            )}
            {image.subtext && (
              <span className="text-white/80 text-[var(--text-body-small)] translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                {image.subtext}
              </span>
            )}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
