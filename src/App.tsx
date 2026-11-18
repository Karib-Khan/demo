import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowDown,
  Check,
  ChevronDown,
  Clock,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Star,
  X,
} from 'lucide-react';
import { Header } from './components/Header';
import { HeroSlider } from './components/HeroSlider';
import { IntroSplash } from './components/IntroSplash';
import { QuotationForm } from './components/QuotationForm';
import { ResilientImage } from './components/ResilientImage';
import {
  AREAS_SEO_COPY,
  BUSINESS_CONTACT,
  FAQ_LIST,
  HERO_CONTENT,
  Language,
  LOGO_IMAGE,
  MADINAH_DISTRICTS,
  PROCESS_STEPS,
  RECENT_PURCHASES,
  RecentPurchase,
  REVIEWS_LIST,
  SERVICES_LIST,
  WHY_CHOOSE_US,
} from './data/homepageData';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [introDone, setIntroDone] = useState(false);
  const [serviceFilter, setServiceFilter] = useState<
    'all' | 'furniture' | 'appliances' | 'office'
  >('all');
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>('aziziyah');
  const [selectedCategoryId, setSelectedCategoryId] =
    useState<string>('used-furniture');
  const [openFaqId, setOpenFaqId] = useState<string>(FAQ_LIST[0].id);
  const [inspectedPurchase, setInspectedPurchase] =
    useState<RecentPurchase | null>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  const handleSplashComplete = useCallback(() => {
    setIntroDone(true);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  useEffect(() => {
    gsap.set('#services .gsap-card', { opacity: 1, y: 0 });
  }, [serviceFilter]);

  useEffect(() => {
    if (!introDone || !mainRef.current) return;
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.gsap-hero-item', {
        y: 16,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      });
    }, mainRef);

    return () => ctx.revert();
  }, [introDone]);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !mainRef.current) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.gsap-section').forEach((section) => {
        const cards = section.querySelectorAll('.gsap-card');
        if (!cards.length) return;
        gsap.from(cards, {
          y: 18,
          opacity: 0,
          duration: 0.45,
          stagger: 0.07,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: section,
            start: 'top 86%',
            once: true,
          },
        });
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  const filteredServices = SERVICES_LIST.filter((item) =>
    serviceFilter === 'all' ? true : item.categoryGroup === serviceFilter
  );

  const activeDistrict =
    MADINAH_DISTRICTS.find((d) => d.id === selectedDistrictId) ||
    MADINAH_DISTRICTS[0];

  const whatsappDirectUrl = `${BUSINESS_CONTACT.whatsappBase}?text=${encodeURIComponent(
    lang === 'ar'
      ? 'السلام عليكم، لدي أثاث أو أجهزة مستعملة للبيع في المدينة المنورة وأرغب في تسعيرة.'
      : 'Hello, I have used furniture/appliances to sell in Madinah and would like a quote.'
  )}`;

  const jumpToQuoteForm = (categoryId?: string, districtId?: string) => {
    if (categoryId) setSelectedCategoryId(categoryId);
    if (districtId) setSelectedDistrictId(districtId);
    const el = document.getElementById('quote-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={mainRef} className="min-h-screen bg-[#FAF8F5] text-[#11181C] pb-16 md:pb-0">
      {/* First-load Brand Logo Loading Screen */}
      <IntroSplash onComplete={handleSplashComplete} />

      {/* Clean 3-Zone Top Bar */}
      <Header lang={lang} />

      {/* Clean Language & Service Hours Strip */}
      <div className="border-b border-[#E5E2DC] bg-[#F3EFE8]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-4">
          <p className="text-xs font-medium text-[#4B555B] truncate">
            {lang === 'ar'
              ? 'المدينة المنورة · خدمة يومية 8:00 ص – 11:30 م · لبيئة أنظف وأجمل'
              : 'Al-Madinah · Open Daily 8:00 AM – 11:30 PM · Cleaner, Greener Madinah'}
          </p>

          <div
            role="group"
            aria-label="Language selector"
            className="inline-flex items-center gap-1 p-0.5 rounded-lg bg-[#E5E2DC] shrink-0"
          >
            <Globe className="w-3.5 h-3.5 text-[#4B555B] ms-1.5 hidden sm:block" />
            <button
              type="button"
              onClick={() => setLang('ar')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                lang === 'ar'
                  ? 'bg-white text-[#11181C] shadow-sm'
                  : 'text-[#4B555B] hover:text-[#11181C]'
              }`}
            >
              العربية
            </button>
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                lang === 'en'
                  ? 'bg-white text-[#11181C] shadow-sm'
                  : 'text-[#4B555B] hover:text-[#11181C]'
              }`}
            >
              English
            </button>
          </div>
        </div>
      </div>

      <main>
        {/* ================================================================
            HERO SECTION WITH SLIDER
        ================================================================ */}
        <section id="hero" className="py-10 sm:py-14 lg:py-16 border-b border-[#E5E2DC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              {/* Hero Copy & Primary CTAs */}
              <div className="lg:col-span-6 flex flex-col justify-center">
                <p className="gsap-hero-item text-xs sm:text-sm font-medium text-[#0E6B4E] mb-3">
                  {lang === 'ar' ? HERO_CONTENT.kickerAr : HERO_CONTENT.kickerEn}
                </p>

                <h1
                  style={{ textWrap: 'balance' }}
                  className="gsap-hero-item font-display text-[clamp(2rem,4vw,3.3rem)] font-bold leading-[1.18] tracking-tight text-[#11181C] mb-5"
                >
                  {lang === 'ar' ? HERO_CONTENT.h1Ar : HERO_CONTENT.h1En}
                </h1>

                <p className="gsap-hero-item text-base sm:text-lg text-[#4B555B] leading-relaxed max-w-2xl mb-8">
                  {lang === 'ar'
                    ? HERO_CONTENT.subheadlineAr
                    : HERO_CONTENT.subheadlineEn}
                </p>

                <div className="gsap-hero-item flex flex-wrap items-center gap-3.5 mb-5">
                  <a
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-[#0E6B4E] px-6 py-3.5 text-sm sm:text-base font-semibold text-white hover:bg-[#0A533C] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E6B4E]"
                  >
                    <MessageCircle className="w-5 h-5 shrink-0" />
                    <span>
                      {lang === 'ar'
                        ? HERO_CONTENT.ctaWhatsappAr
                        : HERO_CONTENT.ctaWhatsappEn}
                    </span>
                  </a>

                  <a
                    href={BUSINESS_CONTACT.phoneHref}
                    className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-[#11181C] px-6 py-3.5 text-sm sm:text-base font-semibold text-white hover:bg-[#232D33] transition-colors whitespace-nowrap shrink-0 tabular-nums focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#11181C]"
                  >
                    <Phone className="w-5 h-5 shrink-0" />
                    <span>
                      {lang === 'ar'
                        ? HERO_CONTENT.ctaCallAr
                        : HERO_CONTENT.ctaCallEn}
                    </span>
                  </a>
                </div>

                <div className="gsap-hero-item">
                  <button
                    type="button"
                    onClick={() => jumpToQuoteForm()}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#4B555B] hover:text-[#0E6B4E] underline underline-offset-4 transition-colors cursor-pointer"
                  >
                    <span>
                      {lang === 'ar'
                        ? HERO_CONTENT.ctaFormAr
                        : HERO_CONTENT.ctaFormEn}
                    </span>
                    <ArrowDown className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Hero Image Slider */}
              <div className="gsap-hero-item lg:col-span-6">
                <HeroSlider lang={lang} />
              </div>
            </div>

            {/* Full-Width 4-Column Trust Strip below Hero Split */}
            <div className="mt-10 pt-8 border-t border-[#E5E2DC] grid grid-cols-2 lg:grid-cols-4 gap-6">
              {HERO_CONTENT.trustStrip.map((item) => (
                <div key={item.index} className="flex items-baseline gap-3">
                  <span className="text-xs font-semibold text-[#0E6B4E] tabular-nums shrink-0">
                    {item.index}.
                  </span>
                  <span className="text-sm font-semibold text-[#11181C]">
                    {lang === 'ar' ? item.labelAr : item.labelEn}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================
            WHAT WE BUY (6 SERVICE CARDS)
        ================================================================ */}
        <section id="services" className="gsap-section py-14 sm:py-16 bg-white border-b border-[#E5E2DC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <p className="text-xs font-semibold text-[#0E6B4E] mb-2">
                  {lang === 'ar' ? 'تخصصاتنا في الشراء' : 'Categories We Purchase'}
                </p>
                <h2
                  style={{ textWrap: 'balance' }}
                  className="font-display text-2xl sm:text-3xl font-bold text-[#11181C]"
                >
                  {lang === 'ar'
                    ? 'ماذا نشتري في المدينة المنورة؟'
                    : 'What Used Furniture & Appliances We Buy'}
                </h2>
              </div>

              <div
                role="tablist"
                aria-label={lang === 'ar' ? 'تصفية الفئات' : 'Filter categories'}
                className="inline-flex flex-wrap items-center gap-1 p-1 rounded-lg bg-[#FAF8F5] border border-[#E5E2DC]"
              >
                {(
                  [
                    { id: 'all', ar: 'الكل (6)', en: 'All (6)' },
                    { id: 'furniture', ar: 'الأثاث والكنب', en: 'Home & Sofas' },
                    { id: 'appliances', ar: 'مكيفات وأجهزة', en: 'ACs & Appliances' },
                    { id: 'office', ar: 'أثاث مكتبي', en: 'Office' },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={serviceFilter === tab.id}
                    onClick={() => setServiceFilter(tab.id)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      serviceFilter === tab.id
                        ? 'bg-white text-[#11181C] border border-[#E5E2DC]'
                        : 'text-[#5C646A] hover:text-[#11181C]'
                    }`}
                  >
                    {lang === 'ar' ? tab.ar : tab.en}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <article
                  key={service.id}
                  className="gsap-card flex flex-col justify-between rounded-xl border border-[#E5E2DC] bg-[#FAF8F5] overflow-hidden transition-colors hover:border-[#0E6B4E]/60"
                >
                  {service.image && (
                    <div className="aspect-[4/3] w-full overflow-hidden bg-[#EFECE6] border-b border-[#E5E2DC]">
                      <ResilientImage
                        src={service.image}
                        alt={
                          lang === 'ar'
                            ? service.imageAltAr || service.titleAr
                            : service.imageAltEn || service.titleEn
                        }
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-baseline gap-2.5 mb-2">
                        <span className="text-xs font-semibold text-[#0E6B4E] tabular-nums">
                          {service.index}.
                        </span>
                        <h3 className="font-display text-lg font-bold text-[#11181C]">
                          {lang === 'ar' ? service.titleAr : service.titleEn}
                        </h3>
                      </div>

                      <p className="text-sm text-[#4B555B] leading-relaxed mb-4">
                        {lang === 'ar' ? service.descAr : service.descEn}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#E5E2DC] flex items-center justify-between gap-3">
                      <p className="text-xs text-[#5C646A] leading-relaxed">
                        {lang === 'ar' ? service.itemsAr : service.itemsEn}
                      </p>
                      <button
                        type="button"
                        onClick={() => jumpToQuoteForm(service.id)}
                        className="text-xs font-semibold text-[#0E6B4E] hover:text-[#0A533C] underline underline-offset-4 whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        {lang === 'ar' ? 'اطلب تسعيرة' : 'Get Quote'}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================
            HOW IT WORKS (4-STEP PROCESS)
        ================================================================ */}
        <section id="how-it-works" className="gsap-section py-14 sm:py-16 border-b border-[#E5E2DC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-10">
              <p className="text-xs font-semibold text-[#0E6B4E] mb-2">
                {lang === 'ar' ? 'خطوات البيع السريعة' : 'Simple 4-Step Process'}
              </p>
              <h2
                style={{ textWrap: 'balance' }}
                className="font-display text-2xl sm:text-3xl font-bold text-[#11181C]"
              >
                {lang === 'ar'
                  ? 'كيف تبيع أثاثك المستعمل بالمدينة في 4 خطوات؟'
                  : 'How to Sell Your Used Furniture in 4 Easy Steps'}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PROCESS_STEPS.map((step) => (
                <div
                  key={step.index}
                  className="gsap-card rounded-xl bg-white border border-[#E5E2DC] p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-[#EFECE6]">
                      <span className="font-display text-2xl font-bold text-[#0E6B4E] tabular-nums">
                        {step.index}
                      </span>
                      <span className="text-xs font-medium text-[#5C646A]">
                        {lang === 'ar' ? step.timeTagAr : step.timeTagEn}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-bold text-[#11181C] mb-2.5">
                      {lang === 'ar' ? step.titleAr : step.titleEn}
                    </h3>

                    <p className="text-sm text-[#4B555B] leading-relaxed">
                      {lang === 'ar' ? step.descAr : step.descEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================
            WHY CHOOSE US (4 VERIFIED ADVANTAGES)
        ================================================================ */}
        <section id="why-us" className="gsap-section py-14 sm:py-16 bg-white border-b border-[#E5E2DC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-4">
                <p className="text-xs font-semibold text-[#0E6B4E] mb-2">
                  {lang === 'ar' ? 'ضمانات حقيقية عند البيع' : 'Verified Commitments'}
                </p>
                <h2
                  style={{ textWrap: 'balance' }}
                  className="font-display text-2xl sm:text-3xl font-bold text-[#11181C] mb-4"
                >
                  {lang === 'ar'
                    ? 'لماذا يثق بنا أهالي المدينة المنورة؟'
                    : 'Why Madinah Homeowners & Offices Choose Us'}
                </h2>
                <p className="text-sm text-[#4B555B] leading-relaxed mb-6">
                  {lang === 'ar'
                    ? 'نلتزم بوضوح التسعير واحترام وقتك ومنزلك بعيداً عن المفاوضات العشوائية أو تأخير التحميل.'
                    : 'We eliminate the usual headaches of selling used items—honest quotes, on-time crews, and zero hidden dismantling deductions.'}
                </p>
                <a
                  href={whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#0E6B4E] px-5 py-3 text-sm font-semibold text-white hover:bg-[#0A533C] transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>
                    {lang === 'ar'
                      ? 'ابدأ التقييم الآن عبر واتساب'
                      : 'Start Valuation on WhatsApp'}
                  </span>
                </a>
              </div>

              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {WHY_CHOOSE_US.map((adv) => (
                  <div
                    key={adv.index}
                    className="gsap-card rounded-xl bg-[#FAF8F5] border border-[#E5E2DC] p-6"
                  >
                    <div className="flex items-center justify-between gap-2 mb-3 text-xs">
                      <span className="font-semibold text-[#0E6B4E] tabular-nums">
                        {adv.index}.
                      </span>
                      <span className="font-medium text-[#5C646A]">
                        {lang === 'ar' ? adv.metricAr : adv.metricEn}
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-[#11181C] mb-2">
                      {lang === 'ar' ? adv.titleAr : adv.titleEn}
                    </h3>
                    <p className="text-sm text-[#4B555B] leading-relaxed">
                      {lang === 'ar' ? adv.descAr : adv.descEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            OUR RECENT PURCHASES (GALLERY)
        ================================================================ */}
        <section id="recent-purchases" className="gsap-section py-14 sm:py-16 border-b border-[#E5E2DC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <p className="text-xs font-semibold text-[#0E6B4E] mb-2">
                  {lang === 'ar' ? 'نماذج من أعمالنا الميدانية' : 'Field Proof Across Madinah'}
                </p>
                <h2
                  style={{ textWrap: 'balance' }}
                  className="font-display text-2xl sm:text-3xl font-bold text-[#11181C]"
                >
                  {lang === 'ar'
                    ? 'أحدث صفقات الشراء في أحياء المدينة المنورة'
                    : 'Our Recent Purchases in Madinah'}
                </h2>
              </div>
              <p className="text-xs text-[#5C646A]">
                {lang === 'ar'
                  ? 'انقر على أي عملية لعرض تفاصيل الفك والاستلام'
                  : 'Click any item to inspect pickup & settlement notes'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {RECENT_PURCHASES.map((purchase) => (
                <article
                  key={purchase.id}
                  className="gsap-card group rounded-xl bg-white border border-[#E5E2DC] overflow-hidden flex flex-col justify-between"
                >
                  <button
                    type="button"
                    onClick={() => setInspectedPurchase(purchase)}
                    className="text-start flex-1 flex flex-col cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0E6B4E]"
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden bg-[#EFECE6] border-b border-[#E5E2DC]">
                      <ResilientImage
                        src={purchase.image}
                        alt={lang === 'ar' ? purchase.titleAr : purchase.titleEn}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs text-[#5C646A] mb-2">
                          <span className="font-semibold text-[#0E6B4E]">
                            {lang === 'ar'
                              ? purchase.neighborhoodAr
                              : purchase.neighborhoodEn}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>
                            {lang === 'ar'
                              ? purchase.timeframeAr
                              : purchase.timeframeEn}
                          </span>
                        </div>
                        <h3 className="font-display text-base font-bold text-[#11181C] mb-2">
                          {lang === 'ar' ? purchase.titleAr : purchase.titleEn}
                        </h3>
                        <p className="text-xs text-[#4B555B] leading-relaxed">
                          {lang === 'ar' ? purchase.captionAr : purchase.captionEn}
                        </p>
                      </div>
                      <p className="mt-4 pt-3 border-t border-[#EFECE6] text-xs font-medium text-[#5C646A]">
                        {lang === 'ar'
                          ? purchase.beforeNoteAr
                          : purchase.beforeNoteEn}
                      </p>
                    </div>
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================
            AREAS WE SERVE
        ================================================================ */}
        <section id="areas" className="py-14 sm:py-16 bg-white border-b border-[#E5E2DC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-5">
                <p className="text-xs font-semibold text-[#0E6B4E] mb-2">
                  {lang === 'ar' ? 'تغطية جغرافية شاملة' : 'Hyper-Local Dispatch'}
                </p>
                <h2
                  style={{ textWrap: 'balance' }}
                  className="font-display text-2xl sm:text-3xl font-bold text-[#11181C] mb-4"
                >
                  {lang === 'ar'
                    ? AREAS_SEO_COPY.headingAr
                    : AREAS_SEO_COPY.headingEn}
                </h2>
                <p className="text-sm text-[#4B555B] leading-relaxed mb-6">
                  {lang === 'ar'
                    ? AREAS_SEO_COPY.paragraphAr
                    : AREAS_SEO_COPY.paragraphEn}
                </p>

                <div className="rounded-xl bg-[#FAF8F5] border border-[#E5E2DC] p-5">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#0E6B4E] shrink-0" />
                      <h3 className="font-display text-base font-bold text-[#11181C]">
                        {lang === 'ar'
                          ? activeDistrict.nameAr
                          : activeDistrict.nameEn}
                      </h3>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#0E6B4E] tabular-nums">
                      <Clock className="w-3.5 h-3.5" />
                      <span>
                        {lang === 'ar'
                          ? activeDistrict.etaAr
                          : activeDistrict.etaEn}
                      </span>
                    </span>
                  </div>
                  <p className="text-xs text-[#4B555B] mb-4">
                    {lang === 'ar'
                      ? `الأكثر طلباً في الحي: ${activeDistrict.focusAr}`
                      : `Common pickups: ${activeDistrict.focusEn}`}
                  </p>
                  <button
                    type="button"
                    onClick={() => jumpToQuoteForm(undefined, activeDistrict.id)}
                    className="w-full rounded-lg bg-[#11181C] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#232D33] transition-colors cursor-pointer"
                  >
                    {lang === 'ar'
                      ? `اطلب معاينة مجانية في ${activeDistrict.nameAr}`
                      : `Request Pickup in ${activeDistrict.nameEn}`}
                  </button>
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {MADINAH_DISTRICTS.map((district) => {
                  const isActive = district.id === selectedDistrictId;
                  return (
                    <button
                      key={district.id}
                      type="button"
                      onClick={() => setSelectedDistrictId(district.id)}
                      className={`text-start rounded-xl border p-4 transition-colors cursor-pointer ${
                        isActive
                          ? 'border-[#0E6B4E] bg-[#0E6B4E]/5'
                          : 'border-[#E5E2DC] bg-[#FAF8F5] hover:border-[#0E6B4E]/50'
                      }`}
                    >
                      <p className="font-display text-sm font-bold text-[#11181C] mb-1">
                        {lang === 'ar' ? district.nameAr : district.nameEn}
                      </p>
                      <p className="text-xs text-[#5C646A] tabular-nums">
                        {lang === 'ar' ? `وصول: ${district.etaAr}` : `ETA: ${district.etaEn}`}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            CUSTOMER REVIEWS
        ================================================================ */}
        <section id="reviews" className="gsap-section py-14 sm:py-16 border-b border-[#E5E2DC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <p className="text-xs font-semibold text-[#0E6B4E] mb-2">
                  {lang === 'ar' ? 'تجارب عملاء موثقة' : 'Verified Seller Stories'}
                </p>
                <h2
                  style={{ textWrap: 'balance' }}
                  className="font-display text-2xl sm:text-3xl font-bold text-[#11181C]"
                >
                  {lang === 'ar'
                    ? 'آراء عملائنا في المدينة المنورة'
                    : 'What Sellers in Madinah Say About Us'}
                </h2>
              </div>

              <div className="flex items-center gap-2 text-sm text-[#4B555B]">
                <div className="flex items-center gap-0.5 text-[#A16207]">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="font-semibold text-[#11181C] tabular-nums">
                  5.0
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  {lang === 'ar'
                    ? 'تقييم موثق من أهالي المدينة'
                    : 'Verified Madinah Transactions'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {REVIEWS_LIST.map((review) => (
                <article
                  key={review.id}
                  className="gsap-card rounded-xl bg-white border border-[#E5E2DC] p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div
                        aria-label={`${review.rating} out of 5 stars`}
                        className="flex items-center gap-0.5 text-[#A16207]"
                      >
                        {Array.from({ length: review.rating }).map((_, idx) => (
                          <Star key={idx} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-[#0E6B4E]">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>
                          {lang === 'ar' ? 'بيع موثق' : 'Verified Sale'}
                        </span>
                      </span>
                    </div>

                    <p className="text-sm text-[#11181C] leading-relaxed mb-5">
                      “{lang === 'ar' ? review.quoteAr : review.quoteEn}”
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#EFECE6]">
                    <p className="font-display text-sm font-bold text-[#11181C]">
                      {lang === 'ar' ? review.nameAr : review.nameEn}
                    </p>
                    <p className="text-xs text-[#5C646A] mt-0.5">
                      {lang === 'ar'
                        ? `${review.neighborhoodAr} · ${review.soldItemAr}`
                        : `${review.neighborhoodEn} · ${review.soldItemEn}`}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================
            FREQUENTLY ASKED QUESTIONS
        ================================================================ */}
        <section id="faq" className="py-14 sm:py-16 bg-white border-b border-[#E5E2DC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-4">
                <p className="text-xs font-semibold text-[#0E6B4E] mb-2">
                  {lang === 'ar' ? 'إجابات واضحة قبل البيع' : 'Seller Answers'}
                </p>
                <h2
                  style={{ textWrap: 'balance' }}
                  className="font-display text-2xl sm:text-3xl font-bold text-[#11181C] mb-4"
                >
                  {lang === 'ar'
                    ? 'الأسئلة الشائعة حول بيع الأثاث المستعمل'
                    : 'Frequently Asked Questions'}
                </h2>
                <p className="text-sm text-[#4B555B] leading-relaxed mb-5">
                  {lang === 'ar'
                    ? 'إذا كان لديك استفسار إضافي حول نوع معين من الأثاث أو الأجهزة، تواصل معنا مباشرة.'
                    : 'Have a specific item or urgent clearance deadline? Call our Madinah team directly.'}
                </p>
                <a
                  href={BUSINESS_CONTACT.phoneHref}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#0E6B4E] hover:underline underline-offset-4 tabular-nums"
                >
                  <Phone className="w-4 h-4" />
                  <span dir="ltr">{BUSINESS_CONTACT.phoneDisplay}</span>
                </a>
              </div>

              <div className="lg:col-span-8 divide-y divide-[#E5E2DC] rounded-xl border border-[#E5E2DC] bg-[#FAF8F5]">
                {FAQ_LIST.map((faq) => {
                  const isOpen = openFaqId === faq.id;
                  return (
                    <div key={faq.id}>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                        className="w-full flex items-center justify-between gap-4 p-5 text-start cursor-pointer hover:bg-white/60 transition-colors"
                      >
                        <span className="font-display text-base font-bold text-[#11181C]">
                          {lang === 'ar' ? faq.questionAr : faq.questionEn}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-[#5C646A] shrink-0 transition-transform duration-200 ${
                            isOpen ? 'rotate-180 text-[#0E6B4E]' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 text-sm text-[#4B555B] leading-relaxed">
                          {lang === 'ar' ? faq.answerAr : faq.answerEn}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            FINAL CTA & QUOTATION FORM
        ================================================================ */}
        <section id="quote-form" className="py-14 sm:py-20 bg-[#11181C] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6">
                <p className="text-xs font-semibold text-[#6EE7B7] mb-3">
                  {lang === 'ar'
                    ? 'جاهز للبيع اليوم في المدينة المنورة؟'
                    : 'Ready to Sell Today in Madinah?'}
                </p>
                <h2
                  style={{ textWrap: 'balance' }}
                  className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight mb-5"
                >
                  {lang === 'ar'
                    ? 'حوّل أثاثك المستعمل إلى كاش فوري خلال ساعات'
                    : 'Turn Your Used Furniture into Instant Cash Today'}
                </h2>
                <p className="text-base text-white/80 leading-relaxed mb-8 max-w-xl">
                  {lang === 'ar'
                    ? 'اتصل بنا مباشرة على الرقم الموحد أو أرسل صور أثاثك عبر واتساب أو عبّئ النموذج المجاور، وسيصلك المقيّم بسيارة النقل والفنيين في نفس اليوم دون أي رسوم.'
                    : 'Call us directly, send photos on WhatsApp, or complete the quotation form. Our local crew arrives with enclosed trucks and dismantling technicians at zero cost.'}
                </p>

                <div className="flex flex-col sm:flex-row gap-3.5 mb-8">
                  <a
                    href={BUSINESS_CONTACT.phoneHref}
                    className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-white px-6 py-3.5 text-sm sm:text-base font-bold text-[#11181C] hover:bg-[#FAF8F5] transition-colors whitespace-nowrap tabular-nums"
                  >
                    <Phone className="w-5 h-5 text-[#0E6B4E]" />
                    <span>
                      {lang === 'ar'
                        ? `اتصل الآن: ${BUSINESS_CONTACT.phoneDisplay}`
                        : `Call: ${BUSINESS_CONTACT.phoneDisplay}`}
                    </span>
                  </a>

                  <a
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-[#0E6B4E] px-6 py-3.5 text-sm sm:text-base font-bold text-white hover:bg-[#0A533C] transition-colors whitespace-nowrap"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>
                      {lang === 'ar' ? 'تواصل واتساب فوري' : 'WhatsApp Us Now'}
                    </span>
                  </a>
                </div>

                <ul className="space-y-2.5 text-sm text-white/80">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#6EE7B7] shrink-0" />
                    <span>
                      {lang === 'ar'
                        ? 'دفع كاش أو تحويل بنكي فوري قبل تحريك الأثاث'
                        : 'Cash or instant bank transfer before loading'}
                    </span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#6EE7B7] shrink-0" />
                    <span>
                      {lang === 'ar'
                        ? 'فك مجاني للمكيفات وغرف النوم والمطابخ بأيدي فنيين'
                        : 'Free dismantling for ACs, bedrooms & kitchens'}
                    </span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#6EE7B7] shrink-0" />
                    <span>
                      {lang === 'ar'
                        ? 'تغطية يومية للعزيزية، قباء، العوالي، سلطانة وكافة الأحياء'
                        : 'Daily pickup in Al Aziziyah, Quba, Al Awali, Sultana & more'}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="lg:col-span-6">
                <QuotationForm
                  lang={lang}
                  preselectedDistrict={selectedDistrictId}
                  preselectedCategory={selectedCategoryId}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Footer */}
      <footer className="bg-[#0B1013] text-white/75 py-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs">
          <div className="flex items-center gap-3.5">
            <img
              src={LOGO_IMAGE}
              alt={lang === 'ar' ? BUSINESS_CONTACT.brandAr : BUSINESS_CONTACT.brandEn}
              className="w-12 h-12 rounded-full object-cover border border-white/20 bg-white shrink-0"
            />
            <div>
              <p className="font-display text-sm font-bold text-white mb-1">
                {lang === 'ar'
                  ? 'شراء اثاث مستعمل بالمدينة المنورة'
                  : 'Madinah Furniture Buyer'}
              </p>
              <p>
                {lang === 'ar'
                  ? 'المدينة المنورة، المملكة العربية السعودية · يومياً 8:00 ص – 11:30 م'
                  : 'Al-Madinah Al-Munawwarah, Saudi Arabia · Open Daily 8:00 AM – 11:30 PM'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <a href="#services" className="hover:text-white transition-colors">
              {lang === 'ar' ? 'ما نشتريه' : 'Services'}
            </a>
            <a href="#areas" className="hover:text-white transition-colors">
              {lang === 'ar' ? 'الأحياء' : 'Areas'}
            </a>
            <a href="#faq" className="hover:text-white transition-colors">
              {lang === 'ar' ? 'الأسئلة الشائعة' : 'FAQ'}
            </a>
            <a
              href={`mailto:${BUSINESS_CONTACT.email}`}
              dir="ltr"
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{BUSINESS_CONTACT.email}</span>
            </a>
            <a
              href={BUSINESS_CONTACT.phoneHref}
              dir="ltr"
              className="font-semibold text-white hover:text-[#6EE7B7] tabular-nums"
            >
              {BUSINESS_CONTACT.phoneIntlDisplay}
            </a>
          </div>
        </div>
      </footer>

      {/* Sticky Bottom Conversion Bar on Mobile (<= 56px) */}
      <div className="md:hidden fixed inset-x-0 bottom-0 z-40 h-14 bg-white border-t border-[#D4CFC5] px-3 flex items-center gap-2.5 shadow-lg">
        <a
          href={BUSINESS_CONTACT.phoneHref}
          className="flex-1 h-11 inline-flex items-center justify-center gap-2 rounded-lg bg-[#11181C] text-white text-xs font-bold tabular-nums"
        >
          <Phone className="w-4 h-4 shrink-0" />
          <span>{lang === 'ar' ? 'اتصل 0509653244' : 'Call 0509653244'}</span>
        </a>
        <a
          href={whatsappDirectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 h-11 inline-flex items-center justify-center gap-2 rounded-lg bg-[#0E6B4E] text-white text-xs font-bold"
        >
          <MessageCircle className="w-4 h-4 shrink-0" />
          <span>{lang === 'ar' ? 'واتساب فوري' : 'WhatsApp Us'}</span>
        </a>
      </div>

      {/* Desktop Floating Quick WhatsApp Action */}
      <div className="hidden md:flex fixed bottom-5 end-5 z-40">
        <a
          href={whatsappDirectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-[#0E6B4E] px-4 py-2.5 text-xs font-semibold text-white shadow-lg hover:bg-[#0A533C] transition-colors"
        >
          <MessageCircle className="w-4 h-4 shrink-0" />
          <span>
            {lang === 'ar' ? 'تقييم فوري عبر واتساب' : 'WhatsApp Quote'}
          </span>
        </a>
      </div>

      {/* Recent Purchase Inspection Modal */}
      {inspectedPurchase && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={
            lang === 'ar' ? inspectedPurchase.titleAr : inspectedPurchase.titleEn
          }
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
        >
          <div className="w-full max-w-lg rounded-xl bg-white border border-[#E5E2DC] overflow-hidden shadow-2xl">
            <div className="aspect-[4/3] w-full bg-[#EFECE6] relative">
              <ResilientImage
                src={inspectedPurchase.image}
                alt={
                  lang === 'ar'
                    ? inspectedPurchase.titleAr
                    : inspectedPurchase.titleEn
                }
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setInspectedPurchase(null)}
                aria-label="Close modal"
                className="absolute top-3 end-3 w-9 h-9 rounded-lg bg-white/95 text-[#11181C] flex items-center justify-center border border-[#E5E2DC] hover:bg-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 text-xs text-[#0E6B4E] font-semibold mb-2">
                <span>
                  {lang === 'ar'
                    ? inspectedPurchase.neighborhoodAr
                    : inspectedPurchase.neighborhoodEn}
                </span>
                <span aria-hidden="true">·</span>
                <span className="text-[#5C646A]">
                  {lang === 'ar'
                    ? inspectedPurchase.timeframeAr
                    : inspectedPurchase.timeframeEn}
                </span>
              </div>
              <h3 className="font-display text-lg font-bold text-[#11181C] mb-2">
                {lang === 'ar'
                  ? inspectedPurchase.titleAr
                  : inspectedPurchase.titleEn}
              </h3>
              <p className="text-sm text-[#4B555B] leading-relaxed mb-4">
                {lang === 'ar'
                  ? inspectedPurchase.captionAr
                  : inspectedPurchase.captionEn}
              </p>
              <div className="flex items-center justify-between gap-3 pt-4 border-t border-[#EFECE6]">
                <span className="text-xs text-[#5C646A]">
                  {lang === 'ar'
                    ? inspectedPurchase.beforeNoteAr
                    : inspectedPurchase.beforeNoteEn}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setInspectedPurchase(null);
                    jumpToQuoteForm();
                  }}
                  className="rounded-lg bg-[#0E6B4E] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0A533C] transition-colors cursor-pointer whitespace-nowrap"
                >
                  {lang === 'ar' ? 'بع أثاثاً مشابهاً' : 'Sell Similar Items'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
