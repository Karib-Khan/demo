import { Phone } from 'lucide-react';
import { BUSINESS_CONTACT, Language, LOGO_IMAGE } from '../data/homepageData';

interface HeaderProps {
  lang: Language;
}

export function Header({ lang }: HeaderProps) {
  const navItems =
    lang === 'ar'
      ? [
          { href: '#services', label: 'ما نشتريه' },
          { href: '#how-it-works', label: 'خطوات البيع' },
          { href: '#areas', label: 'أحياء المدينة' },
          { href: '#reviews', label: 'آراء العملاء' },
          { href: '#faq', label: 'الأسئلة الشائعة' },
        ]
      : [
          { href: '#services', label: 'What We Buy' },
          { href: '#how-it-works', label: 'How It Works' },
          { href: '#areas', label: 'Areas Served' },
          { href: '#reviews', label: 'Reviews' },
          { href: '#faq', label: 'FAQ' },
        ];

  return (
    <header className="md:sticky md:top-0 z-30 bg-[#FAF8F5]/95 backdrop-blur-sm border-b border-[#E5E2DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Clean Logo Emblem + Single-line Wordmark */}
        <a
          href="#hero"
          className="inline-flex items-center gap-2.5 font-display text-lg sm:text-xl font-bold tracking-tight text-[#11181C] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E6B4E]"
        >
          <img
            src={LOGO_IMAGE}
            alt={lang === 'ar' ? BUSINESS_CONTACT.brandAr : BUSINESS_CONTACT.brandEn}
            className="w-10 h-10 rounded-full object-cover border border-[#E5E2DC] bg-white shrink-0"
          />
          <span>
            {lang === 'ar' ? BUSINESS_CONTACT.brandAr : BUSINESS_CONTACT.brandEn}
          </span>
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav
          aria-label={lang === 'ar' ? 'التنقل الرئيسي' : 'Primary navigation'}
          className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#4B555B]"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-[#0E6B4E] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 py-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E6B4E]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          <a
            href={BUSINESS_CONTACT.phoneHref}
            className="inline-flex items-center gap-2 rounded-lg bg-[#0E6B4E] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0A533C] transition-colors whitespace-nowrap shrink-0 tabular-nums focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E6B4E]"
          >
            <Phone className="w-4 h-4 shrink-0" />
            <span dir="ltr">{BUSINESS_CONTACT.phoneDisplay}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
