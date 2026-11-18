import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { BUSINESS_CONTACT, LOGO_IMAGE } from '../data/homepageData';

interface IntroSplashProps {
  onComplete?: () => void;
}

export function IntroSplash({ onComplete }: IntroSplashProps) {
  const [dismissed, setDismissed] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoWrapRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setLogoLoaded(true);
      return;
    }
    const fallbackTimer = window.setTimeout(() => {
      setLogoLoaded(true);
    }, 600);
    return () => window.clearTimeout(fallbackTimer);
  }, []);

  useEffect(() => {
    if (!logoLoaded || hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      const t = window.setTimeout(() => {
        setDismissed(true);
        onComplete?.();
      }, 600);
      return () => window.clearTimeout(t);
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setDismissed(true);
          onComplete?.();
        },
      });

      tl.fromTo(
        logoWrapRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.25, ease: 'power2.out' }
      )
        .fromTo(
          barRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.6, ease: 'power1.inOut' },
          '<0.05'
        )
        .to(overlayRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.inOut',
        });
    }, overlayRef);

    return () => ctx.revert();
  }, [logoLoaded, onComplete]);

  if (dismissed) return null;

  return (
    <div
      ref={overlayRef}
      role="status"
      aria-label="Loading Madinah Furniture Buyer"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--brand-canvas)]"
    >
      <div
        ref={logoWrapRef}
        className="flex flex-col items-center gap-4 px-6 text-center"
      >
        <img
          ref={imgRef}
          src={LOGO_IMAGE}
          alt={BUSINESS_CONTACT.brandEn}
          onLoad={() => setLogoLoaded(true)}
          onError={() => setLogoLoaded(true)}
          className="w-44 h-44 sm:w-52 sm:h-52 rounded-full object-cover shadow-lg border border-[var(--brand-border)] bg-white"
        />

        <div className="w-48 h-1.5 rounded-full bg-[var(--brand-border)] overflow-hidden">
          <div
            ref={barRef}
            className="h-full w-full origin-left bg-[var(--brand-accent)] rounded-full"
          />
        </div>

        <p className="font-display text-sm sm:text-base font-bold text-[var(--brand-ink)] tracking-tight">
          {BUSINESS_CONTACT.brandAr} · {BUSINESS_CONTACT.brandEn}
        </p>
      </div>
    </div>
  );
}
