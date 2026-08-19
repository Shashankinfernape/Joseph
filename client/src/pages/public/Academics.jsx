import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { BookOpen, Sparkle, Target, Books, Atom, Graph, Translate, DownloadSimple, Certificate } from '@phosphor-icons/react';
import { PremiumCard, PremiumCardContent, PremiumCardHeader, PremiumCardTitle, PremiumCardDescription } from '../../components/ui/PremiumCard';
import { PremiumButton } from '../../components/ui/PremiumButton';
import { cn } from '../../lib/utils';

export default function Academics() {
  const { t } = useLanguage();
  const { role } = useAuth();
  const [activeTab, setActiveTab] = useState('foundational');

  const STAGES = [
    { id: 'foundational', name: 'Foundational', detail: 'Pre-K to Class 2', age: 'Ages 3–8', icon: Sparkle },
    { id: 'preparatory', name: 'Preparatory', detail: 'Class 3 to 5', age: 'Ages 8–11', icon: BookOpen },
    { id: 'middle', name: 'Middle', detail: 'Class 6 to 8', age: 'Ages 11–14', icon: Target },
    { id: 'secondary', name: 'Secondary', detail: 'Class 9 & 10', age: 'Ages 14–16', icon: Certificate },
    { id: 'senior', name: 'Senior', detail: 'Class 11 & 12', age: 'Ages 16–18', icon: Books }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      
      {/* Header Section (Linear/Stripe style: Clean, precise, large typography) */}
      <section className="pt-24 pb-16 px-4 sm:px-8 max-w-[1024px] mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[var(--radius-full)] bg-secondary-container text-secondary text-[var(--text-label-small)] font-bold uppercase tracking-widest mb-6">
          <BookOpen weight="duotone" size={16} />
          NEP 2020 Framework
        </div>
        <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tight text-on-surface mb-6">
          Academic Excellence.
        </h1>
        <p className="text-[var(--text-title-medium)] text-on-surface-variant max-w-2xl mx-auto">
          Our curriculum is engineered to ignite curiosity, encourage interdisciplinary problem solving, and prepare students for CBSE Board distinctions and competitive examinations.
        </p>
      </section>

      {role === 'student' && (
        <section className="px-4 sm:px-8 max-w-[1024px] mx-auto mb-12">
          <div className="bg-primary-container text-primary-foreground p-6 rounded-[var(--radius-large)] border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-2xl font-bold mb-1">Your Current Subjects</h3>
              <p className="text-[var(--text-body-medium)] opacity-90">Based on your enrollment profile.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Math', 'Science', 'English', 'Computer Science'].map(sub => (
                <span key={sub} className="px-4 py-2 bg-background/50 text-foreground rounded-full text-sm font-bold uppercase tracking-widest">
                  {sub}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content Area */}
      <section className="px-4 sm:px-8 max-w-[1280px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4 shrink-0">
            <div className="sticky top-24">
              <h3 className="text-[var(--text-label-medium)] font-bold text-on-surface-variant uppercase tracking-wider mb-4">Learning Journey</h3>
              <div className="flex flex-col gap-2">
                {STAGES.map(stage => (
                  <button
                    key={stage.id}
                    onClick={() => setActiveTab(stage.id)}
                    className={cn(
                      "flex items-center gap-3 text-left p-3 rounded-[var(--radius-small)] transition-all",
                      activeTab === stage.id 
                        ? "bg-primary-container text-primary font-medium" 
                        : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                    )}
                  >
                    <stage.icon size={20} weight={activeTab === stage.id ? "duotone" : "regular"} />
                    <div>
                      <div className="text-[var(--text-body-medium)]">{stage.name}</div>
                      <div className="text-[var(--text-label-small)] opacity-80">{stage.detail}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:w-3/4 min-h-[400px]">
            <AnimatePresence mode="wait">
              {activeTab === 'foundational' && (
                <motion.div 
                  key="foundational"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <div>
                    <h2 className="font-display text-4xl font-bold text-on-surface mb-4">Foundational Stage</h2>
                    <p className="text-[var(--text-body-large)] text-on-surface-variant leading-relaxed">
                      Emphasizes activity-based, play-centric learning with sensorial development, Jolly Phonics for English reading, bilingual oral competency, early mathematical logic through manipulative toys, and value education.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <PremiumCard hoverEffect={false}>
                      <PremiumCardHeader>
                        <Translate size={32} weight="duotone" className="text-primary mb-2" />
                        <PremiumCardTitle>Language & Phonics</PremiumCardTitle>
                        <PremiumCardDescription>Jolly Phonics framework, bilingual oral competency in Kannada and Hindi.</PremiumCardDescription>
                      </PremiumCardHeader>
                    </PremiumCard>
                    <PremiumCard hoverEffect={false}>
                      <PremiumCardHeader>
                        <Atom size={32} weight="duotone" className="text-secondary mb-2" />
                        <PremiumCardTitle>Cognitive Skills</PremiumCardTitle>
                        <PremiumCardDescription>Manipulative toys, sensorial development, and foundational mathematical logic.</PremiumCardDescription>
                      </PremiumCardHeader>
                    </PremiumCard>
                  </div>
                </motion.div>
              )}
              
              {activeTab === 'senior' && (
                <motion.div 
                  key="senior"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <div>
                    <h2 className="font-display text-4xl font-bold text-on-surface mb-4">Senior Secondary (Classes 11 & 12)</h2>
                    <p className="text-[var(--text-body-large)] text-on-surface-variant leading-relaxed">
                      Rigorous senior secondary education offering Science, Commerce, and Humanities streams with integrated coaching for competitive examinations.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <PremiumCard hoverEffect>
                      <PremiumCardHeader>
                        <div className="w-10 h-10 rounded-[var(--radius-small)] bg-primary-container text-primary flex items-center justify-center mb-4">
                          <Atom size={24} weight="duotone" />
                        </div>
                        <PremiumCardTitle>Science</PremiumCardTitle>
                        <PremiumCardDescription>Physics, Chemistry, Math/Biology, CS. Integrated JEE/NEET prep.</PremiumCardDescription>
                      </PremiumCardHeader>
                    </PremiumCard>
                    <PremiumCard hoverEffect>
                      <PremiumCardHeader>
                        <div className="w-10 h-10 rounded-[var(--radius-small)] bg-secondary-container text-secondary flex items-center justify-center mb-4">
                          <Graph size={24} weight="duotone" />
                        </div>
                        <PremiumCardTitle>Commerce</PremiumCardTitle>
                        <PremiumCardDescription>Accountancy, Business Studies, Economics, Applied Math.</PremiumCardDescription>
                      </PremiumCardHeader>
                    </PremiumCard>
                    <PremiumCard hoverEffect>
                      <PremiumCardHeader>
                        <div className="w-10 h-10 rounded-[var(--radius-small)] bg-tertiary-container text-tertiary flex items-center justify-center mb-4">
                          <Books size={24} weight="duotone" />
                        </div>
                        <PremiumCardTitle>Humanities</PremiumCardTitle>
                        <PremiumCardDescription>History, Pol. Science, Economics/Psychology, Legal Studies.</PremiumCardDescription>
                      </PremiumCardHeader>
                    </PremiumCard>
                  </div>
                </motion.div>
              )}

              {/* Similar blocks would go here for preparatory, middle, secondary, omitted for brevity but keeping structure */}
              {(activeTab === 'preparatory' || activeTab === 'middle' || activeTab === 'secondary') && (
                <motion.div 
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <div>
                    <h2 className="font-display text-4xl font-bold text-on-surface mb-4 capitalize">{activeTab} Stage</h2>
                    <p className="text-[var(--text-body-large)] text-on-surface-variant leading-relaxed">
                      Subject-specialized instruction with rigorous conceptual depth. Students engage deeply with the curriculum through active learning and modern laboratory access.
                    </p>
                  </div>
                  <PremiumCard hoverEffect={false}>
                    <PremiumCardContent className="pt-6">
                      <div className="text-on-surface-variant">Detailed curriculum mapping available in the syllabus repository.</div>
                    </PremiumCardContent>
                  </PremiumCard>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Resources Banner */}
      <section className="px-4 sm:px-8 max-w-[1280px] mx-auto mt-24">
        <div className="bg-surface-container-high rounded-[var(--radius-large)] p-10 flex flex-col md:flex-row items-center justify-between gap-8 border border-[var(--outline-variant)]">
          <div>
            <h3 className="font-display text-3xl font-bold text-on-surface mb-2">Academic Handbooks</h3>
            <p className="text-[var(--text-body-medium)] text-on-surface-variant max-w-xl">
              Download comprehensive CBSE prescribed textbook lists, NCERT reference guides, and annual assessment circulars.
            </p>
          </div>
          <div className="flex gap-4 shrink-0">
            <PremiumButton variant="filled">
              <DownloadSimple size={20} weight="bold" />
              Syllabus 2026-27
            </PremiumButton>
            <PremiumButton variant="outlined">
              Booklist
            </PremiumButton>
          </div>
        </div>
      </section>

    </div>
  );
}
