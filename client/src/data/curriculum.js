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
  Laptop,
  Heartbeat,
  Translate,
  TreePalm,
  Flask,
  Atom,
  ChartBar,
  Lightbulb,
  Palette,
  Users
} from '@phosphor-icons/react';

export const ICON_MAP = {
  English: Globe,
  Kannada: Scroll,
  Hindi: Translate,
  Mathematics: Calculator,
  Math: Calculator,
  Science: Microscope,
  Physics: Atom,
  Chemistry: Flask,
  Biology: Heartbeat,
  Social: TreeStructure,
  Computer: Code,
  AI: Brain,
  Information: Laptop,
  Art: PaintBrush,
  Music: MusicNote,
  Physical: Barbell,
  Yoga: FlowerLotus,
  EVS: TreePalm,
  Awareness: TreePalm,
  SAFAL: Certificate,
  Activity: Sparkle,
  Lab: Flask,
  Chart: ChartBar,
  Idea: Lightbulb,
  Creative: Palette,
  Group: Users
};

export function getIcon(name) {
  if (!name) return BookOpen;
  for (const [k, I] of Object.entries(ICON_MAP)) {
    if (name.toLowerCase().includes(k.toLowerCase())) return I;
  }
  return BookOpen;
}

export const CURRICULUM = {
  foundational: {
    id: 'foundational',
    label: 'Foundational Stage',
    shortLabel: 'Foundational',
    span: 'Pre-Nursery – Class 2',
    ages: 'Ages 3–8',
    color: '#F59E0B',
    accentClass: 'text-amber-500',
    badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    description: 'Play-based, sensory-rich learning aligned with NEP 2020 Early Childhood Care & Education.',
    grades: [
      {
        id: 'pre-nursery',
        label: 'Pre-Nursery & Nursery',
        shortTitle: 'Nursery',
        span: 'Early Years',
        ages: 'Ages 3 – 5',
        tagline: 'Joyful Play, Sensory Discovery & Early Language Foundations',
        heroImage: '/images/hero-campus.jpg',
        methodology: 'Play-Way & Sensory Discovery (NEP 2020 ECCE)',
        assessment: 'Zero Formal Exams — Continuous Observational Milestone Tracking',
        timings: '8:30 AM – 12:30 PM',
        ratio: '1:12 (Teacher + Certified Care Assistant)',
        highlights: [
          'Jolly Phonics multi-sensory letter and sound blending',
          'Concrete mathematical manipulatives (blocks, sorting, patterns)',
          'Daily 45-minute structured outdoor sensory play and motor skill drills',
          'Holistic Child Development Portfolio shared termly with parents'
        ],
        milestones: [
          {
            title: 'Phonemic Awareness',
            desc: 'Recognizes alphabet sounds (A–Z), joins rhymes, and expresses thoughts in full simple sentences.',
            type: 'academic'
          },
          {
            title: 'Motor & Sensory Mastery',
            desc: 'Mastery over pencil grip, scissor safety, block construction, and hand-eye coordination.',
            type: 'skill'
          },
          {
            title: 'Social Confidence',
            desc: 'Demonstrates active listening, empathetic peer sharing, and independent self-care routines.',
            type: 'holistic'
          }
        ],
        activities: [
          {
            title: 'Sensory Exploration & Nature Walks',
            desc: 'Hands-on discovery of flora, leaf textures, colors, and seasonal changes in the campus botanical garden.',
            category: 'Outdoor Discovery',
            icon: TreePalm
          },
          {
            title: 'Clay Sculpting & Finger Impression Art',
            desc: 'Tactile modeling that develops fine motor muscles essential for early handwriting readiness.',
            category: 'Fine Arts',
            icon: PaintBrush
          },
          {
            title: 'Rhythmic Music & Kannada Folk Rhymes',
            desc: 'Group singing, body percussion, and introductory Kannada nursery rhymes to foster multi-lingual warmth.',
            category: 'Performing Arts',
            icon: MusicNote
          },
          {
            title: 'Mini Obstacle Courses & Balance Play',
            desc: 'Specially designed play structures that hone spatial orientation, agility, and gross motor reflexes.',
            category: 'Physical Education',
            icon: Barbell
          }
        ],
        subjects: [
          {
            name: 'English Phonics & Early Literacy',
            book: 'Jolly Phonics (School Prescribed) + Oral Activities',
            bookCover: '/images/books/jolly-phonics.jpg',
            topics: [
              'Letter recognition A–Z & pure phonics sounds',
              'Phonemic rhymes and animated nursery storytelling',
              'Picture-word vocabulary association',
              'Oral storytelling, roleplay and active listening',
              'Pre-writing strokes, standing/sleeping lines and curves'
            ],
            note: 'No formal tests. 100% activity-based oral and pictorial evaluation.'
          },
          {
            name: 'Early Mathematics',
            book: 'Activity-based Number Cards, Shapes & Counting Blocks',
            bookCover: '/images/books/early-math.jpg',
            topics: [
              'Concrete numbers 1 to 20 recognition and quantity matching',
              'Counting with wooden counters and tactile abacus',
              'Basic shapes identification (circle, square, triangle, rectangle)',
              'Spatial reasoning (big/small, tall/short, inside/outside)',
              'Pattern completion and color sorting'
            ],
            note: 'Concepts rooted in physical play objects and tactile sensation.'
          },
          {
            name: 'Environmental Awareness (EVS)',
            book: 'Our World — Teacher-Curated Activity Workbook',
            bookCover: '/images/books/our-world-evs.jpg',
            topics: [
              'My body, sensory organs, and personal hygiene',
              'Family bonds, classroom manners, and empathy',
              'Animals, bird calls, and natural habitats',
              'Campus trees, flowers, and gentle plant care',
              'Seasons: Monsoon rains, breezy winter, and sunny summer'
            ],
            note: 'Explored through campus walks, object tables, and show-and-tell circles.'
          },
          {
            name: 'Art, Craft & Clay Modeling',
            book: 'School Art Studio Kit & Recycled Material Corner',
            bookCover: '/images/books/marigold-1.jpg',
            topics: [
              'Non-toxic finger painting, sponge dabbing, and brushwork',
              'Clay rolling, pinching, and geometrical shapes',
              'Basic paper folding (introductory origami forms)',
              'Collage creation with dried leaves and paper scraps',
              'Uninhibited free drawing and emotional expression'
            ],
            note: 'Focuses entirely on creative freedom, spatial confidence, and motor dexterity.'
          },
          {
            name: 'Music & Movement',
            book: 'School Song Treasury (Karnataka Folk & Classic Rhymes)',
            bookCover: '/images/books/school-songs.jpg',
            topics: [
              'Rhythmic clapping, tempo changes, and body percussion',
              'School morning anthem and universal peace prayer',
              'Melodic Kannada folk rhymes and festive choruses',
              'Expressive movement, coordination games, and joyful dance',
              'Ensemble singing to build vocal clarity and social ease'
            ],
            note: 'Enhances auditory memory and linguistic intonation.'
          },
          {
            name: 'Physical Education & Outdoor Play',
            book: 'Structured Outdoor Play Program — Physical Literacy Manual',
            bookCover: '/images/books/stepping-stones.jpg',
            topics: [
              'Running, hopping, balancing beams, and skipping drills',
              'Safe group play, sharing gear, and gentle teamwork',
              'Catching, rolling, and aiming lightweight balls',
              'Morning child-friendly yoga stretches and calming breaths',
              'Agility ladders and outdoor sandbox coordination'
            ],
            note: 'Guaranteed 45 minutes of daily fresh-air physical activity.'
          }
        ]
      },
      {
        id: 'lkg-ukg',
        label: 'LKG & UKG (Kindergarten)',
        shortTitle: 'Kindergarten',
        span: 'Kindergarten Years',
        ages: 'Ages 4 – 6',
        tagline: 'Phonics Blending, Bilingual Readiness & Early Number Sense',
        heroImage: '/images/hero-campus-sunset.jpg',
        methodology: 'Activity-Centered Foundational Literacy & Numeracy (FLN)',
        assessment: 'Continuous Assessment with Termly Holistic Progress Profiles',
        timings: '8:30 AM – 1:30 PM',
        ratio: '1:18 (Teacher + Teaching Assistant)',
        highlights: [
          'Consonant-Vowel-Consonant (CVC) three-letter word reading mastery',
          'Introduction to Kannada script (Aksharamale) through songs & games',
          'Hands-on Math Magic kits with 2-digit number operations',
          'Integrated Environmental Studies with real-world school gardens'
        ],
        milestones: [
          {
            title: 'Independent Reading',
            desc: 'Reads short 3–4 word sentences, decodes CVC sight words, and writes letters neatly.',
            type: 'academic'
          },
          {
            title: 'Mathematical Thinking',
            desc: 'Counts confidently to 100, executes simple single-digit additions, and reads analogue clock hours.',
            type: 'skill'
          },
          {
            title: 'Bilingual Curiosity',
            desc: 'Speaks confidently in English while comfortably comprehending spoken Kannada and Hindi.',
            type: 'holistic'
          }
        ],
        activities: [
          {
            title: 'Little Botanists Garden Project',
            desc: 'Children plant seeds, record daily growth with drawings, and learn water stewardship firsthand.',
            category: 'Eco Science',
            icon: TreePalm
          },
          {
            title: 'Math Manipulatives Workshop',
            desc: 'Using bead frames, wooden rods, and sorting trays to transform abstract counting into concrete logic.',
            category: 'Applied Math',
            icon: Calculator
          },
          {
            title: 'Roleplay & Community Helpers Day',
            desc: 'Immersive dress-up and interaction with local firefighters, doctors, postal officers, and teachers.',
            category: 'Civic Learning',
            icon: Users
          },
          {
            title: 'Kannada Bhaasha Sangama (Story Hour)',
            desc: 'Interactive oral storytelling in Kannada featuring local folklore, animal fables, and festive songs.',
            category: 'Language Arts',
            icon: Scroll
          }
        ],
        subjects: [
          {
            name: 'English Reading & Pre-Writing',
            book: 'Stepping Stones (LKG / UKG) — Oxford & School Reader Series',
            bookCover: '/images/books/stepping-stones.jpg',
            topics: [
              'Phonemic segmentation and sight words vocabulary',
              'Blending sounds into CVC words (cat, pin, sun, bed)',
              'Reading simple decodable 3-to-4 word sentences',
              'Accurate pencil tripod grip and cursive pre-strokes',
              'Dictation of common phonetically regular words'
            ],
            note: 'Emphasis on reading joy and spontaneous verbal communication.'
          },
          {
            name: 'Kannada — Oral & Script Familiarization',
            book: 'Karnataka State Board Kannada Primer & Rhyme Collection',
            bookCover: '/images/books/kannada-1.jpg',
            topics: [
              'Kannada Aksharamale script exposure and identification',
              'Everyday conversational Kannada phrases (colors, numbers, greetings)',
              'Charming Kannada nursery poems (Chandamama, Baale Hannu)',
              'Active listening comprehension through dramatized stories',
              'Tracing primary vowel letters (Swaragalu)'
            ],
            note: 'Mandated by Karnataka Compulsory Kannada Act 2015 with play-first pedagogy.'
          },
          {
            name: 'Early Mathematics',
            book: 'My Book of Numbers — Hands-On Workbook',
            bookCover: '/images/books/math-magic-1.jpg',
            topics: [
              'Numbers 1 to 50 (LKG) and 1 to 100 (UKG) representation',
              'Concrete single-digit addition and subtraction with objects',
              'Even and odd groupings through physical pairing',
              'Time awareness: morning, noon, evening, night routines',
              'Measurement basics: heavy vs light, tall vs short, full vs empty'
            ],
            note: 'Utilizes Montessori-inspired math bars and counting trays.'
          },
          {
            name: 'Environmental Studies (EVS)',
            book: 'Around Us — Kindergarten Exploration Guide',
            bookCover: '/images/books/looking-around-1.jpg',
            topics: [
              'Our school family, classroom community, and mutual respect',
              'Community helpers: sanitation workers, bus drivers, doctors, artisans',
              'Food sources, healthy lunches, and drinking clean water',
              'Air, sun, weather rhythms, and nature care',
              'Karnataka culture and national festivals of India'
            ],
            note: 'Thematic units linking storytelling, craft, and observation.'
          },
          {
            name: 'Hindi — Introductory Oral Rhymes',
            book: 'Hindi Balgeet (Introductory Oral Collection)',
            bookCover: '/images/books/rimjhim-1.jpg',
            topics: [
              'Warm Hindi greetings and polite phrases (Namaste, Shukriya)',
              'Counting 1 to 10 in Hindi (ek, do, teen...)',
              'Beloved rhymes: Lakdi ki Kathi, Machli Jal ki Rani',
              'Everyday vocabulary: body parts, family members, animals',
              'Interactive response games and musical repetition'
            ],
            note: 'Zero exam pressure — purely conversational exposure.'
          }
        ]
      },
      {
        id: 'class-1',
        label: 'Class 1',
        shortTitle: 'Class 1',
        span: 'Primary Foundational — Grade 1',
        ages: 'Ages 6 – 7',
        tagline: 'Formal Reading Mastery, Single/Two-Digit Math & Sensory Discovery',
        heroImage: '/images/hero-campus-wide.jpg',
        methodology: 'Integrated NEP 2020 Competency-Based Learning',
        assessment: 'Continuous Comprehensive Evaluation (CCE) + Formative Rubrics',
        timings: '8:30 AM – 3:00 PM',
        ratio: '1:25',
        highlights: [
          'NCERT Marigold Book 1 English core mastery with guided phonics and storytelling',
          'Complete Kannada Aksharamale 49-letter literacy and foundational handwriting',
          'Single and 2-digit arithmetic, basic shapes, and mental math drills with Math-Magic 1',
          'Dedicated weekly Computer Literacy lab sessions with MS Paint & mouse precision'
        ],
        milestones: [
          {
            title: 'Fluent Phonics Reading',
            desc: 'Reads short sentences with clear pronunciation, decodes unfamiliar words using phonics.',
            type: 'academic'
          },
          {
            title: 'Foundational Arithmetic',
            desc: 'Executes 1- and 2-digit addition and subtraction, recognizes number patterns up to 100.',
            type: 'skill'
          },
          {
            title: 'Curiosity & Nature Awareness',
            desc: 'Observes plant and animal life, understands personal hygiene and healthy food habits.',
            type: 'holistic'
          }
        ],
        activities: [
          {
            title: 'Junior Discovery Lab Practicals',
            desc: 'Safe, tactile demonstrations: floating/sinking, plant dye separation, magnetic pulls, and water states.',
            category: 'Science Discovery',
            icon: Microscope
          },
          {
            title: 'Canvas & Craft Studio Workshops',
            desc: 'Structured color theory, origami architecture, and traditional Indian folk pattern sketching.',
            category: 'Creative Arts',
            icon: Palette
          },
          {
            title: 'Digital Canvas (MS Paint & Keyboarding)',
            desc: 'Hands-on computer lab time mastering mouse precision, shape tools, and English/Kannada typing.',
            category: 'Technology',
            icon: Code
          },
          {
            title: 'Annual Sports & Junior Athletic Drills',
            desc: 'Track sprints, relay races, rhythmic gymnastic routines, and structured team sportsmanship.',
            category: 'Sports & PE',
            icon: Barbell
          }
        ],
        subjects: [
          {
            name: 'Language 1: English',
            book: 'Marigold Book 1 (NCERT) + Rain Drops Supplementary Reader',
            bookCover: '/images/books/marigold-1.jpg',
            topics: [
              'Prose comprehension, poetry recitation, and character dialogue',
              'Core grammar: Nouns, pronouns, action verbs, adjectives, singular-plural',
              'Creative writing: Picture composition, 3-sentence paragraph crafting',
              'Spelling mastery, phonics dictation, and vocabulary journals',
              'Elocution, reading aloud, and expressive voice modulation'
            ],
            note: 'CBSE Code 184. Medium of instruction across all scholastic domains.'
          },
          {
            name: 'Language 2: Kannada',
            book: 'Karnataka State Board Kannada Parichaya — Class 1',
            bookCover: '/images/books/kannada-1.jpg',
            topics: [
              'Complete Kannada Aksharamale (all 49 letters) reading & writing',
              'Gunithakshara (vowel-consonant combinations) & basic Otthakshara',
              'Simple Kannada word formation, antonyms, and object names',
              'Short prose stories from Karnataka folklore and moral fables',
              'Constructing 4-word structured Kannada sentences'
            ],
            note: 'CBSE Code 015. Compulsory second language under Karnataka Act 2015.'
          },
          {
            name: 'Language 3: Hindi (Foundational)',
            book: 'Rimjhim Book 1 (NCERT)',
            bookCover: '/images/books/rimjhim-1.jpg',
            topics: [
              'Complete Hindi Varnamala (Swar and Vyanjan)',
              'Simple Matra words (Aa, Ee, Oo matras)',
              'Classic Hindi poetry recitation with actions',
              'Daily conversational Hindi questions and replies',
              'Dictation of common two- and three-letter words'
            ],
            note: 'CBSE Code 085. Gentle foundation to prepare for 3-language formula in Class 3.'
          },
          {
            name: 'Mathematics',
            book: 'Math Magic Book 1 (NCERT)',
            bookCover: '/images/books/math-magic-1.jpg',
            topics: [
              'Numbers from 1 to 100: Counting, writing, place values',
              'Addition and subtraction (single and two-digit numbers)',
              'Shapes, spatial relationships (inside/outside, bigger/smaller)',
              'Patterns, basic measurement using non-standard units',
              'Introduction to Indian currency and counting coins'
            ],
            note: 'Blends NCERT activity kits with daily mental math sprint cards.'
          },
          {
            name: 'Environmental Studies (EVS)',
            book: 'Looking Around — EVS Book 1 (NCERT)',
            bookCover: '/images/books/looking-around-1.jpg',
            topics: [
              'My family, body parts, senses, and personal hygiene',
              'Food and water: Healthy eating and clean drinking water',
              'Plants and animals: Familiar trees, birds, and domestic animals',
              'My school and neighborhood community helpers',
              'Good manners, sharing, and safety rules at home and school'
            ],
            note: 'Project-based learning with quarterly thematic submissions.'
          },
          {
            name: 'Computer Literacy',
            book: 'My First Computer Guide — Class 1',
            bookCover: '/images/books/computer-1.jpg',
            topics: [
              'Understanding computer parts: Monitor, CPU, keyboard, mouse',
              'Turning the computer on/off safely and posture guidelines',
              'Fun drawing in MS Paint using basic brush and shape tools',
              'Mouse practice: Single click, double click, drag and drop',
              'Introduction to the keyboard and letter keys'
            ],
            note: '100% hands-on laboratory time in air-conditioned IT lab.'
          }
        ]
      },
      {
        id: 'class-2',
        label: 'Class 2',
        shortTitle: 'Class 2',
        span: 'Primary Foundational — Grade 2',
        ages: 'Ages 7 – 8',
        tagline: 'Paragraph Writing, Multi-Digit Math & Experiential Science Discovery',
        heroImage: '/images/hero-campus-wide.jpg',
        methodology: 'Integrated NEP 2020 Competency-Based Learning',
        assessment: 'Continuous Comprehensive Evaluation (CCE) + Formative Rubrics',
        timings: '8:30 AM – 3:00 PM',
        ratio: '1:25',
        highlights: [
          'NCERT Marigold 2 with paragraph writing, creative storytelling, and reading comprehension',
          'Kannada Gunithakshara literacy, complex Otthakshara, and reading short folk tales',
          '3-digit arithmetic, multiplication tables up to 10, and money calculation with Math-Magic 2',
          'Hands-on EVS field observation and digital typing mastery in IT lab'
        ],
        milestones: [
          {
            title: 'Independent Reading Mastery',
            desc: 'Reads unseen age-appropriate storybooks with speed, expression, and high comprehension.',
            type: 'academic'
          },
          {
            title: 'Multi-Digit Arithmetic',
            desc: 'Solves 2- and 3-digit addition/subtraction with borrowing, masters multiplication tables 2–10.',
            type: 'skill'
          },
          {
            title: 'Ecological & Digital Literacy',
            desc: 'Demonstrates environmental care, handles computer keyboarding and digital tools with ease.',
            type: 'holistic'
          }
        ],
        activities: [
          {
            title: 'Junior Discovery Lab Practicals',
            desc: 'Safe, tactile demonstrations: floating/sinking, plant dye separation, magnetic pulls, and water states.',
            category: 'Science Discovery',
            icon: Microscope
          },
          {
            title: 'Canvas & Craft Studio Workshops',
            desc: 'Structured color theory, origami architecture, and traditional Indian folk pattern sketching.',
            category: 'Creative Arts',
            icon: Palette
          },
          {
            title: 'Digital Canvas (MS Paint & Keyboarding)',
            desc: 'Hands-on computer lab time mastering mouse precision, shape tools, and English/Kannada typing.',
            category: 'Technology',
            icon: Code
          },
          {
            title: 'Annual Sports & Junior Athletic Drills',
            desc: 'Track sprints, relay races, rhythmic gymnastic routines, and structured team sportsmanship.',
            category: 'Sports & PE',
            icon: Barbell
          }
        ],
        subjects: [
          {
            name: 'Language 1: English',
            book: 'Marigold Book 2 (NCERT) + Rain Drops 2 Supplementary Reader',
            bookCover: '/images/books/marigold-1.jpg',
            topics: [
              'Reading prose with intonation, comprehension question answers, dialogue delivery',
              'Grammar: Action verbs, prepositions (in/on/under), conjunctions (and/but), punctuation',
              'Creative writing: 5-sentence structured paragraphs, story sequencing, describing pictures',
              'Vocabulary building, antonyms/synonyms, spelling bee drills',
              'Poem memorization, choral recitation, and dramatic play'
            ],
            note: 'CBSE Code 184. Medium of instruction across all scholastic domains.'
          },
          {
            name: 'Language 2: Kannada',
            book: 'Karnataka State Board Kannada Pathya Pustaka — Class 2',
            bookCover: '/images/books/kannada-1.jpg',
            topics: [
              'Reinforcing complete Aksharamale, Gunithakshara, and Otthakshara writing',
              'Reading comprehension of simple stories and moral poems',
              'Writing 5-line descriptive passages about animals, family, and festivals',
              'Kannada grammar basics: Lingagalu (gender), Vachanagalu (singular/plural)',
              'Spoken Kannada conversation confidence in classroom discussions'
            ],
            note: 'CBSE Code 015. Compulsory second language under Karnataka Act 2015.'
          },
          {
            name: 'Language 3: Hindi (Foundational)',
            book: 'Rimjhim Book 2 (NCERT)',
            bookCover: '/images/books/rimjhim-1.jpg',
            topics: [
              'Reading simple Hindi stories and poems with all basic Matras',
              'Writing 2-, 3-, and 4-letter words with Matra accuracy',
              'Everyday vocabulary: vegetables, fruits, days of week, colors in Hindi',
              'Simple sentence translation and speaking in complete sentences',
              'Weekly dictation and handwriting improvement exercises'
            ],
            note: 'CBSE Code 085. Foundation for full 3-language curriculum in Class 3.'
          },
          {
            name: 'Mathematics',
            book: 'Math Magic Book 2 (NCERT)',
            bookCover: '/images/books/math-magic-1.jpg',
            topics: [
              '3-digit numbers: Place value (Hundreds, Tens, Units), expanded notation',
              'Addition & subtraction with regrouping (carrying & borrowing)',
              'Multiplication as repeated addition and tables from 2 to 10',
              'Measurement of length (cm/m), weight (g/kg), and capacity (liters)',
              'Reading analog clocks (hours & half-hours) and calendar days/months'
            ],
            note: 'Blends NCERT activity kits with daily mental math sprint cards.'
          },
          {
            name: 'Environmental Studies (EVS)',
            book: 'Looking Around — EVS Book 2 (NCERT)',
            bookCover: '/images/books/looking-around-1.jpg',
            topics: [
              'Our living environment: Plant life cycles, animal habitats, birds & nests',
              'Air, water cycles, seasons, weather changes, and conservation habits',
              'Our shelter and clothing: Types of houses and seasonal clothes',
              'Community and safety: Traffic rules, waste segregation, eco-stewardship',
              'Karnataka cultural landmarks and Bengaluru heritage'
            ],
            note: 'Project-based learning with quarterly thematic submissions.'
          },
          {
            name: 'Computer Literacy',
            book: 'Primary Digital Curriculum — Class 2',
            bookCover: '/images/books/computer-1.jpg',
            topics: [
              'Operating system basics: Desktop, icons, starting & closing applications',
              'Advanced MS Paint tools: Polygon, curve, color picker, text inserter',
              'Keyboarding skills: Spacebar, Enter, Backspace, Caps Lock, Arrow keys',
              'Typing simple sentences in Notepad / WordPad',
              'Digital citizenship and healthy computer usage posture'
            ],
            note: '100% hands-on laboratory time in air-conditioned IT lab.'
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
    color: '#10B981',
    accentClass: 'text-emerald-500',
    badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    description: 'Inquiry-based discovery, strong multilingual reading, and foundational mathematical reasoning.',
    grades: [
      {
        id: 'class-3',
        label: 'Class 3',
        shortTitle: 'Class 3',
        span: 'Preparatory Year 1',
        ages: 'Ages 8 – 9',
        tagline: 'Inquiry-Driven Thinking, Formal Science Concepts & Creative Writing',
        heroImage: '/images/hero-campus.jpg',
        methodology: 'Inquiry-Based & Thematic Experiential Learning',
        assessment: 'Formative Assessments (40%) + Summative Term Evaluations (60%)',
        timings: '8:30 AM – 3:15 PM',
        ratio: '1:30',
        highlights: [
          'First year of formal 3-language instruction (English, Kannada, Hindi)',
          'Introduction to large numbers up to 10,000, long division & fractions',
          'Environmental Studies with field data collection and regional mapping',
          'Block programming with Scratch Jr & beginner digital productivity tools'
        ],
        milestones: [
          {
            title: 'Structured Writing',
            desc: 'Drafts expressive informal letters, organized paragraphs, and answers inferential story questions.',
            type: 'academic'
          },
          {
            title: 'Mathematical Reasoning',
            desc: 'Calculates multi-digit operations effortlessly and understands fraction parts of a whole.',
            type: 'skill'
          },
          {
            title: 'Inquiry & Investigation',
            desc: 'Formulates questions about natural phenomena and records observations methodically.',
            type: 'holistic'
          }
        ],
        activities: [
          {
            title: 'Campus Weather Station & Rain Gauge',
            desc: 'Students monitor daily rainfall, wind direction, and temperature, compiling monthly weather charts.',
            category: 'Applied Science',
            icon: Microscope
          },
          {
            title: 'Creative Writers Guild & Book Club',
            desc: 'Bi-weekly library sessions where students review storybooks and compose original illustrated tales.',
            category: 'Literary Arts',
            icon: BookOpen
          },
          {
            title: 'Scratch Jr Code Lab',
            desc: 'Designing interactive digital animated stories and simple maze games using block logic.',
            category: 'Coding & Logic',
            icon: Code
          },
          {
            title: 'Heritage Map Making Project',
            desc: 'Hand-drawing maps of Karnataka showcasing rivers, historic forts, and cultural landmarks.',
            category: 'Social Studies',
            icon: TreeStructure
          }
        ],
        subjects: [
          {
            name: 'Language 1: English',
            book: 'Marigold Book 3 (NCERT) + Supplementary Reader: Magic English',
            bookCover: '/images/books/marigold-3.jpg',
            topics: [
              'Reading comprehension with literal and inferential reasoning questions',
              'Grammar: Tenses (Simple Present & Past), punctuation, prepositions',
              'Writing: Paragraph construction and friendly informal letter drafting',
              'Poem appreciation, rhythmic recitation, and figures of speech basics',
              'Vocabulary enrichment: Prefixes, suffixes, synonyms, and idioms'
            ],
            note: 'CBSE Code 184. First year of formal structured composition instruction.'
          },
          {
            name: 'Language 2: Kannada',
            book: 'Karnataka State Board Nali-Kali Kannada / Pathya Pustaka Class 3',
            bookCover: '/images/books/kannada-3.jpg',
            topics: [
              'Prose: Inspiring tales from Kannada literature and regional history',
              'Poetry: Vachanas of Basavanna and memorable Kannada folk verses',
              'Grammar: Linga (gender), Vachana (number), Vibhakti (case endings)',
              'Paragraph writing and short creative composition in Kannada script',
              'Comprehension of seen and unseen prose passages'
            ],
            note: 'CBSE Code 015. State-mandated curriculum with literary enrichment.'
          },
          {
            name: 'Language 3: Hindi',
            book: 'Rimjhim Book 3 (NCERT)',
            bookCover: '/images/books/rimjhim-3.jpg',
            topics: [
              'Prose stories and moral fables from NCERT Rimjhim',
              'Matra consolidation and phonetically complex word spelling',
              'Grammar: Sangya (noun), Ling (gender), and Vachan (number)',
              'Short paragraph writing on familiar topics (My Pet, My School)',
              'Oral loud reading with correct Hindi intonation'
            ],
            note: 'CBSE Code 085. Formal third language introduction under National Policy.'
          },
          {
            name: 'Mathematics',
            book: 'Math Magic Book 3 (NCERT)',
            bookCover: '/images/books/math-magic-3.jpg',
            topics: [
              'Numbers up to 10,000: Expanded form, place value, and ordering',
              'Long multiplication, short division algorithms, and mental math tricks',
              'Fractions: Halves, thirds, quarters, and pictorial representations',
              'Data Handling: Tally marks, pictographs, and bar representation',
              'Geometry: Perimeter concepts and 2D shape properties'
            ],
            note: 'Focus on word problem comprehension and everyday practical math.'
          },
          {
            name: 'Environmental Studies (EVS)',
            book: 'Looking Around Book 3 (NCERT)',
            bookCover: '/images/books/looking-around-3.jpg',
            topics: [
              'Animal kingdom: Dietary habits, shelter types, and bird beak adaptations',
              'Plant physiology: Photosynthesis overview, root types, and leaf veins',
              'Water conservation, purification techniques, and water cycle',
              'Food production: From farm to plate, food preservation techniques',
              'Cartography: Reading maps of India, Karnataka districts, and directions'
            ],
            note: 'Integrates hands-on experiments with social and environmental awareness.'
          },
          {
            name: 'Computer Science',
            book: 'Computer Masti Level 3 (Iken / School Prescribed)',
            bookCover: '/images/books/computer-3.jpg',
            topics: [
              'Operating system fundamentals: Desktop, file management, folders',
              'Word Processing (MS Word): Formatting text, font styling, alignments',
              'Digital Artistry: Precision drawing, geometric canvas tools',
              'Scratch Jr: Event triggers, loop blocks, motion commands',
              'Safe internet navigation and responsible digital manners'
            ],
            note: 'Bi-weekly dedicated laboratory sessions with individual computer access.'
          }
        ]
      },
      {
        id: 'class-4',
        label: 'Class 4',
        shortTitle: 'Class 4',
        span: 'Preparatory Year 2',
        ages: 'Ages 9 – 10',
        tagline: 'Deepening Analytical Skills, State Heritage & Science Experimentation',
        heroImage: '/images/hero-campus-sunset.jpg',
        methodology: 'Experiential Science, Project-Based Social Science & Applied Math',
        assessment: 'Continuous Assessment + Term Examinations + Project Portfolios',
        timings: '8:30 AM – 3:15 PM',
        ratio: '1:30',
        highlights: [
          'Large numbers up to Lakhs, HCF/LCM, angles, and metric conversions',
          'General Science with physical laboratory experiments and observation logs',
          'Rich Karnataka heritage and historical dynasties (Hoysala, Vijayanagara)',
          'Block coding, spreadsheets introduction, and typing speed benchmarks'
        ],
        milestones: [
          {
            title: 'Critical Reading & Essay Writing',
            desc: 'Analyzes unseen texts, identifies themes, and writes multi-paragraph descriptive essays.',
            type: 'academic'
          },
          {
            title: 'Experimental Method',
            desc: 'Conducts simple hypothesis tests, records variables, and presents findings visually.',
            type: 'skill'
          },
          {
            title: 'Regional Cultural Awareness',
            desc: 'Deep appreciation for Karnataka history, environmental biomes, and civic mechanisms.',
            type: 'holistic'
          }
        ],
        activities: [
          {
            title: 'Young Scientists Lab Fair',
            desc: 'Students engineer miniature water filters, circuit testers, and solar oven models for exhibition.',
            category: 'STEM Lab',
            icon: Flask
          },
          {
            title: 'Karnataka Heritage Stage Drama',
            desc: 'Dramatization of historic events from Karnataka’s golden eras in both Kannada and English.',
            category: 'Theatre & Heritage',
            icon: Scroll
          },
          {
            title: 'Math Olympiad Training Camp',
            desc: 'Weekly puzzle workshops honing pattern breaking, logical deduction, and spatial manipulation.',
            category: 'Logic & Math',
            icon: Calculator
          },
          {
            title: 'Campus Compost & Organic Garden Initiative',
            desc: 'Managing school cafeteria organic waste conversion into compost for organic vegetable beds.',
            category: 'Sustainability',
            icon: TreePalm
          }
        ],
        subjects: [
          {
            name: 'Language 1: English',
            book: 'Marigold Book 4 (NCERT) + Supplementary Reader: Sunflower English',
            bookCover: '/images/books/marigold-4.jpg',
            topics: [
              'Reading literature: Prose stories, lyrical poetry, non-fiction essays',
              'Advanced grammar: Adjectives of degree, adverbs, prepositions, conjunctions',
              'Composition: Descriptive essays, formal leave letters, story continuation',
              'Unseen comprehension passages demanding vocabulary and contextual deduction',
              'Public speaking, debates, and expressive choral poetry'
            ],
            note: 'CBSE Code 184. Solid foundation for higher-order literary comprehension.'
          },
          {
            name: 'Language 2: Kannada',
            book: 'Karnataka State Board Kannada Pathya Pustaka Class 4',
            bookCover: '/images/books/kannada-4.jpg',
            topics: [
              'Selected prose works by classical and modern Karnataka authors',
              'Poetry: Sarvajna Vachanas, patriotic songs, and nature poetry',
              'Grammar: Sandhi basics, Samasa concepts, antonyms and proverbs',
              'Essay writing on historical sites and festivals of Karnataka',
              'Comprehension of classical narrative passages'
            ],
            note: 'CBSE Code 015. Enhances cultural grounding and literary expression.'
          },
          {
            name: 'Language 3: Hindi',
            book: 'Rimjhim Book 4 (NCERT)',
            bookCover: '/images/books/rimjhim-4.jpg',
            topics: [
              'Prose narratives and inspiring poems from NCERT',
              'Grammar: Kriya (verbs), Visheshan (adjectives), Kaal (tenses)',
              'Letter writing: Simple informal family letters in Hindi',
              'Comprehension drills with full analytical questions',
              'Short essay topics on festivals, leaders, and nature'
            ],
            note: 'CBSE Code 085. Formal Hindi composition development.'
          },
          {
            name: 'Mathematics',
            book: 'Math Magic Book 4 (NCERT)',
            bookCover: '/images/books/math-magic-4.jpg',
            topics: [
              'Large number system: Place value up to 6 digits (Lakhs)',
              'Fractions: Proper, improper, equivalent, and mixed fractions',
              'Number theory: Factors, multiples, Prime numbers, HCF & LCM basics',
              'Geometry: Angles classification (acute, right, obtuse), triangles, quadrilaterals',
              'Metric system conversions: Length (km/m), mass (kg/g), volume (L/mL)'
            ],
            note: 'Introduces logical reasoning puzzles and systematic problem solving.'
          },
          {
            name: 'General Science',
            book: 'Looking Around Book 4 (NCERT) + School Science Lab Manual',
            bookCover: '/images/books/looking-around-4.jpg',
            topics: [
              'Human nutrition: Nutrients, balanced diet, and digestive health',
              'States of matter: Solids, liquids, gases, evaporation, and condensation',
              'Light, shadow, reflection, and transparent vs opaque materials',
              'Ecosystem adaptations: Desert cacti, mountain conifers, aquatic fauna',
              'Karnataka geography: Major rivers (Cauvery, Krishna) and soil profiles'
            ],
            note: 'Weekly hands-on laboratory practicals with student experiment journals.'
          },
          {
            name: 'Social Studies',
            book: 'NCERT Social Studies Class 4 + Karnataka Heritage Supplement',
            bookCover: '/images/books/social-studies-4.jpg',
            topics: [
              'Ancient Karnataka kingdoms: Kadambas, Chalukyas, Hoysalas, Vijayanagara',
              'Political cartography: States and Union Territories of India',
              'Civic governance: Gram Panchayat, Municipal Corporations, citizen duties',
              'Evolution of transport: From ancient barter routes to modern aviation',
              'Eminent visionaries from Karnataka: Sir M. Visvesvaraya, Kuvempu'
            ],
            note: 'Integrates field trips to local heritage monuments.'
          },
          {
            name: 'Computer Applications',
            book: 'Computer Masti Level 4 / Digital Literacy Workbook',
            bookCover: '/images/books/computer-4.jpg',
            topics: [
              'MS Word: Page layouts, headers/footers, bulleting, inserting graphics',
              'Spreadsheets introduction: Rows, columns, cell addresses, simple sums',
              'Scratch Coding: Event triggers, repeating loops, broadcasting messages',
              'Internet ethics, safe web search techniques, and email safety',
              'Typing proficiency benchmark target: 15+ words per minute'
            ],
            note: 'Encourages creative digital presentation design.'
          }
        ]
      },
      {
        id: 'class-5',
        label: 'Class 5',
        shortTitle: 'Class 5',
        span: 'Preparatory Year 3 (SAFAL Benchmark)',
        ages: 'Ages 10 – 11',
        tagline: 'CBSE SAFAL Readiness, Advanced Arithmetic, Science & Python Basics',
        heroImage: '/images/hero-campus-wide.jpg',
        methodology: 'CBSE SAFAL-Aligned Inquiry, Computational Logic & Research',
        assessment: 'CBSE SAFAL Grade 5 Diagnostic Assessment + Term Exams (80/20)',
        timings: '8:30 AM – 3:15 PM',
        ratio: '1:30',
        highlights: [
          'Full preparation for CBSE SAFAL Grade 5 National Assessment',
          'Decimals, volume/surface area, bar graphs, and commercial math basics',
          'Human body organ systems, physics forces, and environmental stewardship',
          'First introduction to text-based Python programming & presentation design'
        ],
        milestones: [
          {
            title: 'SAFAL Competency Benchmark',
            desc: 'Demonstrates deep conceptual mastery in Language, Math, and EVS per CBSE National Standards.',
            type: 'academic'
          },
          {
            title: 'Introductory Python & Scratch',
            desc: 'Writes basic Python script loops and builds multi-stage Scratch logic games.',
            type: 'skill'
          },
          {
            title: 'Civic Responsibility & SEWA',
            desc: 'Leads school cleanliness campaigns and collaborates on community service drives.',
            type: 'holistic'
          }
        ],
        activities: [
          {
            title: 'Python Coding & Game Studio',
            desc: 'Transitioning from blocks to real code: writing Python syntax, variables, and math quiz generators.',
            category: 'Computer Science',
            icon: Code
          },
          {
            title: 'Inter-House Science Olympiad & Quiz',
            desc: 'Brisk competitive quiz rounds covering physics forces, space exploration, and human anatomy.',
            category: 'Academic Quiz',
            icon: Brain
          },
          {
            title: 'SEWA Social Service & Tree Drive',
            desc: 'Students adopt campus saplings and manage a book donation drive for local community libraries.',
            category: 'Civic Action',
            icon: Heartbeat
          },
          {
            title: 'Annual Arts & Folk Music Exhibition',
            desc: 'Curated showcase of watercolour paintings, clay pottery, and classical group vocal recitals.',
            category: 'Visual & Performing Arts',
            icon: MusicNote
          }
        ],
        subjects: [
          {
            name: 'Language 1: English',
            book: 'Marigold Book 5 (NCERT) + Supplementary Reader: Mridang',
            bookCover: '/images/books/marigold-5.jpg',
            topics: [
              'Complex narrative prose, analytical non-fiction, and reflective poetry',
              'Grammar: All tenses mastery, active vs passive voice introduction, modals',
              'Writing: Formal applications, persuasive essays, analytical book reviews',
              'Unseen comprehension with inference, theme extraction, and tone analysis',
              'Vocabulary: Etymology, Greek/Latin roots, homophones, proverbs'
            ],
            note: 'CBSE Code 184. Aligned with CBSE SAFAL Grade 5 language benchmarks.'
          },
          {
            name: 'Language 2: Kannada',
            book: 'Karnataka State Board Kannada Pathya Pustaka Class 5',
            bookCover: '/images/books/kannada-5.jpg',
            topics: [
              'Advanced Kannada prose and poetic gems from celebrated Kannada writers',
              'Grammar: Alankaras (figures of speech), Kala (tenses), Vibhakti revision',
              'Structured essay composition on social and cultural themes',
              'Unseen prose and poetry comprehension analysis',
              'Dramatic dialogue delivery and Kannada elocution'
            ],
            note: 'CBSE Code 015. Prepares students for middle school linguistic rigor.'
          },
          {
            name: 'Language 3: Hindi',
            book: 'Rimjhim Book 5 (NCERT)',
            bookCover: '/images/books/rimjhim-5.jpg',
            topics: [
              'Prose literature, folk stories, and patriotic Hindi poetry',
              'Grammar: Kaal (tenses), Karak (cases), Muhavare (idioms)',
              'Formal and informal letter writing formats',
              'Paragraph and short essay composition on diverse themes',
              'Unseen passage comprehension with analytical questions'
            ],
            note: 'CBSE Code 085. Final preparatory year before advanced Middle School Hindi.'
          },
          {
            name: 'Mathematics',
            book: 'Math Magic Book 5 (NCERT)',
            bookCover: '/images/books/math-magic-5.jpg',
            topics: [
              'Large numbers up to Crores and Indian/International number systems',
              'Decimals: Tenths, hundredths, place value, operations, and rounding',
              'Data Handling: Double bar graphs, pie charts, and data interpretation',
              'Geometry & Mensuration: 3D shapes, area of rectangles/squares, volume of cubes',
              'Commercial Math basics: Profit, loss, discount, and simple interest intro'
            ],
            note: 'Rigorous competency-based problem solving evaluated in SAFAL Grade 5.'
          },
          {
            name: 'Science',
            book: 'NCERT Science Book 5 + School Practical Lab Manual',
            bookCover: '/images/books/science-5.jpg',
            topics: [
              'Plant and animal reproduction, seeds, pollination, and life cycles',
              'Physical forces: Gravity, friction, magnetism, electrostatic force',
              'States of matter, physical vs chemical changes, solubility experiments',
              'Human organ systems: Circulatory, respiratory, nervous, and digestive',
              'Environmental science: Global warming, plastic footprint, water harvesting'
            ],
            note: 'First formal laboratory practicals with formal lab notebook records.'
          },
          {
            name: 'Social Studies',
            book: 'NCERT Social Studies Class 5 + Our India Supplementary',
            bookCover: '/images/books/social-studies-5.jpg',
            topics: [
              'Indian Civilization: Indus Valley cities, Vedic traditions, ancient trade',
              'Physical geography: Himalayas, Northern Plains, Deccan Plateau, Coastal Belts',
              'Constitution of India: Preamble, Fundamental Rights, and Civic Duties',
              'Indian Economy: Agriculture, manufacturing sectors, banking, digital payments',
              'World Atlas skills: Continents, oceans, equator, latitude/longitude basics'
            ],
            note: 'Includes community survey projects under the SEWA framework.'
          },
          {
            name: 'Computer Science & Coding',
            book: 'Computer Masti Level 5 + Python Coding Workbook',
            bookCover: '/images/books/computer-5.jpg',
            topics: [
              'Python Fundamentals: print statements, variables, numbers, string manipulation',
              'Scratch Game Development: Multi-sprite coordination, collision logic, scoring',
              'Presentation Skills (PowerPoint): Custom slide layouts, animations, transitions',
              'Internet Research: Verifying reliable sources and citing digital articles',
              'Cyber safety: Digital footprint awareness, strong passwords, online bullying'
            ],
            note: 'Target typing benchmark: 25+ words per minute by end of year.'
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
    color: '#3B82F6',
    accentClass: 'text-blue-500',
    badgeBg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    description: 'Specialized subjects, laboratory science, 3-language mastery, and computational thinking with Python and AI.',
    grades: [
      {
        id: 'class-6',
        label: 'Class 6',
        shortTitle: 'Class 6',
        span: 'Middle School Year 1',
        ages: 'Ages 11 – 12',
        tagline: 'Formal Science Split, Algebraic Thinking, History & HTML Web Basics',
        heroImage: '/images/hero-campus-sunset.jpg',
        methodology: 'Subject-Specialist Faculty, Dedicated Labs & Problem Solving',
        assessment: 'Term Exams (80%) + Continuous Internal Assessment (20%)',
        timings: '8:30 AM – 3:30 PM',
        ratio: '1:32',
        highlights: [
          'Formal split into Physics, Chemistry, Biology and History, Civics, Geography',
          'Introduction to formal Algebra, rational numbers, and Euclidean geometry',
          '3-textbook Social Science framework (NCERT Our Pasts, Earth Our Habitat, SPL)',
          'HTML web development, flowcharting algorithms, and IT lab certification'
        ],
        milestones: [
          {
            title: 'Algebraic & Abstract Logic',
            desc: 'Manipulates variables, solves simple linear equations, and graphs coordinate points.',
            type: 'academic'
          },
          {
            title: 'Laboratory Proficiency',
            desc: 'Uses microscopes, measures physical quantities, and safely tests chemical mixtures.',
            type: 'skill'
          },
          {
            title: 'Web Page Creation',
            desc: 'Codes valid semantic HTML pages with headings, lists, images, and external links.',
            type: 'skill'
          }
        ],
        activities: [
          {
            title: 'Composite Science Laboratory Practicals',
            desc: 'Weekly hands-on sessions in specialized Physics, Chemistry, and Biology laboratories.',
            category: 'Lab Science',
            icon: Flask
          },
          {
            title: 'HTML Web Publishing Workshop',
            desc: 'Students code their first portfolio website using raw semantic HTML tags and styling.',
            category: 'Web Tech',
            icon: Code
          },
          {
            title: 'Model United Nations & Debate Society',
            desc: 'Introductory parliamentary debates on global environmental and historical issues.',
            category: 'Oratory & Debating',
            icon: Users
          },
          {
            title: 'Cricket, Football & Basketball Academy',
            desc: 'Daily specialized sports training under certified coaches with inter-school tournaments.',
            category: 'Competitive Sports',
            icon: Barbell
          }
        ],
        subjects: [
          {
            name: 'Language 1: English',
            book: 'Honeysuckle (NCERT) + A Pact with the Sun (Supplementary Reader)',
            bookCover: '/images/books/honeysuckle-6.jpg',
            topics: [
              'Prose & Poetry: Literary analysis of themes, poetic devices, narrative styles',
              'Grammar: Parts of speech in depth, phrases, clauses, tense harmony',
              'Writing: Formal & informal letters, descriptive essays, diary entries',
              'Unseen Comprehension: Long analytical passages with inference questions',
              'Speaking: Class debates, extempore speeches, and dramatic monologues'
            ],
            note: 'CBSE Code 184. Introduction to higher-order literary evaluation.'
          },
          {
            name: 'Language 2: Kannada',
            book: 'Karnataka State Board Kannada Sahitya Mala / Pathya Pustaka Class 6',
            bookCover: '/images/books/kannada-6.jpg',
            topics: [
              'Literary prose and classical poetry from renowned Kannada authors',
              'Grammar: Vibhakti (case endings), Sandhi (euphonic combinations), Samasa',
              'Descriptive and narrative composition in formal Kannada',
              'Comprehension of literary and journalistic Kannada passages',
              'Introduction to legendary Kannada poets: Pampa, Ranna, Ponna'
            ],
            note: 'CBSE Code 015. Prescribed Karnataka State text under CBSE framework.'
          },
          {
            name: 'Language 3: Hindi',
            book: 'Vasant Bhag 1 (NCERT) + Bal Ram Katha (Supplementary Reader)',
            bookCover: '/images/books/vasant-1.jpg',
            topics: [
              'Prose selections from NCERT Vasant Part 1 and mythological readings',
              'Grammar: Samas (compounds), Paryayvachi (synonyms), Vilom (antonyms)',
              'Formal letter writing: Official school requests and public complaints',
              'Descriptive essay writing on national and cultural topics',
              'Analytical comprehension of unseen Hindi literature'
            ],
            note: 'CBSE Code 085. Advanced grammar and structured writing.'
          },
          {
            name: 'Mathematics',
            book: 'Mathematics — Class 6 (NCERT)',
            bookCover: '/images/books/math-6.jpg',
            topics: [
              'Number System: Integers, rational numbers, prime factorisation, HCF/LCM',
              'Algebra: Variables, algebraic expressions, linear equations in one variable',
              'Geometry: Line segments, angles, properties of triangles, symmetry',
              'Ratio, Proportion, and Unitary method applications',
              'Data Handling: Bar graphs, frequency tables, mean, median, mode'
            ],
            note: 'Foundational year of abstract algebraic and geometrical reasoning.'
          },
          {
            name: 'Science (Composite)',
            book: 'Science — Class 6 (NCERT)',
            bookCover: '/images/books/science-6.jpg',
            topics: [
              'Physics: Motion types, measurement units, speed, distance-time graphs',
              'Chemistry: Elements, compounds, mixtures, separation techniques (filtration, decantation)',
              'Biology: Cell structure, plant vs animal cells, photosynthesis, digestive system',
              'Ecology: Food webs, ecosystems, abiotic vs biotic components, adaptation',
              'Light, shadows, mirrors, electricity basics, and simple magnetic circuits'
            ],
            note: 'Weekly laboratory practicals with formal lab journal maintenance.'
          },
          {
            name: 'Social Science',
            book: 'Our Pasts Book 1 + The Earth Our Habitat + Social & Political Life 1 (NCERT)',
            bookCover: '/images/books/our-pasts-1.jpg',
            topics: [
              'History: Ancient India — Indus Valley, Vedic Age, Maurya & Gupta Empires',
              'Geography: Globe, latitudes/longitudes, motions of the earth, major landforms',
              'Civics: Democracy fundamentals, Gram Panchayat, urban local governance',
              'Regional Heritage: Deccan kingdoms and Bengaluru historic evolution',
              'Cartography skills: Physical and political mapping of India'
            ],
            note: 'Taught using 3 distinct NCERT textbooks across the scholastic year.'
          },
          {
            name: 'Computer Science',
            book: 'Computer Science Class 6 — School Prescribed + Kite Digital Platform',
            bookCover: '/images/books/computer-6.jpg',
            topics: [
              'HTML5 Web Architecture: Structural tags, headings, tables, hyperlinks, media',
              'Algorithm Design: Flowchart symbols, logical branching, pseudocode',
              'Spreadsheets Mastery: Formulas (SUM, AVERAGE, IF, MAX), data sorting',
              'Scratch 3.0: Complex multi-level game architecture and custom blocks',
              'Cyber Safety: Online identity protection, phishing, digital ethics'
            ],
            note: 'Integrated with Karnataka State Kite IT initiative materials.'
          }
        ]
      },
      {
        id: 'class-7',
        label: 'Class 7',
        shortTitle: 'Class 7',
        span: 'Middle School Year 2',
        ages: 'Ages 12 – 13',
        tagline: 'Linear Equations, Heat & Optics Labs, Medieval History & Python Logic',
        heroImage: '/images/hero-campus.jpg',
        methodology: 'Concept-First Laboratory Science & Multi-Stage Projects',
        assessment: 'Term Exams (80%) + Internal (20% - Practicals, Notebook, Periodic Tests)',
        timings: '8:30 AM – 3:30 PM',
        ratio: '1:32',
        highlights: [
          'Linear equations, congruence of triangles, and commercial mathematics',
          'Physics optics & heat labs, acid-base titration, and plant nutrition experiments',
          'Medieval Indian history: Delhi Sultanate, Mughal Empire, and Bhakti movement',
          'Full Python programming module: variables, conditionals, loops, and functions'
        ],
        milestones: [
          {
            title: 'Mathematical Modeling',
            desc: 'Solves complex linear equations, commercial percentages, and triangle congruence proofs.',
            type: 'academic'
          },
          {
            title: 'Python Scripting',
            desc: 'Codes algorithmic Python scripts with loops, conditional logic, and reusable functions.',
            type: 'skill'
          },
          {
            title: 'Historical & Civic Synthesis',
            desc: 'Compares medieval socio-economic structures and analyzes democratic state governance.',
            type: 'holistic'
          }
        ],
        activities: [
          {
            title: 'Chemical Reactions & Optics Lab',
            desc: 'Observing litmus acid-base indicators, refraction through glass prisms, and heat transfer.',
            category: 'Lab Science',
            icon: Flask
          },
          {
            title: 'Python Programming Hackathon',
            desc: 'Annual junior hackathon where students code interactive math tools and quiz engines in Python.',
            category: 'Coding & Hackathon',
            icon: Laptop
          },
          {
            title: 'Bhakti & Sufi Cultural Symposium',
            desc: 'Interdisciplinary research and musical presentations on medieval saint-poets and tolerance.',
            category: 'Social History',
            icon: Scroll
          },
          {
            title: 'Annual Science Fair & Working Models',
            desc: 'Designing working hydraulic arms, solar water heaters, and electromagnet demonstrators.',
            category: 'Engineering & STEM',
            icon: Atom
          }
        ],
        subjects: [
          {
            name: 'Language 1: English',
            book: 'Honeycomb (NCERT) + An Alien Hand (Supplementary Reader)',
            bookCover: '/images/books/honeycomb-7.jpg',
            topics: [
              'Literary appreciation of short stories, poetry, and reflective biographies',
              'Advanced grammar: Active/passive voice, direct/indirect reported speech',
              'Writing: Formal complaints, official inquiry letters, news reports, articles',
              'Extensive unseen comprehension passages with tone, intent, and summary analysis',
              'Debate preparation, formal elocution, and group discussions'
            ],
            note: 'CBSE Code 184. Prepares students for rigorous Board-style formatting.'
          },
          {
            name: 'Language 2: Kannada',
            book: 'Karnataka State Board Kannada Pathya Pustaka Class 7',
            bookCover: '/images/books/kannada-7.jpg',
            topics: [
              'Works by iconic writers: B.M. Srikantaiah, Kuvempu, D.V. Gundappa',
              'Grammar: Alankaras (Upama, Rupaka), Sandhi classification, Samasa',
              'Creative writing: Dramatic scripts, essays on environment and society',
              'Oral communication: Formal speeches and panel discussions in Kannada',
              'Rich cultural heritage of Karnataka: Art, classical music, Yakshagana'
            ],
            note: 'CBSE Code 015. Deep dive into state literary masterpieces.'
          },
          {
            name: 'Language 3: Hindi',
            book: 'Vasant Bhag 2 (NCERT) + Mahabharat Katha (Supplementary Reader)',
            bookCover: '/images/books/vasant-2.jpg',
            topics: [
              'Prose literature by Premchand and Harishankar Parsai',
              'Classical poetry by Kabir Das, Mirabai, and Surdas with Dohas',
              'Grammar: Upsarg, Pratyay, Kriya Visheshana, Kaal transformations',
              'Formal letter writing: Official applications and public queries',
              'Essay composition on scientific, historical, and national events'
            ],
            note: 'CBSE Code 085. Classical and modern Hindi literature mastery.'
          },
          {
            name: 'Mathematics',
            book: 'Mathematics — Class 7 (NCERT)',
            bookCover: '/images/books/math-7.jpg',
            topics: [
              'Integers: Operations, properties, and number line representation',
              'Algebra: Linear equations in one variable, algebraic simplification',
              'Geometry: Congruence of triangles (SSS, SAS, ASA, RHS), parallel lines',
              'Mensuration: Area of triangles, parallelograms, circles (Pi concepts)',
              'Commercial Math: Percentage, profit & loss, discount, simple interest'
            ],
            note: 'Rigorous geometric theorem proofs and commercial applications.'
          },
          {
            name: 'Science (Composite)',
            book: 'Science — Class 7 (NCERT)',
            bookCover: '/images/books/science-7.jpg',
            topics: [
              'Physics: Heat transfer (conduction, convection, radiation), electric currents, optics',
              'Chemistry: Acids, bases, salts, pH indicators, physical vs chemical changes, soil types',
              'Biology: Nutrition in plants/animals, cellular respiration, circulation in humans',
              'Ecology: Weather, climate, tropical rainforest vs polar adaptations',
              'Human reproduction: Age-appropriate introductory biological lifecycle'
            ],
            note: 'Evaluated through theory and rigorous laboratory notebook assessments.'
          },
          {
            name: 'Social Science',
            book: 'Our Pasts Book 2 + Our Environment + Social & Political Life 2 (NCERT)',
            bookCover: '/images/books/our-pasts-2.jpg',
            topics: [
              'History: Medieval India — Delhi Sultanate, Mughal Empire, Bhakti & Sufi traditions',
              'Geography: Earth spheres, atmosphere layers, ocean currents, natural vegetation',
              'Civics: State Government functioning, role of Governor/CM, public health, media ethics',
              'Karnataka Link: Mysore Wodeyars, Unification of Karnataka, historic architecture',
              'Map Work: Medieval trade routes, climate zones of Asia'
            ],
            note: 'Special focus on Karnataka’s transformative social movements.'
          },
          {
            name: 'Computer Science & Python',
            book: 'Python for Class 7 — School Prescribed Curriculum',
            bookCover: '/images/books/python-7.jpg',
            topics: [
              'Python Fundamentals: Data types (int, float, string, bool), type casting',
              'Control Flow: if-elif-else statements, relational and logical operators',
              'Iteration: for loops, while loops, range() functions, break/continue',
              'Data Collections: Python Lists creation, indexing, appending, slicing',
              'Web Basics: CSS styling integration with HTML web documents'
            ],
            note: 'Every student completes at least 3 verified Python programming projects.'
          }
        ]
      },
      {
        id: 'class-8',
        label: 'Class 8',
        shortTitle: 'Class 8',
        span: 'Middle School Final (SAFAL Benchmark)',
        ages: 'Ages 13 – 14',
        tagline: 'CBSE SAFAL Grade 8, Board Foundation, AI Literacy & Python Mastery',
        heroImage: '/images/hero-campus-wide.jpg',
        methodology: 'Pre-Board Rigor, CBSE Code 417 AI Foundations & SAFAL Prep',
        assessment: 'CBSE SAFAL Grade 8 Diagnostic Assessment + Pre-Board Style Exams',
        timings: '8:30 AM – 3:45 PM',
        ratio: '1:32',
        highlights: [
          'Direct bridge curriculum preparing for CBSE Class 9 & 10 Board examinations',
          'Introduction to CBSE Code 417 Artificial Intelligence & Machine Learning basics',
          'Quadratic expressions, factorization, surface area/volume, and probability',
          'National freedom movement, Indian Constitution, and Modern Indian history'
        ],
        milestones: [
          {
            title: 'Pre-Board Readiness',
            desc: 'Thoroughly prepared for Class 9–10 Board question patterns and analytical answer writing.',
            type: 'academic'
          },
          {
            title: 'Artificial Intelligence Literacy',
            desc: 'Understands machine learning cycles, computer vision concepts, and ethical AI implications.',
            type: 'skill'
          },
          {
            title: 'Civic & Scientific Temper',
            desc: 'Demonstrates deep constitutional knowledge, research mindset, and environmental ethics.',
            type: 'holistic'
          }
        ],
        activities: [
          {
            title: 'Artificial Intelligence & Robotics Lab',
            desc: 'Hands-on projects exploring computer vision, Teachable Machine models, and Python scripts.',
            category: 'AI & Robotics',
            icon: Brain
          },
          {
            title: 'Mock Parliament & Constitutional Debate',
            desc: 'Students simulate parliamentary sessions debating bills, constitutional rights, and public policies.',
            category: 'Civic Leadership',
            icon: Users
          },
          {
            title: 'CBSE SAFAL Diagnostic Practice Camps',
            desc: 'Targeted workshops solving analytical and critical thinking problems across Math and Science.',
            category: 'Academic Benchmarks',
            icon: Certificate
          },
          {
            title: 'Advanced Science Practicals & Microscopy',
            desc: 'Staining onion peel and cheek cells, investigating chemical reactivity series, and circuit analysis.',
            category: 'Laboratory Science',
            icon: Microscope
          }
        ],
        subjects: [
          {
            name: 'Language 1: English',
            book: 'Honeydew (NCERT Main Reader) + It So Happened (Supplementary Reader)',
            bookCover: '/images/books/honeydew-8.jpg',
            topics: [
              'Advanced literary critique: Tone, conflict resolution, character arcs',
              'Grammar: Reported speech, sentence transformation, complex clauses',
              'Writing: Formal speeches, newspaper reports, notices, circulars, articles',
              'Unseen Comprehension: Abstract, philosophical, and argumentative passages',
              'Oratory: Parliamentary debates, extempore, and Shakespearean excerpts'
            ],
            note: 'CBSE Code 184. Direct bridge to CBSE Class 9 Board format.'
          },
          {
            name: 'Language 2: Kannada',
            book: 'Karnataka State Board Kannada Advanced Pathya Pustaka Class 8',
            bookCover: '/images/books/kannada-8.jpg',
            topics: [
              'Major literary epics: Selections from Kumaravyasa, Raghavanka, Bendre',
              'Grammar: Vritti (word derivation), Sandhi mastery, Samasa decomposition',
              'Formal essay and investigative journalism reporting in Kannada',
              'Public speech and group discussion evaluation in formal Kannada',
              'Preparation for Board-level Class 9 Kannada (CBSE Code 015)'
            ],
            note: 'CBSE Code 015. High school bridge curriculum.'
          },
          {
            name: 'Language 3: Hindi',
            book: 'Vasant Bhag 3 (NCERT) + Bharat ki Khoj (Supplementary Reader)',
            bookCover: '/images/books/vasant-3.jpg',
            topics: [
              'Prose: Jawaharlal Nehru’s selections from Bharat ki Khoj (Discovery of India)',
              'Poetry: Ramdhari Singh Dinkar and Subhadra Kumari Chauhan',
              'Grammar: Vakya Roopantaran (sentence synthesis & transformation)',
              'Writing: Argumentative essays and formal administrative letters',
              'Final Class 8 Board-style Hindi comprehensive examination'
            ],
            note: 'CBSE Code 085. Final year of compulsory 3rd language Hindi.'
          },
          {
            name: 'Mathematics',
            book: 'Mathematics — Class 8 (NCERT)',
            bookCover: '/images/books/math-8.jpg',
            topics: [
              'Algebra: Linear equations in two variables, algebraic identities, factorization',
              'Exponents & Powers: Laws of exponents, standard scientific notation',
              'Mensuration: Surface area and volume of cube, cuboid, and cylinders',
              'Data Handling: Elementary probability, histograms, pie chart construction',
              'Graphs: Introduction to Cartesian coordinate plotting and linear graphs'
            ],
            note: 'Aligned with Class 9 Board mathematics foundations.'
          },
          {
            name: 'Science (Composite)',
            book: 'Science — Class 8 (NCERT)',
            bookCover: '/images/books/science-8.jpg',
            topics: [
              'Physics: Force, atmospheric pressure, friction, sound waves, light (refraction)',
              'Chemistry: Synthetic fibers, metals vs non-metals reactivity, coal & petroleum, combustion',
              'Biology: Microorganisms (friends & foes), cell structure & organelles, crop production',
              'Environmental Science: Atmospheric pollution, greenhouse gases, conservation of flora/fauna',
              'CBSE SAFAL Grade 8 science competency benchmark diagnostics'
            ],
            note: 'Rigorous internal assessment with evaluated laboratory experiments.'
          },
          {
            name: 'Social Science',
            book: 'Our Pasts Book 3 + Resources & Development + Social & Political Life 3 (NCERT)',
            bookCover: '/images/books/our-pasts-3.jpg',
            topics: [
              'History: Modern India — British expansion, 1857 Revolt, Freedom Struggle, Partition',
              'Geography: Land, soil, water resources, mineral wealth, agriculture & industrial belts',
              'Civics: Indian Constitution, secularism, Parliament, Supreme Court & Judiciary',
              'Economics: Human resources, economic sectors, sustainable development',
              'Map Work: Indian national movement locations and major industrial zones'
            ],
            note: 'Strong conceptual preparation for Class 9–10 Board Social Science.'
          },
          {
            name: 'Artificial Intelligence (AI) & Cyber Safety',
            book: 'CBSE AI for Class 8 — Know Your AI (Code 417 Foundation)',
            bookCover: '/images/books/cbse-ai-8.jpg',
            topics: [
              'Introduction to AI: History, domains (Data, Computer Vision, NLP)',
              'Machine Learning: Supervised vs Unsupervised learning paradigms',
              'Neural Networks: How deep learning architectures emulate human cognition',
              'AI Applications: Autonomous robotics, conversational agents, smart cities',
              'Cyber Security & Ethics: Data privacy, algorithmic bias, digital footprint management'
            ],
            note: 'CBSE Code 417 official curriculum. First formal national AI certification.'
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
    color: '#EF4444',
    accentClass: 'text-red-500',
    badgeBg: 'bg-red-500/10 text-red-400 border-red-500/20',
    bg: 'bg-red-50',
    border: 'border-red-200',
    description: 'Full CBSE AISSE Board curriculum. Rigorous preparation for the Class X All India Secondary School Examination.',
    grades: [
      {
        id: 'class-9',
        label: 'Class 9',
        shortTitle: 'Class 9',
        span: 'CBSE Board Foundation',
        ages: 'Ages 14 – 15',
        tagline: 'CBSE AISSE Board Foundation, Rigorous Practicals & Advanced IT',
        heroImage: '/images/hero-campus-sunset.jpg',
        methodology: 'Full CBSE AISSE Curriculum with Formative + Pre-Board Cycle',
        assessment: 'Periodic Assessment I, Mid-Term, PA II, and Annual Board-Pattern Exam',
        timings: '8:30 AM – 3:45 PM',
        ratio: '1:35',
        highlights: [
          '100% CBSE AISSE curriculum aligned with national NCERT textbooks',
          'Strict 80 Marks Board Theory + 20 Marks Internal Assessment framework',
          'Physics, Chemistry, and Biology laboratories with formal external-ready viva logs',
          'CBSE Code 402 Information Technology skill subject with database & spreadsheets'
        ],
        milestones: [
          {
            title: 'Board Exam Competency',
            desc: 'Mastery over CBSE Class 9 question blueprints, case-based questions, and assertion-reasoning.',
            type: 'academic'
          },
          {
            title: 'Scientific & Lab Precision',
            desc: 'Independently conducts formal practicals: Newton’s laws, chromatography, and cell microscopy.',
            type: 'skill'
          },
          {
            title: 'IT Skill Certification',
            desc: 'Creates relational databases in MS Access and executes advanced spreadsheet automation.',
            type: 'skill'
          }
        ],
        activities: [
          {
            title: 'Full CBSE Science Lab Practicals',
            desc: 'Rigorous sessions in dedicated Physics, Chemistry, and Biology labs verifying Board practicals.',
            category: 'Board Practicals',
            icon: Microscope
          },
          {
            title: 'CBSE IT (Code 402) Project Lab',
            desc: 'Designing complete digital documentation, mail merge pipelines, and SQL database forms.',
            category: 'Information Tech',
            icon: Laptop
          },
          {
            title: 'Model United Nations & Leadership Summit',
            desc: 'Representing member nations on international policy, climate agreements, and human rights.',
            category: 'Global Diplomacy',
            icon: Globe
          },
          {
            title: 'Inter-School Sports & CBSE Clusters',
            desc: 'Participating in CBSE cluster athletics, basketball, volleyball, and football championships.',
            category: 'Athletics & PE',
            icon: Barbell
          }
        ],
        subjects: [
          {
            name: 'Subject 1: English Language & Literature',
            book: 'Beehive (NCERT Main Reader) + Moments (Supplementary Reader)',
            bookCover: '/images/books/beehive-9.jpg',
            topics: [
              'Literature Prose: The Fun They Had, The Little Girl, A Truly Beautiful Mind, Kathmandu',
              'Literature Poetry: The Road Not Taken (Frost), Wind (Bharati), Rain on the Roof',
              'Grammar: Determiners, tenses, modals, subject-verb concord, reported speech',
              'Writing Skills: Descriptive paragraphs, formal letters, diary entries, story writing',
              'Reading: 20-mark Board unseen factual and discursive passages'
            ],
            note: 'CBSE Code 184. Annual paper: Reading 20M + Writing & Grammar 20M + Literature 40M + Internal 20M.'
          },
          {
            name: 'Subject 2: Kannada (2nd Language)',
            book: 'CBSE Kannada Pathya Pustaka Class 9 + Karnataka State Supplementary',
            bookCover: '/images/books/kannada-9.jpg',
            topics: [
              'Modern Kannada literature: Masterpieces of Kuvempu, Bendre, Karanth',
              'Classical poetry and historical epics with analytical commentary',
              'Grammar: Advanced Alankaras, Vibhakti, Sandhi, Samasa synthesis',
              'Writing: Formal administrative applications and argumentative essays',
              'Comprehension: Complex literary and contemporary unseen passages'
            ],
            note: 'CBSE Code 015. Mandated 2nd language in Karnataka. 100-mark annual evaluation.'
          },
          {
            name: 'Subject 3: Mathematics Standard',
            book: 'Mathematics — Class 9 (NCERT)',
            bookCover: '/images/books/math-9.jpg',
            topics: [
              'Number Systems: Irrational numbers, real numbers representation, laws of exponents',
              'Algebra: Polynomials (Factor Theorem, Remainder Theorem), Linear equations in 2 variables',
              'Coordinate Geometry: Cartesian plane, plotting points, distance formula basics',
              'Geometry: Lines and angles, triangles congruence proofs, quadrilaterals, circles',
              'Statistics & Probability: Frequency polygons, histograms, empirical probability'
            ],
            note: 'CBSE Code 041 (Standard). 80M Theory + 20M Internal Assessment (Periodic Tests, Portfolio, Lab).'
          },
          {
            name: 'Subject 4: Science',
            book: 'Science — Class 9 (NCERT)',
            bookCover: '/images/books/science-9.jpg',
            topics: [
              'Physics: Motion (equations of motion), Force & Newton’s laws, Gravitation, Work & Energy, Sound',
              'Chemistry: Matter in our surroundings, Pure substances, Atoms and molecules, Atomic structure',
              'Biology: Fundamental unit of life (cell), Tissues (plant & animal), Diversity, Natural resources',
              'Lab Practicals: Verifying laws of reflection, Archimedes principle, slide preparation',
              'Board pattern assessment: Case-based, assertion-reasoning, and practical-oriented questions'
            ],
            note: 'CBSE Code 086. Composite evaluation across Physics, Chemistry, and Biology.'
          },
          {
            name: 'Subject 5: Social Science',
            book: 'India & Contemporary World 1 + Contemporary India 1 + Democratic Politics 1 + Economics 1 (NCERT)',
            bookCover: '/images/books/history-9.jpg',
            topics: [
              'History: French Revolution, Russian Revolution, Rise of Nazism, Forest Society',
              'Geography: India location & size, physical features, drainage systems, climate, wildlife',
              'Civics: What is Democracy?, Constitutional design, Electoral politics, Democratic rights',
              'Economics: Story of Village Palampur, People as Resource, Poverty, Food Security in India',
              'Map Work: Identification and location of historical and geographical features'
            ],
            note: 'CBSE Code 087. Four textbooks evaluated equally (20 marks per component).'
          },
          {
            name: 'Subject 6 (Skill): Information Technology',
            book: 'CBSE Skill Education — Information Technology Class 9 (Code 402)',
            bookCover: '/images/books/it-402-9.jpg',
            topics: [
              'Employability Skills: Communication, self-management, ICT, entrepreneurial skills',
              'Digital Documentation: Advanced word processing, styles, tables of contents, mail merge',
              'Electronic Spreadsheets: Complex formulas, data consolidation, conditional formatting',
              'Digital Presentations: Slide masters, custom animation paths, multimedia embedding',
              'Relational Database: Introduction to DBMS, tables, primary keys, simple queries'
            ],
            note: 'CBSE Code 402. Theory Exam (50 Marks) + Practical Lab Exam (50 Marks).'
          }
        ]
      },
      {
        id: 'class-10',
        label: 'Class 10 (CBSE Board)',
        shortTitle: 'Class 10',
        span: 'CBSE AISSE Board Examination Year',
        ages: 'Ages 15 – 16',
        tagline: 'CBSE AISSE Class 10 Board Examination, Science Labs & IT/AI Mastery',
        heroImage: '/images/hero-campus-wide.jpg',
        methodology: 'National Board Examination Syllabus, Rigorous Pre-Boards & Remediation',
        assessment: 'All India Secondary School Examination (AISSE) by CBSE (80M) + Internal (20M)',
        timings: '8:30 AM – 4:00 PM',
        ratio: '1:35',
        highlights: [
          'Full CBSE All India Secondary School Examination (AISSE) Board syllabus',
          '3 Pre-Board Examination cycles simulating exact CBSE National Board conditions',
          'Standard & Basic Mathematics streams per student career path',
          'External examiner evaluated Science practical vivas and IT/AI project submissions'
        ],
        milestones: [
          {
            title: 'CBSE Board Distinction',
            desc: 'Aims for top percentiles in the national Class 10 AISSE Board Examinations.',
            type: 'academic'
          },
          {
            title: 'Analytical Science & Math',
            desc: 'Solves complex trigonometric applications, stoichiometry, electricity circuits, and genetics.',
            type: 'academic'
          },
          {
            title: 'Graduation & Stream Selection',
            desc: 'Equipped with career clarity for Senior Secondary streams (Science, Commerce, Humanities).',
            type: 'holistic'
          }
        ],
        activities: [
          {
            title: 'CBSE Board Practical Laboratories',
            desc: 'External-examined practicals: Ohm’s law, focal length of lenses, saponification, and genetics.',
            category: 'Board Practicals',
            icon: Microscope
          },
          {
            title: 'National Pre-Board Examination Series',
            desc: 'Three rigorous simulation cycles testing time management, answer formatting, and syllabus mastery.',
            category: 'Examination Series',
            icon: Certificate
          },
          {
            title: 'Career Guidance & Stream Selection Workshop',
            desc: 'Expert-led counselling on competitive exams (NEET, JEE, CUET, CA) and Class 11 subject options.',
            category: 'Career Mentorship',
            icon: Lightbulb
          },
          {
            title: 'Valedictory & Class 10 Farewell Graduation',
            desc: 'Celebration of school journey milestones, leadership honours, and school crest presentations.',
            category: 'Graduation & Culture',
            icon: Sparkle
          }
        ],
        subjects: [
          {
            name: 'Subject 1: English Language & Literature',
            book: 'First Flight (NCERT Main Reader) + Footprints Without Feet (Supplementary)',
            bookCover: '/images/books/first-flight-10.jpg',
            topics: [
              'Literature Prose: A Letter to God, Nelson Mandela, Anne Frank, Glimpses of India, Madam Rides the Bus',
              'Literature Poetry: Dust of Snow, Fire and Ice (Frost), A Tiger in the Zoo, The Ball Poem, Fog',
              'Grammar: Tenses, modals, subject-verb concord, reported speech, gap-filling, editing',
              'Writing Skills: Formal letters (editor, complaint, order, inquiry), analytical paragraphs',
              'Board Paper: 80M Board Exam (Reading 20M + Writing & Grammar 20M + Literature 40M) + 20M ASL/Internal'
            ],
            note: 'CBSE Code 184. National Board examination conducted in March.'
          },
          {
            name: 'Subject 2: Kannada (2nd Language)',
            book: 'CBSE Kannada Pathya Pustaka Class 10 (Karnataka Mandated)',
            bookCover: '/images/books/kannada-10.jpg',
            topics: [
              'Advanced Kannada prose and modern literary reflections on Karnataka society',
              'Classical poetry analysis: Kuvempu, Bendre, PuTiNa, and medieval Vachanas',
              'Grammar mastery: Alankaras, Vibhakti, Sandhi, Samasa, proverbs and idioms',
              'Formal argumentative essays and administrative communication in Kannada',
              'Board exam comprehension of complex seen and unseen passages'
            ],
            note: 'CBSE Code 015. Board Examination (80 Marks) + ASL Internal Assessment (20 Marks).'
          },
          {
            name: 'Subject 3: Mathematics (Standard / Basic)',
            book: 'Mathematics — Class 10 (NCERT)',
            bookCover: '/images/books/math-10.jpg',
            topics: [
              'Real Numbers: Fundamental Theorem of Arithmetic, irrationality proofs',
              'Algebra: Polynomials, Pair of linear equations, Quadratic equations, Arithmetic Progressions',
              'Coordinate Geometry: Distance formula, section formula',
              'Trigonometry: Ratios, identities, Heights and Distances applications',
              'Geometry & Mensuration: Circles, surface areas and volumes of combined solids',
              'Statistics & Probability: Mean, median, mode of grouped data, probability theorems'
            ],
            note: 'Code 041 (Standard) or Code 241 (Basic). Standard required for Class 11 Science stream.'
          },
          {
            name: 'Subject 4: Science',
            book: 'Science — Class 10 (NCERT)',
            bookCover: '/images/books/science-10.jpg',
            topics: [
              'Physics: Light (Reflection & Refraction, Lenses), Human Eye, Electricity (Ohm’s Law), Magnetic Effects',
              'Chemistry: Chemical reactions, Acids/Bases/Salts, Metals & Non-metals, Carbon & its Compounds',
              'Biology: Life Processes (Nutrition, Respiration, Transport, Excretion), Control & Coordination, Heredity',
              'Environmental Science: Ecosystem dynamics, ozone layer, waste management strategies',
              'Board Exam: 80M Theory (incl. 5M practical skills) + 20M Internal (Lab Record & Viva)'
            ],
            note: 'CBSE Code 086. Practical viva examined by CBSE external evaluator.'
          },
          {
            name: 'Subject 5: Social Science',
            book: 'India & Contemporary World 2 + Contemporary India 2 + Democratic Politics 2 + Economic Development (NCERT)',
            bookCover: '/images/books/history-10.jpg',
            topics: [
              'History: Rise of Nationalism in Europe, Nationalism in India, Making of a Global World, Print Culture',
              'Geography: Resources & development, Agriculture, Minerals & Energy, Manufacturing Industries, Lifelines',
              'Civics: Power sharing, Federalism, Gender/Religion/Caste in politics, Political Parties, Outcomes of Democracy',
              'Economics: Development concepts, Sectors of Indian economy, Money & Credit, Globalisation, Consumer Rights',
              'Map Work: 5 marks dedicated map questions on history and geography sites'
            ],
            note: 'CBSE Code 087. Comprehensive 80-mark Board paper covering all four disciplines.'
          },
          {
            name: 'Subject 6 (Skill): IT (402) / AI (417)',
            book: 'CBSE IT Class 10 (Code 402) or AI Class 10 (Code 417)',
            bookCover: '/images/books/cbse-ai-10.jpg',
            topics: [
              'IT (Code 402): Advanced digital documentation, calc spreadsheets (macros/scenarios), DBMS (SQL queries)',
              'AI (Code 417): AI Project Cycle, Machine Learning (classification, regression), NLP, Computer Vision',
              'Employability Skills: Communication, self-management, ICT, entrepreneurial & green skills',
              'Capstone Project: Complete website design or functioning AI model submission',
              'External Viva: Practical demonstration and viva conducted by external CBSE examiner'
            ],
            note: 'CBSE Skill Elective. 50 Marks Theory + 50 Marks Practical. Highly scoring Board subject.'
          }
        ]
      }
    ]
  }
};

export const ALL_GRADES = [
  { id: 'pre-nursery', label: 'Pre-Nursery & Nursery', stage: 'foundational', gradeId: 'pre-nursery', ages: 'Ages 3 – 5', color: '#F59E0B' },
  { id: 'lkg-ukg',     label: 'LKG & UKG',             stage: 'foundational', gradeId: 'lkg-ukg',     ages: 'Ages 4 – 6', color: '#F59E0B' },
  { id: 'class-1',     label: 'Class 1',               stage: 'foundational', gradeId: 'class-1',     ages: 'Ages 6 – 7', color: '#F59E0B' },
  { id: 'class-2',     label: 'Class 2',               stage: 'foundational', gradeId: 'class-2',     ages: 'Ages 7 – 8', color: '#F59E0B' },
  { id: 'class-3',     label: 'Class 3',               stage: 'preparatory',  gradeId: 'class-3',     ages: 'Ages 8 – 9', color: '#10B981' },
  { id: 'class-4',     label: 'Class 4',               stage: 'preparatory',  gradeId: 'class-4',     ages: 'Ages 9 – 10', color: '#10B981' },
  { id: 'class-5',     label: 'Class 5',               stage: 'preparatory',  gradeId: 'class-5',     ages: 'Ages 10 – 11', color: '#10B981' },
  { id: 'class-6',     label: 'Class 6',               stage: 'middle',       gradeId: 'class-6',     ages: 'Ages 11 – 12', color: '#3B82F6' },
  { id: 'class-7',     label: 'Class 7',               stage: 'middle',       gradeId: 'class-7',     ages: 'Ages 12 – 13', color: '#3B82F6' },
  { id: 'class-8',     label: 'Class 8',               stage: 'middle',       gradeId: 'class-8',     ages: 'Ages 13 – 14', color: '#3B82F6' },
  { id: 'class-9',     label: 'Class 9',               stage: 'secondary',    gradeId: 'class-9',     ages: 'Ages 14 – 15', color: '#EF4444' },
  { id: 'class-10',    label: 'Class 10',              stage: 'secondary',    gradeId: 'class-10',    ages: 'Ages 15 – 16', color: '#EF4444' }
];

export function getGradeData(gradeId) {
  const resolvedId = gradeId === 'class-1-2' ? 'class-1' : gradeId;
  for (const stage of Object.values(CURRICULUM)) {
    const grade = stage.grades.find(g => g.id === resolvedId);
    if (grade) {
      const idx = ALL_GRADES.findIndex(g => g.id === resolvedId);
      const prevGrade = idx > 0 ? ALL_GRADES[idx - 1] : null;
      const nextGrade = idx < ALL_GRADES.length - 1 ? ALL_GRADES[idx + 1] : null;

      return {
        grade,
        stage,
        prevGrade,
        nextGrade,
        allGrades: ALL_GRADES
      };
    }
  }
  return null;
}
