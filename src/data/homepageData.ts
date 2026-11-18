export type Language = 'ar' | 'en';

export interface SectionBlueprint {
  id: string;
  number: string;
  titleAr: string;
  titleEn: string;
  uxDirections: {
    layoutStructure: string;
    visualHierarchy: string;
    ctaPlacement: string;
    conversionRationale: string;
  };
  arabicSummaryCopy: string;
  englishSummaryCopy: string;
}

export interface ServiceItem {
  id: string;
  index: string;
  categoryGroup: 'furniture' | 'appliances' | 'office';
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  itemsAr: string;
  itemsEn: string;
  image?: string;
  imageAltAr?: string;
  imageAltEn?: string;
  featured?: boolean;
}

export interface ProcessStep {
  index: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  timeTagAr: string;
  timeTagEn: string;
}

export interface AdvantageItem {
  index: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  metricAr: string;
  metricEn: string;
}

export interface RecentPurchase {
  id: string;
  image: string;
  neighborhoodAr: string;
  neighborhoodEn: string;
  titleAr: string;
  titleEn: string;
  captionAr: string;
  captionEn: string;
  timeframeAr: string;
  timeframeEn: string;
  beforeNoteAr: string;
  beforeNoteEn: string;
}

export interface DistrictItem {
  id: string;
  nameAr: string;
  nameEn: string;
  etaAr: string;
  etaEn: string;
  focusAr: string;
  focusEn: string;
}

export interface ReviewItem {
  id: string;
  nameAr: string;
  nameEn: string;
  neighborhoodAr: string;
  neighborhoodEn: string;
  soldItemAr: string;
  soldItemEn: string;
  rating: number;
  quoteAr: string;
  quoteEn: string;
  dateAr: string;
  dateEn: string;
}

export interface FaqItem {
  id: string;
  questionAr: string;
  questionEn: string;
  answerAr: string;
  answerEn: string;
}

export const LOGO_IMAGE = '/assets/aistudio/image_e79527fe.png';

export const BUSINESS_CONTACT = {
  phoneDisplay: '0509653244',
  phoneIntlDisplay: '+966 50 965 3244',
  phoneHref: 'tel:0509653244',
  whatsappNumber: '966509653244',
  whatsappBase: 'https://wa.me/966509653244',
  email: 'iqbal06021980@gmail.com',
  website: 'https://madinahfurniturebuyer.com',
  brandAr: 'شراء اثاث المدينة',
  brandEn: 'Madinah Furniture Buyer',
};

export const HERO_IMAGE = '/src/assets/images/hero_madinah_interior_1794978914774.jpg';

export const HERO_CONTENT = {
  kickerAr: 'المدينة المنورة · خدمة فورية 7 أيام في الأسبوع · لبيئة أنظف وأجمل',
  kickerEn: 'Al-Madinah Al-Munawwarah · Same-Day Pickup 7 Days a Week · A Cleaner, Greener Madinah',
  h1Ar: 'شراء اثاث مستعمل بالمدينة المنورة بأعلى سعر ودفع كاش فوري',
  h1En: 'We Buy Used Furniture in Madinah — Best Prices & Free Same-Day Pickup',
  subheadlineAr:
    'نشتري الأثاث المنزلي والمكتبي بالمدينة المنورة بأعلى الأسعار: غرف النوم، الدواليب، الكنب والمجالس، طاولات الطعام، المطابخ المستعملة، المكيفات، الثلاجات، والغسالات. أرسل الصور عبر واتساب واحصل على تسعيرة فورية خلال 15 دقيقة مع فك ونقل مجاني ومساهمة في إعادة التدوير لمدينة أنظف.',
  subheadlineEn:
    'Looking to clear space or upgrade in Al-Madinah? We buy pre-owned living room sets, sectional sofas, bedroom suites, wardrobes, dining tables, used kitchens, split & window ACs, fridges, washers, electronics, and office furniture. Send photos on WhatsApp for a 15-minute valuation with free dismantling and hauling.',
  ctaWhatsappAr: 'تقييم فوري عبر واتساب',
  ctaWhatsappEn: 'WhatsApp Us for Quote',
  ctaCallAr: 'اتصل الآن: 0509653244',
  ctaCallEn: 'Call Now: 0509653244',
  ctaFormAr: 'أو اطلب تسعيرة عبر النموذج',
  ctaFormEn: 'Or request a callback quote',
  trustStrip: [
    {
      index: '01',
      labelAr: 'أفضل الأسعار وتقييم خلال 15 دقيقة',
      labelEn: 'Best Prices · 15-Min Valuation',
    },
    {
      index: '02',
      labelAr: 'دفع كاش أو تحويل فوري',
      labelEn: 'Instant Cash or Bank Transfer',
    },
    {
      index: '03',
      labelAr: 'فك واستلام سريع مجاناً',
      labelEn: 'Fast Free Dismantling & Pickup',
    },
    {
      index: '04',
      labelAr: 'تغطية شاملة لمدينة أنظف وأجمل',
      labelEn: 'Cleaner, Greener Madinah Reuse',
    },
  ],
};

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'used-furniture',
    index: '01',
    categoryGroup: 'furniture',
    titleAr: 'شراء الأثاث المنزلي المستعمل الشامل',
    titleEn: 'Complete Used Home Furniture',
    descAr:
      'نشتري أثاث الشقق والفلل بالكامل أو بالقطعة دون الحاجة لتجزئة البيع. نقدم لك سعراً موحداً ومجزياً يغنيك عن عناء الإعلانات والمفاوضات الطويلة.',
    descEn:
      'We buy full apartment or villa contents or individual pieces in one transaction. Get a single fair offer and skip weeks of online listings and haggling.',
    itemsAr: 'طاولات طعام · دواليب · سجاد · ستائر · تجهيزات شقق كاملة',
    itemsEn: 'Dining sets · Wardrobes · Rugs · Curtains · Full home clearance',
    image: HERO_IMAGE,
    imageAltAr: 'أثاث منزلي مستعمل نظيف في المدينة المنورة',
    imageAltEn: 'Clean used living room furniture in Madinah',
    featured: true,
  },
  {
    id: 'acs',
    index: '02',
    categoryGroup: 'appliances',
    titleAr: 'شراء المكيفات المستعملة (سبليت وشباك)',
    titleEn: 'Used Air Conditioners (Split & Window)',
    descAr:
      'نشتري كافة أنواع المكيفات السبليت والشباك والمركزي (جري، إل جي، سامسونج، جنرال) سواء كانت تعمل بكفاءة أو تحتاج تعبئة فريون، مع فك فني آمن يحافظ على الجدران.',
    descEn:
      'We purchase split, window, and central AC units (Gree, LG, Samsung, O-General), working or needing minor servicing, dismantled safely by technicians with zero wall damage.',
    itemsAr: 'سبليت 18-36 وحدة · شباك · دولابي · فك احترافي بدون تلف',
    itemsEn: 'Split 18k–36k BTU · Window AC · Standing units · Safe removal',
    image: '/src/assets/images/service_ac_appliances_1794978918562.jpg',
    imageAltAr: 'مكيف سبليت وثلاجة وغسالة مستعملة في المدينة المنورة',
    imageAltEn: 'Split AC unit, stainless fridge, and front-load washer',
    featured: true,
  },
  {
    id: 'appliances',
    index: '03',
    categoryGroup: 'appliances',
    titleAr: 'شراء الأجهزة الكهربائية (ثلاجات وغسالات)',
    titleEn: 'Home Appliances (Fridges & Washers)',
    descAr:
      'احصل على تقييم عادل وفوري للثلاجات، الفريزرات، الغسالات الأوتوماتيك، الأفران، والشاشات الذكية. نفحص الجهاز عندك ونحاسب قبل التحميل.',
    descEn:
      'Receive immediate, transparent offers for refrigerators, deep freezers, automatic washing machines, ovens, and smart TVs. Tested on-site and paid before loading.',
    itemsAr: 'ثلاجات بابين · غسالات أمامية وعلوية · أفران غاز وكهرباء',
    itemsEn: 'Double-door fridges · Front/top washers · Gas & electric ovens',
  },
  {
    id: 'bedrooms',
    index: '04',
    categoryGroup: 'furniture',
    titleAr: 'شراء غرف النوم والمطابخ الجاهزة',
    titleEn: 'Used Bedrooms & Kitchen Cabinets',
    descAr:
      'نشتري غرف النوم الرئيسية وغرف الأطفال المصنوعة من الخشب الوطني والماليزي والتركي وإيكيا، بالإضافة إلى دواليب المطابخ الألمنيوم والخشب مع فريق نجارة متخصص للفك.',
    descEn:
      'We buy master and kids bedroom sets (solid wood, Turkish, Malaysian, IKEA) plus aluminum and wooden kitchen cabinets, handled by our own carpentry dismantling crew.',
    itemsAr: 'أسرّة كينج · تسريحات · دواليب سحب · مطابخ ألمنيوم وخشب',
    itemsEn: 'King beds · Dressers · Sliding wardrobes · Kitchen cabinets',
    image: '/src/assets/images/gallery_bedroom_collection_1794978916873.jpg',
    imageAltAr: 'غرفة نوم خشبية نظيفة معروضة للبيع بالمدينة المنورة',
    imageAltEn: 'Solid oak bedroom suite purchased in Madinah',
  },
  {
    id: 'sofas',
    index: '05',
    categoryGroup: 'furniture',
    titleAr: 'شراء الكنب والمجالس العربية والضيافة',
    titleEn: 'Sofas, Sectionals & Arabic Majlis',
    descAr:
      'نشتري الكنب الأمريكي، الكنب الزاوية، والمجالس العربية التراثية والحديثة وطاولات الضيافة بحالة نظيفة وسليمة من التمزق، وبأفضل أسعار السوق بالمدينة.',
    descEn:
      'We purchase modern L-shaped sectionals, classic living room sofas, traditional and modern Arabic majlis seating, and coffee tables in clean, intact condition.',
    itemsAr: 'كنب زاوية L · مجالس رجال ونساء · طاولات خدمة وضيافة',
    itemsEn: 'L-shaped sofas · Formal majlis seating · Marble & wood tables',
    image: '/src/assets/images/gallery_sofa_majlis_1794978918186.jpg',
    imageAltAr: 'كنب زاوية ومجلس عربي مستعمل بالمدينة المنورة',
    imageAltEn: 'Modern sectional sofa and majlis seating',
  },
  {
    id: 'office',
    index: '06',
    categoryGroup: 'office',
    titleAr: 'شراء الأثاث المكتبي وتجهيزات الشركات',
    titleEn: 'Office Furniture & Commercial Clearance',
    descAr:
      'حل سريع للشركات والمكاتب والفنادق بالمدينة المنورة: نشتري مكاتب المدراء، كراسي العمل المريحة، طاولات الاجتماعات، خزائن الملفات، ومكاتب الاستقبال بكميات كبيرة أو فردية.',
    descEn:
      'Fast commercial clearance for Madinah offices, clinics, and hotels: we buy executive desks, ergonomic mesh chairs, conference tables, and filing cabinets in bulk or single lots.',
    itemsAr: 'مكاتب إدارية · كراسي طبية · طاولات اجتماعات · كاونترات استقبال',
    itemsEn: 'Executive desks · Ergonomic chairs · Boardroom tables · Cabinets',
    image: '/src/assets/images/gallery_office_furniture_1794978918631.jpg',
    imageAltAr: 'أثاث مكتبي مستعمل للشركات بالمدينة المنورة',
    imageAltEn: 'Executive office desk and chairs in Madinah',
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    index: '01',
    titleAr: 'أرسل صور الأثاث عبر واتساب',
    titleEn: 'Send Photos on WhatsApp',
    descAr:
      'التقط صوراً واضحة للقطع أو فيديو سريع وأرسلها إلى رقمنا 0509653244 مع ذكر اسم الحي بالمدينة المنورة.',
    descEn:
      'Snap clear photos or a quick walkthrough video of your items and send them via WhatsApp to 0509653244 along with your Madinah neighborhood.',
    timeTagAr: 'دقيقة واحدة',
    timeTagEn: '1 Minute',
  },
  {
    index: '02',
    titleAr: 'احصل على تسعيرة عادلة وفورية',
    titleEn: 'Get a Fair Instant Quote',
    descAr:
      'يعاين خبراؤنا الصور ويقدمون لك تسعيرة مبدئية شفافة خلال 15 دقيقة بدون بخس، وبسعر السوق الحقيقي.',
    descEn:
      'Our appraisers review the photos and send back a transparent, honest market valuation within 15 minutes—no lowball games.',
    timeTagAr: 'خلال 15 دقيقة',
    timeTagEn: 'Within 15 Mins',
  },
  {
    index: '03',
    titleAr: 'حدد موعد الفك والنقل المجاني',
    titleEn: 'Schedule Free Pickup & Dismantling',
    descAr:
      'بعد موافقتك، تصلك سيارتنا المغلقة مع فنيي الفك والتركيب في نفس اليوم أو بالموعد الذي يناسب جدولك.',
    descEn:
      'Once approved, our enclosed truck and trained dismantling crew arrive the same day—or at your chosen time slot—at zero cost to you.',
    timeTagAr: 'في نفس اليوم',
    timeTagEn: 'Same-Day Arrival',
  },
  {
    index: '04',
    titleAr: 'استلم المبلغ كاش في نفس اللحظة',
    titleEn: 'Receive Immediate Cash Payment',
    descAr:
      'ندفع لك كامل المبلغ المتفق عليه نقداً (كاش) أو تحويل بنكي فوري (الراجحي / الأهلي) قبل تحريك أي قطعة من منزلك.',
    descEn:
      'Receive 100% of the agreed amount in cash or instant bank transfer (Al Rajhi / SNB) before a single piece leaves your door.',
    timeTagAr: 'قبل التحميل',
    timeTagEn: 'Before Loading',
  },
];

export const WHY_CHOOSE_US: AdvantageItem[] = [
  {
    index: '01',
    titleAr: 'الدفع كاش أو تحويل فوري قبل التحميل',
    titleEn: 'Paid in Full Before Anything Moves',
    descAr:
      'لا وعود مؤجلة ولا دفعات مجزأة. تستلم كامل مستحقاتك نقداً أو عبر التحويل البنكي السريع أمام باب منزلك قبل أن يبدأ فريقنا بتحميل الأثاث.',
    descEn:
      'Zero deferred payments or partial deposits. You receive the full agreed sum in cash or verified instant transfer before our crew carries out the first item.',
    metricAr: '100% دفع مقدم عند الاستلام',
    metricEn: '100% Upfront Settlement',
  },
  {
    index: '02',
    titleAr: 'تسعير شفاف حسب الماركة والحالة بدون بخس',
    titleEn: 'Brand-Accurate, Transparent Valuations',
    descAr:
      'نقدّر قيمة الأثاث الأصلي والأجهزة ذات الماركات المعروفة (مثل إل جي، جري، هوم سنتر، إيكيا) بسعر عادل ولا نغيّر السعر المتفق عليه عند الحضور ما دامت الصور مطابقة.',
    descEn:
      'We price known brands (LG, Gree, Home Centre, IKEA) at real resale value and honor our WhatsApp quote on arrival whenever items match the photos.',
    metricAr: 'التزام بالسعر المتفق عليه',
    metricEn: 'Quote-Honored Policy',
  },
  {
    index: '03',
    titleAr: 'فك احترافي ونقل مجاني بسيارات مغلقة',
    titleEn: 'Zero-Fee Dismantling & Enclosed Trucks',
    descAr:
      'فريقنا يضم نجاراً وفني تكييف لفك غرف النوم والمطابخ والمكيفات السبليت بأمان دون خدش الجدران أو الأرضيات، مع تغطية كاملة لتكاليف النقل.',
    descEn:
      'Our crew includes a carpenter and AC technician to safely unmount split ACs, kitchens, and wardrobes without wall scuffs—at zero dismantling or transport fee.',
    metricAr: '0 ريال رسوم فك أو نقل',
    metricEn: '0 SAR Dismantling Fees',
  },
  {
    index: '04',
    titleAr: 'عمالة أمينة ومواعيد تحترم خصوصية المنزل',
    titleEn: 'Respectful, Uniformed Local Crews',
    descAr:
      'نلتزم التزاماً تاماً بالوصول في الوقت المحدد واحترام حرمة وخصوصية البيوت في المدينة المنورة، مع إنجاز التحميل بهدوء ونظافة تامة.',
    descEn:
      'Punctual arrival, courteous conduct, and strict respect for Saudi household privacy. Our crews work quietly and leave hallways and elevators clean.',
    metricAr: 'وصول خلال 45–90 دقيقة',
    metricEn: '45–90 Min Local Dispatch',
  },
];

export const RECENT_PURCHASES: RecentPurchase[] = [
  {
    id: 'p1',
    image: '/src/assets/images/gallery_bedroom_collection_1794978916873.jpg',
    neighborhoodAr: 'حي العوالي',
    neighborhoodEn: 'Al Awali District',
    titleAr: 'غرفة نوم رئيسية خشب زان + تسريحة ودولاب',
    titleEn: 'Solid Oak Master Bedroom Suite + Wardrobe',
    captionAr:
      'تم الشراء من فيلا في العوالي بداعي الانتقال. فك النجار الدولاب والسرير في 40 دقيقة وتم الدفع كاش فوراً.',
    captionEn:
      'Purchased from a relocating family villa in Al Awali. Our carpenter dismantled the wardrobe and bed frame in 40 mins; cash paid on-site.',
    timeframeAr: 'تم الاستلام خلال ساعتين',
    timeframeEn: 'Cleared in 2 hours',
    beforeNoteAr: 'الحالة: استخدام سنتين، نظيفة جداً',
    beforeNoteEn: 'Condition: 2 years used, pristine wood',
  },
  {
    id: 'p2',
    image: '/src/assets/images/service_ac_appliances_1794978918562.jpg',
    neighborhoodAr: 'حي سلطانة',
    neighborhoodEn: 'Sultana District',
    titleAr: 'مكيفين سبليت + ثلاجة ستانلس + غسالة أوتوماتيك',
    titleEn: '2 Split ACs + Stainless Fridge + Front-Load Washer',
    captionAr:
      'صفقة أجهزة منزلية متكاملة في حي سلطانة. فك فني التكييف الوحدات وأغلق المواسير بأمان قبل الدفع والتحميل.',
    captionEn:
      'Complete appliance bundle in Sultana. Our AC technician recovered refrigerant and capped wall lines cleanly prior to instant bank transfer.',
    timeframeAr: 'تم الفحص والشراء بنفس اليوم',
    timeframeEn: 'Same-day inspection & pickup',
    beforeNoteAr: 'الحالة: تبريد ممتاز وفحص فوري',
    beforeNoteEn: 'Condition: Tested cooling & spin cycle',
  },
  {
    id: 'p3',
    image: '/src/assets/images/gallery_sofa_majlis_1794978918186.jpg',
    neighborhoodAr: 'حي العزيزية',
    neighborhoodEn: 'Al Aziziyah District',
    titleAr: 'كنب زاوية حديث + طاولات ضيافة نحاسية',
    titleEn: 'Modern L-Shaped Sectional + Brass Coffee Tables',
    captionAr:
      'شراء طقم صالة كامل وطاولات تقديم في شقة بحي العزيزية خلال 60 دقيقة من تواصل العميل على واتساب.',
    captionEn:
      'Bought a complete living room sectional and brass table set in Al Aziziyah within 60 minutes of the seller’s WhatsApp message.',
    timeframeAr: 'وصول خلال 60 دقيقة',
    timeframeEn: 'Arrived in 60 mins',
    beforeNoteAr: 'الحالة: قماش سليم وخالٍ من البقع',
    beforeNoteEn: 'Condition: Clean upholstery, zero tears',
  },
  {
    id: 'p4',
    image: '/src/assets/images/gallery_office_furniture_1794978918631.jpg',
    neighborhoodAr: 'حي الخالدية',
    neighborhoodEn: 'Al Khaldiya District',
    titleAr: 'تجهيزات مكتب شركة: 8 مكاتب وكراسي وخزائن',
    titleEn: 'Corporate Office Lot: 8 Desks, Ergonomic Chairs & Cabinets',
    captionAr:
      'تصفية مكتب هندسي في حي الخالدية بالكامل في نقلة واحدة بسيارتين مغلقتين مع فاتورة شراء فورية.',
    captionEn:
      'Full clearance of an engineering office in Al Khaldiya in one afternoon using two enclosed trucks with instant settlement.',
    timeframeAr: 'تصفية كاملة بنصف يوم',
    timeframeEn: 'Full clearance in half a day',
    beforeNoteAr: 'الحالة: أثاث مكتبي شبه جديد',
    beforeNoteEn: 'Condition: Commercial grade, lightly used',
  },
];

export const MADINAH_DISTRICTS: DistrictItem[] = [
  {
    id: 'aziziyah',
    nameAr: 'حي العزيزية',
    nameEn: 'Al Aziziyah',
    etaAr: '30 – 45 دقيقة',
    etaEn: '30 – 45 mins',
    focusAr: 'شقق سكنية، غرف نوم، ومكيفات سبليت',
    focusEn: 'Apartments, bedrooms & split ACs',
  },
  {
    id: 'quba',
    nameAr: 'حي قباء',
    nameEn: 'Quba',
    etaAr: '30 – 50 دقيقة',
    etaEn: '30 – 50 mins',
    focusAr: 'مجالس عربية، كنب، وأجهزة منزلية',
    focusEn: 'Majlis sets, sofas & home appliances',
  },
  {
    id: 'awali',
    nameAr: 'حي العوالي',
    nameEn: 'Al Awali',
    etaAr: '40 – 60 دقيقة',
    etaEn: '40 – 60 mins',
    focusAr: 'أثاث فلل كامل، مطابخ، ومكيفات',
    focusEn: 'Full villa furniture, kitchens & ACs',
  },
  {
    id: 'khaldiya',
    nameAr: 'حي الخالدية',
    nameEn: 'Al Khaldiya',
    etaAr: '35 – 55 دقيقة',
    etaEn: '35 – 55 mins',
    focusAr: 'أثاث منزلي ومكتبي ومفروشات',
    focusEn: 'Home & office furniture clearance',
  },
  {
    id: 'iskan',
    nameAr: 'حي الإسكان',
    nameEn: 'Al Iskan',
    etaAr: '35 – 50 دقيقة',
    etaEn: '35 – 50 mins',
    focusAr: 'غرف نوم، ثلاجات، وغسالات',
    focusEn: 'Bedrooms, refrigerators & washers',
  },
  {
    id: 'aridh',
    nameAr: 'حي العريض',
    nameEn: 'Al Aridh',
    etaAr: '30 – 45 دقيقة',
    etaEn: '30 – 45 mins',
    focusAr: 'شقق مفروشة، كنب، ومكيفات شباك',
    focusEn: 'Furnished flats, sofas & window ACs',
  },
  {
    id: 'difa',
    nameAr: 'حي الدفاع',
    nameEn: 'Ad Difa',
    etaAr: '45 – 70 دقيقة',
    etaEn: '45 – 70 mins',
    focusAr: 'تجهيزات فلل ومجالس واستراحات',
    focusEn: 'Villas, majlis & resthouse sets',
  },
  {
    id: 'sultana',
    nameAr: 'حي سلطانة',
    nameEn: 'Sultana',
    etaAr: '25 – 40 دقيقة',
    etaEn: '25 – 40 mins',
    focusAr: 'أثاث راقٍ، شاشات، ومكاتب تجارية',
    focusEn: 'Modern living sets, TVs & offices',
  },
  {
    id: 'jamawat',
    nameAr: 'حي الجماوات',
    nameEn: 'Al Jamawat',
    etaAr: '35 – 55 دقيقة',
    etaEn: '35 – 55 mins',
    focusAr: 'غرف نوم وأجهزة مطبخ ومكيفات',
    focusEn: 'Bedrooms, kitchen appliances & ACs',
  },
  {
    id: 'shuran',
    nameAr: 'حي شوران',
    nameEn: 'Shuran',
    etaAr: '40 – 65 دقيقة',
    etaEn: '40 – 65 mins',
    focusAr: 'أثاث شقق جديدة ومجالس ضيافة',
    focusEn: 'Modern apartments & guest majlis',
  },
  {
    id: 'king-fahd',
    nameAr: 'حي الملك فهد',
    nameEn: 'King Fahd District',
    etaAr: '45 – 65 دقيقة',
    etaEn: '45 – 65 mins',
    focusAr: 'تصفية شقق وفلل بالكامل',
    focusEn: 'Full home & villa clearance',
  },
  {
    id: 'hizam',
    nameAr: 'حي الحزام والمنطقة المركزية',
    nameEn: 'Al Hizam & Central Area',
    etaAr: '30 – 45 دقيقة',
    etaEn: '30 – 45 mins',
    focusAr: 'شقق فندقية ومفروشات ومكيفات',
    focusEn: 'Hotel apartments, beds & ACs',
  },
];

export const AREAS_SEO_COPY = {
  headingAr: 'نصل إليك في جميع أحياء المدينة المنورة خلال دقائق',
  headingEn: 'Fast Local Dispatch Across Every Madinah Neighborhood',
  paragraphAr:
    'سواء كنت ترغب في بيع أثاث شقة كاملة أو مكيف واحد، تنتشر سياراتنا يومياً في كافة أحياء المدينة المنورة لتوفير خدمة شراء الأثاث المستعمل بأسرع وقت ممكن. نغطي بشكل مباشر: العزيزية، قباء، العوالي، الخالدية، الإسكان، العريض، الدفاع، سلطانة، الجماوات، شوران، حي الملك فهد، والحزام والمنطقة المركزية، مع التزام تام بالمعاينة المجانية في نفس اليوم.',
  paragraphEn:
    'Whether you are clearing a full villa or selling a single split AC, our trucks operate daily across every corner of Al-Madinah Al-Munawwarah. We provide direct same-day pickup in Al Aziziyah, Quba, Al Awali, Al Khaldiya, Al Iskan, Al Aridh, Ad Difa, Sultana, Al Jamawat, Shuran, King Fahd District, and Al Hizam—with zero transport fees.',
};

export const REVIEWS_LIST: ReviewItem[] = [
  {
    id: 'r1',
    nameAr: 'أبو عبد الله الحربي',
    nameEn: 'Abu Abdullah Al-Harbi',
    neighborhoodAr: 'حي العوالي',
    neighborhoodEn: 'Al Awali District',
    soldItemAr: 'باع: غرفة نوم كاملة + 3 مكيفات سبليت',
    soldItemEn: 'Sold: Full Bedroom Suite + 3 Split ACs',
    rating: 5,
    quoteAr:
      'كنت على وشك السفر واحتجت بيع أثاث الشقة بسرعة بدون ما أضيع وقتي مع الحراج. أرسلت لهم الصور واتساب الصباح، وصلوا بعد الظهر ومعهم فني التكييف والنجار، فكوا كل شيء بنظافة وحولوا لي المبلغ كامل قبل التحميل. تعامل راقٍ وأمانة.',
    quoteEn:
      'I was relocating and needed to clear my apartment quickly without wasting days on classifieds. Sent photos on WhatsApp in the morning; by afternoon their carpenter and AC tech dismantled everything cleanly and transferred the full amount before loading.',
    dateAr: 'قبل أسبوعين',
    dateEn: '2 weeks ago',
  },
  {
    id: 'r2',
    nameAr: 'أم فيصل الجهني',
    nameEn: 'Umm Faisal Al-Juhani',
    neighborhoodAr: 'حي سلطانة',
    neighborhoodEn: 'Sultana District',
    soldItemAr: 'باعت: طقم كنب أمريكي + ثلاجة وغسالة',
    soldItemEn: 'Sold: Living Room Sofa Set + Fridge & Washer',
    rating: 5,
    quoteAr:
      'أكثر ما أعجبني هو التزامهم بالسعر الذي اتفقنا عليه في الواتساب. بعض المشترين يبخسون السعر عند الباب، لكن هؤلاء جاؤوا في الموعد، عاينوا الكنب والثلاجة، ودفعوا كاش بنفس التسعيرة المتفق عليها وبكل احترام لخصوصية البيت.',
    quoteEn:
      'What stood out most was that they honored the exact WhatsApp quote when they arrived. Unlike buyers who haggle down at your door, they inspected the sofa and fridge, paid cash on the spot, and were completely respectful of our home.',
    dateAr: 'قبل شهر',
    dateEn: '1 month ago',
  },
  {
    id: 'r3',
    nameAr: 'م. طارق السهلي',
    nameEn: 'Eng. Tariq Al-Sahli',
    neighborhoodAr: 'حي الخالدية',
    neighborhoodEn: 'Al Khaldiya District',
    soldItemAr: 'باع: أثاث مكتب هندسي كامل',
    soldItemEn: 'Sold: Full Engineering Office Furniture',
    rating: 5,
    quoteAr:
      'نقلنا مقر مكتبنا في الخالدية وبعنا 8 مكاتب وكراسي وطاولة اجتماعات. خلصوا النقل في 3 ساعات بس في نفس اليوم وبسعر ممتاز جداً مقارنة ببقية العروض. أنصح بالتعامل معهم لأي شركة أو بيت بالمدينة.',
    quoteEn:
      'When we relocated our office in Al Khaldiya, they bought 8 desks, chairs, and our meeting table. Cleared everything in 3 hours the very same day at a much fairer price than other buyers. Highly recommended.',
    dateAr: 'قبل 3 أسابيع',
    dateEn: '3 weeks ago',
  },
];

export const FAQ_LIST: FaqItem[] = [
  {
    id: 'faq-1',
    questionAr: 'هل تشترون الأثاث الذي به عيوب بسيطة أو يحتاج صيانة؟',
    questionEn: 'Do you buy furniture or appliances with minor defects or wear?',
    answerAr:
      'نعم، نشتري الأثاث والمكيفات والأجهزة التي بها خدوش بسيطة أو أعطال خفيفة (مثل مكيف يحتاج فريون أو دولاب يحتاج تعديل مفصلات)، بشرط أن يكون هيكل القطعة الأساسي صالحاً للاستخدام أو التجديد. فقط أخبرنا بالملاحظات عند إرسال الصور لنعطيك السعر الدقيق.',
    answerEn:
      'Yes. We buy furniture and appliances with minor scratches or light faults (such as an AC needing refrigerant or a wardrobe needing hinge adjustment), provided the core structure is usable. Simply mention any notes when sending photos for an accurate quote.',
  },
  {
    id: 'faq-2',
    questionAr: 'كم يستغرق وصول فريقكم لمعاينة ونقل الأثاث في المدينة المنورة؟',
    questionEn: 'How fast can your crew arrive for pickup in Madinah?',
    answerAr:
      'في معظم أحياء المدينة المنورة (العزيزية، قباء، سلطانة، العوالي، الخالدية) يصل مندوبنا وفريق النقل خلال 45 إلى 90 دقيقة من تأكيد الموعد، أو في نفس اليوم حسب الوقت الذي تفضله.',
    answerEn:
      'Across central Madinah neighborhoods (Al Aziziyah, Quba, Sultana, Al Awali, Al Khaldiya), our truck and crew typically arrive within 45 to 90 minutes of confirmation, or at any same-day time slot you prefer.',
  },
  {
    id: 'faq-3',
    questionAr: 'كيف يتم تحديد سعر الأثاث المستعمل وهل يتغير السعر عند الحضور؟',
    questionEn: 'How is the price determined, and does the quote change at the door?',
    answerAr:
      'نحدد السعر بناءً على الماركة، عمر الاستخدام، النظافة، وسلامة الخشب أو التبريد للأجهزة. التسعيرة التي نرسلها عبر واتساب ثابتة وملزمة لنا عند الحضور طالما أن حالة القطعة على الطبيعة مطابقة للصور والوصف.',
    answerEn:
      'Pricing is based on brand, age, cleanliness, wood integrity, or appliance performance. Our WhatsApp valuation is honored at your door as long as the physical condition matches the photos and description provided.',
  },
  {
    id: 'faq-4',
    questionAr: 'هل أتحمل أي تكاليف لفك المكيفات أو غرف النوم أو أجور التحميل؟',
    questionEn: 'Are there any fees for dismantling ACs, bedrooms, or transport?',
    answerAr:
      'لا إطلاقاً. الفك والتغليف والتحميل والنقل مجاني 100% بالكامل على حسابنا، بما في ذلك فك المكيفات السبليت على يد فني مختص وفك الدواليب والمطابخ على يد نجار محترف.',
    answerEn:
      'None at all. Dismantling, packing, carrying, and enclosed truck transport are 100% free on our side—including specialist AC unmounting and carpentry disassembly.',
  },
  {
    id: 'faq-5',
    questionAr: 'ما هي ساعات العمل وطرق استلام المبلغ عند البيع؟',
    questionEn: 'What are your working hours and how do I get paid?',
    answerAr:
      'نعمل طوال أيام الأسبوع من الساعة 8:00 صباحاً حتى 11:30 مساءً (بما في ذلك يوم الجمعة بعد الصلاة). وتستلم المبلغ كاملاً قبل خروج الأثاث من منزلك إما نقداً (كاش) أو بتحويل بنكي فوري.',
    answerEn:
      'We operate 7 days a week from 8:00 AM to 11:30 PM (including Fridays after prayer). You receive 100% of the payment before items are loaded—either in cash or via instant local bank transfer.',
  },
];

export const SECTION_BLUEPRINTS: SectionBlueprint[] = [
  {
    id: 'hero',
    number: '01',
    titleAr: 'القسم 1: الهيرو والواجهة الرئيسية (Hero Section)',
    titleEn: 'Section 1: Hero & Primary Sticky CTAs',
    uxDirections: {
      layoutStructure:
        'Asymmetric 2-column split (55% copy & conversion controls / 45% sunlit Madinah interior photography) above a full-width 4-item trust metric strip.',
      visualHierarchy:
        'Single SEO-targeted H1 (clamp 34px–56px) in bold Cairo display font, supported by a 2-line benefit subheadline that names all core categories (bedrooms, sofas, ACs, appliances, office).',
      ctaPlacement:
        'Dual high-intent primary CTAs side-by-side in the Hero (WhatsApp Instant Quote in Emerald #0E6B4E + Direct Call 0509653244 in Charcoal #11181C), mirrored on mobile by a compact 56px sticky bottom bar (<7% viewport height) and on desktop by a clean top-bar Call CTA.',
      conversionRationale:
        'Captures urgent local sellers immediately above the fold—offering the lowest-friction WhatsApp photo flow alongside one-tap calling for immediate pickup.',
    },
    arabicSummaryCopy: `${HERO_CONTENT.h1Ar}\n\n${HERO_CONTENT.subheadlineAr}\n\nCTAs: [${HERO_CONTENT.ctaWhatsappAr}] | [${HERO_CONTENT.ctaCallAr}]`,
    englishSummaryCopy: `${HERO_CONTENT.h1En}\n\n${HERO_CONTENT.subheadlineEn}\n\nCTAs: [${HERO_CONTENT.ctaWhatsappEn}] | [${HERO_CONTENT.ctaCallEn}]`,
  },
  {
    id: 'services',
    number: '02',
    titleAr: 'القسم 2: ماذا نشتري — بطاقات الخدمات (What We Buy)',
    titleEn: 'Section 2: What We Buy (6 Service Cards)',
    uxDirections: {
      layoutStructure:
        'Interactive category filter bar (All / Home Furniture / ACs & Appliances / Office) above a structured asymmetric 6-card Bento grid where marquee categories pair crisp photography with editorial numbering (01–06).',
      visualHierarchy:
        'Each card leads with its numerical index and Arabic SEO category title, followed by a concrete benefit paragraph and unboxed item list separated by middots (·)—no cluttered pill badges.',
      ctaPlacement:
        'Clicking any service card pre-selects that category and scrolls smoothly to the Quotation Form (or opens a direct WhatsApp inquiry for that item).',
      conversionRationale:
        'Instantly reassures sellers that they can liquidate multiple item types (from split ACs to full bedrooms) in one single phone call.',
    },
    arabicSummaryCopy: SERVICES_LIST.map(
      (s) => `${s.index}. ${s.titleAr}\n${s.descAr}\n(${s.itemsAr})`
    ).join('\n\n'),
    englishSummaryCopy: SERVICES_LIST.map(
      (s) => `${s.index}. ${s.titleEn}\n${s.descEn}\n(${s.itemsEn})`
    ).join('\n\n'),
  },
  {
    id: 'how-it-works',
    number: '03',
    titleAr: 'القسم 3: كيف نعمل — 4 خطوات بسيطة (How It Works)',
    titleEn: 'Section 3: How It Works (4-Step Process)',
    uxDirections: {
      layoutStructure:
        '4-column horizontal stepped process on desktop (collapsing to a clean vertical timeline on mobile) on a crisp white structural surface separated by hairline borders.',
      visualHierarchy:
        'Large tabular numerals (01–04) paired with concise time expectations (1 Min · Within 15 Mins · Same-Day · Before Loading) as quiet inline text.',
      ctaPlacement:
        'Bottom step anchor links directly to WhatsApp to initiate Step 01 immediately.',
      conversionRationale:
        'Eliminates uncertainty around dismantling, pricing delays, and payment timing by showing the exact 4-step path to cash in hand.',
    },
    arabicSummaryCopy: PROCESS_STEPS.map(
      (step) => `${step.index}. ${step.titleAr} (${step.timeTagAr})\n${step.descAr}`
    ).join('\n\n'),
    englishSummaryCopy: PROCESS_STEPS.map(
      (step) => `${step.index}. ${step.titleEn} (${step.timeTagEn})\n${step.descEn}`
    ).join('\n\n'),
  },
  {
    id: 'why-us',
    number: '04',
    titleAr: 'القسم 4: لماذا تختارنا (Why Choose Us)',
    titleEn: 'Section 4: Why Choose Us (4 Verified Advantages)',
    uxDirections: {
      layoutStructure:
        '2x2 high-contrast architectural grid placed directly adjacent to the 4-step process for claim-to-proof adjacency.',
      visualHierarchy:
        'Each block pairs a concrete operational metric (e.g., "0 SAR Dismantling Fees", "100% Upfront Settlement") with specific local proof—zero generic marketing fluff.',
      ctaPlacement:
        'Inline trust reinforcement bridging directly into the real-world purchase gallery below.',
      conversionRationale:
        'Directly neutralizes the top 4 fears of Saudi used-furniture sellers: door-step lowballing, hidden dismantling fees, delayed payment, and disrespectful crews.',
    },
    arabicSummaryCopy: WHY_CHOOSE_US.map(
      (adv) => `${adv.index}. ${adv.titleAr} — [${adv.metricAr}]\n${adv.descAr}`
    ).join('\n\n'),
    englishSummaryCopy: WHY_CHOOSE_US.map(
      (adv) => `${adv.index}. ${adv.titleEn} — [${adv.metricEn}]\n${adv.descEn}`
    ).join('\n\n'),
  },
  {
    id: 'recent-purchases',
    number: '05',
    titleAr: 'القسم 5: أحدث صفقات الشراء بالمدينة (Our Recent Purchases)',
    titleEn: 'Section 5: Our Recent Purchases Gallery',
    uxDirections: {
      layoutStructure:
        '4-card 4:3 visual gallery grid with clean aspect-locked real interior photos, neighborhood metadata header, condition summary, and click-to-inspect detail modal.',
      visualHierarchy:
        'Neighborhood name + pickup timeframe sit as unboxed metadata above each title; captions describe real Madinah scenarios (relocation, AC recovery, office clearance).',
      ctaPlacement:
        'Each gallery card invites users to inspect the pickup details or submit a similar lot for valuation.',
      conversionRationale:
        'Local visual proof anchored to real Madinah districts (Al Awali, Sultana, Al Aziziyah, Al Khaldiya) builds immediate credibility.',
    },
    arabicSummaryCopy: RECENT_PURCHASES.map(
      (p) => `${p.neighborhoodAr} · ${p.timeframeAr}\n${p.titleAr}\n${p.captionAr} (${p.beforeNoteAr})`
    ).join('\n\n'),
    englishSummaryCopy: RECENT_PURCHASES.map(
      (p) => `${p.neighborhoodEn} · ${p.timeframeEn}\n${p.titleEn}\n${p.captionEn} (${p.beforeNoteEn})`
    ).join('\n\n'),
  },
  {
    id: 'areas',
    number: '06',
    titleAr: 'القسم 6: الأحياء التي نخدمها بالمدينة المنورة (Areas We Serve)',
    titleEn: 'Section 6: Madinah Areas We Serve (Hyper-Local SEO)',
    uxDirections: {
      layoutStructure:
        'Split editorial layout: hyper-local SEO narrative paragraph on one side paired with an interactive 12-neighborhood directory grid on the other.',
      visualHierarchy:
        'Clicking any Madinah district highlights its estimated arrival window (e.g., 30–45 mins) and common items bought there, while syncing directly with the Quotation Form.',
      ctaPlacement:
        'Selected district card displays a 1-click "Request Pickup in [District]" action that scrolls to the quotation form with the neighborhood pre-filled.',
      conversionRationale:
        'Captures long-tail hyper-local searches ("شراء اثاث مستعمل حي العزيزية / قباء / العوالي") while proving fast proximity to the seller.',
    },
    arabicSummaryCopy: `${AREAS_SEO_COPY.headingAr}\n\n${AREAS_SEO_COPY.paragraphAr}\n\nالأحياء المغطاة: ${MADINAH_DISTRICTS.map((d) => `${d.nameAr} (${d.etaAr})`).join(' · ')}`,
    englishSummaryCopy: `${AREAS_SEO_COPY.headingEn}\n\n${AREAS_SEO_COPY.paragraphEn}\n\nCovered Districts: ${MADINAH_DISTRICTS.map((d) => `${d.nameEn} (${d.etaEn})`).join(' · ')}`,
  },
  {
    id: 'reviews',
    number: '07',
    titleAr: 'القسم 7: آراء عملائنا في المدينة (Customer Reviews)',
    titleEn: 'Section 7: Customer Reviews & Verified Badges',
    uxDirections: {
      layoutStructure:
        '3-column balanced testimonial grid on soft neutral cards with subtle 1px hairline borders (zero thick left accent stripes).',
      visualHierarchy:
        'Top row displays 5 warm-brass stars + tabular 5.0 rating alongside an unboxed "عميل موثق · Verified Sale" indicator; quote body focuses on concrete speed, price honesty, and crew respect; footer attributes full name, district, and exact items sold.',
      ctaPlacement:
        'Adjacent to the Areas & FAQ sections to reinforce confidence right before the final conversion form.',
      conversionRationale:
        'Specific before-and-after stories from recognizable Madinah families and engineers remove skepticism around used-furniture buyers.',
    },
    arabicSummaryCopy: REVIEWS_LIST.map(
      (r) => `★★★★★ (${r.rating}.0) — ${r.nameAr} (${r.neighborhoodAr})\n${r.soldItemAr}\n"${r.quoteAr}"`
    ).join('\n\n'),
    englishSummaryCopy: REVIEWS_LIST.map(
      (r) => `★★★★★ (${r.rating}.0) — ${r.nameEn} (${r.neighborhoodEn})\n${r.soldItemEn}\n"${r.quoteEn}"`
    ).join('\n\n'),
  },
  {
    id: 'faq',
    number: '08',
    titleAr: 'القسم 8: الأسئلة الشائعة (Frequently Asked Questions)',
    titleEn: 'Section 8: Seller Friction FAQs (5 Questions)',
    uxDirections: {
      layoutStructure:
        '2-column layout with sticky section intro + direct Call fallback on the start column and a clean 5-item accessible accordion (`aria-expanded`) on the main column.',
      visualHierarchy:
        'First FAQ opens by default to show immediate depth; single-line question headers with generous padding and 1.7 line-height reassuring answers.',
      ctaPlacement:
        'Embedded "Still have a question? Call 0509653244" link right below the FAQ intro.',
      conversionRationale:
        'Resolves all 5 friction points (damaged items, pickup speed, price locking, dismantling costs, and payment timing) before the user reaches the lead form.',
    },
    arabicSummaryCopy: FAQ_LIST.map(
      (f, idx) => `س${idx + 1}: ${f.questionAr}\nج: ${f.answerAr}`
    ).join('\n\n'),
    englishSummaryCopy: FAQ_LIST.map(
      (f, idx) => `Q${idx + 1}: ${f.questionEn}\nA: ${f.answerEn}`
    ).join('\n\n'),
  },
  {
    id: 'final-cta',
    number: '09',
    titleAr: 'القسم 9: الدعوة النهائية ونموذج طلب التسعيرة (Final CTA & Lead Form)',
    titleEn: 'Section 9: Final CTA & Quotation Lead-Capture Form',
    uxDirections: {
      layoutStructure:
        'High-contrast 2-column closing panel: deep charcoal (#11181C) direct-response hook with phone/WhatsApp links paired with a crisp white validated Quotation Form card.',
      visualHierarchy:
        'Clear 4-field form (Name, Validated Saudi Mobile 05xxxxxxxx, Madinah Neighborhood dropdown, Item Category dropdown + optional details) with large 48px touch inputs and instant confirmation state.',
      ctaPlacement:
        'Submit button generates an instant confirmation screen AND a one-click pre-filled WhatsApp message containing the user’s exact form details so leads convert across both channels.',
      conversionRationale:
        'Captures sellers who prefer a callback or structured quote over initiating a cold WhatsApp chat, maximizing total homepage conversion rate.',
    },
    arabicSummaryCopy:
      'جاهز لبيع أثاثك المستعمل بالمدينة المنورة اليوم؟\nاحصل على أعلى سعر ودفع كاش فوري مع فك ونقل مجاني في نفس اليوم.\nاتصل مباشرة: 0509653244 | واتساب فوري | أو عبّئ نموذج طلب التسعيرة وسيتواصل معك المقيّم خلال 15 دقيقة.',
    englishSummaryCopy:
      'Ready to Sell Your Used Furniture in Madinah Today?\nGet top market cash paid on the spot with free same-day dismantling and pickup.\nCall Direct: 0509653244 | Instant WhatsApp | Or submit the Quotation Form for a 15-minute callback.',
  },
];
