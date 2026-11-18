import { Menu, Phone, X } from 'lucide-react';
import { useState } from 'react';
import { BUSINESS_CONTACT, Language, LOGO_IMAGE } from '../data/homepageData';

interface HeaderProps {
  lang: Language;
}

export function Header({ lang }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
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
    <header className="sticky top-0 z-40 bg-[var(--brand-canvas)]/95 backdrop-blur-sm border-b border-[var(--brand-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-16 py-2 flex items-center justify-between gap-2 sm:gap-4 lg:gap-8">
        {/* Zone 1: Clean Logo Emblem + Single-line Wordmark */}
        <a
          href="#hero"
          className="inline-flex items-center gap-2 font-display text-sm sm:text-xl font-bold tracking-tight text-[var(--brand-ink)] min-w-0 flex-1 lg:flex-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-accent)]"
        >
          <img
            src={LOGO_IMAGE}
            alt={lang === 'ar' ? BUSINESS_CONTACT.brandAr : BUSINESS_CONTACT.brandEn}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border border-[var(--brand-border)] bg-white shrink-0"
          />
          <span className="min-w-0 leading-tight line-clamp-2 sm:line-clamp-none">
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
        <div className="flex items-center shrink-0 gap-2">
          <a
            href={BUSINESS_CONTACT.phoneHref}
            className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-[var(--brand-accent)] px-3 lg:px-4 py-2.5 text-sm font-semibold text-[var(--brand-accent-text)] hover:bg-[var(--brand-accent-hover)] transition-colors whitespace-nowrap shrink-0 tabular-nums focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-accent)]"
          >
            <Phone className="w-4 h-4 shrink-0" />
            <span dir="ltr">{BUSINESS_CONTACT.phoneDisplay}</span>
          </a>
          <a href={BUSINESS_CONTACT.phoneHref} aria-label={lang === 'ar' ? 'اتصل بنا' : 'Call us'} className="sm:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--brand-border)] text-[var(--brand-accent)]"><Phone className="h-5 w-5" /></a>
          <button type="button" aria-expanded={mobileOpen} aria-controls="mobile-primary-nav" aria-label={lang === 'ar' ? 'القائمة' : 'Open menu'} onClick={() => setMobileOpen(v => !v)} className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--brand-accent)] text-[var(--brand-accent-text)]">{mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
      </div>
      {mobileOpen && <nav id="mobile-primary-nav" aria-label={lang === 'ar' ? 'التنقل الرئيسي' : 'Primary navigation'} className="lg:hidden border-t border-[var(--brand-border)] bg-[var(--brand-card)] px-4 py-3 shadow-xl"><div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 gap-1">{navItems.map(item => <a key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-3 text-sm font-semibold text-[var(--brand-ink)] hover:bg-[var(--brand-surface-subtle)]">{item.label}</a>)}</div></nav>}
    </header>
  );
}
