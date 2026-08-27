import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { fetchAPI } from '../../utils/api';

// Home Page Sections
import HeroSection from '../../components/home/HeroSection';
import IdentityRibbon from '../../components/home/IdentityRibbon';
import PhilosophySection from '../../components/home/PhilosophySection';
import AcademicStats from '../../components/home/AcademicStats';
import CampusSection from '../../components/home/CampusSection';
import AchievementsSection from '../../components/home/AchievementsSection';
import TestimonialsSection from '../../components/home/TestimonialsSection';
import NewsSection from '../../components/home/NewsSection';
import AdmissionsCTA from '../../components/home/AdmissionsCTA';

export default function Home() {
  const { lang } = useLanguage();
  const { isAuthenticated, currentUser, role } = useAuth();
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchAPI('/cms/news')
      .then(res => { if (res.success) setNews(res.news.slice(0, 3)); })
      .catch(() => {});
    fetchAPI('/cms/events')
      .then(res => { if (res.success) setEvents(res.events.slice(0, 4)); })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 selection:bg-brand-blue-600 selection:text-white overflow-hidden">
      <HeroSection />
      <IdentityRibbon />
      <PhilosophySection />
      <AcademicStats />
      <CampusSection />
      <AchievementsSection />
      <TestimonialsSection />
      <NewsSection news={news} events={events} lang={lang} />
      <AdmissionsCTA />
    </div>
  );
}
