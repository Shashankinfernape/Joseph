import React from 'react';
import { X, ChevronLeft, ChevronRight, Tag, Calendar } from 'lucide-react';

export default function Lightbox({ album, activeIndex, onClose, onPrev, onNext }) {
  if (!album || activeIndex === null || activeIndex === undefined) return null;

  const currentPhoto = album.photos ? album.photos[activeIndex] : album.coverImage;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in">
      {/* Top Bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white z-10">
        <div>
          <h3 className="font-bold text-sm sm:text-base text-white">{album.eventName}</h3>
          <div className="flex items-center gap-3 text-xs text-slate-300">
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-cbse-gold" /> {album.date}</span>
            <span>•</span>
            <span className="text-cbse-gold">{album.academicYear}</span>
            <span>•</span>
            <span>Photo {activeIndex + 1} of {album.photos?.length || 1}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Close Lightbox"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image */}
      <div className="relative max-w-5xl max-h-[80vh] w-full flex items-center justify-center">
        <img
          src={currentPhoto}
          alt={album.eventName}
          className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl border border-white/10"
        />

        {/* Previous Button */}
        {album.photos && album.photos.length > 1 && (
          <button
            onClick={onPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 transition-transform hover:scale-110"
            aria-label="Previous Photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Next Button */}
        {album.photos && album.photos.length > 1 && (
          <button
            onClick={onNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 transition-transform hover:scale-110"
            aria-label="Next Photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bottom Tags */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-2 flex-wrap">
        {album.tags?.map((tag, idx) => (
          <span
            key={idx}
            className="px-2.5 py-1 rounded-full bg-white/10 text-white text-xs font-medium border border-white/10 flex items-center gap-1"
          >
            <Tag className="w-3 h-3 text-cbse-gold" />
            <span>{tag}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
