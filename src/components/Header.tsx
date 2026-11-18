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
    <header className="md:sticky md:top-0 z-30 bg-[var(--brand-canvas)]/95 backdrop-blur-sm border-b border-[var(--brand-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Clean Logo Emblem + Single-line Wordmark */}
        <a
          href="#hero"
          className="inline-flex items-center gap-2.5 font-display text-lg sm:text-xl font-bold tracking-tight text-[var(--brand-ink)] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-accent)]"
        >
          <img
            src={LOGO_IMAGE}
            alt={lang === 'ar' ? BUSINESS_CONTACT.brandAr : BUSINESS_CONTACT.brandEn}
            className="w-10 h-10 rounded-full object-cover border border-[var(--brand-border)] bg-white shrink-0"
          />
          <span>
            {lang === 'ar' ? BUSINESS_CONTACT.brandAr : BUSINESS_CONTACT.brandEn}
          </span>
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav
          aria-label={lang === 'ar' ? 'التنقل الرئيسي' : 'Primary navigation'}
          className="hidden lg:flex items-center gap-7 text-sm font-medium text-[var(--brand-ink-muted)]"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-[var(--brand-accent)] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 py-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-accent)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          <a
            href={BUSINESS_CONTACT.phoneHref}
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--brand-accent)] px-4 py-2.5 text-sm font-semibold text-[var(--brand-accent-text)] hover:bg-[var(--brand-accent-hover)] transition-colors whitespace-nowrap shrink-0 tabular-nums focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-accent)]"
          >
            <Phone className="w-4 h-4 shrink-0" />
            <span dir="ltr">{BUSINESS_CONTACT.phoneDisplay}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
