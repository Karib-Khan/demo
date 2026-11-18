import { useState } from 'react';
import { Check, Copy, Palette } from 'lucide-react';
import { Language } from '../data/homepageData';
import { COLOR_PALETTES, ColorPalette } from '../data/palettes';

interface PaletteSwitcherProps {
  lang: Language;
  activePalette: ColorPalette;
  onSelect: (palette: ColorPalette) => void;
}

export function PaletteSwitcher({
  lang,
  activePalette,
  onSelect,
}: PaletteSwitcherProps) {
  const [open, setOpen] = useState(false);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleCopyHex = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopiedHex(hex);
      window.setTimeout(() => setCopiedHex(null), 1400);
    } catch {
      // Ignore clipboard failure
    }
  };

  return (
    <div className="relative flex min-w-0 flex-1 items-center gap-2">
      {/* 6 Full-Site Mockup Buttons */}
      <div
        role="group"
        aria-label={lang === 'ar' ? 'نماذج الألوان' : 'Website color mockups'}
        className="flex min-w-0 flex-1 overflow-x-auto items-center gap-1 p-1 rounded-lg bg-[var(--brand-surface-subtle)] border border-[var(--brand-border)]"
      >
        {COLOR_PALETTES.map((palette) => {
          const isSelected = palette.id === activePalette.id;
          return (
            <button
              key={palette.id}
              type="button"
              onClick={() => onSelect(palette)}
              title={lang === 'ar' ? palette.nameAr : palette.nameEn}
              aria-pressed={isSelected}
              className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all whitespace-nowrap cursor-pointer ${
                isSelected
                  ? 'bg-[var(--brand-card)] text-[var(--brand-ink)] shadow-sm ring-1 ring-[var(--brand-border-strong)]'
                  : 'text-[var(--brand-ink-muted)] hover:text-[var(--brand-ink)]'
              }`}
            >
              {/* Dual mini swatch showing bold hero band + primary accent */}
              <span
                className="w-4 h-4 rounded-full border border-black/20 flex items-center justify-center overflow-hidden shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${palette.vars.heroBg} 50%, ${palette.vars.accent} 50%)`,
                }}
              />
              <span>{lang === 'ar' ? palette.shortAr : palette.shortEn}</span>
            </button>
          );
        })}
      </div>

      {/* Reference Hex Inspector Toggle */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--brand-border-strong)] bg-[var(--brand-card)] px-2.5 py-1.5 text-xs font-medium text-[var(--brand-ink)] hover:border-[var(--brand-accent)] transition-colors whitespace-nowrap cursor-pointer"
      >
        <Palette className="w-3.5 h-3.5 text-[var(--brand-accent)] shrink-0" />
        <span className="hidden sm:inline">
          {lang === 'ar' ? 'تفاصيل الألوان' : 'Palette Codes'}
        </span>
      </button>

      {/* Dropdown Reference Card */}
      {open && (
        <>
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-30"
            aria-hidden="true"
          />
          <div className="absolute top-full mt-2 end-0 z-40 w-[min(420px,calc(100vw-2rem))] max-h-[75vh] overflow-y-auto rounded-xl border border-[var(--brand-border-strong)] bg-[var(--brand-card)] p-4 shadow-2xl text-[var(--brand-ink)]">
            <div className="flex items-center justify-between gap-2 pb-2.5 mb-3 border-b border-[var(--brand-border)]">
              <p className="font-display text-sm font-bold">
                {lang === 'ar'
                  ? '6 نماذج ألوان كاملة للموقع (اضغط للمعاينة)'
                  : '6 Full-Site Color Mockups (Click to Preview)'}
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-xs text-[var(--brand-ink-subtle)] hover:text-[var(--brand-ink)] cursor-pointer"
              >
                {lang === 'ar' ? 'إغلاق' : 'Close'}
              </button>
            </div>

            <div className="space-y-2.5">
              {COLOR_PALETTES.map((palette) => {
                const isSelected = palette.id === activePalette.id;
                const swatches = [
                  { label: lang === 'ar' ? 'الهيرو' : 'Hero', hex: palette.vars.heroBg },
                  { label: lang === 'ar' ? 'الخلفية' : 'Canvas', hex: palette.vars.canvas },
                  { label: lang === 'ar' ? 'الأساسي' : 'Accent', hex: palette.vars.accent },
                  { label: lang === 'ar' ? 'الثانوي' : 'Gold/2nd', hex: palette.vars.accent2 },
                ];

                return (
                  <div
                    key={palette.id}
                    className={`rounded-lg border p-3 transition-colors ${
                      isSelected
                        ? 'border-[var(--brand-accent)] bg-[var(--brand-surface-muted)]'
                        : 'border-[var(--brand-border)] bg-[var(--brand-surface-subtle)] hover:border-[var(--brand-border-strong)]'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => onSelect(palette)}
                      className="w-full text-start mb-2.5 cursor-pointer"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-bold text-[var(--brand-ink)] flex items-center gap-1.5">
                          <span className="tabular-nums text-[var(--brand-accent)]">
                            {palette.index}.
                          </span>
                          <span>{lang === 'ar' ? palette.nameAr : palette.nameEn}</span>
                        </p>
                        {isSelected && (
                          <Check className="w-3.5 h-3.5 text-[var(--brand-accent)] shrink-0" />
                        )}
                      </div>
                      <p className="text-[11px] text-[var(--brand-ink-muted)] mt-0.5">
                        {lang === 'ar' ? palette.noteAr : palette.noteEn}
                      </p>
                    </button>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-2 border-t border-[var(--brand-border)]">
                      {swatches.map((sw) => (
                        <button
                          key={sw.label}
                          type="button"
                          onClick={() => handleCopyHex(sw.hex)}
                          title={`Copy ${sw.hex}`}
                          className="inline-flex items-center justify-center gap-1 rounded border border-[var(--brand-border)] bg-[var(--brand-card)] px-1.5 py-1 text-[10px] font-medium text-[var(--brand-ink-muted)] hover:border-[var(--brand-accent)] cursor-pointer tabular-nums"
                        >
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-black/20 shrink-0"
                            style={{ backgroundColor: sw.hex }}
                          />
                          <span dir="ltr">
                            {copiedHex === sw.hex ? 'Copied' : sw.hex}
                          </span>
                          {copiedHex !== sw.hex && (
                            <Copy className="w-2.5 h-2.5 opacity-50 shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
