import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
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
import { LayoutSwitcher, LayoutVariantId } from './components/LayoutSwitcher';
import { PaletteSwitcher } from './components/PaletteSwitcher';
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
import { COLOR_PALETTES, ColorPalette } from './data/palettes';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [activePalette, setActivePalette] = useState<ColorPalette>(
    COLOR_PALETTES[0]
  );
  const [layoutVariant, setLayoutVariant] = useState<LayoutVariantId>('split');
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
  const contentRef = useRef<HTMLElement>(null);

  const handleSplashComplete = useCallback(() => {
    setIntroDone(true);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  useEffect(() => {
    const root = document.documentElement.style;
    const v = activePalette.vars;
    root.setProperty('--brand-canvas', v.canvas);
    root.setProperty('--brand-section-alt', v.sectionAlt);
    root.setProperty('--brand-card', v.card);
    root.setProperty('--brand-surface-muted', v.surfaceMuted);
    root.setProperty('--brand-surface-subtle', v.surfaceSubtle);
    root.setProperty('--brand-border', v.border);
    root.setProperty('--brand-border-strong', v.borderStrong);
    root.setProperty('--brand-ink', v.ink);
    root.setProperty('--brand-ink-muted', v.inkMuted);
    root.setProperty('--brand-ink-subtle', v.inkSubtle);
    root.setProperty('--brand-accent', v.accent);
    root.setProperty('--brand-accent-hover', v.accentHover);
    root.setProperty('--brand-accent-text', v.accentText);
    root.setProperty('--brand-accent-2', v.accent2);
    root.setProperty('--brand-accent-on-dark', v.accentOnDark);
    root.setProperty('--brand-secondary-bg', v.secondaryBtnBg);
    root.setProperty('--brand-secondary-text', v.secondaryBtnText);
    root.setProperty('--brand-hero-bg', v.heroBg);
    root.setProperty('--brand-hero-ink', v.heroInk);
    root.setProperty('--brand-hero-muted', v.heroMuted);
    root.setProperty('--brand-dark-bg', v.darkBg);
    root.setProperty('--brand-footer-bg', v.footerBg);
    root.setProperty('--brand-star', v.starColor);
  }, [activePalette]);

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
    if (!contentRef.current) return;
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0.72, y: 8 },
        {
          opacity: 1,
          y: 0,
          duration: 0.28,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
        }
      );
    }, contentRef);

    return () => ctx.revert();
  }, [layoutVariant]);

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

  /* ------------------------------------------------------------------------
     SHARED SUB-SECTIONS REUSED ACROSS THE 4 LAYOUT ARCHITECTURES
  ------------------------------------------------------------------------ */
  const renderServicesFilter = () => (
    <div
      role="tablist"
      aria-label={lang === 'ar' ? 'تصفية الفئات' : 'Filter categories'}
      className="inline-flex flex-wrap items-center gap-1 p-1 rounded-lg bg-[var(--brand-surface-subtle)] border border-[var(--brand-border)]"
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
              ? 'bg-[var(--brand-card)] text-[var(--brand-ink)] border border-[var(--brand-border)] shadow-sm'
              : 'text-[var(--brand-ink-subtle)] hover:text-[var(--brand-ink)]'
          }`}
        >
          {lang === 'ar' ? tab.ar : tab.en}
        </button>
      ))}
    </div>
  );

  const renderDistrictGrid = (colsClass = 'grid-cols-2 sm:grid-cols-3') => (
    <div className={`grid ${colsClass} gap-3`}>
      {MADINAH_DISTRICTS.map((district) => {
        const isActive = district.id === selectedDistrictId;
        return (
          <button
            key={district.id}
            type="button"
            onClick={() => setSelectedDistrictId(district.id)}
            className={`text-start rounded-xl border p-3.5 transition-colors cursor-pointer ${
              isActive
                ? 'border-[var(--brand-accent)] bg-[var(--brand-surface-muted)]'
                : 'border-[var(--brand-border)] bg-[var(--brand-card)] hover:border-[var(--brand-accent)]/60'
            }`}
          >
            <p className="font-display text-sm font-bold text-[var(--brand-ink)] mb-0.5">
              {lang === 'ar' ? district.nameAr : district.nameEn}
            </p>
            <p className="text-xs text-[var(--brand-ink-subtle)] tabular-nums">
              {lang === 'ar' ? `وصول: ${district.etaAr}` : `ETA: ${district.etaEn}`}
            </p>
          </button>
        );
      })}
    </div>
  );

  const renderFaqAccordion = () => (
    <div className="divide-y divide-[var(--brand-border)] rounded-xl border border-[var(--brand-border)] bg-[var(--brand-card)]">
      {FAQ_LIST.map((faq) => {
        const isOpen = openFaqId === faq.id;
        return (
          <div key={faq.id}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
              className="w-full flex items-center justify-between gap-4 p-5 text-start cursor-pointer hover:bg-[var(--brand-surface-muted)]/50 transition-colors"
            >
              <span className="font-display text-base font-bold text-[var(--brand-ink)]">
                {lang === 'ar' ? faq.questionAr : faq.questionEn}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-[var(--brand-ink-subtle)] shrink-0 transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-[var(--brand-accent)]' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-5 text-sm text-[var(--brand-ink-muted)] leading-relaxed">
                {lang === 'ar' ? faq.answerAr : faq.answerEn}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  const renderReviewsGrid = (cols = 'md:grid-cols-3') => (
    <div className={`grid grid-cols-1 ${cols} gap-6`}>
      {REVIEWS_LIST.map((review) => (
        <article
          key={review.id}
          className="rounded-xl bg-[var(--brand-card)] border border-[var(--brand-border)] p-6 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <div
                aria-label={`${review.rating} out of 5 stars`}
                className="flex items-center gap-0.5 text-[var(--brand-star)]"
              >
                {Array.from({ length: review.rating }).map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-[var(--brand-accent)]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'بيع موثق' : 'Verified Sale'}</span>
              </span>
            </div>

            <p className="text-sm text-[var(--brand-ink)] leading-relaxed mb-5">
              “{lang === 'ar' ? review.quoteAr : review.quoteEn}”
            </p>
          </div>

          <div className="pt-4 border-t border-[var(--brand-border)]">
            <p className="font-display text-sm font-bold text-[var(--brand-ink)]">
              {lang === 'ar' ? review.nameAr : review.nameEn}
            </p>
            <p className="text-xs text-[var(--brand-ink-subtle)] mt-0.5">
              {lang === 'ar'
                ? `${review.neighborhoodAr} · ${review.soldItemAr}`
                : `${review.neighborhoodEn} · ${review.soldItemEn}`}
            </p>
          </div>
        </article>
      ))}
    </div>
  );

  const renderFinalCtaSection = () => (
    <section
      id="quote-form"
      className="py-14 sm:py-20 bg-[var(--brand-dark-bg)] text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <p className="text-xs font-semibold text-[var(--brand-accent-on-dark)] mb-3">
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
                className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-white px-6 py-3.5 text-sm sm:text-base font-bold text-[#11181C] hover:bg-neutral-100 transition-colors whitespace-nowrap tabular-nums"
              >
                <Phone className="w-5 h-5 text-[var(--brand-accent)]" />
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
                className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-[var(--brand-accent)] px-6 py-3.5 text-sm sm:text-base font-bold text-[var(--brand-accent-text)] hover:bg-[var(--brand-accent-hover)] transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-5 h-5" />
                <span>
                  {lang === 'ar' ? 'تواصل واتساب فوري' : 'WhatsApp Us Now'}
                </span>
              </a>
            </div>

            <ul className="space-y-2.5 text-sm text-white/80">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[var(--brand-accent-on-dark)] shrink-0" />
                <span>
                  {lang === 'ar'
                    ? 'دفع كاش أو تحويل بنكي فوري قبل تحريك الأثاث'
                    : 'Cash or instant bank transfer before loading'}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[var(--brand-accent-on-dark)] shrink-0" />
                <span>
                  {lang === 'ar'
                    ? 'فك مجاني للمكيفات وغرف النوم والمطابخ بأيدي فنيين'
                    : 'Free dismantling for ACs, bedrooms & kitchens'}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[var(--brand-accent-on-dark)] shrink-0" />
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
  );

  return (
    <div
      ref={mainRef}
      className="min-h-screen max-w-full overflow-x-clip bg-[var(--brand-canvas)] text-[var(--brand-ink)] pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0 transition-colors duration-200"
    >
      {/* First-load Brand Logo Loading Screen */}
      <IntroSplash onComplete={handleSplashComplete} />

      {/* Clean 3-Zone Top Bar */}
      <Header lang={lang} />

      {/* Toolbar: 4 Layout Variants + 6 Rich Color Mockups + Language Switch */}
      <div className="border-b border-[var(--brand-border)] bg-[var(--brand-surface-muted)]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 flex flex-col xl:flex-row xl:items-center justify-between gap-2.5 min-w-0">
          <LayoutSwitcher
            lang={lang}
            activeLayout={layoutVariant}
            onSelect={setLayoutVariant}
          />

          <div className="flex min-w-0 w-full xl:w-auto items-center gap-2.5">
            <PaletteSwitcher
              lang={lang}
              activePalette={activePalette}
              onSelect={setActivePalette}
            />

            <div
              role="group"
              aria-label="Language selector"
              className="inline-flex items-center gap-1 p-0.5 rounded-lg bg-[var(--brand-surface-subtle)] border border-[var(--brand-border)] shrink-0"
            >
              <Globe className="w-3.5 h-3.5 text-[var(--brand-ink-muted)] ms-1.5 hidden sm:block" />
              <button
                type="button"
                onClick={() => setLang('ar')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  lang === 'ar'
                    ? 'bg-[var(--brand-card)] text-[var(--brand-ink)] shadow-sm'
                    : 'text-[var(--brand-ink-muted)] hover:text-[var(--brand-ink)]'
                }`}
              >
                العربية
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  lang === 'en'
                    ? 'bg-[var(--brand-card)] text-[var(--brand-ink)] shadow-sm'
                    : 'text-[var(--brand-ink-muted)] hover:text-[var(--brand-ink)]'
                }`}
              >
                English
              </button>
            </div>
          </div>
        </div>
      </div>

      <main ref={contentRef}>
        {/* ================================================================
            LAYOUT 1: CLASSIC SPLIT HERO + 3-COLUMN CARDS
        ================================================================ */}
        {layoutVariant === 'split' && (
          <>
            <section
              id="hero"
              className="py-10 sm:py-14 lg:py-16 bg-[var(--brand-hero-bg)] text-[var(--brand-hero-ink)] border-b border-[var(--brand-border)]"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
                  <div className="lg:col-span-6 flex flex-col justify-center">
                    <p className="gsap-hero-item text-xs sm:text-sm font-medium text-[var(--brand-accent-on-dark)] mb-3">
                      {lang === 'ar' ? HERO_CONTENT.kickerAr : HERO_CONTENT.kickerEn}
                    </p>
                    <h1
                      style={{ textWrap: 'balance' }}
                      className="gsap-hero-item font-display text-[clamp(2rem,4vw,3.3rem)] font-bold leading-[1.18] tracking-tight text-[var(--brand-hero-ink)] mb-5"
                    >
                      {lang === 'ar' ? HERO_CONTENT.h1Ar : HERO_CONTENT.h1En}
                    </h1>
                    <p className="gsap-hero-item text-base sm:text-lg text-[var(--brand-hero-muted)] leading-relaxed max-w-2xl mb-8">
                      {lang === 'ar'
                        ? HERO_CONTENT.subheadlineAr
                        : HERO_CONTENT.subheadlineEn}
                    </p>

                    <div className="gsap-hero-item flex flex-wrap items-center gap-3.5 mb-5">
                      <a
                        href={whatsappDirectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-[var(--brand-accent)] px-6 py-3.5 text-sm sm:text-base font-semibold text-[var(--brand-accent-text)] hover:bg-[var(--brand-accent-hover)] transition-colors whitespace-nowrap shrink-0 ring-1 ring-white/25"
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
                        className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-white px-6 py-3.5 text-sm sm:text-base font-bold text-[#11181C] hover:bg-neutral-100 transition-colors whitespace-nowrap shrink-0 tabular-nums"
                      >
                        <Phone className="w-5 h-5 text-[var(--brand-accent)] shrink-0" />
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
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--brand-hero-muted)] hover:text-white underline underline-offset-4 transition-colors cursor-pointer"
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

                  <div className="gsap-hero-item lg:col-span-6">
                    <HeroSlider lang={lang} />
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-white/15 grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {HERO_CONTENT.trustStrip.map((item) => (
                    <div key={item.index} className="flex items-baseline gap-3">
                      <span className="text-xs font-semibold text-[var(--brand-accent-on-dark)] tabular-nums shrink-0">
                        {item.index}.
                      </span>
                      <span className="text-sm font-semibold text-[var(--brand-hero-ink)]">
                        {lang === 'ar' ? item.labelAr : item.labelEn}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Services 3-Col */}
            <section
              id="services"
              className="py-14 sm:py-16 bg-[var(--brand-section-alt)] border-b border-[var(--brand-border)]"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                  <div>
                    <p className="text-xs font-semibold text-[var(--brand-accent)] mb-2">
                      {lang === 'ar' ? 'تخصصاتنا في الشراء' : 'Categories We Purchase'}
                    </p>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--brand-ink)]">
                      {lang === 'ar'
                        ? 'ماذا نشتري في المدينة المنورة؟'
                        : 'What Used Furniture & Appliances We Buy'}
                    </h2>
                  </div>
                  {renderServicesFilter()}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredServices.map((service) => (
                    <article
                      key={service.id}
                      className="flex flex-col justify-between rounded-xl border border-[var(--brand-border)] bg-[var(--brand-card)] overflow-hidden transition-colors hover:border-[var(--brand-accent)]"
                    >
                      {service.image && (
                        <div className="aspect-[4/3] w-full overflow-hidden bg-[var(--brand-surface-subtle)] border-b border-[var(--brand-border)]">
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
                            <span className="text-xs font-semibold text-[var(--brand-accent)] tabular-nums">
                              {service.index}.
                            </span>
                            <h3 className="font-display text-lg font-bold text-[var(--brand-ink)]">
                              {lang === 'ar' ? service.titleAr : service.titleEn}
                            </h3>
                          </div>
                          <p className="text-sm text-[var(--brand-ink-muted)] leading-relaxed mb-4">
                            {lang === 'ar' ? service.descAr : service.descEn}
                          </p>
                        </div>
                        <div className="pt-4 border-t border-[var(--brand-border)] flex items-center justify-between gap-3">
                          <p className="text-xs text-[var(--brand-ink-subtle)]">
                            {lang === 'ar' ? service.itemsAr : service.itemsEn}
                          </p>
                          <button
                            type="button"
                            onClick={() => jumpToQuoteForm(service.id)}
                            className="text-xs font-semibold text-[var(--brand-accent)] underline underline-offset-4 whitespace-nowrap shrink-0 cursor-pointer"
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

            {/* How It Works */}
            <section
              id="how-it-works"
              className="py-14 sm:py-16 border-b border-[var(--brand-border)]"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mb-10">
                  <p className="text-xs font-semibold text-[var(--brand-accent)] mb-2">
                    {lang === 'ar' ? 'خطوات البيع السريعة' : 'Simple 4-Step Process'}
                  </p>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--brand-ink)]">
                    {lang === 'ar'
                      ? 'كيف تبيع أثاثك المستعمل بالمدينة في 4 خطوات؟'
                      : 'How to Sell Your Used Furniture in 4 Easy Steps'}
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {PROCESS_STEPS.map((step) => (
                    <div
                      key={step.index}
                      className="rounded-xl bg-[var(--brand-card)] border border-[var(--brand-border)] p-6"
                    >
                      <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-[var(--brand-border)]">
                        <span className="font-display text-2xl font-bold text-[var(--brand-accent)] tabular-nums">
                          {step.index}
                        </span>
                        <span className="text-xs font-medium text-[var(--brand-ink-subtle)]">
                          {lang === 'ar' ? step.timeTagAr : step.timeTagEn}
                        </span>
                      </div>
                      <h3 className="font-display text-lg font-bold text-[var(--brand-ink)] mb-2.5">
                        {lang === 'ar' ? step.titleAr : step.titleEn}
                      </h3>
                      <p className="text-sm text-[var(--brand-ink-muted)] leading-relaxed">
                        {lang === 'ar' ? step.descAr : step.descEn}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Why Choose Us */}
            <section
              id="why-us"
              className="py-14 sm:py-16 bg-[var(--brand-section-alt)] border-b border-[var(--brand-border)]"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                  <div className="lg:col-span-4">
                    <p className="text-xs font-semibold text-[var(--brand-accent)] mb-2">
                      {lang === 'ar' ? 'ضمانات حقيقية عند البيع' : 'Verified Commitments'}
                    </p>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--brand-ink)] mb-4">
                      {lang === 'ar'
                        ? 'لماذا يثق بنا أهالي المدينة المنورة؟'
                        : 'Why Madinah Homeowners & Offices Choose Us'}
                    </h2>
                    <p className="text-sm text-[var(--brand-ink-muted)] leading-relaxed mb-6">
                      {lang === 'ar'
                        ? 'نلتزم بوضوح التسعير واحترام وقتك ومنزلك بعيداً عن المفاوضات العشوائية أو تأخير التحميل.'
                        : 'We eliminate the usual headaches of selling used items—honest quotes, on-time crews, and zero hidden dismantling deductions.'}
                    </p>
                    <a
                      href={whatsappDirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-[var(--brand-accent)] px-5 py-3 text-sm font-semibold text-[var(--brand-accent-text)] hover:bg-[var(--brand-accent-hover)] transition-colors whitespace-nowrap"
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
                        className="rounded-xl bg-[var(--brand-card)] border border-[var(--brand-border)] p-6"
                      >
                        <div className="flex items-center justify-between gap-2 mb-3 text-xs">
                          <span className="font-semibold text-[var(--brand-accent)] tabular-nums">
                            {adv.index}.
                          </span>
                          <span className="font-medium text-[var(--brand-ink-subtle)]">
                            {lang === 'ar' ? adv.metricAr : adv.metricEn}
                          </span>
                        </div>
                        <h3 className="font-display text-lg font-bold text-[var(--brand-ink)] mb-2">
                          {lang === 'ar' ? adv.titleAr : adv.titleEn}
                        </h3>
                        <p className="text-sm text-[var(--brand-ink-muted)] leading-relaxed">
                          {lang === 'ar' ? adv.descAr : adv.descEn}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Recent Purchases */}
            <section
              id="recent-purchases"
              className="py-14 sm:py-16 border-b border-[var(--brand-border)]"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                  <div>
                    <p className="text-xs font-semibold text-[var(--brand-accent)] mb-2">
                      {lang === 'ar' ? 'نماذج من أعمالنا الميدانية' : 'Field Proof Across Madinah'}
                    </p>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--brand-ink)]">
                      {lang === 'ar'
                        ? 'أحدث صفقات الشراء في أحياء المدينة المنورة'
                        : 'Our Recent Purchases in Madinah'}
                    </h2>
                  </div>
                  <p className="text-xs text-[var(--brand-ink-subtle)]">
                    {lang === 'ar'
                      ? 'انقر على أي عملية لعرض تفاصيل الفك والاستلام'
                      : 'Click any item to inspect pickup & settlement notes'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {RECENT_PURCHASES.map((purchase) => (
                    <article
                      key={purchase.id}
                      className="group rounded-xl bg-[var(--brand-card)] border border-[var(--brand-border)] overflow-hidden flex flex-col justify-between"
                    >
                      <button
                        type="button"
                        onClick={() => setInspectedPurchase(purchase)}
                        className="text-start flex-1 flex flex-col cursor-pointer"
                      >
                        <div className="aspect-[4/3] w-full overflow-hidden bg-[var(--brand-surface-subtle)] border-b border-[var(--brand-border)]">
                          <ResilientImage
                            src={purchase.image}
                            alt={lang === 'ar' ? purchase.titleAr : purchase.titleEn}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                          />
                        </div>
                        <div className="p-5 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-1.5 text-xs text-[var(--brand-ink-subtle)] mb-2">
                              <span className="font-semibold text-[var(--brand-accent)]">
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
                            <h3 className="font-display text-base font-bold text-[var(--brand-ink)] mb-2">
                              {lang === 'ar' ? purchase.titleAr : purchase.titleEn}
                            </h3>
                            <p className="text-xs text-[var(--brand-ink-muted)] leading-relaxed">
                              {lang === 'ar' ? purchase.captionAr : purchase.captionEn}
                            </p>
                          </div>
                          <p className="mt-4 pt-3 border-t border-[var(--brand-border)] text-xs font-medium text-[var(--brand-ink-subtle)]">
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

            {/* Areas We Serve */}
            <section
              id="areas"
              className="py-14 sm:py-16 bg-[var(--brand-section-alt)] border-b border-[var(--brand-border)]"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                  <div className="lg:col-span-5">
                    <p className="text-xs font-semibold text-[var(--brand-accent)] mb-2">
                      {lang === 'ar' ? 'تغطية جغرافية شاملة' : 'Hyper-Local Dispatch'}
                    </p>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--brand-ink)] mb-4">
                      {lang === 'ar'
                        ? AREAS_SEO_COPY.headingAr
                        : AREAS_SEO_COPY.headingEn}
                    </h2>
                    <p className="text-sm text-[var(--brand-ink-muted)] leading-relaxed mb-6">
                      {lang === 'ar'
                        ? AREAS_SEO_COPY.paragraphAr
                        : AREAS_SEO_COPY.paragraphEn}
                    </p>
                    <div className="rounded-xl bg-[var(--brand-card)] border border-[var(--brand-border)] p-5">
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[var(--brand-accent)] shrink-0" />
                          <h3 className="font-display text-base font-bold text-[var(--brand-ink)]">
                            {lang === 'ar'
                              ? activeDistrict.nameAr
                              : activeDistrict.nameEn}
                          </h3>
                        </div>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--brand-accent)] tabular-nums">
                          <Clock className="w-3.5 h-3.5" />
                          <span>
                            {lang === 'ar'
                              ? activeDistrict.etaAr
                              : activeDistrict.etaEn}
                          </span>
                        </span>
                      </div>
                      <p className="text-xs text-[var(--brand-ink-muted)] mb-4">
                        {lang === 'ar'
                          ? `الأكثر طلباً في الحي: ${activeDistrict.focusAr}`
                          : `Common pickups: ${activeDistrict.focusEn}`}
                      </p>
                      <button
                        type="button"
                        onClick={() => jumpToQuoteForm(undefined, activeDistrict.id)}
                        className="w-full rounded-lg bg-[var(--brand-secondary-bg)] px-4 py-2.5 text-xs font-semibold text-[var(--brand-secondary-text)] hover:opacity-90 transition-opacity cursor-pointer"
                      >
                        {lang === 'ar'
                          ? `اطلب معاينة مجانية في ${activeDistrict.nameAr}`
                          : `Request Pickup in ${activeDistrict.nameEn}`}
                      </button>
                    </div>
                  </div>
                  <div className="lg:col-span-7">{renderDistrictGrid()}</div>
                </div>
              </div>
            </section>

            {/* Reviews */}
            <section
              id="reviews"
              className="py-14 sm:py-16 border-b border-[var(--brand-border)]"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                  <div>
                    <p className="text-xs font-semibold text-[var(--brand-accent)] mb-2">
                      {lang === 'ar' ? 'تجارب عملاء موثقة' : 'Verified Seller Stories'}
                    </p>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--brand-ink)]">
                      {lang === 'ar'
                        ? 'آراء عملائنا في المدينة المنورة'
                        : 'What Sellers in Madinah Say About Us'}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[var(--brand-ink-muted)]">
                    <div className="flex items-center gap-0.5 text-[var(--brand-star)]">
                      {[0, 1, 2, 3, 4].map((s) => (
                        <Star key={s} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="font-semibold text-[var(--brand-ink)] tabular-nums">
                      5.0
                    </span>
                  </div>
                </div>
                {renderReviewsGrid()}
              </div>
            </section>

            {/* FAQ */}
            <section
              id="faq"
              className="py-14 sm:py-16 bg-[var(--brand-section-alt)] border-b border-[var(--brand-border)]"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                  <div className="lg:col-span-4">
                    <p className="text-xs font-semibold text-[var(--brand-accent)] mb-2">
                      {lang === 'ar' ? 'إجابات واضحة قبل البيع' : 'Seller Answers'}
                    </p>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--brand-ink)] mb-4">
                      {lang === 'ar'
                        ? 'الأسئلة الشائعة حول بيع الأثاث المستعمل'
                        : 'Frequently Asked Questions'}
                    </h2>
                    <a
                      href={BUSINESS_CONTACT.phoneHref}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-accent)] hover:underline underline-offset-4 tabular-nums"
                    >
                      <Phone className="w-4 h-4" />
                      <span dir="ltr">{BUSINESS_CONTACT.phoneDisplay}</span>
                    </a>
                  </div>
                  <div className="lg:col-span-8">{renderFaqAccordion()}</div>
                </div>
              </div>
            </section>

            {renderFinalCtaSection()}
          </>
        )}

        {/* ================================================================
            LAYOUT 2: FULL-BLEED BANNER HERO + HORIZONTAL SERVICE ROWS
        ================================================================ */}
        {layoutVariant === 'banner' && (
          <>
            <section id="hero" className="relative border-b border-[var(--brand-border)]">
              {/* Full-bleed Slider Banner with Overlay */}
              <div className="relative min-h-[500px] sm:min-h-[540px] flex items-center bg-[var(--brand-hero-bg)]">
                <div className="absolute inset-0 opacity-45">
                  <HeroSlider lang={lang} />
                </div>
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(90deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.58) 55%, rgba(0,0,0,0.35) 100%)',
                  }}
                />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 w-full">
                  <div className="max-w-2xl text-white">
                    <p className="text-xs sm:text-sm font-semibold text-[var(--brand-accent-on-dark)] mb-3">
                      {lang === 'ar' ? HERO_CONTENT.kickerAr : HERO_CONTENT.kickerEn}
                    </p>
                    <h1
                      style={{ textWrap: 'balance' }}
                      className="font-display text-[clamp(2.1rem,4.2vw,3.5rem)] font-bold leading-[1.16] text-white mb-5"
                    >
                      {lang === 'ar' ? HERO_CONTENT.h1Ar : HERO_CONTENT.h1En}
                    </h1>
                    <p className="text-base sm:text-lg text-white/85 leading-relaxed mb-8">
                      {lang === 'ar'
                        ? HERO_CONTENT.subheadlineAr
                        : HERO_CONTENT.subheadlineEn}
                    </p>
                    <div className="flex flex-wrap items-center gap-3.5">
                      <a
                        href={whatsappDirectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 rounded-lg bg-[var(--brand-accent)] px-6 py-3.5 text-sm sm:text-base font-semibold text-[var(--brand-accent-text)] hover:bg-[var(--brand-accent-hover)] transition-colors whitespace-nowrap"
                      >
                        <MessageCircle className="w-5 h-5" />
                        <span>
                          {lang === 'ar'
                            ? HERO_CONTENT.ctaWhatsappAr
                            : HERO_CONTENT.ctaWhatsappEn}
                        </span>
                      </a>
                      <a
                        href={BUSINESS_CONTACT.phoneHref}
                        className="inline-flex items-center gap-2.5 rounded-lg bg-white px-6 py-3.5 text-sm sm:text-base font-bold text-[#11181C] hover:bg-neutral-100 transition-colors whitespace-nowrap tabular-nums"
                      >
                        <Phone className="w-5 h-5 text-[var(--brand-accent)]" />
                        <span>
                          {lang === 'ar'
                            ? HERO_CONTENT.ctaCallAr
                            : HERO_CONTENT.ctaCallEn}
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Overlapping Floating 4-Card Trust Bar */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 pb-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {HERO_CONTENT.trustStrip.map((item) => (
                    <div
                      key={item.index}
                      className="rounded-xl bg-[var(--brand-card)] border border-[var(--brand-border-strong)] p-4 sm:p-5 shadow-md"
                    >
                      <span className="text-xs font-bold text-[var(--brand-accent)] tabular-nums block mb-1">
                        {item.index}
                      </span>
                      <p className="text-sm font-bold text-[var(--brand-ink)]">
                        {lang === 'ar' ? item.labelAr : item.labelEn}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Horizontal 2-Col Process Ribbon */}
            <section
              id="how-it-works"
              className="py-12 bg-[var(--brand-section-alt)] border-b border-[var(--brand-border)]"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                  <h2 className="font-display text-2xl font-bold text-[var(--brand-ink)]">
                    {lang === 'ar'
                      ? 'خطوات البيع الفوري في 4 مراحل'
                      : '4-Step Instant Selling Timeline'}
                  </h2>
                  <span className="text-xs font-semibold text-[var(--brand-accent)]">
                    {lang === 'ar'
                      ? 'دفع كاش قبل التحميل'
                      : 'Cash Settled Before Loading'}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {PROCESS_STEPS.map((step, idx) => (
                    <div
                      key={step.index}
                      className="rounded-xl bg-[var(--brand-card)] border border-[var(--brand-border)] p-5 relative"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--brand-accent)] text-[var(--brand-accent-text)] text-xs font-bold tabular-nums">
                          {step.index}
                        </span>
                        {idx < PROCESS_STEPS.length - 1 && (
                          <span className="hidden md:inline-flex text-[var(--brand-ink-subtle)]">
                            {lang === 'ar' ? (
                              <ArrowLeft className="w-4 h-4" />
                            ) : (
                              <ArrowRight className="w-4 h-4" />
                            )}
                          </span>
                        )}
                      </div>
                      <h3 className="font-display text-base font-bold text-[var(--brand-ink)] mb-1.5">
                        {lang === 'ar' ? step.titleAr : step.titleEn}
                      </h3>
                      <p className="text-xs text-[var(--brand-ink-muted)] leading-relaxed">
                        {lang === 'ar' ? step.descAr : step.descEn}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Horizontal Split Service Cards (2-col wide cards) */}
            <section
              id="services"
              className="py-14 sm:py-16 border-b border-[var(--brand-border)]"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                  <div>
                    <p className="text-xs font-semibold text-[var(--brand-accent)] mb-2">
                      {lang === 'ar' ? 'تخصصات الشراء' : 'Full Purchase Catalog'}
                    </p>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--brand-ink)]">
                      {lang === 'ar'
                        ? 'ماذا نشتري في المدينة المنورة؟'
                        : 'What Used Furniture & Appliances We Buy'}
                    </h2>
                  </div>
                  {renderServicesFilter()}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredServices.map((service) => (
                    <article
                      key={service.id}
                      className="flex flex-col sm:flex-row rounded-xl border border-[var(--brand-border)] bg-[var(--brand-card)] overflow-hidden"
                    >
                      {service.image && (
                        <div className="sm:w-48 shrink-0 aspect-[4/3] sm:aspect-auto bg-[var(--brand-surface-subtle)]">
                          <ResilientImage
                            src={service.image}
                            alt={lang === 'ar' ? service.titleAr : service.titleEn}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <span className="text-xs font-semibold text-[var(--brand-accent)] tabular-nums">
                            {service.index}.
                          </span>
                          <h3 className="font-display text-lg font-bold text-[var(--brand-ink)] mt-0.5 mb-2">
                            {lang === 'ar' ? service.titleAr : service.titleEn}
                          </h3>
                          <p className="text-sm text-[var(--brand-ink-muted)] leading-relaxed mb-3">
                            {lang === 'ar' ? service.descAr : service.descEn}
                          </p>
                        </div>
                        <div className="pt-3 border-t border-[var(--brand-border)] flex items-center justify-between gap-2">
                          <span className="text-xs text-[var(--brand-ink-subtle)] truncate">
                            {lang === 'ar' ? service.itemsAr : service.itemsEn}
                          </span>
                          <button
                            type="button"
                            onClick={() => jumpToQuoteForm(service.id)}
                            className="text-xs font-bold text-[var(--brand-accent)] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            {lang === 'ar' ? 'تسعيرة سريعة' : 'Quote'}
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            {/* Proof Cluster: Reviews + Recent Purchases */}
            <section
              id="reviews"
              className="py-14 sm:py-16 bg-[var(--brand-section-alt)] border-b border-[var(--brand-border)]"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--brand-ink)] mb-6">
                    {lang === 'ar'
                      ? 'آراء عملائنا الموثقة في المدينة'
                      : 'Verified Madinah Seller Reviews'}
                  </h2>
                  {renderReviewsGrid()}
                </div>

                <div id="recent-purchases">
                  <h3 className="font-display text-xl font-bold text-[var(--brand-ink)] mb-5">
                    {lang === 'ar'
                      ? 'أحدث عمليات الشراء والاستلام'
                      : 'Recent Field Pickups'}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {RECENT_PURCHASES.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setInspectedPurchase(p)}
                        className="text-start rounded-xl bg-[var(--brand-card)] border border-[var(--brand-border)] overflow-hidden hover:border-[var(--brand-accent)] transition-colors cursor-pointer"
                      >
                        <div className="aspect-[4/3] w-full bg-[var(--brand-surface-subtle)]">
                          <ResilientImage
                            src={p.image}
                            alt={lang === 'ar' ? p.titleAr : p.titleEn}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <p className="text-xs font-semibold text-[var(--brand-accent)] mb-1">
                            {lang === 'ar' ? p.neighborhoodAr : p.neighborhoodEn}
                          </p>
                          <p className="font-display text-sm font-bold text-[var(--brand-ink)]">
                            {lang === 'ar' ? p.titleAr : p.titleEn}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Areas + Why Us + FAQ */}
            <section id="areas" className="py-14 sm:py-16 border-b border-[var(--brand-border)]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-6 space-y-6">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-[var(--brand-ink)] mb-3">
                      {lang === 'ar'
                        ? AREAS_SEO_COPY.headingAr
                        : AREAS_SEO_COPY.headingEn}
                    </h2>
                    <p className="text-sm text-[var(--brand-ink-muted)] leading-relaxed">
                      {lang === 'ar'
                        ? AREAS_SEO_COPY.paragraphAr
                        : AREAS_SEO_COPY.paragraphEn}
                    </p>
                  </div>
                  {renderDistrictGrid('grid-cols-2 sm:grid-cols-3')}
                </div>
                <div id="faq" className="lg:col-span-6 space-y-6">
                  <h2 className="font-display text-2xl font-bold text-[var(--brand-ink)]">
                    {lang === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
                  </h2>
                  {renderFaqAccordion()}
                </div>
              </div>
            </section>

            {renderFinalCtaSection()}
          </>
        )}

        {/* ================================================================
            LAYOUT 3: CONVERSION-FIRST HERO WITH EMBEDDED QUOTATION FORM
        ================================================================ */}
        {layoutVariant === 'form-hero' && (
          <>
            <section
              id="hero"
              className="py-10 sm:py-14 bg-[var(--brand-hero-bg)] text-[var(--brand-hero-ink)] border-b border-[var(--brand-border)]"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                  <div className="lg:col-span-7 space-y-6">
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-[var(--brand-accent-on-dark)] mb-2">
                        {lang === 'ar' ? HERO_CONTENT.kickerAr : HERO_CONTENT.kickerEn}
                      </p>
                      <h1
                        style={{ textWrap: 'balance' }}
                        className="font-display text-[clamp(1.9rem,3.6vw,3rem)] font-bold leading-[1.18] text-[var(--brand-hero-ink)] mb-4"
                      >
                        {lang === 'ar' ? HERO_CONTENT.h1Ar : HERO_CONTENT.h1En}
                      </h1>
                      <p className="text-sm sm:text-base text-[var(--brand-hero-muted)] leading-relaxed max-w-2xl mb-6">
                        {lang === 'ar'
                          ? HERO_CONTENT.subheadlineAr
                          : HERO_CONTENT.subheadlineEn}
                      </p>

                      <div className="flex flex-wrap gap-3 mb-6">
                        <a
                          href={whatsappDirectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg bg-[var(--brand-accent)] px-5 py-3 text-sm font-semibold text-[var(--brand-accent-text)] ring-1 ring-white/25 hover:bg-[var(--brand-accent-hover)] transition-colors whitespace-nowrap"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>
                            {lang === 'ar'
                              ? HERO_CONTENT.ctaWhatsappAr
                              : HERO_CONTENT.ctaWhatsappEn}
                          </span>
                        </a>
                        <a
                          href={BUSINESS_CONTACT.phoneHref}
                          className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-[#11181C] hover:bg-neutral-100 transition-colors whitespace-nowrap tabular-nums"
                        >
                          <Phone className="w-4 h-4 text-[var(--brand-accent)]" />
                          <span>
                            {lang === 'ar'
                              ? HERO_CONTENT.ctaCallAr
                              : HERO_CONTENT.ctaCallEn}
                          </span>
                        </a>
                      </div>
                    </div>

                    {/* Inline Compact HeroSlider */}
                    <div className="h-[260px] sm:h-[300px]">
                      <HeroSlider lang={lang} />
                    </div>
                  </div>

                  {/* Above-the-fold Quotation Form */}
                  <div id="quote-form" className="lg:col-span-5">
                    <QuotationForm
                      lang={lang}
                      preselectedDistrict={selectedDistrictId}
                      preselectedCategory={selectedCategoryId}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* 4-Step Process */}
            <section
              id="how-it-works"
              className="py-12 bg-[var(--brand-section-alt)] border-b border-[var(--brand-border)]"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {PROCESS_STEPS.map((step) => (
                  <div
                    key={step.index}
                    className="rounded-xl bg-[var(--brand-card)] border border-[var(--brand-border)] p-5"
                  >
                    <span className="text-xs font-bold text-[var(--brand-accent)] tabular-nums">
                      {step.index} · {lang === 'ar' ? step.timeTagAr : step.timeTagEn}
                    </span>
                    <h3 className="font-display text-base font-bold text-[var(--brand-ink)] mt-2 mb-1.5">
                      {lang === 'ar' ? step.titleAr : step.titleEn}
                    </h3>
                    <p className="text-xs text-[var(--brand-ink-muted)] leading-relaxed">
                      {lang === 'ar' ? step.descAr : step.descEn}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Compact 6-Tile Services + Why Us */}
            <section id="services" className="py-14 sm:py-16 border-b border-[var(--brand-border)]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--brand-ink)]">
                    {lang === 'ar'
                      ? 'جميع فئات الأثاث والأجهزة التي نشتريها'
                      : 'All Categories We Buy in Madinah'}
                  </h2>
                  {renderServicesFilter()}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
                  {filteredServices.map((s) => (
                    <div
                      key={s.id}
                      className="rounded-xl bg-[var(--brand-card)] border border-[var(--brand-border)] p-5 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-xs font-bold text-[var(--brand-accent)] tabular-nums">
                            {s.index}
                          </span>
                          <button
                            type="button"
                            onClick={() => jumpToQuoteForm(s.id)}
                            className="text-xs font-semibold text-[var(--brand-accent)] hover:underline cursor-pointer"
                          >
                            {lang === 'ar' ? 'اطلب تسعيرة' : 'Select'}
                          </button>
                        </div>
                        <h3 className="font-display text-lg font-bold text-[var(--brand-ink)] mb-2">
                          {lang === 'ar' ? s.titleAr : s.titleEn}
                        </h3>
                        <p className="text-sm text-[var(--brand-ink-muted)] leading-relaxed mb-3">
                          {lang === 'ar' ? s.descAr : s.descEn}
                        </p>
                      </div>
                      <p className="text-xs text-[var(--brand-ink-subtle)] pt-3 border-t border-[var(--brand-border)]">
                        {lang === 'ar' ? s.itemsAr : s.itemsEn}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Why Us Strip */}
                <div id="why-us" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {WHY_CHOOSE_US.map((adv) => (
                    <div
                      key={adv.index}
                      className="rounded-xl bg-[var(--brand-surface-muted)] border border-[var(--brand-border)] p-5"
                    >
                      <p className="text-xs font-bold text-[var(--brand-accent)] mb-1">
                        {lang === 'ar' ? adv.metricAr : adv.metricEn}
                      </p>
                      <h3 className="font-display text-base font-bold text-[var(--brand-ink)] mb-1.5">
                        {lang === 'ar' ? adv.titleAr : adv.titleEn}
                      </h3>
                      <p className="text-xs text-[var(--brand-ink-muted)] leading-relaxed">
                        {lang === 'ar' ? adv.descAr : adv.descEn}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 1+3 Asymmetric Recent Purchases Mosaic */}
            <section
              id="recent-purchases"
              className="py-14 sm:py-16 bg-[var(--brand-section-alt)] border-b border-[var(--brand-border)]"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--brand-ink)] mb-8">
                  {lang === 'ar'
                    ? 'معارض صفقات الشراء الأخيرة بالمدينة'
                    : 'Recent Madinah Pickups Mosaic'}
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                  <button
                    type="button"
                    onClick={() => setInspectedPurchase(RECENT_PURCHASES[0])}
                    className="lg:col-span-6 text-start rounded-xl bg-[var(--brand-card)] border border-[var(--brand-border)] overflow-hidden flex flex-col cursor-pointer hover:border-[var(--brand-accent)]"
                  >
                    <div className="aspect-[16/10] w-full bg-[var(--brand-surface-subtle)]">
                      <ResilientImage
                        src={RECENT_PURCHASES[0].image}
                        alt={
                          lang === 'ar'
                            ? RECENT_PURCHASES[0].titleAr
                            : RECENT_PURCHASES[0].titleEn
                        }
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6 flex-1">
                      <p className="text-xs font-bold text-[var(--brand-accent)] mb-1">
                        {lang === 'ar'
                          ? RECENT_PURCHASES[0].neighborhoodAr
                          : RECENT_PURCHASES[0].neighborhoodEn}{' '}
                        ·{' '}
                        {lang === 'ar'
                          ? RECENT_PURCHASES[0].timeframeAr
                          : RECENT_PURCHASES[0].timeframeEn}
                      </p>
                      <h3 className="font-display text-xl font-bold text-[var(--brand-ink)] mb-2">
                        {lang === 'ar'
                          ? RECENT_PURCHASES[0].titleAr
                          : RECENT_PURCHASES[0].titleEn}
                      </h3>
                      <p className="text-sm text-[var(--brand-ink-muted)] leading-relaxed">
                        {lang === 'ar'
                          ? RECENT_PURCHASES[0].captionAr
                          : RECENT_PURCHASES[0].captionEn}
                      </p>
                    </div>
                  </button>

                  <div className="lg:col-span-6 flex flex-col justify-between gap-4">
                    {RECENT_PURCHASES.slice(1).map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setInspectedPurchase(p)}
                        className="text-start rounded-xl bg-[var(--brand-card)] border border-[var(--brand-border)] overflow-hidden flex flex-row items-center gap-4 p-3 hover:border-[var(--brand-accent)] cursor-pointer"
                      >
                        <div className="w-28 h-24 rounded-lg overflow-hidden shrink-0 bg-[var(--brand-surface-subtle)]">
                          <ResilientImage
                            src={p.image}
                            alt={lang === 'ar' ? p.titleAr : p.titleEn}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-[var(--brand-accent)] mb-0.5">
                            {lang === 'ar' ? p.neighborhoodAr : p.neighborhoodEn}
                          </p>
                          <h3 className="font-display text-sm font-bold text-[var(--brand-ink)] truncate">
                            {lang === 'ar' ? p.titleAr : p.titleEn}
                          </h3>
                          <p className="text-xs text-[var(--brand-ink-muted)] mt-1 line-clamp-2">
                            {lang === 'ar' ? p.captionAr : p.captionEn}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Areas + Reviews + FAQ */}
            <section id="areas" className="py-14 sm:py-16 border-b border-[var(--brand-border)]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--brand-ink)] mb-3">
                    {lang === 'ar'
                      ? AREAS_SEO_COPY.headingAr
                      : AREAS_SEO_COPY.headingEn}
                  </h2>
                  <p className="text-sm text-[var(--brand-ink-muted)] max-w-3xl mb-6">
                    {lang === 'ar'
                      ? AREAS_SEO_COPY.paragraphAr
                      : AREAS_SEO_COPY.paragraphEn}
                  </p>
                  {renderDistrictGrid('grid-cols-2 sm:grid-cols-4 lg:grid-cols-6')}
                </div>

                <div id="reviews">
                  <h2 className="font-display text-2xl font-bold text-[var(--brand-ink)] mb-6">
                    {lang === 'ar' ? 'آراء عملائنا' : 'Customer Reviews'}
                  </h2>
                  {renderReviewsGrid()}
                </div>

                <div id="faq">
                  <h2 className="font-display text-2xl font-bold text-[var(--brand-ink)] mb-6">
                    {lang === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
                  </h2>
                  {renderFaqAccordion()}
                </div>
              </div>
            </section>

            {/* Compact Dark Closing Banner */}
            <section className="py-12 bg-[var(--brand-dark-bg)] text-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold">
                    {lang === 'ar'
                      ? 'تواصل الآن لبيع أثاثك خلال ساعات'
                      : 'Call or WhatsApp for Same-Day Pickup'}
                  </h2>
                  <p className="text-sm text-white/80 mt-1">
                    {lang === 'ar'
                      ? 'فك ونقل مجاني ودفع كاش فوري في جميع أحياء المدينة المنورة'
                      : 'Free dismantling, enclosed trucks & cash paid before loading'}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 shrink-0">
                  <a
                    href={BUSINESS_CONTACT.phoneHref}
                    className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-[#11181C] tabular-nums"
                  >
                    <Phone className="w-4 h-4 text-[var(--brand-accent)]" />
                    <span>{BUSINESS_CONTACT.phoneDisplay}</span>
                  </a>
                  <a
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-[var(--brand-accent)] px-5 py-3 text-sm font-bold text-[var(--brand-accent-text)]"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{lang === 'ar' ? 'واتساب فوري' : 'WhatsApp Us'}</span>
                  </a>
                </div>
              </div>
            </section>
          </>
        )}

        {/* ================================================================
            LAYOUT 4: CENTERED PANORAMIC HERO + BENTO DIRECTORY HUB
        ================================================================ */}
        {layoutVariant === 'bento' && (
          <>
            <section id="hero" className="py-12 sm:py-16 border-b border-[var(--brand-border)]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center mb-10">
                  <p className="text-xs sm:text-sm font-semibold text-[var(--brand-accent)] mb-3">
                    {lang === 'ar' ? HERO_CONTENT.kickerAr : HERO_CONTENT.kickerEn}
                  </p>
                  <h1
                    style={{ textWrap: 'balance' }}
                    className="font-display text-[clamp(2rem,4.2vw,3.4rem)] font-bold leading-[1.16] text-[var(--brand-ink)] mb-5"
                  >
                    {lang === 'ar' ? HERO_CONTENT.h1Ar : HERO_CONTENT.h1En}
                  </h1>
                  <p className="text-base sm:text-lg text-[var(--brand-ink-muted)] leading-relaxed mb-7">
                    {lang === 'ar'
                      ? HERO_CONTENT.subheadlineAr
                      : HERO_CONTENT.subheadlineEn}
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3.5">
                    <a
                      href={whatsappDirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 rounded-lg bg-[var(--brand-accent)] px-6 py-3.5 text-sm sm:text-base font-semibold text-[var(--brand-accent-text)] hover:bg-[var(--brand-accent-hover)] transition-colors"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>
                        {lang === 'ar'
                          ? HERO_CONTENT.ctaWhatsappAr
                          : HERO_CONTENT.ctaWhatsappEn}
                      </span>
                    </a>
                    <a
                      href={BUSINESS_CONTACT.phoneHref}
                      className="inline-flex items-center gap-2.5 rounded-lg bg-[var(--brand-secondary-bg)] px-6 py-3.5 text-sm sm:text-base font-semibold text-[var(--brand-secondary-text)] hover:opacity-90 transition-opacity tabular-nums"
                    >
                      <Phone className="w-5 h-5" />
                      <span>
                        {lang === 'ar'
                          ? HERO_CONTENT.ctaCallAr
                          : HERO_CONTENT.ctaCallEn}
                      </span>
                    </a>
                  </div>
                </div>

                {/* Panoramic 16:9 Centered Slider */}
                <div className="max-w-5xl mx-auto h-[320px] sm:h-[440px]">
                  <HeroSlider lang={lang} />
                </div>
              </div>
            </section>

            {/* Side-by-Side Bento Hub: Services + Districts */}
            <section
              id="services"
              className="py-14 sm:py-16 bg-[var(--brand-section-alt)] border-b border-[var(--brand-border)]"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <h2 className="font-display text-2xl font-bold text-[var(--brand-ink)]">
                      {lang === 'ar' ? 'ماذا نشتري؟' : 'What We Buy'}
                    </h2>
                    {renderServicesFilter()}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredServices.map((s) => (
                      <div
                        key={s.id}
                        className="rounded-xl bg-[var(--brand-card)] border border-[var(--brand-border)] p-5 flex flex-col justify-between"
                      >
                        <div>
                          <span className="text-xs font-bold text-[var(--brand-accent)] tabular-nums">
                            {s.index}.
                          </span>
                          <h3 className="font-display text-base font-bold text-[var(--brand-ink)] mt-1 mb-1.5">
                            {lang === 'ar' ? s.titleAr : s.titleEn}
                          </h3>
                          <p className="text-xs text-[var(--brand-ink-muted)] leading-relaxed mb-3">
                            {lang === 'ar' ? s.descAr : s.descEn}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => jumpToQuoteForm(s.id)}
                          className="text-start text-xs font-semibold text-[var(--brand-accent)] hover:underline cursor-pointer"
                        >
                          {lang === 'ar' ? 'اطلب تسعيرة →' : 'Request Quote →'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Madinah Districts Hub on the side */}
                <div
                  id="areas"
                  className="lg:col-span-5 rounded-xl bg-[var(--brand-card)] border border-[var(--brand-border)] p-6 space-y-5"
                >
                  <div>
                    <p className="text-xs font-semibold text-[var(--brand-accent)] mb-1">
                      {lang === 'ar' ? 'نغطي كافة الأحياء' : 'Madinah Districts'}
                    </p>
                    <h2 className="font-display text-xl font-bold text-[var(--brand-ink)]">
                      {lang === 'ar'
                        ? AREAS_SEO_COPY.headingAr
                        : AREAS_SEO_COPY.headingEn}
                    </h2>
                  </div>

                  {renderDistrictGrid('grid-cols-2')}

                  <div className="rounded-lg bg-[var(--brand-surface-muted)] p-4 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold text-[var(--brand-ink)]">
                        {lang === 'ar' ? activeDistrict.nameAr : activeDistrict.nameEn}
                      </p>
                      <p className="text-[11px] text-[var(--brand-ink-muted)] tabular-nums">
                        {lang === 'ar' ? activeDistrict.etaAr : activeDistrict.etaEn}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => jumpToQuoteForm(undefined, activeDistrict.id)}
                      className="rounded-lg bg-[var(--brand-accent)] px-3.5 py-2 text-xs font-semibold text-[var(--brand-accent-text)] cursor-pointer whitespace-nowrap"
                    >
                      {lang === 'ar' ? 'احجز الآن' : 'Book Pickup'}
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Process + Why Us Bento */}
            <section
              id="how-it-works"
              className="py-14 sm:py-16 border-b border-[var(--brand-border)]"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div>
                  <h2 className="font-display text-2xl font-bold text-[var(--brand-ink)] mb-5">
                    {lang === 'ar' ? 'خطوات البيع' : 'How It Works'}
                  </h2>
                  <div className="space-y-3">
                    {PROCESS_STEPS.map((step) => (
                      <div
                        key={step.index}
                        className="rounded-xl bg-[var(--brand-card)] border border-[var(--brand-border)] p-4 flex items-start gap-4"
                      >
                        <span className="font-display text-lg font-bold text-[var(--brand-accent)] tabular-nums shrink-0">
                          {step.index}
                        </span>
                        <div>
                          <h3 className="font-display text-base font-bold text-[var(--brand-ink)]">
                            {lang === 'ar' ? step.titleAr : step.titleEn}
                          </h3>
                          <p className="text-xs text-[var(--brand-ink-muted)] mt-1 leading-relaxed">
                            {lang === 'ar' ? step.descAr : step.descEn}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div id="why-us">
                  <h2 className="font-display text-2xl font-bold text-[var(--brand-ink)] mb-5">
                    {lang === 'ar' ? 'مميزاتنا الحقيقية' : 'Why Choose Us'}
                  </h2>
                  <div className="space-y-3">
                    {WHY_CHOOSE_US.map((adv) => (
                      <div
                        key={adv.index}
                        className="rounded-xl bg-[var(--brand-card)] border border-[var(--brand-border)] p-4"
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h3 className="font-display text-base font-bold text-[var(--brand-ink)]">
                            {lang === 'ar' ? adv.titleAr : adv.titleEn}
                          </h3>
                          <span className="text-[11px] font-semibold text-[var(--brand-accent)] shrink-0">
                            {lang === 'ar' ? adv.metricAr : adv.metricEn}
                          </span>
                        </div>
                        <p className="text-xs text-[var(--brand-ink-muted)] leading-relaxed">
                          {lang === 'ar' ? adv.descAr : adv.descEn}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Gallery + Reviews + FAQ */}
            <section
              id="recent-purchases"
              className="py-14 sm:py-16 bg-[var(--brand-section-alt)] border-b border-[var(--brand-border)]"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {RECENT_PURCHASES.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setInspectedPurchase(p)}
                      className="text-start rounded-xl bg-[var(--brand-card)] border border-[var(--brand-border)] overflow-hidden cursor-pointer hover:border-[var(--brand-accent)]"
                    >
                      <div className="aspect-[4/3] w-full bg-[var(--brand-surface-subtle)]">
                        <ResilientImage
                          src={p.image}
                          alt={lang === 'ar' ? p.titleAr : p.titleEn}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-xs font-semibold text-[var(--brand-accent)] mb-1">
                          {lang === 'ar' ? p.neighborhoodAr : p.neighborhoodEn}
                        </p>
                        <p className="font-display text-sm font-bold text-[var(--brand-ink)]">
                          {lang === 'ar' ? p.titleAr : p.titleEn}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>

                <div id="reviews">{renderReviewsGrid()}</div>

                <div id="faq">{renderFaqAccordion()}</div>
              </div>
            </section>

            {renderFinalCtaSection()}
          </>
        )}
      </main>

      {/* Quiet Footer */}
      <footer className="bg-[var(--brand-footer-bg)] text-white/75 py-10 border-t border-white/10">
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
              className="font-semibold text-white hover:text-[var(--brand-accent-on-dark)] tabular-nums"
            >
              {BUSINESS_CONTACT.phoneIntlDisplay}
            </a>
          </div>
        </div>
      </footer>

      {/* Sticky Bottom Conversion Bar on Mobile (<= 56px) */}
      <div className="md:hidden fixed inset-x-0 bottom-0 z-40 min-h-14 pb-[env(safe-area-inset-bottom)] bg-[var(--brand-card)] border-t border-[var(--brand-border-strong)] px-3 py-1.5 flex items-center gap-2 shadow-lg">
        <a
          href={BUSINESS_CONTACT.phoneHref}
          className="min-w-0 flex-1 h-11 inline-flex items-center justify-center gap-1.5 rounded-lg bg-[var(--brand-secondary-bg)] text-[var(--brand-secondary-text)] text-xs font-bold tabular-nums"
        >
          <Phone className="w-4 h-4 shrink-0" />
          <span>{lang === 'ar' ? 'اتصل الآن' : 'Call Now'}</span>
        </a>
        <a
          href={whatsappDirectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="min-w-0 flex-1 h-11 inline-flex items-center justify-center gap-1.5 rounded-lg bg-[var(--brand-accent)] text-[var(--brand-accent-text)] text-xs font-bold"
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
          className="inline-flex items-center gap-2 rounded-lg bg-[var(--brand-accent)] px-4 py-2.5 text-xs font-semibold text-[var(--brand-accent-text)] shadow-lg hover:bg-[var(--brand-accent-hover)] transition-colors"
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
          <div className="w-full max-w-lg max-h-[90dvh] overflow-y-auto rounded-xl bg-[var(--brand-card)] border border-[var(--brand-border)] shadow-2xl">
            <div className="aspect-[4/3] w-full bg-[var(--brand-surface-subtle)] relative">
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
                className="absolute top-3 end-3 w-9 h-9 rounded-lg bg-[var(--brand-card)]/95 text-[var(--brand-ink)] flex items-center justify-center border border-[var(--brand-border)] hover:opacity-90 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 text-xs text-[var(--brand-accent)] font-semibold mb-2">
                <span>
                  {lang === 'ar'
                    ? inspectedPurchase.neighborhoodAr
                    : inspectedPurchase.neighborhoodEn}
                </span>
                <span aria-hidden="true">·</span>
                <span className="text-[var(--brand-ink-subtle)]">
                  {lang === 'ar'
                    ? inspectedPurchase.timeframeAr
                    : inspectedPurchase.timeframeEn}
                </span>
              </div>
              <h3 className="font-display text-lg font-bold text-[var(--brand-ink)] mb-2">
                {lang === 'ar'
                  ? inspectedPurchase.titleAr
                  : inspectedPurchase.titleEn}
              </h3>
              <p className="text-sm text-[var(--brand-ink-muted)] leading-relaxed mb-4">
                {lang === 'ar'
                  ? inspectedPurchase.captionAr
                  : inspectedPurchase.captionEn}
              </p>
              <div className="flex items-center justify-between gap-3 pt-4 border-t border-[var(--brand-border)]">
                <span className="text-xs text-[var(--brand-ink-subtle)]">
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
                  className="rounded-lg bg-[var(--brand-accent)] px-4 py-2 text-xs font-semibold text-[var(--brand-accent-text)] hover:bg-[var(--brand-accent-hover)] transition-colors cursor-pointer whitespace-nowrap"
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
