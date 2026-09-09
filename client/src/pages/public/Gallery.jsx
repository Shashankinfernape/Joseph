import React, { useState, useEffect, useRef } from 'react';
import { Camera, PlayCircle, ArrowLeft, X, CaretLeft, CaretRight, UploadSimple } from '@phosphor-icons/react';
import { galleryData } from '../../data/mockArchive';
import '@fontsource/plus-jakarta-sans/400.css';
import '@fontsource/plus-jakarta-sans/600.css';
import '@fontsource/plus-jakarta-sans/700.css';
import '@fontsource/plus-jakarta-sans/800.css';

// ─── TAG COLOUR MAP ───────────────────────────────────────────────────────────
const TAG_COLORS = {
  Cultural:  { bg: 'rgba(168,85,247,0.15)',  text: '#c084fc', border: 'rgba(168,85,247,0.25)' },
  Sports:    { bg: 'rgba(34,197,94,0.12)',   text: '#4ade80', border: 'rgba(34,197,94,0.2)'  },
  Special:   { bg: 'rgba(251,191,36,0.12)',  text: '#fbbf24', border: 'rgba(251,191,36,0.2)' },
  National:  { bg: 'rgba(249,115,22,0.12)',  text: '#fb923c', border: 'rgba(249,115,22,0.2)' },
  Academic:  { bg: 'rgba(56,189,248,0.12)',  text: '#38bdf8', border: 'rgba(56,189,248,0.2)' },
};

// ─── SLIDEPAPERS BUNDLE CARD (3D CYCLING STACK) ─────────────────────────────
function SlidepapersAlbumCard({ album, heroPhotoOverride, onClick, onCoverChange }) {
  // Always ensure heroPhoto is at index 0 for the preview
  const previewPhotos = [
    { id: 'hero', url: heroPhotoOverride || album.heroPhoto, caption: 'Cover' },
    ...album.photos.filter(p => p.url !== (heroPhotoOverride || album.heroPhoto))
  ].slice(0, 5); // Limit to 5 layers

  const len = previewPhotos.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const fileRef = useRef(null);

  useEffect(() => {
    let interval;
    if (isHovered && len > 1) {
      interval = setInterval(() => {
        setActiveIndex(prev => (prev + 1) % len);
      }, 1200);
    } else {
      setActiveIndex(0);
    }
    return () => clearInterval(interval);
  }, [isHovered, len]);

  return (
    <div 
      className="relative w-full cursor-pointer group transition-transform duration-300 hover:-translate-y-[3px]"
      style={{ 
        aspectRatio: '16 / 10', 
        fontFamily: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="absolute inset-0 pr-3 pt-3"> {/* Leave space for stack offset */}
        {previewPhotos.map((photo, i) => {
          const distance = (i - activeIndex + len) % len;
          const maxVisible = 4;
          const isVisible = distance < maxVisible;

          // Slidepapers exact deck stacking math
          let translateX = 0;
          let translateY = 0;
          let scale = 1;
          let rotate = 0;
          
          if (distance === 0) {
            scale = isHovered ? 1.01 : 1;
          } else if (distance === 1) {
            translateX = isHovered ? -5 : -4;
            translateY = isHovered ? -3 : -3;
            scale = isHovered ? 0.99 : 0.98;
            rotate = isHovered ? -0.5 : 0;
          } else if (distance === 2) {
            translateX = isHovered ? -10 : -8;
            translateY = isHovered ? -6 : -6;
            scale = isHovered ? 0.98 : 0.96;
            rotate = isHovered ? -1 : 0;
          } else {
            translateX = -12;
            translateY = -9;
            scale = 0.94;
          }

          let zIndex = 20 - distance;
          let opacity = isVisible ? (1 - distance * 0.1) : 0;

          // Fast crossfade for active switch, smooth transform for stack movement
          const isBecomingActive = distance === 0;

          return (
            <div 
              key={photo.id}
              className={`absolute inset-0 rounded-[14px] overflow-hidden shadow-xl border border-white/10 bg-[#111] ${isBecomingActive ? 'transition-all duration-300' : 'transition-all duration-500 ease-out'}`}
              style={{ 
                zIndex, 
                opacity,
                transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale}) rotate(${rotate}deg)`,
                transformOrigin: 'bottom right'
              }}
            >
              <img 
                src={photo.url} 
                alt={photo.caption} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.05) 100%)' }} />
            </div>
          );
        })}

        {/* Change Cover Button (Admin overlay) */}
        <button 
          onClick={e => { e.stopPropagation(); fileRef.current?.click(); }}
          className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold border border-white/20 text-white/70 hover:text-white hover:border-white/40 backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 z-50"
          style={{ background: 'rgba(0,0,0,0.6)' }}
        >
          <UploadSimple weight="bold" className="w-3.5 h-3.5" />
        </button>
        <input 
          ref={fileRef} type="file" accept="image/*" className="hidden"
          onChange={e => { 
            if (e.target.files[0]) {
              onCoverChange(album.id, URL.createObjectURL(e.target.files[0]));
            }
          }} 
        />

        {/* Cinematic Details Overlay */}
        <div className="absolute bottom-4 left-5 right-5 z-40 pointer-events-none">
          <h3 className="text-white font-extrabold text-[1.15rem] leading-tight mb-1.5 drop-shadow-md truncate">
            {album.festName}
          </h3>
          <div className="w-[35%] max-w-[2.5rem] h-[2.5px] bg-white/80 rounded-full mb-2.5"></div>
          <div className="flex items-center gap-2 text-[0.75rem] font-bold text-white/80 uppercase tracking-widest drop-shadow-sm">
            <span>{album.photoCount} Photos</span>
            <div className="w-1 h-1 rounded-full bg-white/40" />
            <span>16:9</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── LIGHTBOX ─────────────────────────────────────────────────────────────────
function Lightbox({ photos, startIndex, onClose }) {
  const [idx, setIdx] = useState(startIndex);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setIdx(i => Math.min(i + 1, photos.length - 1));
      if (e.key === 'ArrowLeft')  setIdx(i => Math.max(i - 1, 0));
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [photos.length, onClose]);

  const photo = photos[idx];
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.97)', fontFamily: '"Plus Jakarta Sans", sans-serif' }} onClick={onClose}>
      <button className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-all z-10" onClick={onClose}>
        <X weight="bold" className="w-5 h-5" />
      </button>

      <div className="absolute top-6 left-6 text-white/30 text-sm font-bold tabular-nums">
        {idx + 1} / {photos.length}
      </div>

      {photo.caption && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 text-sm font-bold text-center px-4 tracking-wide">
          {photo.caption}
        </div>
      )}

      {idx > 0 && (
        <button className="absolute left-4 w-12 h-12 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-all z-10"
          onClick={e => { e.stopPropagation(); setIdx(i => i - 1); }}>
          <CaretLeft weight="bold" className="w-5 h-5" />
        </button>
      )}
      {idx < photos.length - 1 && (
        <button className="absolute right-4 w-12 h-12 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-all z-10"
          onClick={e => { e.stopPropagation(); setIdx(i => i + 1); }}>
          <CaretRight weight="bold" className="w-5 h-5" />
        </button>
      )}

      <img
        src={photo.url} alt={photo.caption || ''}
        className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
        onClick={e => e.stopPropagation()}
      />
    </div>
  );
}

// ─── ALBUM DETAIL VIEW ────────────────────────────────────────────────────────
function AlbumView({ album, onBack, onChangeHero }) {
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const fileRef = useRef();
  const tag = TAG_COLORS[album.tag] || TAG_COLORS.Cultural;

  return (
    <div style={{ background: '#050505', fontFamily: '"Plus Jakarta Sans", sans-serif' }} className="min-h-screen text-white pb-32">
      
      {/* Hero Header */}
      <div className="relative h-[45vh] min-h-[320px] overflow-hidden">
        <img src={album.heroPhoto} alt={album.festName} className="absolute inset-0 w-full h-full object-cover opacity-60 blur-xl scale-110" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(5,5,5,0.2) 0%, rgba(5,5,5,1) 100%)' }} />

        <button onClick={onBack}
          className="absolute top-6 left-6 flex items-center gap-2 border border-white/10 text-white/60 hover:text-white hover:border-white/30 hover:bg-white/5 px-4 py-2 rounded-full text-sm font-bold transition-all z-10">
          <ArrowLeft weight="bold" className="w-4 h-4" /> Back to Gallery
        </button>

        <div className="absolute bottom-8 left-6 right-6 md:left-12 max-w-6xl mx-auto flex items-end gap-8">
           <div className="w-48 h-48 rounded-xl overflow-hidden shadow-2xl border border-white/10 shrink-0 hidden md:block relative group">
             <img src={album.heroPhoto} alt={album.festName} className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer" onClick={() => fileRef.current?.click()}>
               <span className="text-xs font-bold flex items-center gap-1.5"><UploadSimple weight="bold" /> Change Cover</span>
             </div>
           </div>
           
           <div className="flex-1">
             <div className="flex items-center gap-3 mb-2">
               <span className="text-[10px] font-black tracking-[0.2em] uppercase px-2.5 py-1 rounded-full border" style={{ color: tag.text, background: tag.bg, borderColor: tag.border }}>
                 {album.tag}
               </span>
               <span className="text-[11px] font-bold tracking-widest text-white/40 uppercase">
                 {album.month} {album.year}
               </span>
             </div>
             <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
               {album.festName}
             </h1>
             <p className="text-sm font-bold text-white/40 uppercase tracking-widest">
               {album.photoCount} High-Res Photos · Curated Set
             </p>
           </div>
        </div>
      </div>
      
      <input ref={fileRef} type="file" accept="image/*" className="hidden"
          onChange={e => { if (e.target.files[0]) onChangeHero(album.id, URL.createObjectURL(e.target.files[0])); }} />

      {/* Grid */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 mt-12">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {album.photos.map((photo, i) => (
            <div key={photo.id}
              className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-xl border border-white/5"
              onClick={() => setLightboxIdx(i)}>
              <img src={photo.url} alt={photo.caption || ''} className="w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-4">
                {photo.caption && (
                  <span className="text-white text-sm font-bold tracking-wide">
                    {photo.caption}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightboxIdx !== null && (
        <Lightbox photos={album.photos} startIndex={lightboxIdx} onClose={() => setLightboxIdx(null)} />
      )}
    </div>
  );
}

// ─── MAIN GALLERY PAGE ────────────────────────────────────────────────────────
export default function Gallery() {
  const [selectedYear, setSelectedYear] = useState('2026');
  const [openAlbum, setOpenAlbum] = useState(null);
  const [heroOverrides, setHeroOverrides] = useState({});

  const yearAlbums = galleryData.albums.filter(a => a.year === selectedYear);

  function handleChangeHero(albumId, newUrl) {
    setHeroOverrides(prev => ({ ...prev, [albumId]: newUrl }));
  }

  function getAlbum(albumId) {
    const base = galleryData.albums.find(a => a.id === albumId);
    if (!base) return null;
    return { ...base, heroPhoto: heroOverrides[albumId] || base.heroPhoto };
  }

  if (openAlbum) {
    return <AlbumView album={getAlbum(openAlbum)} onBack={() => setOpenAlbum(null)} onChangeHero={handleChangeHero} />;
  }

  return (
    <div style={{ background: '#050505', fontFamily: '"Plus Jakarta Sans", sans-serif' }} className="min-h-screen text-white pb-32 relative selection:bg-white/20">

      {/* HEADER */}
      <div className="pt-24 pb-12 px-6 max-w-[1400px] mx-auto flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-4 drop-shadow-xl">
          Event Archive
        </h1>
        <p className="text-base text-white/40 font-medium tracking-wide max-w-lg">
          Curated high-resolution photo sets capturing every major fest and event.
        </p>
      </div>

      {/* YEAR TABS (Path type) */}
      <div className="sticky top-[56px] md:top-[64px] z-30 mb-8 border-y border-white/5" style={{ background: 'rgba(5,5,5,0.85)', backdropFilter: 'blur(16px)' }}>
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-center md:justify-start gap-2 md:gap-8 overflow-x-auto no-scrollbar">
          {galleryData.years.map(year => {
            const count = galleryData.albums.filter(a => a.year === year).length;
            const isSelected = selectedYear === year;
            return (
              <button key={year} onClick={() => setSelectedYear(year)}
                className="relative group py-5 px-4 text-center md:text-left outline-none transition-colors shrink-0">
                <div className={`absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-300 ${isSelected ? 'bg-white' : 'bg-transparent'}`} />
                <div className={`text-xl font-extrabold tracking-tight transition-colors duration-200 ${isSelected ? 'text-white' : 'text-white/30 group-hover:text-white/60'}`}>
                  {year}
                </div>
                <div className={`text-[10px] font-bold tracking-widest mt-1 transition-colors duration-200 ${isSelected ? 'text-white/50' : 'text-white/20'}`}>
                  {count} ALBUMS
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* UNIFIED ALBUMS GRID */}
      <div className="max-w-[1400px] mx-auto px-6">
        
        {yearAlbums.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <Camera weight="thin" className="w-16 h-16 text-white/10" />
            <p className="text-white/30 font-bold tracking-widest uppercase text-xs">No collections found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
            {yearAlbums.map((rawAlbum) => {
              const album = { ...rawAlbum, heroPhoto: heroOverrides[rawAlbum.id] || rawAlbum.heroPhoto };
              return (
                <SlidepapersAlbumCard 
                  key={album.id}
                  album={album}
                  heroPhotoOverride={heroOverrides[album.id]}
                  onClick={() => setOpenAlbum(album.id)}
                  onCoverChange={handleChangeHero}
                />
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
