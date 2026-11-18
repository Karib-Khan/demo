import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Language } from '../data/homepageData';
import { ResilientImage } from './ResilientImage';

export interface HeroSlide {
  image: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    image: '/src/assets/images/hero_madinah_interior_1794978914774.jpg',
    titleAr: 'شراء الأثاث المنزلي والمجالس بالمدينة المنورة',
    titleEn: 'Complete Living Room & Majlis Purchases',
    subtitleAr: 'خدمة يومية · 8:00 ص – 11:30 م · دفع كاش فوري',
    subtitleEn: 'Daily Service · 8:00 AM – 11:30 PM · Instant Cash',
  },
  {
    image: '/src/assets/images/gallery_bedroom_collection_1794978916873.jpg',
    titleAr: 'شراء غرف النوم الكاملة والدواليب والمطابخ',
    titleEn: 'Master Bedrooms, Wardrobes & Kitchens',
    subtitleAr: 'فك احترافي على يد نجار مختص مجاناً 100%',
    subtitleEn: '100% Free Dismantling by Skilled Carpenters',
  },
  {
    image: '/src/assets/images/service_ac_appliances_1794978918562.jpg',
    titleAr: 'شراء المكيفات السبليت والشباك والثلاجات والغسالات',
    titleEn: 'Split & Window ACs, Fridges & Washers',
    subtitleAr: 'فحص فوري وفك آمن بدون إتلاف الجدران',
    subtitleEn: 'On-Site Testing & Clean Wall-Safe Removal',
  },
  {
    image: '/src/assets/images/gallery_sofa_majlis_1794978918186.jpg',
    titleAr: 'شراء الكنب الحديث والمجالس العربية وطاولات الضيافة',
    titleEn: 'Modern Sectional Sofas & Guest Majlis Sets',
    subtitleAr: 'نغطي العزيزية، قباء، العوالي، سلطانة وكافة الأحياء',
    subtitleEn: 'Serving Al Aziziyah, Quba, Al Awali, Sultana & All Districts',
  },
  {
    image: '/src/assets/images/gallery_office_furniture_1794978918631.jpg',
    titleAr: 'شراء الأثاث المكتبي وتجهيزات الشركات والمكاتب',
    titleEn: 'Executive Office Furniture & Commercial Lots',
    subtitleAr: 'نقل فوري بسيارات مغلقة وتسوية نقدية أو تحويل',
    subtitleEn: 'Enclosed Truck Hauling & Immediate Settlement',
  },
];

const AUTO_SLIDE_MS = 3500;

interface HeroSliderProps {
  lang: Language;
}

export function HeroSlider({ lang }: HeroSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);

  // Always auto-slide continuously; resets cleanly when user clicks a slide/arrow
  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, AUTO_SLIDE_MS);

    return () => window.clearInterval(timer);
  }, [activeIndex]);

  // Lightweight GSAP progress bar & caption reveal on each slide transition
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (progressRef.current) {
        gsap.fromTo(
          progressRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: AUTO_SLIDE_MS / 1000,
            ease: 'none',
          }
        );
      }
      if (captionRef.current) {
        gsap.fromTo(
          captionRef.current,
          { y: 8, opacity: 0.6 },
          { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' }
        );
      }
    });

    return () => ctx.revert();
  }, [activeIndex]);

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const current = HERO_SLIDES[activeIndex];

  return (
    <div className="relative h-full min-h-[300px] sm:min-h-[380px] rounded-xl overflow-hidden border border-[#E5E2DC] bg-[#EFECE6]">
      {/* Slides Stack */}
      {HERO_SLIDES.map((slide, idx) => (
        <div
          key={slide.image}
          aria-hidden={idx !== activeIndex}
          className={`absolute inset-0 transition-all duration-700 ease-out ${
            idx === activeIndex
              ? 'opacity-100 scale-100 z-10'
              : 'opacity-0 scale-[1.03] z-0 pointer-events-none'
          }`}
        >
          <ResilientImage
            src={slide.image}
            alt={lang === 'ar' ? slide.titleAr : slide.titleEn}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Top Slide Controls */}
      <div className="absolute top-3.5 inset-x-3.5 z-20 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 bg-black/45 backdrop-blur-sm rounded-lg px-2.5 py-1.5">
          {HERO_SLIDES.map((slide, idx) => (
            <button
              key={slide.image}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                idx === activeIndex
                  ? 'w-6 bg-white'
                  : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={lang === 'ar' ? goNext : goPrev}
            aria-label={lang === 'ar' ? 'الشريحة السابقة' : 'Previous slide'}
            className="w-9 h-9 rounded-lg bg-black/45 backdrop-blur-sm text-white hover:bg-black/65 transition-colors flex items-center justify-center cursor-pointer"
          >
            {lang === 'ar' ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
          <button
            type="button"
            onClick={lang === 'ar' ? goPrev : goNext}
            aria-label={lang === 'ar' ? 'الشريحة التالية' : 'Next slide'}
            className="w-9 h-9 rounded-lg bg-black/45 backdrop-blur-sm text-white hover:bg-black/65 transition-colors flex items-center justify-center cursor-pointer"
          >
            {lang === 'ar' ? (
              <ChevronLeft className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Measured Contrast Scrim Caption + Auto-slide Progress Line */}
      <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-5 text-white">
        <div ref={captionRef}>
          <p className="text-xs text-white/85 mb-1 tabular-nums">
            {lang === 'ar' ? current.subtitleAr : current.subtitleEn}
          </p>
          <p className="font-display text-sm sm:text-base font-bold">
            {lang === 'ar' ? current.titleAr : current.titleEn}
          </p>
        </div>
        <div className="mt-3 h-0.5 w-full bg-white/25 overflow-hidden rounded-full">
          <div
            ref={progressRef}
            className="h-full w-full origin-left bg-white/90 rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
