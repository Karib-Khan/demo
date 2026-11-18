export interface ColorPalette {
  id: string;
  index: string;
  isDark: boolean;
  nameAr: string;
  nameEn: string;
  shortAr: string;
  shortEn: string;
  noteAr: string;
  noteEn: string;
  vars: {
    canvas: string;
    sectionAlt: string;
    card: string;
    surfaceMuted: string;
    surfaceSubtle: string;
    border: string;
    borderStrong: string;
    ink: string;
    inkMuted: string;
    inkSubtle: string;
    accent: string;
    accentHover: string;
    accentText: string;
    accent2: string;
    accentOnDark: string;
    secondaryBtnBg: string;
    secondaryBtnText: string;
    heroBg: string;
    heroInk: string;
    heroMuted: string;
    darkBg: string;
    footerBg: string;
    starColor: string;
  };
}

export const COLOR_PALETTES: ColorPalette[] = [
  {
    id: 'royal-emerald-gold',
    index: '01',
    isDark: false,
    nameAr: 'زمردي ملكي وذهبي (المدينة)',
    nameEn: 'Royal Emerald & Gold',
    shortAr: 'زمردي ذهبي',
    shortEn: 'Emerald Gold',
    noteAr: 'زمردي غني مع لمسات ذهبية وخلفية عاجية دافئة',
    noteEn: 'Rich forest emerald, warm gold & cream ivory',
    vars: {
      canvas: '#F6F1E7',
      sectionAlt: '#EFE6D5',
      card: '#FFFFFF',
      surfaceMuted: '#E6DBC6',
      surfaceSubtle: '#EFE9DC',
      border: '#D8CCB4',
      borderStrong: '#BCA988',
      ink: '#0E241C',
      inkMuted: '#344E44',
      inkSubtle: '#526B61',
      accent: '#065F46',
      accentHover: '#064E3B',
      accentText: '#FFFFFF',
      accent2: '#C27803',
      accentOnDark: '#FCD34D',
      secondaryBtnBg: '#0E241C',
      secondaryBtnText: '#FFFFFF',
      heroBg: '#064E3B',
      heroInk: '#FFFFFF',
      heroMuted: '#D1FAE5',
      darkBg: '#063B2D',
      footerBg: '#04281E',
      starColor: '#C27803',
    },
  },
  {
    id: 'arabian-espresso-gold',
    index: '02',
    isDark: false,
    nameAr: 'رملي عربي وقهوة داكنة',
    nameEn: 'Arabian Espresso & Gold',
    shortAr: 'قهوة وذهبي',
    shortEn: 'Espresso Gold',
    noteAr: 'طابع فندقي فاخر بدرجات البني والذهبي والرملي',
    noteEn: 'Luxury hospitality sand, espresso & burnished gold',
    vars: {
      canvas: '#EFE4D6',
      sectionAlt: '#E5D5C0',
      card: '#FFFDF8',
      surfaceMuted: '#DAC5AA',
      surfaceSubtle: '#F3EAE0',
      border: '#D1BC9F',
      borderStrong: '#B59B78',
      ink: '#241710',
      inkMuted: '#4E382B',
      inkSubtle: '#6E5343',
      accent: '#B45309',
      accentHover: '#92400E',
      accentText: '#FFFFFF',
      accent2: '#7C2D12',
      accentOnDark: '#FBBF24',
      secondaryBtnBg: '#241710',
      secondaryBtnText: '#FFFFFF',
      heroBg: '#241710',
      heroInk: '#FFFDF8',
      heroMuted: '#E7D8C5',
      darkBg: '#241710',
      footerBg: '#160D08',
      starColor: '#B45309',
    },
  },
  {
    id: 'teal-copper',
    index: '03',
    isDark: false,
    nameAr: 'فيروزي داكن ونحاسي',
    nameEn: 'Deep Teal & Copper',
    shortAr: 'فيروزي نحاسي',
    shortEn: 'Teal Copper',
    noteAr: 'تباين جذاب بين الأزرق الفيروزي واللون النحاسي',
    noteEn: 'Vibrant peacock teal paired with bold copper CTAs',
    vars: {
      canvas: '#E4EFF1',
      sectionAlt: '#D5E5E8',
      card: '#FFFFFF',
      surfaceMuted: '#C4D9DE',
      surfaceSubtle: '#ECF4F6',
      border: '#B8CFD5',
      borderStrong: '#8FB2BC',
      ink: '#0C2D36',
      inkMuted: '#2B4F59',
      inkSubtle: '#496D78',
      accent: '#C2410C',
      accentHover: '#9A3412',
      accentText: '#FFFFFF',
      accent2: '#0F4C5C',
      accentOnDark: '#FDBA74',
      secondaryBtnBg: '#0F4C5C',
      secondaryBtnText: '#FFFFFF',
      heroBg: '#0F4C5C',
      heroInk: '#FFFFFF',
      heroMuted: '#CBE4EA',
      darkBg: '#0B3A47',
      footerBg: '#06262F',
      starColor: '#C2410C',
    },
  },
  {
    id: 'sapphire-amber',
    index: '04',
    isDark: false,
    nameAr: 'ياقوتي أزرق وكهرماني',
    nameEn: 'Royal Sapphire & Amber',
    shortAr: 'أزرق ياقوتي',
    shortEn: 'Sapphire',
    noteAr: 'أزرق مؤسسي قوي مع أزرار كهرمانية عالية الوضوح',
    noteEn: 'Deep sapphire blue with high-contrast amber-cobalt',
    vars: {
      canvas: '#E8EEF8',
      sectionAlt: '#DAE3F3',
      card: '#FFFFFF',
      surfaceMuted: '#CAD6EC',
      surfaceSubtle: '#EFF3FB',
      border: '#BCCAE4',
      borderStrong: '#93A9D1',
      ink: '#0F1B3D',
      inkMuted: '#2F406E',
      inkSubtle: '#4B5E8E',
      accent: '#1D4ED8',
      accentHover: '#1E40AF',
      accentText: '#FFFFFF',
      accent2: '#D97706',
      accentOnDark: '#93C5FD',
      secondaryBtnBg: '#0F1B3D',
      secondaryBtnText: '#FFFFFF',
      heroBg: '#172554',
      heroInk: '#FFFFFF',
      heroMuted: '#DBEAFE',
      darkBg: '#172554',
      footerBg: '#0C1433',
      starColor: '#D97706',
    },
  },
  {
    id: 'terracotta-courtyard',
    index: '05',
    isDark: false,
    nameAr: 'طيني دافئ وعنابي',
    nameEn: 'Terracotta Courtyard',
    shortAr: 'طيني عنابي',
    shortEn: 'Terracotta',
    noteAr: 'درجات فخارية دافئة وعنابي راقٍ مع بطاقات كريمية',
    noteEn: 'Rich clay burgundy & warm sunlit terracotta',
    vars: {
      canvas: '#F5E7DF',
      sectionAlt: '#ECD7CB',
      card: '#FFFBF8',
      surfaceMuted: '#E2C4B4',
      surfaceSubtle: '#F8EFEA',
      border: '#D9B9A8',
      borderStrong: '#BE927C',
      ink: '#361310',
      inkMuted: '#63302A',
      inkSubtle: '#824C45',
      accent: '#9F1239',
      accentHover: '#881337',
      accentText: '#FFFFFF',
      accent2: '#B45309',
      accentOnDark: '#FDA4AF',
      secondaryBtnBg: '#4C1712',
      secondaryBtnText: '#FFFFFF',
      heroBg: '#5C1916',
      heroInk: '#FFFBF8',
      heroMuted: '#F5D5CC',
      darkBg: '#4C1712',
      footerBg: '#2F0D0A',
      starColor: '#B45309',
    },
  },
  {
    id: 'obsidian-emerald-dark',
    index: '06',
    isDark: true,
    nameAr: 'ليلي فاخر وزمردي مضيء',
    nameEn: 'Obsidian & Emerald Dark',
    shortAr: 'ليلي داكن',
    shortEn: 'Obsidian Dark',
    noteAr: 'تصميم ليلي داكن بالكامل مع زمردي وذهبي بارز',
    noteEn: 'Full luxury dark mode with vivid emerald & gold',
    vars: {
      canvas: '#0A0F0D',
      sectionAlt: '#101815',
      card: '#16221E',
      surfaceMuted: '#1B2B25',
      surfaceSubtle: '#111B18',
      border: '#263A33',
      borderStrong: '#38544A',
      ink: '#F2F7F5',
      inkMuted: '#B8CBC4',
      inkSubtle: '#8BA39A',
      accent: '#10B981',
      accentHover: '#059669',
      accentText: '#042419',
      accent2: '#F59E0B',
      accentOnDark: '#6EE7B7',
      secondaryBtnBg: '#253932',
      secondaryBtnText: '#F2F7F5',
      heroBg: '#09241C',
      heroInk: '#F2F7F5',
      heroMuted: '#A7F3D0',
      darkBg: '#060A08',
      footerBg: '#030504',
      starColor: '#FBBF24',
    },
  },
];
