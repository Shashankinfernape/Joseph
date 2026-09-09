// Mock Gallery Data — Albums per Fest per Year
// Hero photo per album is admin-changeable (stored here as default, overridden by admin input in real app)

export const galleryData = {
  years: ['2026', '2025', '2024', '2023'],

  albums: [
    // ══════════════ 2026 ══════════════
    {
      id: 'alb_2026_annual_day',
      year: '2026',
      festName: 'Annual Day',
      tag: 'Cultural',
      month: 'February',
      heroPhoto: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop',
      photoCount: 124,
      videoCount: 3,
      photos: [
        { id: 'p1', url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop', caption: 'The Grand Stage' },
        { id: 'p2', url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop', caption: 'Dance Performance' },
        { id: 'p3', url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop', caption: 'Behind the Scenes' },
        { id: 'p4', url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop', caption: 'Audience' },
        { id: 'p5', url: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=1200&auto=format&fit=crop', caption: 'Prize Distribution' },
        { id: 'p6', url: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1200&auto=format&fit=crop', caption: 'Music Night' },
        { id: 'p7', url: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1200&auto=format&fit=crop', caption: 'Crowd Energy' },
        { id: 'p8', url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1200&auto=format&fit=crop', caption: 'Cultural Show' },
      ]
    },
    {
      id: 'alb_2026_sports',
      year: '2026',
      festName: 'Sports Day',
      tag: 'Sports',
      month: 'October',
      heroPhoto: 'https://images.unsplash.com/photo-1552667466-07770ae110d0?q=80&w=1200&auto=format&fit=crop',
      photoCount: 86,
      videoCount: 2,
      photos: [
        { id: 'p9', url: 'https://images.unsplash.com/photo-1552667466-07770ae110d0?q=80&w=1200&auto=format&fit=crop', caption: 'March Past' },
        { id: 'p10', url: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=1200&auto=format&fit=crop', caption: '100m Sprint' },
        { id: 'p11', url: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=1200&auto=format&fit=crop', caption: 'Long Jump' },
        { id: 'p12', url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200&auto=format&fit=crop', caption: 'Football Final' },
        { id: 'p13', url: 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?q=80&w=1200&auto=format&fit=crop', caption: 'Relay Race' },
        { id: 'p14', url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop', caption: 'Trophy Ceremony' },
      ]
    },
    {
      id: 'alb_2026_farewell',
      year: '2026',
      festName: 'Farewell 2026',
      tag: 'Special',
      month: 'March',
      heroPhoto: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1200&auto=format&fit=crop',
      photoCount: 98,
      videoCount: 1,
      photos: [
        { id: 'p15', url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1200&auto=format&fit=crop', caption: 'Class of 2026' },
        { id: 'p16', url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1200&auto=format&fit=crop', caption: 'With Teachers' },
        { id: 'p17', url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop', caption: 'Last Day Together' },
        { id: 'p18', url: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=1200&auto=format&fit=crop', caption: 'Group Photos' },
      ]
    },
    {
      id: 'alb_2026_independence',
      year: '2026',
      festName: 'Independence Day',
      tag: 'National',
      month: 'August',
      heroPhoto: 'https://images.unsplash.com/photo-1532375810565-c0b0201c107f?q=80&w=1200&auto=format&fit=crop',
      photoCount: 54,
      videoCount: 1,
      photos: [
        { id: 'p19', url: 'https://images.unsplash.com/photo-1532375810565-c0b0201c107f?q=80&w=1200&auto=format&fit=crop', caption: 'Flag Hoisting' },
        { id: 'p20', url: 'https://images.unsplash.com/photo-1463171379579-3fdfb86d6285?q=80&w=1200&auto=format&fit=crop', caption: 'March Past' },
        { id: 'p21', url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1200&auto=format&fit=crop', caption: 'Cultural Programme' },
      ]
    },
    {
      id: 'alb_2026_science_fair',
      year: '2026',
      festName: 'Science Fair',
      tag: 'Academic',
      month: 'November',
      heroPhoto: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop',
      photoCount: 61,
      videoCount: 0,
      photos: [
        { id: 'p22', url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop', caption: 'Project Displays' },
        { id: 'p23', url: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?q=80&w=1200&auto=format&fit=crop', caption: 'Judging Panel' },
        { id: 'p24', url: 'https://images.unsplash.com/photo-1532094349884-543559921af7?q=80&w=1200&auto=format&fit=crop', caption: 'Award Winners' },
      ]
    },

    // ══════════════ 2025 ══════════════
    {
      id: 'alb_2025_annual_day',
      year: '2025',
      festName: 'Annual Day',
      tag: 'Cultural',
      month: 'February',
      heroPhoto: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=1200&auto=format&fit=crop',
      photoCount: 110,
      videoCount: 4,
      photos: [
        { id: 'p25', url: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=1200&auto=format&fit=crop', caption: 'Opening Night' },
        { id: 'p26', url: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1200&auto=format&fit=crop', caption: 'Band Performance' },
        { id: 'p27', url: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1200&auto=format&fit=crop', caption: 'Packed House' },
      ]
    },
    {
      id: 'alb_2025_farewell',
      year: '2025',
      festName: 'Farewell 2025',
      tag: 'Special',
      month: 'March',
      heroPhoto: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=1200&auto=format&fit=crop',
      photoCount: 156,
      videoCount: 2,
      photos: [
        { id: 'p28', url: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=1200&auto=format&fit=crop', caption: 'Farewell Ceremony' },
        { id: 'p29', url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop', caption: 'Memories Forever' },
      ]
    },
    {
      id: 'alb_2025_sports',
      year: '2025',
      festName: 'Sports Day',
      tag: 'Sports',
      month: 'September',
      heroPhoto: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop',
      photoCount: 74,
      videoCount: 1,
      photos: [
        { id: 'p30', url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop', caption: 'Track Events' },
        { id: 'p31', url: 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?q=80&w=1200&auto=format&fit=crop', caption: 'Field Events' },
      ]
    },

    // ══════════════ 2024 ══════════════
    {
      id: 'alb_2024_annual_day',
      year: '2024',
      festName: 'Annual Day',
      tag: 'Cultural',
      month: 'February',
      heroPhoto: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1200&auto=format&fit=crop',
      photoCount: 89,
      videoCount: 2,
      photos: [
        { id: 'p32', url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1200&auto=format&fit=crop', caption: 'Cultural Night 2024' },
        { id: 'p33', url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop', caption: 'Dance Showcase' },
      ]
    },
    {
      id: 'alb_2024_republic_day',
      year: '2024',
      festName: 'Republic Day',
      tag: 'National',
      month: 'January',
      heroPhoto: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1200&auto=format&fit=crop',
      photoCount: 48,
      videoCount: 0,
      photos: [
        { id: 'p34', url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1200&auto=format&fit=crop', caption: 'Parade' },
      ]
    },

    // ══════════════ 2023 ══════════════
    {
      id: 'alb_2023_annual_day',
      year: '2023',
      festName: 'Annual Day',
      tag: 'Cultural',
      month: 'February',
      heroPhoto: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop',
      photoCount: 102,
      videoCount: 3,
      photos: [
        { id: 'p35', url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop', caption: 'Stage Lights 2023' },
        { id: 'p36', url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop', caption: 'Performances' },
      ]
    },
    {
      id: 'alb_2023_sports',
      year: '2023',
      festName: 'Sports Day',
      tag: 'Sports',
      month: 'October',
      heroPhoto: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200&auto=format&fit=crop',
      photoCount: 67,
      videoCount: 1,
      photos: [
        { id: 'p37', url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200&auto=format&fit=crop', caption: 'Football Match' },
      ]
    },
  ]
};
