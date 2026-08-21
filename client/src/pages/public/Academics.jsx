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
  const [activeTab, setActiveTab] = useState('pre-primary');

  const STAGES = [
    { id: 'pre-primary', name: 'Pre-Primary', detail: 'Nursery to UKG', icon: Sparkle },
    { id: 'primary', name: 'Primary School', detail: 'Grades 1 to 5', icon: BookOpen },
    { id: 'middle', name: 'Middle School', detail: 'Grades 6 to 8', icon: Target },
    { id: 'secondary', name: 'Secondary School', detail: 'Grades 9 & 10', icon: Certificate }
  ];

  const curriculumData = {
    'pre-primary': {
      title: 'Pre-Primary',
      description: 'A nurturing environment focusing on foundational skills, sensory development, and early learning.',
      grades: [
        { grade: 'Nursery', subjects: ['English', 'Numbers & Early Math', 'General Awareness', 'Rhymes & Storytelling', 'Art & Craft', 'Music & Movement', 'Physical Activities'] },
        { grade: 'LKG', subjects: ['English', 'Numbers & Early Math', 'Kannada', 'General Awareness', 'Rhymes & Storytelling', 'Art & Craft', 'Music & Movement', 'Physical Activities'] },
        { grade: 'UKG', subjects: ['English', 'Mathematics', 'Kannada', 'Hindi (Introduction)', 'Environmental Awareness', 'Art & Craft', 'Music', 'Physical Education'] }
      ]
    },
    'primary': {
      title: 'Primary School',
      description: 'Building a strong foundation in core subjects while encouraging curiosity and creative expression.',
      grades: [
        { grade: 'Grade 1', subjects: ['English', 'Kannada', 'Hindi', 'Mathematics', 'Environmental Studies', 'Computer Science', 'General Knowledge', 'Art & Craft', 'Physical Education', 'Music'] },
        { grade: 'Grade 2', subjects: ['English', 'Kannada', 'Hindi', 'Mathematics', 'Environmental Studies', 'Computer Science', 'General Knowledge', 'Art & Craft', 'Physical Education', 'Music'] },
        { grade: 'Grade 3', subjects: ['English', 'Kannada', 'Hindi', 'Mathematics', 'Environmental Studies', 'Computer Science', 'General Knowledge', 'Art & Craft', 'Physical Education', 'Music'] },
        { grade: 'Grade 4', subjects: ['English', 'Kannada', 'Hindi', 'Mathematics', 'Science', 'Social Studies', 'Computer Science', 'General Knowledge', 'Art & Craft', 'Physical Education'] },
        { grade: 'Grade 5', subjects: ['English', 'Kannada', 'Hindi', 'Mathematics', 'Science', 'Social Studies', 'Computer Science', 'General Knowledge', 'Art & Craft', 'Physical Education'] }
      ]
    },
    'middle': {
      title: 'Middle School',
      description: 'Fostering analytical thinking, deeper subject knowledge, and essential life skills.',
      grades: [
        { grade: 'Grade 6', subjects: ['English', 'Kannada', 'Hindi', 'Mathematics', 'Science', 'Social Science', 'Computer Science', 'General Knowledge', 'Art Education', 'Physical Education'] },
        { grade: 'Grade 7', subjects: ['English', 'Kannada', 'Hindi', 'Mathematics', 'Science', 'Social Science', 'Computer Science', 'General Knowledge', 'Art Education', 'Physical Education'] },
        { grade: 'Grade 8', subjects: ['English', 'Kannada', 'Hindi', 'Mathematics', 'Science', 'Social Science', 'Computer Science', 'Art Education', 'Physical Education', 'Life Skills'] }
      ]
    },
    'secondary': {
      title: 'Secondary School',
      description: 'Rigorous preparation for board examinations with specialized subject choices.',
      grades: [
        { grade: 'Grade 9', subjects: ['English', 'Kannada', 'Hindi', 'Mathematics', 'Science', 'Social Science', 'Information Technology / Computer Applications', 'Physical Education', 'Art Education'] },
        { grade: 'Grade 10', subjects: ['English', 'Kannada', 'Hindi', 'Mathematics', 'Science', 'Social Science', 'Information Technology / Computer Applications', 'Physical Education', 'Art Education'] }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      
      {/* Header Section */}
      <section className="pt-24 pb-16 px-4 sm:px-8 max-w-[1024px] mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[var(--radius-full)] bg-secondary-container text-secondary text-[var(--text-label-small)] font-bold uppercase tracking-widest mb-6">
          <BookOpen weight="duotone" size={16} />
          Academic Framework
        </div>
        <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tight text-on-surface mb-6">
          Curriculum & Subjects
        </h1>
        <p className="text-[var(--text-title-medium)] text-on-surface-variant max-w-2xl mx-auto">
          Explore our structured academic progression from early years through secondary education, designed to nurture well-rounded individuals.
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
              {Object.entries(curriculumData).map(([key, data]) => (
                activeTab === key && (
                  <motion.div 
                    key={key}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="font-display text-4xl font-bold text-on-surface mb-4">{data.title}</h2>
                      <p className="text-[var(--text-body-large)] text-on-surface-variant leading-relaxed">
                        {data.description}
                      </p>
                    </div>
                    <div className="space-y-6">
                      {data.grades.map((gradeData, idx) => (
                        <PremiumCard key={idx} hoverEffect={false}>
                          <PremiumCardHeader>
                            <PremiumCardTitle>{gradeData.grade}</PremiumCardTitle>
                          </PremiumCardHeader>
                          <PremiumCardContent>
                            <div className="flex flex-wrap gap-2 pt-2">
                              {gradeData.subjects.map((subject, sIdx) => (
                                <span key={sIdx} className="px-3 py-1 bg-surface-container text-on-surface rounded-md text-[var(--text-label-medium)] font-medium border border-[var(--outline-variant)]">
                                  {subject}
                                </span>
                              ))}
                            </div>
                          </PremiumCardContent>
                        </PremiumCard>
                      ))}
                    </div>
                  </motion.div>
                )
              ))}
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
