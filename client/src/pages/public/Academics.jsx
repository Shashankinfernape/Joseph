import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Sparkle,
  Certificate,
  Brain,
  Globe,
  MusicNote,
  PaintBrush,
  Barbell,
  Code,
  FlowerLotus,
  TreeStructure,
  Scroll,
  Microscope,
  Calculator,
  DownloadSimple,
  FileText,
  ArrowRight,
  ShieldCheck,
  Graph,
  Atom,
  Laptop,
  Heartbeat,
  Translate,
  CaretDown,
  CheckCircle,
  TreePalm,
  Flask
} from '@phosphor-icons/react';

/* ─────────────────────────────────────────────────────────────
   DATA: STAGES → GRADES → SUBJECTS with Book & Content Details
───────────────────────────────────────────────────────────── */
const CURRICULUM = {
  foundational: {
    id: 'foundational',
    label: 'Foundational Stage',
    shortLabel: 'Foundational',
    span: 'Pre-Nursery – Class 2',
    ages: 'Ages 3–8',
    icon: Sparkle,
    color: '#F59E0B',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    description: 'Play-based, sensory-rich learning aligned with NEP 2020 Early Childhood Care & Education.',
    grades: [
      {
        id: 'pre-nursery',
        label: 'Pre-Nursery & Nursery',
        subjects: [
          {
            name: 'English Phonics & Early Literacy',
            icon: Globe,
            book: 'Jolly Phonics (School Prescribed) + Oral Activities',
            topics: ['Letter recognition A–Z', 'Phonemic rhymes and nursery songs', 'Picture-word matching', 'Oral storytelling and listening', 'Tracing alphabets & pre-writing strokes'],
            note: 'No formal exams. Activity-based oral assessment only.'
          },
          {
            name: 'Early Mathematics',
            icon: Calculator,
            book: 'Activity-based Number Cards, Shapes & Counting Blocks',
            topics: ['Numbers 1 to 20 recognition', 'Counting with manipulatives', 'Basic shapes (circle, square, triangle)', 'Colors and sizes (big/small, tall/short)', 'Simple patterns and sorting'],
            note: 'Mathematical concepts introduced through hands-on play and sensory activities.'
          },
          {
            name: 'Environmental Awareness (EVS)',
            icon: TreePalm,
            book: 'Our World — Teacher-Curated Activity Book',
            topics: ['My body and senses', 'Family and relationships', 'Animals and their habitats', 'Plants we see around us', 'Seasons: Summer, Monsoon, Winter'],
            note: 'Taught through outdoor nature walks, craft, and show-and-tell sessions.'
          },
          {
            name: 'Art, Craft & Clay Modeling',
            icon: PaintBrush,
            book: 'No fixed textbook — school art kit materials',
            topics: ['Finger painting and brushwork', 'Clay rolling and shapes', 'Paper folding (origami)', 'Collage and paste work', 'Free drawing and expression'],
            note: 'Develops fine motor control, creativity, and spatial reasoning.'
          },
          {
            name: 'Music & Movement',
            icon: MusicNote,
            book: 'School Song Book (Karnataka folk and Hindi nursery rhymes)',
            topics: ['Rhythmic clapping and body percussion', 'National Anthem & school prayer', 'Kannada folk songs (basic)', 'Simple dance & physical coordination', 'Group singing activities'],
            note: 'Builds social confidence and auditory processing skills.'
          },
          {
            name: 'Physical Education & Outdoor Play',
            icon: Barbell,
            book: 'Structured Outdoor Play Program — School PE Curriculum',
            topics: ['Running, skipping, jumping fundamentals', 'Balance and coordination games', 'Group cooperative play', 'Ball-handling exercises', 'Morning yoga & breathing'],
            note: 'Minimum 45 minutes of supervised outdoor play per school day.'
          }
        ]
      },
      {
        id: 'lkg-ukg',
        label: 'LKG & UKG (Kindergarten)',
        subjects: [
          {
            name: 'English Reading & Pre-Writing',
            icon: Globe,
            book: 'Stepping Stones (LKG / UKG) — Oxford or School Prescribed',
            topics: ['Sight words and CVC words', 'Blending sounds (cat, bat, mat)', 'Reading simple 2-word sentences', 'Pencil grip and letter formation', 'Dictation of simple words'],
            note: 'Focus on phonemic awareness and pre-reading readiness.'
          },
          {
            name: 'Kannada — Oral & Script Familiarization',
            icon: Scroll,
            book: 'Karnataka State Board Kannada Primer (School Prescribed)',
            topics: ['Introduction to Kannada script (Aksharamale basics)', 'Basic Kannada oral vocabulary (colors, numbers, greetings)', 'Simple Kannada songs and rhymes', 'Listening comprehension in Kannada', 'Name letters and common words'],
            note: 'Mandated by Karnataka Compulsory Kannada Act, 2015. Oral emphasis in LKG/UKG.'
          },
          {
            name: 'Early Mathematics',
            icon: Calculator,
            book: 'My Book of Numbers — School Prescribed Workbook',
            topics: ['Numbers 1 to 50 (LKG) / 1 to 100 (UKG)', 'Addition and subtraction with objects', 'Odd and even numbers introduction', 'Time concepts: morning, afternoon, night', 'Measurement: heavy/light, more/less'],
            note: 'Concrete materials (abacus, blocks, counters) used throughout.'
          },
          {
            name: 'Environmental Studies (EVS)',
            icon: TreePalm,
            book: 'Around Us — Environmental Studies (LKG/UKG School Kit)',
            topics: ['My school, my classroom, my friends', 'Community helpers (doctor, teacher, farmer)', 'Food we eat and where it comes from', 'Water, air, and plants', 'Festivals of Karnataka and India'],
            note: 'Integrated with Art and Hindi oral activities through thematic units.'
          },
          {
            name: 'Hindi — Introductory Oral Rhymes',
            icon: Translate,
            book: 'Hindi Balgeet & Nursery Rhyme Book (School Prescribed)',
            topics: ['Basic Hindi greetings (Namaste, Dhanyawad)', 'Simple counting in Hindi (ek, do, teen...)', 'Nursery rhymes: Lakdi ki Kathi, Chanda Mama', 'Body parts in Hindi (haath, pair, aankh)', 'Animal names in Hindi'],
            note: 'Introduced informally in UKG. No formal assessment — oral participation only.'
          }
        ]
      },
      {
        id: 'class-1-2',
        label: 'Class 1 & Class 2',
        subjects: [
          {
            name: 'Language 1: English',
            icon: Globe,
            book: 'Marigold Book 1 / Book 2 (NCERT) + Rain Drops (Supplementary Reader)',
            topics: ['Reading comprehension passages and poems', 'Grammar: nouns, verbs, adjectives, singular-plural', 'Composition: picture description, short paragraph', 'Dictation and spellings', 'Oral reading aloud and elocution'],
            note: 'Code 184 (CBSE). Main medium of instruction for all subjects.'
          },
          {
            name: 'Language 2: Kannada',
            icon: Scroll,
            book: 'Karnataka State Board Kannada Parichaya / Pathya Pustaka (Class 1 & 2)',
            topics: ['Kannada Aksharamale — all 49 letters', 'Simple Kannada words and their meanings', 'Short prose passages and Kannada poems', 'Basic Kannada grammar (Alinganama, Naama)', 'Writing simple Kannada sentences'],
            note: 'CBSE Code 015. Mandated second language for all Karnataka schools from Class 1.'
          },
          {
            name: 'Language 3: Hindi (Foundational)',
            icon: Translate,
            book: 'Rimjhim Book 1 / Book 2 (NCERT)',
            topics: ['Hindi Varnamala (Swar and Vyanjan)', 'Simple matra words (aa, ee, oo matras)', 'Short Hindi poems and rhymes', 'Basic Hindi sentences and conversation', 'Dictation of common Hindi words'],
            note: 'CBSE Code 085. Introduced at Class 1 in some schools, standardized from Class 3 per curriculum.'
          },
          {
            name: 'Mathematics',
            icon: Calculator,
            book: 'Math Magic Book 1 / Book 2 (NCERT)',
            topics: ['Addition and subtraction up to 3 digits', 'Multiplication tables (2–5 in Class 1; 2–10 in Class 2)', 'Measurement: length, weight, and capacity', 'Geometry: 2D shapes and symmetry basics', 'Time (reading a clock) and Money (coins and notes)'],
            note: 'Activity-based approach using NCERT materials, math games, and concrete tools.'
          },
          {
            name: 'Environmental Studies (EVS)',
            icon: TreePalm,
            book: 'Looking Around — EVS Book 1 / Book 2 (NCERT)',
            topics: ['Family, food, shelter, and water', 'Plants and animals around us', 'Our environment and keeping it clean', 'Local geography: Bengaluru, Karnataka', 'Transport and communication'],
            note: 'Integrated with Art and Physical Education through thematic projects.'
          },
          {
            name: 'Computer Literacy',
            icon: Code,
            book: 'My Computer Book — Class 1 / 2 (School Prescribed)',
            topics: ['Introduction to computer parts (monitor, keyboard, mouse)', 'Switching on and using a mouse', 'MS Paint — drawing and coloring', 'Typing alphabets and numbers', 'Internet safety basics (Class 2)'],
            note: 'Hands-on sessions in school computer lab. No formal exam — observation-based.'
          }
        ]
      }
    ]
  },
  preparatory: {
    id: 'preparatory',
    label: 'Preparatory Stage',
    shortLabel: 'Preparatory',
    span: 'Class 3 – 5',
    ages: 'Ages 8–11',
    icon: BookOpen,
    color: '#10B981',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    description: 'Inquiry-based discovery, strong multilingual reading, and foundational mathematical reasoning.',
    grades: [
      {
        id: 'class-3',
        label: 'Class 3',
        subjects: [
          {
            name: 'Language 1: English',
            icon: Globe,
            book: 'Marigold Book 3 (NCERT) + Supplementary Reader: Magic English',
            topics: ['Reading comprehension with inference questions', 'Grammar: tenses (simple present & past), punctuation', 'Essay writing and letter writing (informal)', 'Poem appreciation and recitation', 'Vocabulary building and idioms'],
            note: 'CBSE Code 184. First year of formal composition and grammar instruction.'
          },
          {
            name: 'Language 2: Kannada',
            icon: Scroll,
            book: 'Karnataka State Board Nali-Kali Kannada / Pathya Pustaka Class 3',
            topics: ['Prose: short stories from Kannada literature', 'Poetry: Vachanas and folk poems', 'Grammar: gender (Linga), number (Vachana), case (Vibhakti)', 'Creative writing in Kannada (5–6 sentences)', 'Reading comprehension and questions-answers'],
            note: 'CBSE Code 015. Mandatory state language. Karnataka Board prescribed textbook used.'
          },
          {
            name: 'Language 3: Hindi',
            icon: Translate,
            book: 'Rimjhim Book 3 (NCERT)',
            topics: ['Hindi prose stories and poems', 'Matra practice and common words', 'Simple grammar: ling (gender), vachan (number)', 'Short paragraph writing in Hindi', 'Oral reading and comprehension'],
            note: 'CBSE Code 085. Formally introduced as Third Language from Class 3 as per national 3-language formula.'
          },
          {
            name: 'Mathematics',
            icon: Calculator,
            book: 'Math Magic Book 3 (NCERT)',
            topics: ['Numbers up to 10,000 and their operations', 'Long multiplication and simple division', 'Fractions: introduction (half, quarter, one-third)', 'Data Handling: tally marks and pictographs', 'Perimeter and simple area concepts'],
            note: 'Emphasis on word problems, mental math, and real-life application.'
          },
          {
            name: 'Environmental Studies (EVS)',
            icon: TreePalm,
            book: 'Looking Around Book 3 (NCERT)',
            topics: ['Animals: food, shelter, movement, and habitat', 'Plants: parts of a plant, photosynthesis basics', 'Water: sources, water cycle, conservation', 'Our food: food chain and nutrition basics', 'Maps: reading simple maps of India and Karnataka'],
            note: 'Last year of EVS as an integrated subject. From Class 6, splits into Science and Social Science.'
          },
          {
            name: 'Computer Science',
            icon: Code,
            book: 'Computer Masti Level 3 (Iken / School Prescribed)',
            topics: ['Windows basics: desktop, files, folders', 'MS Word: typing a paragraph, fonts, bold/italic', 'MS Paint advanced: shapes, fill tool, text tool', 'Scratch Jr: introduction to block programming', 'Internet: what is a browser, safe searching basics'],
            note: 'Includes supervised lab sessions twice per week.'
          }
        ]
      },
      {
        id: 'class-4',
        label: 'Class 4',
        subjects: [
          {
            name: 'Language 1: English',
            icon: Globe,
            book: 'Marigold Book 4 (NCERT) + Supplementary Reader: Sunflower English',
            topics: ['Reading: prose, poetry, and non-fiction passages', 'Grammar: adjectives, adverbs, prepositions, conjunctions', 'Composition: paragraph and informal letter', 'Comprehension with inference and vocabulary questions', 'Creative writing: story continuation'],
            note: 'CBSE Code 184. Strong emphasis on grammar application and expressive writing.'
          },
          {
            name: 'Language 2: Kannada',
            icon: Scroll,
            book: 'Karnataka State Board Kannada Pathya Pustaka Class 4',
            topics: ['Prose: literary selections from Karnataka writers', 'Poetry: Sarvajna Vachanas and classical Kannada poems', 'Grammar: Sandhis (basic), Samas (compound words)', 'Paragraph and essay writing in Kannada', 'Kannada culture: festivals, heritage sites of Karnataka'],
            note: 'CBSE Code 015. Deepening state cultural awareness through literature.'
          },
          {
            name: 'Language 3: Hindi',
            icon: Translate,
            book: 'Rimjhim Book 4 (NCERT)',
            topics: ['Prose stories and Hindi poetry selections', 'Grammar: kriya (verbs), visheshan (adjective)', 'Letter writing in Hindi (simple informal letters)', 'Comprehension passages and questions-answers', 'Essay topics: My school, My city, My favourite season'],
            note: 'CBSE Code 085. Students begin formal Hindi composition practice.'
          },
          {
            name: 'Mathematics',
            icon: Calculator,
            book: 'Math Magic Book 4 (NCERT)',
            topics: ['Large numbers: place value up to lakhs', 'Fractions: proper, improper, and mixed fractions', 'Factors and multiples (HCF, LCM basics)', 'Geometry: angles, triangles, and quadrilaterals', 'Measurement: metric system and unit conversions'],
            note: 'Introduces logical reasoning puzzles and pattern recognition.'
          },
          {
            name: 'General Science',
            icon: Microscope,
            book: 'NCERT EVS Book 4 "Looking Around" + School Science Supplement',
            topics: ['Food sources: plants vs. animals; balanced diet', 'Matter and energy: solids, liquids, gases', 'Light and shadow: reflection basics', 'Living things: plant and animal adaptations', 'Karnataka geography: rivers, mountains, and agriculture'],
            note: 'Practical experiments with simple classroom materials introduced this year.'
          },
          {
            name: 'Social Studies',
            icon: TreeStructure,
            book: 'NCERT Social Studies Class 4 + Karnataka Heritage Reader',
            topics: ['Ancient Karnataka kingdoms (Hoysala, Vijayanagara)', 'Maps: political map of Karnataka and India', 'Civic life: local government and Gram Panchayat', 'Transport through the ages: bullock cart to aircraft', 'Famous personalities from Karnataka'],
            note: 'Special focus on Karnataka history and regional identity.'
          },
          {
            name: 'Computer Applications',
            icon: Code,
            book: 'Computer Masti Level 4 / School Prescribed Digital Literacy Book',
            topics: ['MS Word: paragraph formatting, page layout, headers', 'Spreadsheet introduction: Excel basics, simple tables', 'Scratch: event blocks, loops, and simple animations', 'Internet: email basics, safe online behavior', 'Hardware revision: input and output devices'],
            note: 'Typing speed target: 15 words per minute by end of Class 4.'
          }
        ]
      },
      {
        id: 'class-5',
        label: 'Class 5',
        subjects: [
          {
            name: 'Language 1: English',
            icon: Globe,
            book: 'Marigold Book 5 (NCERT) + Supplementary Reader: Mridang',
            topics: ['Reading complex prose and unseen comprehension passages', 'Grammar: tenses (all), active/passive voice introduction', 'Essay and formal letter writing (Class 5 standard)', 'Poem analysis and appreciation', 'Vocabulary: antonyms, synonyms, homophones, idioms'],
            note: 'CBSE Code 184. Students preparing for CBSE SAFAL Grade 5 competency assessment.'
          },
          {
            name: 'Language 2: Kannada',
            icon: Scroll,
            book: 'Karnataka State Board Kannada Pathya Pustaka Class 5',
            topics: ['Advanced Kannada literature selections', 'Grammar: Alankaras (figures of speech), tenses (Kala)', 'Essay writing in Kannada on familiar topics', 'Comprehension: unseen passages in Kannada', 'Kannada drama and folk art forms'],
            note: 'CBSE Code 015. Grammar complexity increases in preparation for middle school.'
          },
          {
            name: 'Language 3: Hindi',
            icon: Translate,
            book: 'Rimjhim Book 5 (NCERT)',
            topics: ['Hindi prose and poetry from NCERT Rimjhim', 'Grammar: kaal (tenses), karak (cases)', 'Formal and informal letter writing in Hindi', 'Short essay and paragraph topics', 'Comprehension: unseen Hindi passages'],
            note: 'CBSE Code 085. Final preparatory year before higher-level Hindi curriculum.'
          },
          {
            name: 'Mathematics',
            icon: Calculator,
            book: 'Math Magic Book 5 (NCERT)',
            topics: ['Large numbers: operations with numbers up to crores', 'Decimals: introduction, place value, operations', 'Data handling: bar graphs and pie chart reading', 'Geometry: 3D shapes — cube, cylinder, cone, sphere', 'Applied arithmetic: profit/loss basics, simple interest intro'],
            note: 'CBSE SAFAL Grade 5 assessments include Mathematics competency evaluation.'
          },
          {
            name: 'Science',
            icon: Microscope,
            book: 'NCERT Science Book 5 + School Practical Activity Book',
            topics: ['Living things: reproduction and life cycles', 'Forces: gravity, magnetism, and friction', 'Matter: properties and states (solids, liquids, gases)', 'Human body: digestive, respiratory, and circulatory systems', 'Environmental science: pollution, water conservation, recycling'],
            note: 'First formal laboratory practical sessions begin in Class 5.'
          },
          {
            name: 'Social Studies',
            icon: TreeStructure,
            book: 'NCERT Social Studies Class 5 + Our India Supplementary',
            topics: ['Indian heritage: Indus Valley, Vedic period', 'Geography: India\'s natural resources and climate zones', 'Indian Constitution: fundamental rights and duties (basic)', 'Indian economy: agriculture, industry, services', 'Global awareness: world map reading and continents'],
            note: 'Civic awareness module includes school community projects (SEWA introduction).'
          },
          {
            name: 'Computer Science & Coding',
            icon: Code,
            book: 'Computer Masti Level 5 + Scratch Coding Workbook',
            topics: ['Python basics: print, variables, simple input/output', 'Scratch: multi-sprite projects and game logic', 'MS PowerPoint: creating a 5-slide presentation', 'Internet research skills: credible sources and citation', 'Digital citizenship: online ethics and cyberbullying awareness'],
            note: 'Typing target: 25 WPM by end of Class 5. Coding concepts formally introduced.'
          }
        ]
      }
    ]
  },
  middle: {
    id: 'middle',
    label: 'Middle School Stage',
    shortLabel: 'Middle School',
    span: 'Class 6 – 8',
    ages: 'Ages 11–14',
    icon: Brain,
    color: '#3B82F6',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    description: 'Specialized subjects, laboratory science, 3-language mastery, and computational thinking with Python and AI.',
    grades: [
      {
        id: 'class-6',
        label: 'Class 6',
        subjects: [
          {
            name: 'Language 1: English',
            icon: Globe,
            book: 'Honeysuckle (NCERT) + A Pact with the Sun (Supplementary Reader)',
            topics: ['Prose: narrative and descriptive reading', 'Poetry: Emily Dickinson, Vikram Seth, and Indian poets', 'Grammar: all parts of speech, phrases, clauses', 'Writing: formal & informal letters, descriptive essays', 'Comprehension: unseen passages with inferential questions'],
            note: 'CBSE Code 184. Complex literary analysis and structured grammar introduced.'
          },
          {
            name: 'Language 2: Kannada',
            icon: Scroll,
            book: 'Karnataka State Board Kannada Sahitya Mala / Pathya Pustaka Class 6',
            topics: ['Kannada literary prose and poetry from Karnataka writers', 'Grammar: Vibhakti (case endings), Sandhi (euphonic combination)', 'Essay composition: descriptive and narrative in Kannada', 'Comprehension: seen and unseen passages', 'Kannada literary periods: Pampa, Ranna, Ponna (introductory)'],
            note: 'CBSE Code 015. Karnataka State Board prescribed text used under CBSE affiliation.'
          },
          {
            name: 'Language 3: Hindi',
            icon: Translate,
            book: 'Vasant Bhag 1 (NCERT) + Bal Ram Katha (Supplementary)',
            topics: ['Prose and poetry from Vasant Part 1', 'Grammar: Samas (compound words), Paryayvachi (synonyms)', 'Letter writing: formal (aavedan patra)', 'Essay writing in Hindi (descriptive topics)', 'Comprehension: Hindi unseen passages'],
            note: 'CBSE Code 085. Advanced Hindi grammar and composition starts from Class 6.'
          },
          {
            name: 'Mathematics',
            icon: Calculator,
            book: 'Mathematics — Class 6 (NCERT)',
            topics: ['Number System: integers, rational numbers, prime factorisation', 'Algebra: introduction to variables and basic expressions', 'Geometry: lines, angles (types and properties), triangles', 'Ratio & Proportion: unitary method', 'Data Handling: bar graphs, mean, median, mode (basic)'],
            note: 'First year of formal algebraic thinking and abstract mathematical reasoning.'
          },
          {
            name: 'Science',
            icon: Microscope,
            book: 'Science — Class 6 (NCERT)',
            topics: ['Physics: motion and measurement (speed, distance, time)', 'Chemistry: matter — elements, compounds, mixtures; separation methods', 'Biology: the cell — plant vs. animal cells; photosynthesis', 'Ecology: food chains and food webs; biotic/abiotic factors', 'Human body systems: digestive and circulatory basics'],
            note: 'Laboratory sessions every week. Practical notebook maintained throughout the year.'
          },
          {
            name: 'Social Science',
            icon: TreeStructure,
            book: 'Our Pasts Book 1 (History) + The Earth Our Habitat (Geography) + Social & Political Life 1 (Civics) — NCERT',
            topics: ['History: Ancient India — Indus Valley to Mauryan Empire', 'Geography: Globe, maps, landforms, and weather patterns', 'Civics: Democracy, local self-government, Gram Panchayat', 'Karnataka link: Deccan kingdoms and Bengaluru heritage', 'Map skills: India physical and political maps'],
            note: 'Three textbooks maintained separately: History, Geography, and Civics/Pol.Science.'
          },
          {
            name: 'Computer Science',
            icon: Code,
            book: 'Computer Science Class 6 — School Prescribed + Kite Platform (Karnataka AI Initiative)',
            topics: ['HTML basics: tags, headings, paragraphs, lists, images', 'Scratch: complex projects with variables and conditionals', 'Introduction to algorithms and flowcharts', 'Spreadsheets: formulas (SUM, AVERAGE, MAX)', 'CBSE SAFAL Grade 6 digital literacy assessment benchmark'],
            note: 'Karnataka government Kite (IT@School) materials integrated alongside school curriculum.'
          }
        ]
      },
      {
        id: 'class-7',
        label: 'Class 7',
        subjects: [
          {
            name: 'Language 1: English',
            icon: Globe,
            book: 'Honeycomb (NCERT) + An Alien Hand (Supplementary Reader)',
            topics: ['Complex literary analysis: prose, poetry, and non-fiction', 'Grammar: active/passive voice, direct/indirect speech, tenses mastery', 'Writing: formal letters, report writing, article writing', 'Debate preparation and public speaking skills', 'Advanced comprehension: inference, theme, and character analysis'],
            note: 'CBSE Code 184. Students prepare for higher-level Board English format.'
          },
          {
            name: 'Language 2: Kannada',
            icon: Scroll,
            book: 'Karnataka State Board Kannada Pathya Pustaka Class 7',
            topics: ['Literary works by B.M. Srikantaiah, Kuvempu, D.V. Gundappa (introductory)', 'Grammar: Alankaras (Upama, Rupaka, Shlesa)', 'Creative writing: drama scripts and Kannada short stories', 'Group discussion and oral Kannada communication', 'Cultural heritage: music, dance, and fine arts of Karnataka'],
            note: 'CBSE Code 015. Rich Kannada literary tradition forms the core of the curriculum.'
          },
          {
            name: 'Language 3: Hindi',
            icon: Translate,
            book: 'Vasant Bhag 2 (NCERT) + Mahabharat Katha (Supplementary)',
            topics: ['Prose: Premchand, Harishankar Parsai (selections)', 'Grammar: Upsarg, Pratyay (prefix/suffix), Kriya Visheshana', 'Formal letter writing: official complaints and requests', 'Essay: narrative and argumentative topics', 'Poetry: Kabir, Mirabai, Surdas (introductory)'],
            note: 'CBSE Code 085. Classical Hindi literature introduced alongside modern prose.'
          },
          {
            name: 'Mathematics',
            icon: Calculator,
            book: 'Mathematics — Class 7 (NCERT)',
            topics: ['Integers: operations on integers and number line', 'Algebra: linear equations in one variable', 'Geometry: congruence of triangles, properties of parallel lines', 'Mensuration: area of triangles, quadrilaterals, and circles', 'Commercial Math: percentage, profit & loss, simple interest, discount'],
            note: 'Introduction to formal algebraic equations and commercial mathematics applications.'
          },
          {
            name: 'Science',
            icon: Microscope,
            book: 'Science — Class 7 (NCERT)',
            topics: ['Physics: heat and temperature, electric current, light (reflection)', 'Chemistry: acids, bases, and salts; physical & chemical changes; soil', 'Biology: nutrition in plants & animals, respiration, transportation in organisms', 'Ecology: weather, climate, and forest as an ecosystem', 'Human reproductive system (introductory, age-appropriate)'],
            note: 'Composite Science with Physics, Chemistry, Biology sections each semester.'
          },
          {
            name: 'Social Science',
            icon: TreeStructure,
            book: 'Our Pasts Book 2 (History) + Our Environment (Geography) + Social & Political Life 2 (Civics) — NCERT',
            topics: ['History: Medieval India — Delhi Sultanate, Mughal Empire, Bhakti and Sufi movements', 'Geography: environment, natural vegetation, human-environment interaction', 'Civics: state government, judiciary, understanding media and democracy', 'Karnataka link: Mysore Maharajas, unification of Karnataka state', 'Map work: physical features and climate zones of Asia'],
            note: 'Special attention to Karnataka\'s role in the Bhakti movement (Veerashaiva tradition).'
          },
          {
            name: 'Computer Science',
            icon: Code,
            book: 'Python for Class 7 — School Prescribed + Open Source Python Materials',
            topics: ['Python: variables, data types (int, float, string, bool)', 'Python: if-else conditionals and loops (for, while)', 'Python: functions and simple list operations', 'Web basics: CSS introduction, styling HTML pages', 'Cyber safety: phishing, privacy settings, responsible social media'],
            note: 'Students produce at least 3 complete Python programs by end of year.'
          }
        ]
      },
      {
        id: 'class-8',
        label: 'Class 8',
        subjects: [
          {
            name: 'Language 1: English',
            icon: Globe,
            book: 'It So Happened (NCERT) + Honeydew (Main Reader)',
            topics: ['Advanced literary analysis: theme, tone, character, conflict', 'Grammar: reported speech, clause analysis, sentence transformation', 'Writing: formal letters, notice/circular, newspaper report, speech', 'Comprehension: abstract and argumentative unseen passages', 'Speaking: debates, extempore, and Shakespearean drama excerpts'],
            note: 'CBSE Code 184. Bridge year to Class 9 Board-style English paper.'
          },
          {
            name: 'Language 2: Kannada',
            icon: Scroll,
            book: 'Karnataka State Board Kannada Advanced Pathya Pustaka Class 8',
            topics: ['Major Kannada literary works: Kumaravyasa, Raghavanka', 'Grammar: Vritti (word derivation), advanced Sandhi and Samas', 'Essay and report writing in Kannada', 'Oral: formal speech and group discussion in Kannada', 'Preparation for High School-level Kannada examinations'],
            note: 'CBSE Code 015. Final year before CBSE Class 9–10 Board-level Kannada (Code 015).'
          },
          {
            name: 'Language 3: Hindi',
            icon: Translate,
            book: 'Vasant Bhag 3 (NCERT) + Bharat ki Khoj (Supplementary)',
            topics: ['Prose: Jawaharlal Nehru\'s selections from Bharat ki Khoj', 'Poetry: Ramdhari Singh Dinkar, Subhadra Kumari Chauhan', 'Grammar: Vakya Roopantaran (sentence transformation)', 'Essay: argumentative and formal essays in Hindi', 'Final Hindi examination preparation (Class 8 Board-style)'],
            note: 'CBSE Code 085. Final year for compulsory Hindi. Optional in Classes 9–10.'
          },
          {
            name: 'Mathematics',
            icon: Calculator,
            book: 'Mathematics — Class 8 (NCERT)',
            topics: ['Algebra: linear equations in two variables, factorization', 'Exponents and powers: laws of exponents, scientific notation', 'Mensuration: surface area and volume of cube, cuboid, cylinder', 'Data Handling: probability (basic), pie charts, histograms', 'Introduction to graphs: linear graphs and algebraic expressions on graph'],
            note: 'Students begin bridge-level content aligned with Class 9 Board curriculum.'
          },
          {
            name: 'Science',
            icon: Microscope,
            book: 'Science — Class 8 (NCERT)',
            topics: ['Physics: force, pressure, friction, light (refraction), electricity', 'Chemistry: coal, petroleum, materials (metals & non-metals), carbon compounds', 'Biology: cell structure, microorganisms, crop production, conservation of plants and animals', 'Environmental science: pollution types and global warming', 'CBSE SAFAL Grade 8 competency diagnostic benchmark'],
            note: 'Rigorous practical notebook maintained; key practicals evaluated in internal assessment.'
          },
          {
            name: 'Social Science',
            icon: TreeStructure,
            book: 'Our Pasts Book 3 (History) + Resources & Development (Geography) + Social & Political Life 3 (Civics) — NCERT',
            topics: ['History: Modern India — British colonialism, 1857 revolt, Indian freedom struggle', 'Geography: land, soil, water, natural vegetation, minerals, power resources', 'Civics: Indian Constitution, fundamental rights, Parliament, judiciary', 'Economics: introduction — agriculture, industries, human resources', 'Map work: India political, states capitals, and major rivers'],
            note: 'Strong emphasis on national movement and the Constitution to prepare for Class 9 Political Science.'
          },
          {
            name: 'Artificial Intelligence (AI) & Cyber Safety',
            icon: Brain,
            book: 'CBSE AI for Class 8 — Know Your AI (Code 417 Foundation)',
            topics: ['What is Artificial Intelligence? History and types', 'Machine learning: supervised vs. unsupervised (basic concepts)', 'Neural networks: how does a machine "learn"?', 'AI applications: virtual assistants, recommendation systems, autonomous vehicles', 'Cyber safety: data privacy laws, ethical AI, digital footprint management'],
            note: 'CBSE prescribed Code 417 AI foundation module. First exposure to formal AI literacy.'
          }
        ]
      }
    ]
  },
  secondary: {
    id: 'secondary',
    label: 'Secondary Stage (Board)',
    shortLabel: 'Secondary',
    span: 'Class 9 & 10',
    ages: 'Ages 14–16',
    icon: Certificate,
    color: '#EF4444',
    bg: 'bg-red-50',
    border: 'border-red-200',
    description: 'Full CBSE AISSE Board curriculum. Rigorous preparation for the Class X All India Secondary School Examination.',
    grades: [
      {
        id: 'class-9',
        label: 'Class 9',
        subjects: [
          {
            name: 'Subject 1: English Language & Literature',
            icon: Globe,
            book: 'Beehive (NCERT Main Reader) + Moments (Supplementary Reader)',
            topics: ['Literature: Prose — "The Fun They Had", "The Snake and the Mirror", "The Little Girl"', 'Literature: Poetry — "The Road Not Taken" (Frost), "Wind" (Subramania Bharati), "Rain on the Roof"', 'Grammar: determiners, tenses revision, modals, voice, reported speech, clauses', 'Writing: formal letters, factual descriptions, diary entry, story writing', 'Reading: long unseen passages (factual and literary) — 20 marks in Board pattern'],
            note: 'CBSE Code 184. Board pattern: Reading 20M + Writing 20M + Grammar 20M + Literature 40M = 100M.'
          },
          {
            name: 'Subject 2: Kannada (2nd Language)',
            icon: Scroll,
            book: 'CBSE Kannada Pathya Pustaka Class 9 + Karnataka State Supplementary Text',
            topics: ['Prose selections from modern Kannada literature', 'Poetry: Classical Kannada poets — Kuvempu, Bendre (selections)', 'Grammar: advanced Alankaras, Vibhakti, Sandhi revision', 'Writing: formal applications, Kannada essay (argumentative)', 'Comprehension: complex unseen passages in Kannada'],
            note: 'CBSE Code 015. Mandated as Second Language in Karnataka. 100 mark annual paper.'
          },
          {
            name: 'Subject 3: Mathematics Standard',
            icon: Calculator,
            book: 'Mathematics — Class 9 (NCERT)',
            topics: ['Number System: irrational numbers, Euclid\'s division lemma, real numbers on number line', 'Algebra: polynomials (factor theorem, algebraic identities), linear equations in 2 variables', 'Geometry: Euclid\'s geometry, lines & angles, triangles (congruence), quadrilaterals (properties)', 'Coordinate Geometry: Cartesian plane, plotting points, distance formula', 'Statistics & Probability: mean/median/mode of grouped data, basic probability'],
            note: 'CBSE Code 041 (Standard). Periodic Assessment I, Mid-Term, PA II, and Annual Exam cycle.'
          },
          {
            name: 'Subject 4: Science',
            icon: Microscope,
            book: 'Science — Class 9 (NCERT)',
            topics: ['Physics: motion (equations of motion), force & Newton\'s laws, gravitation, work-energy-power, sound', 'Chemistry: matter in our surroundings, is matter pure? (separation), atoms & molecules, structure of atom', 'Biology: cell fundamentals, tissues (plant & animal), diversity in living organisms, natural resources', 'Lab Practicals: verification of Newton\'s laws, characteristics of sound, paper chromatography, germination experiments', 'CBSE Assessment: 80M Theory + 20M Internal (PA tests, lab records, project)'],
            note: 'CBSE Code 086. Composite Science — Physics, Chemistry, and Biology evaluated together.'
          },
          {
            name: 'Subject 5: Social Science',
            icon: TreeStructure,
            book: 'India & the Contemporary World 1 (History) + Contemporary India 1 (Geography) + Democratic Politics 1 (Civics) + Economics 1 — NCERT',
            topics: ['History: French Revolution, Russian Revolution (Socialism), Nazism and the rise of Hitler', 'Geography: India — size & location, physical features, drainage, climate, vegetation & wildlife', 'Civics: Constitutional design, Electoral politics, Working of institutions, Democratic rights', 'Economics: Palamu village economy, People as Resource, Poverty, Food Security in India', 'Map work: European & Indian historical events, Indian physical features maps'],
            note: 'CBSE Code 087. 4 separate textbooks. Exam covers all 4 components: 20M each.'
          },
          {
            name: 'Subject 6 (Skill): Information Technology',
            icon: Laptop,
            book: 'CBSE Skill Education — Information Technology Class 9 (Code 402)',
            topics: ['Digital documentation: advanced MS Word (mail merge, macros, templates)', 'Spreadsheet applications: Excel formulas (VLOOKUP, IF, COUNTIF)', 'Digital presentations: PowerPoint with transitions, multimedia embedding', 'Database basics: MS Access — tables, queries, forms', 'Web design: HTML and CSS creating complete webpages'],
            note: 'CBSE Code 402. Skill elective. Theory 50M + Practical 50M exam format.'
          }
        ]
      },
      {
        id: 'class-10',
        label: 'Class 10 (CBSE Board)',
        subjects: [
          {
            name: 'Subject 1: English Language & Literature',
            icon: Globe,
            book: 'First Flight (NCERT Main Reader) + Footprints Without Feet (Supplementary)',
            topics: ['Literature Prose: "A Letter to God", "Nelson Mandela: Long Walk to Freedom", "The Diary of Anne Frank", "Bholi", "The Book That Saved the Earth"', 'Literature Poetry: "Dust of Snow", "Fire and Ice" (Frost), "A Tiger in the Zoo" (Leslie Norris)', 'Grammar: Complete revision — tenses, voice, reported speech, gap-filling, editing, transformation', 'Writing: formal letters (complaint, inquiry), speeches, analytical paragraph, story writing', 'Board Paper: Reading 20M + Writing 20M + Grammar 20M + Literature 40M = 100M'],
            note: 'CBSE Code 184. Board examination in March. Pre-boards conducted in December–January.'
          },
          {
            name: 'Subject 2: Kannada (2nd Language)',
            icon: Scroll,
            book: 'CBSE Kannada Pathya Pustaka Class 10 (Mandated by Karnataka)',
            topics: ['Advanced Kannada literature: Kuvempu\'s prose and poetry in depth', 'Grammar: complete revision — Alankaras, Vibhakti, Sandhi, Samas', 'Essay writing: formal, argumentative, and descriptive in Kannada', 'Board comprehension: seen and unseen passages with analytical questions', 'Oral Kannada: ASL (Assessment of Speaking and Listening)'],
            note: 'CBSE Code 015. Mandated in Karnataka. Board examination (80M) + ASL internal (20M).'
          },
          {
            name: 'Subject 3: Mathematics (Standard / Basic)',
            icon: Calculator,
            book: 'Mathematics — Class 10 (NCERT)',
            topics: ['Real Numbers: Euclid\'s lemma, fundamental theorem of arithmetic', 'Algebra: polynomials, quadratic equations, arithmetic progressions', 'Coordinate Geometry: section formula, distance formula, area of triangle', 'Trigonometry: ratios, identities, heights and distances (applications)', 'Geometry: circles (tangents, chords), constructions (tangents, similar triangles)', 'Statistics & Probability: grouped data, cumulative frequency, probability theorems'],
            note: 'Code 041 (Standard) or Code 241 (Basic). Board exam 80M Theory + 20M Internal. Standard required for Science stream in Class 11.'
          },
          {
            name: 'Subject 4: Science',
            icon: Microscope,
            book: 'Science — Class 10 (NCERT)',
            topics: ['Physics: Light (reflection & refraction, lenses, prism), electricity (Ohm\'s law, circuits), magnetic effects, sources of energy', 'Chemistry: chemical reactions & equations, acids/bases/salts, metals & non-metals, carbon compounds, periodic table', 'Biology: life processes (nutrition, respiration, transport, excretion), reproduction, heredity & evolution, environment', 'Lab Practicals: glass prism, concave mirror focal length, Ohm\'s law, saponification, germination, dissection', 'Board: 80M Theory (5M per practical question included) + 20M Internal (PA, Lab Record, Portfolio)'],
            note: 'CBSE Code 086. Practical viva conducted by external examiner during Board examination.'
          },
          {
            name: 'Subject 5: Social Science',
            icon: TreeStructure,
            book: 'India & the Contemporary World 2 (History) + Contemporary India 2 (Geography) + Democratic Politics 2 (Civics) + Understanding Economic Development — NCERT',
            topics: ['History: nationalism in Europe, nationalism in India (Non-Cooperation, Civil Disobedience, Quit India), print culture, clothing history', 'Geography: resources (land, soil, water, minerals, energy), agriculture, manufacturing industries, national economy, consumer awareness', 'Civics: power sharing (Belgium & Sri Lanka), federalism, democracy and diversity, political parties, gender and religion in politics', 'Economics: development, sectors of Indian economy, money and credit, globalisation, consumer rights', 'Map work: major industries, national highways, rivers, historical movement sites'],
            note: 'CBSE Code 087. Board paper: 80M. Map work carries 5M within the paper.'
          },
          {
            name: 'Subject 6: IT / Artificial Intelligence',
            icon: Laptop,
            book: 'CBSE IT Class 10 (Code 402) or AI Class 10 (Code 417)',
            topics: ['IT (402): advanced spreadsheets, database management (Access), web publishing, digital communication, cybersecurity', 'AI (417): AI project cycle, supervised learning (classification, regression), natural language processing, computer vision basics, AI ethics and societal impact', 'Both options: theory examination (50M) + practical examination (50M)', 'Project work: complete digital project submission (website / AI model report)', 'Viva examination conducted by external examiner for practical component'],
            note: 'CBSE Code 402 or 417 — student elects one. This is the Skill Subject. Board assessed.'
          }
        ]
      }
    ]
  }
};

/* ─────────────────────────────────────────────────────────────
   STEP INDICATOR
───────────────────────────────────────────────────────────── */
function StepBadge({ num, label, status }) {
  // status: 'done' | 'active' | 'locked'
  const isDone = status === 'done';
  const isActive = status === 'active';
  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
          isDone
            ? 'bg-stone-900 text-white'
            : isActive
            ? 'bg-stone-900 text-white ring-4 ring-stone-200'
            : 'bg-stone-100 text-stone-400'
        }`}
      >
        {isDone ? '✓' : num}
      </div>
      <span
        className={`text-sm font-semibold hidden sm:block ${
          isDone || isActive ? 'text-stone-900' : 'text-stone-400'
        }`}
      >
        {label}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SUBJECT ROW (Google Classroom-style table row)
───────────────────────────────────────────────────────────── */
function SubjectRow({ subject, index, stageColor }) {
  const [open, setOpen] = useState(false);
  const Icon = subject.icon;

  return (
    <>
      <tr
        onClick={() => setOpen(p => !p)}
        className={`cursor-pointer transition-colors border-b border-stone-100 ${
          open ? 'bg-stone-50' : 'hover:bg-stone-50'
        }`}
      >
        {/* # */}
        <td className="py-4 pl-4 pr-2 text-sm font-mono text-stone-400 w-10 hidden sm:table-cell">
          {String(index + 1).padStart(2, '0')}
        </td>
        {/* Subject Name + Icon */}
        <td className="py-4 px-3">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${stageColor}15`, color: stageColor }}
            >
              <Icon size={17} weight="duotone" />
            </div>
            <div>
              <div className="font-semibold text-sm text-stone-900 leading-snug">
                {subject.name}
              </div>
              <div className="text-xs text-stone-400 mt-0.5 hidden md:block">
                {subject.book.split('(')[0].trim()}
              </div>
            </div>
          </div>
        </td>
        {/* Book — desktop only */}
        <td className="py-4 px-3 hidden lg:table-cell">
          <span className="text-xs text-stone-500 leading-relaxed line-clamp-2 max-w-xs">
            {subject.book}
          </span>
        </td>
        {/* Expand arrow */}
        <td className="py-4 pl-2 pr-4 w-8 text-stone-400">
          <motion.div animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.18 }}>
            <ArrowRight size={15} weight="bold" />
          </motion.div>
        </td>
      </tr>

      {/* Expanded detail row */}
      <AnimatePresence initial={false}>
        {open && (
          <tr>
            <td colSpan={4} className="p-0">
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="bg-white border-b border-stone-200 px-4 sm:px-6 py-5 space-y-4">
                  {/* Textbook */}
                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                    <span className="text-lg shrink-0">📚</span>
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 font-mono mb-0.5">Prescribed Textbook</div>
                      <div className="text-sm font-semibold text-stone-800 leading-relaxed">{subject.book}</div>
                    </div>
                  </div>

                  {/* Topics */}
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 font-mono mb-2.5">Topics Covered</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                      {subject.topics.map((t, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-stone-700">
                          <div
                            className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                            style={{ backgroundColor: stageColor }}
                          />
                          {t}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Assessment note */}
                  {subject.note && (
                    <div className="flex items-start gap-2.5 p-3 rounded-xl bg-blue-50 border border-blue-100">
                      <CheckCircle size={15} weight="fill" className="text-blue-500 shrink-0 mt-0.5" />
                      <p className="text-sm text-blue-800 leading-relaxed">{subject.note}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </td>
          </tr>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN ACADEMICS PAGE — Wizard Stepper
───────────────────────────────────────────────────────────── */
export default function Academics() {
  const stageKeys = Object.keys(CURRICULUM);

  // Wizard state — null means not yet chosen
  const [selectedStage, setSelectedStage] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState(null);

  const stage = selectedStage ? CURRICULUM[selectedStage] : null;
  const grade = stage && selectedGrade
    ? stage.grades.find(g => g.id === selectedGrade)
    : null;

  const currentStep = !selectedStage ? 1 : !selectedGrade ? 2 : 3;

  const handleStageSelect = (id) => {
    setSelectedStage(id);
    setSelectedGrade(null); // reset grade when stage changes
  };

  const handleGradeSelect = (id) => {
    setSelectedGrade(id);
  };

  const handleReset = (toStep) => {
    if (toStep <= 1) { setSelectedStage(null); setSelectedGrade(null); }
    if (toStep === 2) { setSelectedGrade(null); }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">

      {/* ─── HERO ─── */}
      <section className="relative bg-stone-900 text-white overflow-hidden py-16 sm:py-24 px-6">
        <div className="absolute inset-0">
          <img
            src="https://stjosephschoolbangalore.org/wp-content/uploads/2024/08/IMG_20240621_090249-scaled.jpg"
            alt="St. Joseph English High School"
            className="w-full h-full object-cover opacity-20"
            style={{ objectPosition: 'center 25%' }}
          />
          <div className="absolute inset-0 bg-stone-900/80" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-2 text-sm font-mono font-semibold text-amber-400">
            <Certificate size={15} weight="fill" />
            CBSE Affiliation No. 830942 · Kothanur, Bengaluru
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white leading-tight">
            Academic Curriculum
          </h1>
          <p className="text-base sm:text-lg text-stone-300 max-w-2xl mx-auto leading-relaxed">
            Explore every subject, its prescribed textbook, and detailed topics — stage by stage, grade by grade.
          </p>
        </div>
      </section>

      {/* ─── STICKY STEP INDICATOR BAR ─── */}
      <div className="sticky top-0 z-30 bg-white border-b border-stone-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar">

          {/* Step 1 */}
          <button
            onClick={() => handleReset(1)}
            className={`flex items-center gap-2 shrink-0 cursor-pointer ${currentStep > 1 ? 'hover:opacity-70' : ''}`}
            disabled={currentStep === 1}
          >
            <StepBadge num="1" label="Choose Stage" status={currentStep > 1 ? 'done' : currentStep === 1 ? 'active' : 'locked'} />
          </button>

          {/* Connector */}
          <div className={`flex-1 h-px min-w-4 max-w-12 transition-colors ${currentStep > 1 ? 'bg-stone-900' : 'bg-stone-200'}`} />

          {/* Stage breadcrumb */}
          {selectedStage && (
            <>
              <button
                onClick={() => handleReset(1)}
                className="text-xs font-semibold text-stone-500 hover:text-stone-800 transition-colors shrink-0 cursor-pointer hidden sm:block"
              >
                {stage.shortLabel} ×
              </button>
              <div className={`flex-1 h-px min-w-4 max-w-12 transition-colors ${currentStep > 2 ? 'bg-stone-900' : 'bg-stone-200'}`} />
            </>
          )}

          {/* Step 2 */}
          <button
            onClick={() => handleReset(2)}
            className={`flex items-center gap-2 shrink-0 ${currentStep === 2 || currentStep > 2 ? 'cursor-pointer' : 'cursor-not-allowed'}`}
            disabled={currentStep < 2}
          >
            <StepBadge num="2" label="Choose Grade" status={currentStep > 2 ? 'done' : currentStep === 2 ? 'active' : 'locked'} />
          </button>

          <div className={`flex-1 h-px min-w-4 max-w-12 transition-colors ${currentStep > 2 ? 'bg-stone-900' : 'bg-stone-200'}`} />

          {/* Grade breadcrumb */}
          {selectedGrade && (
            <>
              <button
                onClick={() => handleReset(2)}
                className="text-xs font-semibold text-stone-500 hover:text-stone-800 transition-colors shrink-0 cursor-pointer hidden sm:block"
              >
                {grade?.label} ×
              </button>
              <div className="flex-1 h-px min-w-4 max-w-12 bg-stone-900" />
            </>
          )}

          {/* Step 3 */}
          <div className={`flex items-center gap-2 shrink-0 ${currentStep < 3 ? 'opacity-40' : ''}`}>
            <StepBadge num="3" label="View Subjects" status={currentStep === 3 ? 'active' : currentStep < 3 ? 'locked' : 'done'} />
          </div>
        </div>
      </div>

      {/* ─── STEP PANELS ─── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-6">

        {/* ══ STEP 1: CHOOSE STAGE ══ */}
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-5"
            >
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  Which stage are you looking for?
                </h2>
                <p className="text-stone-500 text-base mt-1">
                  Select the academic stage that matches the student's age or grade group.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {stageKeys.map(key => {
                  const s = CURRICULUM[key];
                  const Icon = s.icon;
                  return (
                    <button
                      key={key}
                      onClick={() => handleStageSelect(key)}
                      className="group text-left p-6 rounded-2xl bg-white border-2 border-stone-200 hover:border-stone-900 hover:shadow-lg transition-all duration-200 cursor-pointer space-y-3"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${s.color}15`, color: s.color }}
                        >
                          <Icon size={24} weight="duotone" />
                        </div>
                        <div>
                          <div className="font-bold text-base text-stone-900 group-hover:text-stone-900">
                            {s.label}
                          </div>
                          <div className="text-sm text-stone-500">{s.span} · {s.ages}</div>
                        </div>
                        <ArrowRight size={18} className="ml-auto text-stone-300 group-hover:text-stone-900 transition-colors" />
                      </div>
                      <p className="text-sm text-stone-600 leading-relaxed">{s.description}</p>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ══ STEP 2: CHOOSE GRADE ══ */}
        <AnimatePresence mode="wait">
          {currentStep === 2 && stage && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-5"
            >
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  Pick a grade in {stage.shortLabel}
                </h2>
                <p className="text-stone-500 text-base mt-1">
                  {stage.span} · {stage.ages} · {stage.grades.length} grade levels available
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {stage.grades.map(g => (
                  <button
                    key={g.id}
                    onClick={() => handleGradeSelect(g.id)}
                    className="group flex items-center justify-between text-left px-5 py-4 rounded-2xl bg-white border-2 border-stone-200 hover:border-stone-900 hover:shadow-md transition-all duration-200 cursor-pointer"
                  >
                    <div>
                      <div className="font-bold text-base text-stone-900">{g.label}</div>
                      <div className="text-sm text-stone-400 mt-0.5">{g.subjects.length} subjects</div>
                    </div>
                    <ArrowRight size={18} className="text-stone-300 group-hover:text-stone-900 transition-colors shrink-0 ml-3" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ══ STEP 3: SUBJECTS TABLE ══ */}
        <AnimatePresence mode="wait">
          {currentStep === 3 && stage && grade && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-5"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                    {grade.label}
                  </h2>
                  <p className="text-stone-500 text-base mt-1">
                    {stage.label} · {stage.ages} · {grade.subjects.length} prescribed subjects
                  </p>
                </div>
                <div
                  className="text-sm font-semibold px-3 py-1.5 rounded-full self-start sm:self-auto"
                  style={{ backgroundColor: `${stage.color}15`, color: stage.color }}
                >
                  {stage.span}
                </div>
              </div>

              {/* Subject Table */}
              <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-stone-200 bg-stone-50">
                      <th className="py-3 pl-4 pr-2 text-left text-[11px] font-bold uppercase tracking-wider text-stone-400 font-mono w-10 hidden sm:table-cell">#</th>
                      <th className="py-3 px-3 text-left text-[11px] font-bold uppercase tracking-wider text-stone-400 font-mono">Subject</th>
                      <th className="py-3 px-3 text-left text-[11px] font-bold uppercase tracking-wider text-stone-400 font-mono hidden lg:table-cell">Textbook</th>
                      <th className="py-3 pl-2 pr-4 w-8" />
                    </tr>
                  </thead>
                  <tbody>
                    {grade.subjects.map((subject, i) => (
                      <SubjectRow
                        key={i}
                        subject={subject}
                        index={i}
                        stageColor={stage.color}
                      />
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Start Over */}
              <button
                onClick={() => handleReset(1)}
                className="text-sm font-semibold text-stone-400 hover:text-stone-800 transition-colors cursor-pointer"
              >
                ← Browse a different stage or grade
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* ─── 3-LANGUAGE STRIP ─── */}
      <section className="bg-white border-t border-stone-200 py-12 px-6">
        <div className="max-w-5xl mx-auto space-y-6">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-stone-400 font-mono">Karnataka State Mandate · CBSE Norms</p>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 mt-1">3-Language Curriculum Framework</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { rank: 'L1', name: 'English', code: 'Code 184', badge: 'Medium of Instruction', bc: 'bg-blue-50 text-blue-700', span: 'Pre-Nursery → Class X', desc: 'Primary teaching medium. Phonics through CBSE Board literary analysis.' },
              { rank: 'L2', name: 'Kannada (ಕನ್ನಡ)', code: 'Code 015', badge: '✓ Mandated — Karnataka Act 2015', bc: 'bg-emerald-50 text-emerald-700', span: 'Class I → Class X', desc: 'Compulsory state language. Aksharamale, literature, and Vyakaran through all classes.' },
              { rank: 'L3', name: 'Hindi (हिन्दी)', code: 'Code 085', badge: 'National 3-Language Formula', bc: 'bg-amber-50 text-amber-700', span: 'Class III → Class VIII', desc: 'National trilingual formula language. Optional in Classes 9–10.' }
            ].map((l, i) => (
              <div key={i} className="p-5 rounded-2xl border border-stone-200 bg-stone-50 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-stone-200 text-stone-700 font-mono font-bold text-xs flex items-center justify-center">{l.rank}</span>
                  <div>
                    <div className="font-serif font-bold text-stone-900">{l.name}</div>
                    <div className="text-xs text-stone-400 font-mono">{l.code} · {l.span}</div>
                  </div>
                </div>
                <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-lg ${l.bc}`}>{l.badge}</span>
                <p className="text-sm text-stone-600 leading-relaxed">{l.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DOWNLOAD CTA ─── */}
      <section className="bg-stone-900 text-white py-14 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400">Academic Resources 2026–27</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">Download Official CBSE Syllabus & Booklists</h3>
            <p className="text-base text-stone-400 max-w-lg leading-relaxed">Complete class-wise NCERT textbook matrices, CBSE assessment schedules, and the Karnataka academic calendar.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button onClick={() => alert('Downloading CBSE 2026–27 Syllabus Blueprint')} className="inline-flex items-center gap-2 bg-white text-stone-900 font-bold text-sm px-6 py-3.5 rounded-xl hover:bg-stone-100 transition-colors cursor-pointer">
              <DownloadSimple size={18} weight="bold" /> Syllabus Blueprint PDF
            </button>
            <button onClick={() => alert('Downloading NCERT Booklist 2026–27')} className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-colors cursor-pointer">
              <FileText size={18} weight="bold" /> Booklist 2026–27
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
