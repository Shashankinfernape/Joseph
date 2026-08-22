import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  CalendarBlank, 
  FileText, 
  ArrowRight, 
  X, 
  Clock, 
  MapPin, 
  Plus, 
  PencilSimple, 
  Trash, 
  ShareNetwork, 
  DownloadSimple, 
  CheckCircle, 
  BookmarkSimple, 
  Sparkle, 
  Buildings,
  MegaphoneSimple,
  ShieldCheck,
  Tag,
  Newspaper
} from '@phosphor-icons/react';
import { fetchAPI } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../lib/utils';

// Safe Fixed-Ratio Image Component
const SafeNewsImage = ({ src, alt, className, fallbackText = 'St. Joseph Announcement' }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  if (error || !src) {
    return (
      <div className={cn("bg-gradient-to-br from-slate-900 via-slate-800 to-slate-800 flex flex-col items-center justify-center text-white p-4 text-center", className)}>
        <Buildings size={28} className="text-amber-500 mb-1 opacity-80" weight="duotone" />
        <span className="text-[10px] font-bold font-serif uppercase tracking-wider">{fallbackText}</span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {loading && (
        <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoading(false)}
        onError={() => setError(true)}
        className={cn(className, loading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500')}
        loading="lazy"
      />
    </div>
  );
};

const CATEGORIES = [
  'All Stories',
  'Circulars',
  'Academics',
  'Sports',
  'Celebrations',
  'Achievements'
];

export default function NewsEvents() {
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All Stories');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [savedArticles, setSavedArticles] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  // Admin Management State
  const { role } = useAuth();
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    kannadaTitle: '',
    category: 'Circulars',
    author: "St. Joseph Principal's Desk",
    date: new Date().toISOString().split('T')[0],
    summary: '',
    body: '',
    image: 'https://stjosephschoolbangalore.org/wp-content/uploads/2024/08/DSC_0466-scaled.jpg',
    pinned: false,
    attachment: ''
  });

  const loadData = () => {
    fetchAPI('/cms/news')
      .then(res => res.success && setNews(res.news || []))
      .catch(console.error);
    fetchAPI('/cms/events')
      .then(res => res.success && setEvents(res.events || []))
      .catch(console.error);
  };

  useEffect(() => {
    loadData();
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenCreateModal = () => {
    setEditingArticle(null);
    setFormData({
      title: '',
      kannadaTitle: '',
      category: 'Circulars',
      author: "St. Joseph Principal's Desk",
      date: new Date().toISOString().split('T')[0],
      summary: '',
      body: '',
      image: 'https://stjosephschoolbangalore.org/wp-content/uploads/2024/08/DSC_0466-scaled.jpg',
      pinned: false,
      attachment: ''
    });
    setShowAdminModal(true);
  };

  const handleOpenEditModal = (article, e) => {
    if (e) e.stopPropagation();
    setEditingArticle(article);
    setFormData({
      title: article.title || '',
      kannadaTitle: article.kannadaTitle || '',
      category: article.category || 'Circulars',
      author: article.author || "St. Joseph Principal's Desk",
      date: article.date || new Date().toISOString().split('T')[0],
      summary: article.summary || '',
      body: article.body || article.summary || '',
      image: article.image || 'https://stjosephschoolbangalore.org/wp-content/uploads/2024/08/DSC_0466-scaled.jpg',
      pinned: Boolean(article.pinned),
      attachment: article.attachment || ''
    });
    setShowAdminModal(true);
  };

  const handleDeleteArticle = async (id, e) => {
    if (e) e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this announcement?')) return;

    try {
      const res = await fetchAPI(`/cms/news/${id}`, { method: 'DELETE' });
      if (res.success) {
        showToast('Announcement deleted successfully.');
        loadData();
        if (selectedArticle?.id === id) setSelectedArticle(null);
      }
    } catch (err) {
      showToast('Failed to delete announcement.');
    }
  };

  const handleSaveAnnouncement = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.summary.trim()) {
      alert('Please provide both Title/Subject and Summary text.');
      return;
    }

    try {
      if (editingArticle) {
        const res = await fetchAPI(`/cms/news/${editingArticle.id}`, {
          method: 'PUT',
          body: JSON.stringify(formData)
        });
        if (res.success) {
          showToast('Announcement updated successfully.');
          loadData();
          setShowAdminModal(false);
        }
      } else {
        const res = await fetchAPI('/cms/news', {
          method: 'POST',
          body: JSON.stringify(formData)
        });
        if (res.success) {
          showToast('New announcement published successfully.');
          loadData();
          setShowAdminModal(false);
        }
      }
    } catch (err) {
      showToast('Error saving announcement.');
    }
  };

  const toggleBookmark = (id, e) => {
    if (e) e.stopPropagation();
    setSavedArticles(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleAddToGoogleCalendar = (evt, e) => {
    if (e) e.stopPropagation();
    const title = encodeURIComponent(evt.title);
    const details = encodeURIComponent(`School Event at St. Joseph English High School: ${evt.venue}`);
    const location = encodeURIComponent("St. Joseph English High School, Hennur Bagalur Main Road, Kothanur, Bangalore - 560077");
    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
    window.open(gcalUrl, '_blank');
  };

  const filteredNews = news.filter(n => 
    selectedCategory === 'All Stories' || n.category === selectedCategory
  );

  const heroArticle = filteredNews.find(n => n.pinned) || filteredNews[0];
  const streamArticles = filteredNews.filter(n => n.id !== heroArticle?.id);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 pb-28">
      
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-amber-500 flex items-center gap-3 text-xs font-bold"
          >
            <CheckCircle size={20} weight="fill" className="text-amber-500" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="pt-24 pb-8 px-4 sm:px-8 max-w-7xl mx-auto space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-slate-900 text-blue-600 text-[11px] font-bold uppercase tracking-widest border border-blue-500/20 mb-2">
              <MegaphoneSimple weight="fill" size={14} />
              <span>Official School Communications</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              News, Events &amp; Circulars
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Direct updates from the Principal's Desk, Examination Secretariat, and Sports Council.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAdminMode(!isAdminMode)}
              className={cn(
                "px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border",
                isAdminMode 
                  ? "bg-amber-500 text-slate-950 border-amber-600 shadow-md" 
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-100"
              )}
            >
              <PencilSimple size={16} weight="bold" />
              <span>{isAdminMode ? 'Exit Admin Mode' : 'Admin Announcement Mode'}</span>
            </button>

            {isAdminMode && (
              <button
                onClick={handleOpenCreateModal}
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg"
              >
                <Plus size={16} weight="bold" />
                <span>New Announcement</span>
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto py-2 no-scrollbar">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all",
                selectedCategory === cat
                  ? "bg-slate-900 dark:bg-blue-600 text-white shadow-md"
                  : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            {heroArticle && (
              <div 
                onClick={() => setSelectedArticle(heroArticle)}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer group flex flex-col"
              >
                <div className="relative w-full aspect-[16/9] overflow-hidden bg-slate-900">
                  <SafeNewsImage
                    src={heroArticle.image}
                    alt={heroArticle.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {heroArticle.pinned && (
                      <span className="px-3 py-1 rounded-full bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
                        Pinned Alert
                      </span>
                    )}
                    <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-400 text-[10px] font-bold uppercase tracking-wider border border-white/10">
                      {heroArticle.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
                    <span className="font-bold text-blue-600">{heroArticle.author}</span>
                    <span>•</span>
                    <span>{heroArticle.date}</span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 transition-colors">
                    {heroArticle.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                    {heroArticle.summary}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
                    <span className="font-bold text-blue-600 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read Full Announcement <ArrowRight size={14} weight="bold" />
                    </span>

                    <div className="flex items-center gap-2">
                      <button 
                        onClick={(e) => toggleBookmark(heroArticle.id, e)}
                        className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
                        title="Bookmark Story"
                      >
                        <BookmarkSimple size={18} weight={savedArticles.includes(heroArticle.id) ? "fill" : "regular"} className={savedArticles.includes(heroArticle.id) ? "text-amber-500" : ""} />
                      </button>

                      {isAdminMode && (
                        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                          <button
                            onClick={(e) => handleOpenEditModal(heroArticle, e)}
                            className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                            title="Edit Announcement"
                          >
                            <PencilSimple size={15} weight="bold" />
                          </button>
                          <button
                            onClick={(e) => handleDeleteArticle(heroArticle.id, e)}
                            className="p-1.5 rounded-lg hover:bg-red-100 text-red-600"
                            title="Delete Announcement"
                          >
                            <Trash size={15} weight="bold" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {streamArticles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col sm:flex-row gap-5 items-start justify-between"
                >
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
                      <span className="font-bold text-blue-600">{article.author}</span>
                      <span>•</span>
                      <span>{article.date}</span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-semibold text-slate-600 dark:text-slate-400">
                        {article.category}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                      {article.summary}
                    </p>

                    <div className="flex items-center justify-between pt-2 text-xs">
                      <span className="font-semibold text-slate-400 group-hover:text-blue-600 transition-colors">
                        View details →
                      </span>

                      <div className="flex items-center gap-2">
                        <button 
                          onClick={(e) => toggleBookmark(article.id, e)}
                          className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
                        >
                          <BookmarkSimple size={16} weight={savedArticles.includes(article.id) ? "fill" : "regular"} className={savedArticles.includes(article.id) ? "text-amber-500" : ""} />
                        </button>

                        {isAdminMode && (
                          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                            <button
                              onClick={(e) => handleOpenEditModal(article, e)}
                              className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                            >
                              <PencilSimple size={14} weight="bold" />
                            </button>
                            <button
                              onClick={(e) => handleDeleteArticle(article.id, e)}
                              className="p-1.5 rounded-lg hover:bg-red-100 text-red-600"
                            >
                              <Trash size={14} weight="bold" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="w-full sm:w-36 aspect-[4/3] rounded-2xl overflow-hidden shrink-0 shadow-sm bg-slate-800 border border-slate-100 dark:border-slate-700">
                    <SafeNewsImage
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              ))}

              {filteredNews.length === 0 && (
                <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
                  <Newspaper size={48} className="text-slate-400 mx-auto" />
                  <h4 className="font-serif text-xl font-bold">No Announcements in this Category</h4>
                  <p className="text-xs text-slate-500">Check back soon for new notices or select 'All Stories'.</p>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Circulars Vault & Upcoming Events (4 Cols) */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Quick Circulars Download Box */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <FileText size={20} className="text-blue-600" weight="duotone" />
                <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">Official Circulars</h3>
              </div>

              <div className="space-y-3">
                <a 
                  href="/documents/academic-calendar-2026-27.pdf"
                  onClick={(e) => { e.preventDefault(); alert("Downloading CBSE Academic Year 2026-27 Schedule"); }}
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700/50 border border-slate-200/50 dark:border-slate-700 transition-colors group"
                >
                  <div className="min-w-0 pr-2">
                    <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate group-hover:text-blue-600">
                      Annual Academic Calendar 2026-27
                    </h5>
                    <span className="text-[10px] text-slate-400">PDF • 220 Working Days</span>
                  </div>
                  <DownloadSimple size={16} className="text-blue-600 shrink-0" weight="bold" />
                </a>

                <a 
                  href="/documents/cbse-assessment-guidelines-2026-27.pdf"
                  onClick={(e) => { e.preventDefault(); alert("Downloading CBSE Assessment & Examination Framework 2026-27"); }}
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700/50 border border-slate-200/50 dark:border-slate-700 transition-colors group"
                >
                  <div className="min-w-0 pr-2">
                    <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate group-hover:text-blue-600">
                      CBSE Assessment &amp; Exam Guidelines
                    </h5>
                    <span className="text-[10px] text-slate-400">PDF • CCE &amp; SAFAL Matrix</span>
                  </div>
                  <DownloadSimple size={16} className="text-blue-600 shrink-0" weight="bold" />
                </a>

                <a 
                  href="/documents/rte-seat-matrix.pdf"
                  onClick={(e) => { e.preventDefault(); alert("Downloading Govt of Karnataka RTE Seat Matrix"); }}
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700/50 border border-slate-200/50 dark:border-slate-700 transition-colors group"
                >
                  <div className="min-w-0 pr-2">
                    <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate group-hover:text-blue-600">
                      RTE 25% Seat Matrix & Guidelines
                    </h5>
                    <span className="text-[10px] text-slate-400">PDF • Govt Notification</span>
                  </div>
                  <DownloadSimple size={16} className="text-blue-600 shrink-0" weight="bold" />
                </a>
              </div>
            </div>

            {/* Upcoming Campus Events Calendar */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <CalendarBlank size={20} className="text-emerald-500" weight="duotone" />
                  <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">Upcoming Events</h3>
                </div>
                <span className="text-[10px] font-bold text-slate-400 font-mono">2026-27</span>
              </div>

              <div className="space-y-3">
                {events.map((evt) => (
                  <div 
                    key={evt.id}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700 space-y-2 hover:border-emerald-500/40 transition-colors"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">
                        {evt.category}
                      </span>
                      <button
                        onClick={(e) => handleAddToGoogleCalendar(evt, e)}
                        className="text-[10px] font-bold text-blue-600 hover:underline flex items-center gap-1"
                        title="Add to Google Calendar"
                      >
                        + G-Cal
                      </button>
                    </div>

                    <h5 className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                      {evt.title}
                    </h5>

                    <div className="space-y-1 text-[11px] text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Clock size={12} className="text-slate-400" />
                        <span>{evt.date} • {evt.time}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin size={12} className="text-slate-400" />
                        <span className="truncate">{evt.venue}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* ARTICLE READING MODAL                                                     */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-800 shadow-2xl relative flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-slate-950 transition-colors shadow-lg"
              >
                <X size={20} weight="bold" />
              </button>

              {/* Modal Hero Image Container (Fixed Aspect Ratio 16:9) */}
              <div className="relative w-full aspect-[16/9] overflow-hidden bg-slate-900">
                <SafeNewsImage
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-400 text-[10px] font-bold uppercase tracking-wider border border-white/10">
                    {selectedArticle.category}
                  </span>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3 text-xs text-slate-500 font-mono border-b border-slate-100 dark:border-slate-800 pb-3">
                  <span className="font-bold text-blue-600">{selectedArticle.author}</span>
                  <span>•</span>
                  <span>Published on {selectedArticle.date}</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white leading-tight">
                  {selectedArticle.title}
                </h2>

                {selectedArticle.kannadaTitle && (
                  <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 italic">
                    {selectedArticle.kannadaTitle}
                  </p>
                )}

                <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 space-y-4 pt-2">
                  <p className="font-medium text-slate-800 dark:text-slate-200">
                    {selectedArticle.summary}
                  </p>
                  {selectedArticle.body && selectedArticle.body !== selectedArticle.summary && (
                    <p className="whitespace-pre-line">
                      {selectedArticle.body}
                    </p>
                  )}
                </div>

                {/* Tags */}
                {selectedArticle.tags && (
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                    {selectedArticle.tags.map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* ADMIN ANNOUNCEMENT CREATE & EDIT MODAL                                    */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showAdminModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    {editingArticle ? 'Edit Announcement' : 'Create New Announcement'}
                  </h3>
                  <p className="text-xs text-slate-500">Publish notices, circulars, and event briefings to the school hub.</p>
                </div>
                <button
                  onClick={() => setShowAdminModal(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-slate-200 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSaveAnnouncement} className="space-y-4 text-xs">
                
                {/* Subject / Title */}
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Subject / Headline *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. CBSE Term-1 Assessment Circular"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                {/* Kannada Title */}
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Kannada Headline (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.kannadaTitle}
                    onChange={(e) => setFormData({ ...formData, kannadaTitle: e.target.value })}
                    placeholder="e.g. ಸಿಬಿಎಸ್ಇ ಮೊದಲ ಅವಧಿಯ ಪರೀಕ್ಷಾ ಸುತ್ತೋಲೆ"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                {/* Category & Author Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="Circulars">Circulars</option>
                      <option value="Academics">Academics</option>
                      <option value="Sports">Sports</option>
                      <option value="Celebrations">Celebrations</option>
                      <option value="Achievements">Achievements</option>
                      <option value="General">General</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Publishing Authority
                    </label>
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      placeholder="e.g. Principal's Desk, Sports Dept"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                {/* Summary / Brief */}
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Short Summary (Displays on Google News cards) *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={formData.summary}
                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                    placeholder="Brief 2-3 line overview..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                {/* Full Body */}
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Full Announcement Text
                  </label>
                  <textarea
                    rows={4}
                    value={formData.body}
                    onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                    placeholder="Complete notification paragraphs..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                {/* Image URL & Fixed-Ratio Preview */}
                <div className="space-y-2">
                  <label className="block font-bold text-slate-700 dark:text-slate-300">
                    Image Attachment URL (Fixed Aspect Ratio: 16:9 / 4:3)
                  </label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-blue-600"
                  />

                  {formData.image && (
                    <div className="w-40 aspect-[16/10] rounded-xl overflow-hidden border border-slate-300 dark:border-slate-700 shadow-sm">
                      <SafeNewsImage
                        src={formData.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Pinned Checkbox */}
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="pinnedCheck"
                    checked={formData.pinned}
                    onChange={(e) => setFormData({ ...formData, pinned: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <label htmlFor="pinnedCheck" className="font-bold text-slate-700 dark:text-slate-300">
                    Pin this announcement to Top Stories Banner
                  </label>
                </div>

                {/* Submit & Cancel */}
                <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowAdminModal(false)}
                    className="px-5 py-2.5 rounded-xl font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg"
                  >
                    {editingArticle ? 'Save Changes' : 'Publish Announcement'}
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

