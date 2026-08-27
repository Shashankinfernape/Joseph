import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CalendarBlank } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

const NewsSection = ({ news = [], events = [], lang = 'en' }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section className="bg-[#080808] py-20 lg:py-32 border-b border-white/[0.08]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left: News (8 cols) */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-blue-500" />
                  <span className="text-[11px] font-bold tracking-[0.25em] text-brand-blue-400 uppercase">
                    School Pulse
                  </span>
                </div>
                <h2 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                  Latest News & Circulars
                </h2>
              </div>
              <Link
                to="/news-events"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue-400 hover:text-white transition-colors"
              >
                <span>View All News</span>
                <ArrowRight size={13} weight="bold" />
              </Link>
            </div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="flex flex-col divide-y divide-white/[0.08]"
            >
              {news.length === 0 ? (
                <div className="py-8 text-neutral-500 text-sm italic">
                  Connecting to latest school circulars and announcements...
                </div>
              ) : (
                news.map((item, index) => {
                  const dateObj = new Date(item.date);
                  const isValid = !isNaN(dateObj.getTime());
                  const day = isValid ? dateObj.getDate() : '—';
                  const month = isValid ? dateObj.toLocaleString(lang, { month: 'short' }) : 'NEWS';

                  return (
                    <motion.div 
                      key={item.id || index} 
                      variants={itemVariants}
                      className="group py-6 sm:py-7 flex items-start gap-6 sm:gap-8 cursor-pointer hover:bg-white/[0.02] px-2 rounded-xl transition-colors"
                    >
                      <div className="flex flex-col items-center justify-center min-w-[3.5rem] sm:min-w-[4rem] p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] shrink-0">
                        <span className="font-sans font-extrabold text-2xl sm:text-3xl text-white leading-none">{day}</span>
                        <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-brand-blue-400 mt-1">{month}</span>
                      </div>
                      
                      <div className="flex-1 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                        <div>
                          <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-neutral-400 mb-1.5 block">
                            {item.category || 'School Update'}
                          </span>
                          <h3 className="font-sans font-bold text-base sm:text-xl text-white group-hover:text-brand-blue-400 transition-colors leading-snug tracking-tight">
                            {item.title}
                          </h3>
                        </div>
                        
                        {item.image && (
                          <div className="w-24 h-16 sm:w-28 sm:h-20 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-neutral-900">
                            <img 
                              src={item.image} 
                              alt={item.title} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              loading="lazy"
                            />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })
              )}
            </motion.div>
          </div>

          {/* Right: Agenda & Events (4 cols) */}
          <div className="lg:col-span-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span className="text-[11px] font-bold tracking-[0.25em] text-amber-400 uppercase">
                    Calendar
                  </span>
                </div>
                <h2 className="font-sans text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Upcoming Agenda
                </h2>
              </div>
            </div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="flex flex-col gap-3"
            >
              {events.length === 0 ? (
                <div className="text-neutral-500 font-sans text-sm italic py-4">No upcoming events scheduled.</div>
              ) : (
                events.map((event, index) => {
                  const dateObj = new Date(event.date);
                  const isValid = !isNaN(dateObj.getTime());
                  const day = isValid ? dateObj.getDate() : '—';
                  const month = isValid ? dateObj.toLocaleString(lang, { month: 'short' }) : 'EVENT';

                  return (
                    <motion.div 
                      key={event.id || index} 
                      variants={itemVariants}
                      className="flex gap-4 p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] transition-all cursor-pointer group"
                    >
                      <div className="flex flex-col items-center justify-center bg-white/[0.05] border border-white/10 group-hover:border-brand-blue-500/50 rounded-xl p-2.5 min-w-[3.25rem] h-[3.25rem] shrink-0">
                        <span className="font-sans font-bold text-base text-white leading-none">{day}</span>
                        <span className="text-[9px] font-sans font-bold uppercase tracking-wider text-neutral-400 mt-0.5">{month}</span>
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="font-sans font-semibold text-sm text-white group-hover:text-brand-blue-400 transition-colors leading-snug">
                          {event.title}
                        </h4>
                        {event.time && (
                          <span className="text-[11px] font-sans text-neutral-400 mt-1 flex items-center gap-1">
                            <CalendarBlank size={12} className="text-neutral-500" />
                            {event.time}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  );
                })
              )}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default NewsSection;
