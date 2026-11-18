import { Columns2, LayoutGrid, PanelTop, Sparkles } from 'lucide-react';
import { Language } from '../data/homepageData';

export type LayoutVariantId = 'split' | 'banner' | 'form-hero' | 'bento';

export interface LayoutVariantOption {
  id: LayoutVariantId;
  nameAr: string;
  nameEn: string;
  descAr: string;
  descEn: string;
}

export const LAYOUT_VARIANTS: LayoutVariantOption[] = [
  {
    id: 'split',
    nameAr: '1. الواجهة المقسومة',
    nameEn: '1. Split Hero',
    descAr: 'هيرو مقسوم + بطاقات 3 أعمدة',
    descEn: '50/50 split hero + 3-col grid',
  },
  {
    id: 'banner',
    nameAr: '2. بانر عريض',
    nameEn: '2. Full Banner',
    descAr: 'سلايدر عريض كامل + بطاقات أفقية',
    descEn: 'Full-width hero banner + horizontal cards',
  },
  {
    id: 'form-hero',
    nameAr: '3. نموذج فوري',
    nameEn: '3. Form Hero',
    descAr: 'نموذج التسعيرة مباشرة في الواجهة',
    descEn: 'Quote form above the fold + mosaic',
  },
  {
    id: 'bento',
    nameAr: '4. تخطيط بنتو',
    nameEn: '4. Bento Hub',
    descAr: 'هيرو وسطي + دمج الخدمات والأحياء',
    descEn: 'Centered hero + side-by-side hub',
  },
];

interface LayoutSwitcherProps {
  lang: Language;
  activeLayout: LayoutVariantId;
  onSelect: (id: LayoutVariantId) => void;
}

export function LayoutSwitcher({
  lang,
  activeLayout,
  onSelect,
}: LayoutSwitcherProps) {
  const iconFor = (id: LayoutVariantId) => {
    switch (id) {
      case 'split':
        return <Columns2 className="w-3.5 h-3.5 shrink-0" />;
      case 'banner':
        return <PanelTop className="w-3.5 h-3.5 shrink-0" />;
      case 'form-hero':
        return <Sparkles className="w-3.5 h-3.5 shrink-0" />;
      case 'bento':
        return <LayoutGrid className="w-3.5 h-3.5 shrink-0" />;
    }
  };

  return (
    <div
      role="group"
      aria-label={lang === 'ar' ? 'تخطيطات الموقع' : 'Website layout variants'}
      className="inline-flex flex-wrap items-center gap-1 p-1 rounded-lg bg-[var(--brand-surface-subtle)] border border-[var(--brand-border)]"
    >
      {LAYOUT_VARIANTS.map((variant) => {
        const isActive = variant.id === activeLayout;
        return (
          <button
            key={variant.id}
            type="button"
            onClick={() => onSelect(variant.id)}
            title={lang === 'ar' ? variant.descAr : variant.descEn}
            aria-pressed={isActive}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
              isActive
                ? 'bg-[var(--brand-accent)] text-[var(--brand-accent-text)] shadow-sm'
                : 'text-[var(--brand-ink-muted)] hover:text-[var(--brand-ink)]'
            }`}
          >
            {iconFor(variant.id)}
            <span>{lang === 'ar' ? variant.nameAr : variant.nameEn}</span>
          </button>
        );
      })}
    </div>
  );
}
