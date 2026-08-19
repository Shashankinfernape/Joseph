import React, { useState, useEffect, useMemo } from 'react';
import { Camera, Image, CalendarBlank, Tag, PaperPlaneTilt, Sparkle } from '@phosphor-icons/react';
import { fetchAPI } from '../../utils/api';
import { GalleryGrid } from '../../components/ui/GalleryGrid';
import Lightbox from '../../components/common/Lightbox';

const CATEGORIES = ['All', 'Academics', 'Sports', 'Arts', 'Events'];

export default function Gallery() {
  const [albums, setAlbums] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxAlbum, setLightboxAlbum] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    fetchAPI('/cms/gallery')
      .then(res => {
        if (res.success) setAlbums(res.gallery);
      })
      .catch(() => {});
  }, []);

  // Filter by category
  const filteredAlbums = useMemo(() => {
    if (activeCategory === 'All') return albums;
    return albums.filter(album => {
      // If album has tags, check if the category matches
      const tags = album.tags || [];
      return tags.map(t => t.toLowerCase()).includes(activeCategory.toLowerCase()) || 
             album.category?.toLowerCase() === activeCategory.toLowerCase();
    });
  }, [albums, activeCategory]);

  // Group by year
  const groupedByYear = useMemo(() => {
    const groups = {};
    filteredAlbums.forEach(album => {
      const year = album.academicYear || 'Other';
      if (!groups[year]) groups[year] = [];
      groups[year].push(album);
    });
    // Sort years descending
    return Object.entries(groups).sort(([yearA], [yearB]) => yearB.localeCompare(yearA));
  }, [filteredAlbums]);

  const openLightbox = (album, index = 0) => {
    setLightboxAlbum(album);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxAlbum(null);
    setLightboxIndex(null);
  };

  const prevPhoto = () => {
    if (lightboxAlbum && lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1);
    }
  };

  const nextPhoto = () => {
    if (lightboxAlbum && lightboxIndex < (lightboxAlbum.photos?.length || 1) - 1) {
      setLightboxIndex(lightboxIndex + 1);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-16">
      
      {/* Header & CTA */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
        <div className="max-w-xl space-y-4 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Camera weight="fill" className="w-4 h-4" />
            <span>Campus Memories</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold font-serif text-slate-900 dark:text-white">
            Our Gallery <Sparkle className="inline-block text-amber-400 w-8 h-8 mb-2" weight="fill" />
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Relive the best moments of our academic journey, sports tournaments, cultural events, and more. 
          </p>
        </div>

        {/* Submit Photo CTA */}
        <div className="flex-shrink-0">
          <button className="group relative flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-blue-500/30 transition-all hover:scale-105 active:scale-95">
            <PaperPlaneTilt className="w-6 h-6" weight="duotone" />
            <span>Submit Your Photo</span>
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex justify-center flex-wrap gap-3">
        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
              activeCategory === category
                ? 'bg-slate-900 text-white shadow-md dark:bg-white dark:text-slate-900'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grouped Galleries */}
      <div className="space-y-20">
        {groupedByYear.map(([year, yearAlbums]) => {
          // Transform albums to GalleryGrid images format
          const images = yearAlbums.map((album, idx) => ({
            src: album.coverImage,
            alt: album.eventName,
            label: album.eventName,
            subtext: `${album.photos?.length || 1} Photos • ${album.date}`,
            // Add slight randomness to layout to make it masonry-like
            colSpan: idx % 5 === 0 ? 2 : 1,
            rowSpan: idx % 3 === 0 ? 2 : 1,
            original: album // store original for click handler if needed
          }));

          return (
            <div key={year} className="space-y-6">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <CalendarBlank className="w-7 h-7 text-indigo-500" weight="duotone" />
                  {year}
                </h2>
                <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1"></div>
              </div>

              {/* In a real app we'd attach onClick to GalleryGrid items.
                  Assuming GalleryGrid doesn't have an onClick prop for items, 
                  we render it as is. If it does, we'd pass it. */}
              <div onClick={(e) => {
                // simple delegation if we want to open lightbox
                const img = e.target.closest('img');
                if (img) {
                  const src = img.getAttribute('src');
                  const album = yearAlbums.find(a => a.coverImage === src);
                  if (album) openLightbox(album, 0);
                }
              }}>
                <GalleryGrid images={images} />
              </div>
            </div>
          );
        })}

        {groupedByYear.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            <Image className="w-16 h-16 mx-auto mb-4 opacity-20" weight="duotone" />
            <p className="text-lg font-medium">No albums found for this category.</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        album={lightboxAlbum}
        activeIndex={lightboxIndex}
        onClose={closeLightbox}
        onPrev={prevPhoto}
        onNext={nextPhoto}
      />
    </div>
  );
}
