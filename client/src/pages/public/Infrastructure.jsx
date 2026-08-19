import React, { useState } from 'react';
import { 
  MapTrifold, 
  Books, 
  Flask, 
  Basketball, 
  Palette, 
  VideoCamera, 
  ShieldCheck, 
  FirstAid, 
  Plant,
  Sparkle
} from '@phosphor-icons/react';

const PremiumCard = ({ icon: Icon, title, description, images }) => {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="bg-white rounded-3xl border border-amber-100/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 overflow-hidden flex flex-col group">
      {/* Photo Gallery */}
      <div className="relative h-64 overflow-hidden bg-amber-50">
        <img 
          src={images[activeImage]} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Gallery Controls */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(idx)}
              aria-label={`View image ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${activeImage === idx ? 'bg-amber-500 w-6' : 'bg-white/70 w-2 hover:bg-white'}`}
            />
          ))}
        </div>
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-red-900 p-3 rounded-2xl shadow-sm">
          <Icon weight="duotone" className="w-6 h-6" />
        </div>
      </div>

      <div className="p-8 flex-1 flex flex-col justify-center">
        <h3 className="text-2xl font-bold font-serif text-slate-800 mb-3">{title}</h3>
        <p className="text-slate-600 line-clamp-2 leading-relaxed text-sm sm:text-base">
          {description}
        </p>
      </div>
    </div>
  );
};

export default function Infrastructure() {
  const FACILITIES = [
    {
      id: 'labs',
      title: 'Advanced Innovation Labs',
      icon: Flask,
      description: 'State-of-the-art physics, chemistry, and biology laboratories equipped with digital microscopes and safety-first experimentation pods.',
      images: [
        'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80',
        'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=800&q=80',
        'https://images.unsplash.com/photo-1574169208507-84376144848b?w=800&q=80'
      ]
    },
    {
      id: 'library',
      title: 'The Grand Atrium Library',
      icon: Books,
      description: 'A magical repository of over 12,000 volumes, cozy reading nooks, and interactive digital research stations for curious minds.',
      images: [
        'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&q=80',
        'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80',
        'https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80'
      ]
    },
    {
      id: 'sports',
      title: 'Olympic Athletics Complex',
      icon: Basketball,
      description: 'FIFA-standard turf, indoor wooden courts, and a heated 25m swimming pool designed to nurture physical excellence and teamwork.',
      images: [
        'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=800&q=80',
        'https://images.unsplash.com/photo-1526676037777-05a232554f77?w=800&q=80',
        'https://images.unsplash.com/photo-1574629810360-7efbb6b49e35?w=800&q=80'
      ]
    },
    {
      id: 'arts',
      title: 'Creative Arts & Studios',
      icon: Palette,
      description: 'Sunlit art studios, soundproofed music rooms, and a magnificent amphitheater for dramatic arts and cultural expression.',
      images: [
        'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80',
        'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80',
        'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80'
      ]
    }
  ];

  return (
    <div className="bg-[#FAF9F6] min-h-screen pb-24">
      {/* Hero Section */}
      <div className="pt-24 pb-16 px-4 text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-900/10 text-red-900 text-sm font-bold tracking-widest uppercase">
          <Sparkle weight="fill" className="w-4 h-4 text-amber-500" />
          <span>A World of Wonder Awaits</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold font-serif text-slate-900 leading-tight">
          Spaces Crafted for <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-800 to-amber-600">Brilliance</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Where cutting-edge technology meets timeless architectural elegance. Every corner of our campus is designed to inspire, protect, and empower young minds.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* 360 Virtual Tour Placeholder */}
        <div className="relative rounded-[3rem] overflow-hidden bg-slate-900 shadow-2xl">
          <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1600&q=80" alt="Campus aerial" className="w-full h-[60vh] object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent flex flex-col items-center justify-center p-8 text-center">
            <div className="w-20 h-20 bg-amber-500 text-slate-900 rounded-full flex items-center justify-center mb-6 cursor-pointer hover:scale-110 transition-transform shadow-[0_0_40px_rgba(245,158,11,0.4)]">
              <VideoCamera weight="fill" className="w-10 h-10 ml-2" />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Step Inside the Magic</h2>
            <p className="text-amber-100/90 text-lg max-w-2xl">Experience our campus from the comfort of your home with our immersive 360° virtual tour. Walk through halls of innovation.</p>
          </div>
        </div>

        {/* Facilities Grid */}
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-serif font-bold text-slate-900">Elite Facilities</h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-amber-200 to-transparent"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {FACILITIES.map(fac => (
              <PremiumCard key={fac.id} {...fac} />
            ))}
          </div>
        </div>

        {/* Interactive Campus Map SVG Placeholder */}
        <div className="bg-amber-50/50 rounded-[3rem] p-8 md:p-12 border border-amber-100/60 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6">
            <div>
              <h2 className="text-3xl font-serif font-bold text-slate-900 flex items-center gap-3">
                <MapTrifold className="text-amber-600" weight="duotone" />
                Interactive Campus Map
              </h2>
              <p className="text-slate-600 mt-2 text-lg">Discover secret corridors and learning hubs across our 12.5-acre estate.</p>
            </div>
            <button className="px-8 py-3.5 bg-red-900 text-amber-50 rounded-full font-bold hover:bg-red-800 transition-colors shadow-lg shadow-red-900/20 whitespace-nowrap tracking-wide">
              Download PDF Guide
            </button>
          </div>
          <div className="w-full aspect-[21/9] bg-white rounded-3xl border-2 border-dashed border-amber-200 flex flex-col items-center justify-center text-amber-700/50 relative overflow-hidden group cursor-crosshair hover:border-amber-400 hover:bg-amber-50/30 transition-colors">
            <MapTrifold weight="thin" className="w-24 h-24 mb-4 group-hover:scale-110 transition-transform duration-500" />
            <p className="font-serif text-xl text-amber-900">Campus Map SVG Placeholder</p>
            <p className="text-sm font-sans mt-2 text-amber-700">Interactive zones · Building details · Pathfinding</p>
          </div>
        </div>

        {/* Hogwarts meets Apple Safety Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl text-amber-50 shadow-xl flex gap-5 relative overflow-hidden group">
            <div className="absolute -right-6 -top-6 text-white/5 w-32 h-32 group-hover:scale-110 transition-transform duration-500">
              <ShieldCheck weight="fill" className="w-full h-full" />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-5 backdrop-blur-sm border border-white/10">
                <ShieldCheck weight="duotone" className="w-6 h-6 text-amber-300" />
              </div>
              <h4 className="text-xl font-serif font-bold mb-3">Impenetrable Security</h4>
              <p className="text-slate-300 text-sm leading-relaxed">24/7 CCTV surveillance, biometric access gates, and highly trained security personnel ensuring a safe haven.</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-8 rounded-3xl text-slate-900 shadow-xl flex gap-5 relative overflow-hidden group">
            <div className="absolute -right-6 -top-6 text-orange-900/10 w-32 h-32 group-hover:scale-110 transition-transform duration-500">
              <FirstAid weight="fill" className="w-full h-full" />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-5 backdrop-blur-sm border border-white/20">
                <FirstAid weight="duotone" className="w-6 h-6 text-slate-900" />
              </div>
              <h4 className="text-xl font-serif font-bold mb-3">Campus Infirmary</h4>
              <p className="text-slate-900/80 text-sm leading-relaxed">Full-time pediatric nurse, emergency response protocols, and tie-ups with top-tier hospitals nearby.</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-900 to-red-950 p-8 rounded-3xl text-red-50 shadow-xl flex gap-5 relative overflow-hidden group">
            <div className="absolute -right-6 -top-6 text-red-500/10 w-32 h-32 group-hover:scale-110 transition-transform duration-500">
              <Plant weight="fill" className="w-full h-full" />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-5 backdrop-blur-sm border border-white/10">
                <Plant weight="duotone" className="w-6 h-6 text-amber-300" />
              </div>
              <h4 className="text-xl font-serif font-bold mb-3">Eco-Magic Campus</h4>
              <p className="text-red-200/90 text-sm leading-relaxed">100% solar-powered zones, zero-waste composting, and lush green botanical gardens for outdoor learning.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
