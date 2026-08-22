import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function GalleryGrid({ images, className }) {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6", className)}>
      {images.map((image, index) => (
        <motion.div
          key={index}
          className="group relative overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800 aspect-[4/3] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-200 dark:border-slate-800"
          whileHover={{ y: -4 }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.04 }}
        >
          <motion.img
            src={image.src}
            alt={image.alt || 'Gallery image'}
            className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
            {image.label && (
              <span className="text-white font-bold text-sm line-clamp-1 drop-shadow-md">
                {image.label}
              </span>
            )}
            {image.subtext && (
              <span className="text-cbse-gold text-xs font-medium mt-0.5 drop-shadow">
                {image.subtext}
              </span>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

