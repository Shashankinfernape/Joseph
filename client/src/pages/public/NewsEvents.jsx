import React, { useState, useEffect } from 'react';
import { CalendarBlank, Bell, FileText, Tag, ArrowRight, X, Clock, MapPin } from '@phosphor-icons/react';
import { fetchAPI } from '../../utils/api';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

export default function NewsEvents() {
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('News');
  const { lang } = useLanguage();
  const { role } = useAuth();

  useEffect(() => {
    fetchAPI('/cms/news').then(res => res.success && setNews(res.news)).catch(() => {});
    fetchAPI('/cms/events').then(res => res.success && setEvents(res.events)).catch(() => {});
  }, []);

  const categories = ['News', 'Circulars', 'Sports', 'Cultural'];

  const filteredNews = news.filter(n => n.category === selectedCategory || (selectedCategory === 'News' && !n.category));
  
  // fallback for UI display
  const displayNews = filteredNews.length > 0 ? filteredNews : [
    { id: '1', title: 'Annual Sports Meet 2026: Champions Crowned', image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=2070', category: 'Sports', date: '24 Aug 2026', summary: 'Get ready for the most awaited athletic event of the year. Students from all houses will compete for the championship trophy.', author: 'Sports Dept' },
    { id: '2', title: 'Science Exhibition Winners Announced', image: 'https://images.unsplash.com/photo-1564325655926-286c1156f24a?auto=format&fit=crop&q=80&w=2070', category: 'News', date: '18 Aug 2026', summary: 'Our students secured first place in the National Science Exhibition for their innovative renewable energy project.', author: 'Science Club' },
    { id: '3', title: 'Cultural Fest 2026 Highlights', image: 'https://images.unsplash.com/photo-1540304651347-160a2b5e28a5?auto=format&fit=crop&q=80&w=2070', category: 'Cultural', date: '10 Aug 2026', summary: 'A spectacular display of talent featuring classical dance, music, and theatrical performances by our middle school students.', author: 'Cultural Committee' }
  ];

  const heroArticle = displayNews[0];
  const gridArticles = displayNews.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 font-sans">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-widest border border-blue-100 shadow-sm">
          <Bell weight="fill" className="w-4 h-4 text-amber-500" />
          <span>Campus Happenings</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight">
          News & <span className="text-blue-600">Events</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Stay updated with school accomplishments, notifications, upcoming celebrations, and parent circulars.
        </p>
      </div>

      {role === 'student' && (
        <div className="bg-blue-50 border border-blue-100 p-6 rounded-[2rem] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 shrink-0 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <Bell weight="fill" className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Class 10-A Final Exam Schedule</h3>
              <p className="text-sm text-slate-600">Pinned notice for your class</p>
            </div>
          </div>
          <button className="px-5 py-2.5 bg-blue-600 text-white rounded-full text-sm font-bold shadow-sm hover:bg-blue-700 transition-colors shrink-0">
            View Schedule
          </button>
        </div>
      )}

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Col: News & Magazine Layout */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-3">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Magazine Layout: Hero Story */}
          {heroArticle && (
            <div 
              onClick={() => setSelectedArticle(heroArticle)}
              className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col"
            >
              <div className="relative h-72 sm:h-[400px] overflow-hidden w-full">
                <img
                  src={heroArticle.image}
                  alt={heroArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-5 left-5 bg-white/95 text-slate-900 text-xs font-black uppercase px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-sm">
                  {heroArticle.category}
                </span>
              </div>
              <div className="p-8 sm:p-10">
                <div className="flex items-center gap-3 text-xs font-semibold text-slate-500 mb-3">
                  <CalendarBlank className="w-4 h-4" />
                  <span>{heroArticle.date}</span>
                </div>
                <h3 className="font-extrabold text-3xl sm:text-4xl text-slate-900 group-hover:text-blue-600 transition-colors mb-4 line-clamp-2 tracking-tight">
                  {lang === 'kn' && heroArticle.kannadaTitle ? heroArticle.kannadaTitle : heroArticle.title}
                </h3>
                <p className="text-slate-600 line-clamp-2 text-base sm:text-lg leading-relaxed">
                  {heroArticle.summary}
                </p>
              </div>
            </div>
          )}

          {/* Magazine Layout: 2-Col Grid */}
          {gridArticles.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {gridArticles.map(item => (
                <div
                  key={item.id}
                  onClick={() => setSelectedArticle(item)}
                  className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group flex flex-col"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <span className="absolute top-4 left-4 bg-white/95 text-slate-900 text-[10px] font-black uppercase px-3 py-1 rounded-full backdrop-blur-md shadow-sm">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 mb-2.5">
                      <CalendarBlank className="w-3.5 h-3.5" />
                      <span>{item.date}</span>
                    </div>
                    <h4 className="font-extrabold text-xl text-slate-900 group-hover:text-blue-600 transition-colors mb-2.5 line-clamp-2 leading-tight">
                      {lang === 'kn' && item.kannadaTitle ? item.kannadaTitle : item.title}
                    </h4>
                    <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Col: Events Calendar Placeholder & Sidebar */}
        <div className="lg:col-span-4 space-y-6 mt-8 lg:mt-16">
          
          {/* Event Calendar Placeholder */}
          <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-xl">
            <div className="absolute -top-4 -right-4 p-6 opacity-[0.03]">
              <CalendarBlank weight="fill" className="w-48 h-48" />
            </div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-[10px] font-bold uppercase tracking-widest mb-6">
                <Clock className="w-3 h-3" />
                <span>Upcoming</span>
              </div>
              <h3 className="text-2xl font-extrabold mb-8 tracking-tight">Event Calendar</h3>
              
              <div className="space-y-5">
                {[
                  {d: '24', m: 'Aug', t: 'Annual Sports Meet', v: 'Main Ground'},
                  {d: '05', m: 'Sep', t: 'Teacher\'s Day Celebration', v: 'Auditorium'},
                  {d: '12', m: 'Sep', t: 'Science Fair 2026', v: 'Science Block'}
                ].map((ev, i) => (
                  <div key={i} className="flex gap-4 items-start group cursor-pointer">
                    <div className="bg-blue-500/20 text-blue-300 rounded-2xl p-2.5 text-center min-w-[3.5rem] group-hover:bg-blue-500 group-hover:text-white transition-colors border border-blue-500/10">
                      <div className="text-[10px] font-bold uppercase tracking-wide">{ev.m}</div>
                      <div className="text-xl font-black leading-none mt-1">{ev.d}</div>
                    </div>
                    <div className="pt-1">
                      <h4 className="font-bold text-sm text-slate-100 group-hover:text-white transition-colors">{ev.t}</h4>
                      <p className="text-xs text-slate-400 mt-1.5 flex items-center gap-1.5 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-amber-500" /> {ev.v}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition-all hover:shadow-lg hover:shadow-blue-500/20 flex items-center justify-center gap-2">
                <span>View Full Calendar</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Links / Circulars Placeholder */}
          <div className="bg-amber-50 rounded-[2rem] p-8 border border-amber-100/50">
            <h3 className="text-xl font-extrabold text-amber-900 mb-6 flex items-center gap-2 tracking-tight">
              <FileText weight="fill" className="w-6 h-6 text-amber-500" />
              Important Circulars
            </h3>
            <div className="space-y-3">
              {[
                {t: 'Academic Calendar 2026-27', s: '1.4 MB'},
                {t: 'School Uniform Policy', s: '850 KB'}
              ].map((c, i) => (
                <a key={i} href="#" className="block p-4 rounded-2xl bg-white border border-amber-100 hover:border-amber-300 hover:shadow-sm transition-all group">
                  <div className="font-bold text-sm text-amber-950 group-hover:text-amber-700">{c.t}</div>
                  <div className="text-xs text-amber-600/60 mt-2 flex items-center justify-between font-medium">
                    <span>PDF • {c.s}</span>
                    <span className="text-amber-600 font-bold text-[10px] uppercase opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      Download <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in">
          <div className="bg-white rounded-[2rem] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative border border-slate-100">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-md transition-all"
            >
              <X className="w-5 h-5 font-bold" />
            </button>
            <div className="relative h-64 sm:h-[22rem]">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8 sm:p-10 space-y-6">
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
                <span className="px-3 py-1.5 rounded-full bg-slate-900 text-white uppercase tracking-wider">
                  {selectedArticle.category}
                </span>
                <span className="text-slate-500 flex items-center gap-1.5">
                  <CalendarBlank className="w-4 h-4" />
                  {selectedArticle.date}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500">{selectedArticle.author}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {selectedArticle.title}
              </h2>

              <p className="text-lg text-slate-600 leading-relaxed font-medium">
                {selectedArticle.summary}
              </p>
              
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                <p>Detailed content for the news article will appear here. It covers all aspects of the event or circular in detail so parents and students are well informed.</p>
                <p>Stay tuned for more updates from the school administration. We strive to provide the best environment for holistic development.</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
