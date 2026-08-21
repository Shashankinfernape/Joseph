import React from 'react';
import { motion } from 'framer-motion';

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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section className="py-24 px-4 md:px-8 max-w-[1400px] mx-auto bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left: News (2/3 -> 8 cols) */}
        <div className="lg:col-span-8">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-accent text-display-section mb-12"
          >
            School Pulse
          </motion.h2>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col"
          >
            {news.length === 0 ? (
              <div className="animate-pulse flex flex-col gap-8">
                {[1, 2, 3].map(i => (
                  <div key={i} className="border-t border-neutral-200 pt-8 flex gap-8">
                    <div className="w-16 h-20 bg-neutral-200 rounded"></div>
                    <div className="flex-1 space-y-4 py-2">
                      <div className="h-4 bg-neutral-200 rounded w-1/4"></div>
                      <div className="h-6 bg-neutral-200 rounded w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              news.map((item, index) => {
                const dateObj = new Date(item.date || Date.now());
                const day = dateObj.getDate();
                const month = dateObj.toLocaleString(lang, { month: 'short' });

                return (
                  <motion.div 
                    key={item.id || index} 
                    variants={itemVariants}
                    className="group border-t border-neutral-200 pt-8 pb-8 flex items-start gap-8 cursor-pointer"
                  >
                    <div className="flex flex-col items-center justify-start min-w-[4rem]">
                      <span className="font-accent font-bold text-4xl leading-none">{day}</span>
                      <span className="text-sm font-sans uppercase tracking-wider text-neutral-500 mt-1">{month}</span>
                    </div>
                    
                    <div className="flex-1 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                      <div>
                        <span className="text-xs font-sans uppercase tracking-wider text-neutral-500 mb-2 block">
                          {item.category || 'Updates'}
                        </span>
                        <h3 className="font-accent font-semibold text-2xl group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                      </div>
                      
                      {item.image && (
                        <div className="w-32 h-24 shrink-0 overflow-hidden rounded relative">
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
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

        {/* Right: Agenda (1/3 -> 4 cols) */}
        <div className="lg:col-span-4">
           <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="font-accent text-3xl font-semibold mb-12"
          >
            Agenda
          </motion.h2>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col gap-6"
          >
            {events.length === 0 ? (
              <div className="text-neutral-500 font-sans italic">No upcoming events.</div>
            ) : (
              events.map((event, index) => {
                const dateObj = new Date(event.date || Date.now());
                const day = dateObj.getDate();
                const month = dateObj.toLocaleString(lang, { month: 'short' });

                return (
                  <motion.div 
                    key={event.id || index}
                    variants={itemVariants}
                    className="flex gap-4 p-4 rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer group"
                  >
                    <div className="flex flex-col items-center justify-center bg-neutral-100 group-hover:bg-neutral-200 transition-colors rounded-lg p-3 min-w-[3.5rem] h-[3.5rem]">
                      <span className="font-accent font-bold text-lg leading-none">{day}</span>
                      <span className="text-[10px] font-sans uppercase tracking-wider text-neutral-500 mt-1">{month}</span>
                    </div>
                    <div className="flex flex-col justify-center">
                      <h4 className="font-accent font-medium text-lg leading-tight group-hover:text-primary transition-colors">{event.title}</h4>
                      {event.time && (
                        <span className="text-xs font-sans text-neutral-500 mt-1">{event.time}</span>
                      )}
                    </div>
                  </motion.div>
                );
              })
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
