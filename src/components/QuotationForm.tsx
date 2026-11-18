import { FormEvent, useEffect, useState } from 'react';
import { AlertCircle, CheckCircle2, MessageCircle, Send } from 'lucide-react';
import {
  BUSINESS_CONTACT,
  Language,
  MADINAH_DISTRICTS,
  SERVICES_LIST,
} from '../data/homepageData';

interface QuotationFormProps {
  lang: Language;
  preselectedDistrict: string;
  preselectedCategory: string;
}

export function QuotationForm({
  lang,
  preselectedDistrict,
  preselectedCategory,
}: QuotationFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState(preselectedDistrict || 'aziziyah');
  const [category, setCategory] = useState(preselectedCategory || 'used-furniture');
  const [details, setDetails] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedDistrict) setDistrict(preselectedDistrict);
  }, [preselectedDistrict]);

  useEffect(() => {
    if (preselectedCategory) setCategory(preselectedCategory);
  }, [preselectedCategory]);

  const validateSaudiPhone = (raw: string) => {
    const cleaned = raw.replace(/[\s-]/g, '');
    return /^(05\d{8}|5\d{8}|\+9665\d{8}|009665\d{8})$/.test(cleaned);
  };

  const selectedDistrictObj = MADINAH_DISTRICTS.find((d) => d.id === district);
  const selectedCategoryObj = SERVICES_LIST.find((s) => s.id === category);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || name.trim().length < 2) {
      setErrorMsg(
        lang === 'ar'
          ? 'يرجى كتابة الاسم للتواصل معك.'
          : 'Please enter your name so our appraiser can address you.'
      );
      return;
    }

    if (!validateSaudiPhone(phone)) {
      setErrorMsg(
        lang === 'ar'
          ? 'يرجى إدخال رقم جوال سعودي صحيح يبدأ بـ 05 (مثال: 0509653244).'
          : 'Please enter a valid Saudi mobile number starting with 05 (e.g., 0509653244).'
      );
      return;
    }

    setSubmitted(true);
  };

  const whatsappSummaryUrl = (() => {
    const districtName = selectedDistrictObj
      ? lang === 'ar'
        ? selectedDistrictObj.nameAr
        : selectedDistrictObj.nameEn
      : '';
    const categoryName = selectedCategoryObj
      ? lang === 'ar'
        ? selectedCategoryObj.titleAr
        : selectedCategoryObj.titleEn
      : '';

    const message =
      lang === 'ar'
        ? `السلام عليكم، أرغب في تسعيرة لبيع أثاث مستعمل:\nالاسم: ${name}\nالجوال: ${phone}\nالحي: ${districtName}\nالفئة: ${categoryName}${details ? `\nالتفاصيل: ${details}` : ''}`
        : `Hello, I would like a quotation to sell used furniture in Madinah:\nName: ${name}\nMobile: ${phone}\nDistrict: ${districtName}\nCategory: ${categoryName}${details ? `\nDetails: ${details}` : ''}`;

    return `${BUSINESS_CONTACT.whatsappBase}?text=${encodeURIComponent(message)}`;
  })();

  if (submitted) {
    return (
      <div className="rounded-xl bg-[var(--brand-card)] p-6 sm:p-8 border border-[var(--brand-border)] text-[var(--brand-ink)]">
        <div className="flex items-start gap-3 mb-4">
          <CheckCircle2 className="w-6 h-6 text-[var(--brand-accent)] shrink-0 mt-0.5" />
          <div>
            <h3 className="font-display text-xl font-bold text-[var(--brand-ink)]">
              {lang === 'ar'
                ? 'تم استلام طلب التسعيرة بنجاح'
                : 'Quotation Request Received'}
            </h3>
            <p className="text-sm text-[var(--brand-ink-muted)] mt-1 leading-relaxed">
              {lang === 'ar'
                ? `شكراً لك يا ${name}. سيتواصل معك المقيّم المختص على الرقم ${phone} خلال 15 دقيقة.`
                : `Thank you, ${name}. Our local appraiser will reach out to ${phone} within 15 minutes.`}
            </p>
          </div>
        </div>

        <div className="rounded-lg bg-[var(--brand-surface-subtle)] border border-[var(--brand-border)] p-4 text-xs text-[var(--brand-ink-muted)] space-y-1.5 mb-5">
          <p>
            <strong className="text-[var(--brand-ink)]">
              {lang === 'ar' ? 'الحي:' : 'District:'}
            </strong>{' '}
            {lang === 'ar'
              ? selectedDistrictObj?.nameAr
              : selectedDistrictObj?.nameEn}
          </p>
          <p>
            <strong className="text-[var(--brand-ink)]">
              {lang === 'ar' ? 'الفئة:' : 'Category:'}
            </strong>{' '}
            {lang === 'ar'
              ? selectedCategoryObj?.titleAr
              : selectedCategoryObj?.titleEn}
          </p>
          {details && (
            <p>
              <strong className="text-[var(--brand-ink)]">
                {lang === 'ar' ? 'التفاصيل:' : 'Details:'}
              </strong>{' '}
              {details}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={whatsappSummaryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--brand-accent)] px-4 py-3 text-sm font-semibold text-[var(--brand-accent-text)] hover:bg-[var(--brand-accent-hover)] transition-colors whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            <span>
              {lang === 'ar'
                ? 'إرسال الصور الآن عبر واتساب لتسريع التسعير'
                : 'Send Photos via WhatsApp Now'}
            </span>
          </a>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setDetails('');
            }}
            className="inline-flex items-center justify-center rounded-lg border border-[var(--brand-border-strong)] px-4 py-3 text-sm font-medium text-[var(--brand-ink)] hover:bg-[var(--brand-surface-subtle)] transition-colors whitespace-nowrap"
          >
            {lang === 'ar' ? 'طلب جديد' : 'Submit Another'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-xl bg-[var(--brand-card)] p-6 sm:p-8 border border-[var(--brand-border)] text-[var(--brand-ink)]"
    >
      <div className="mb-5">
        <h3 className="font-display text-xl font-bold text-[var(--brand-ink)]">
          {lang === 'ar'
            ? 'اطلب تسعيرة فورية لأثاثك'
            : 'Request a Fair Quotation'}
        </h3>
        <p className="text-sm text-[var(--brand-ink-muted)] mt-1">
          {lang === 'ar'
            ? 'اترك بياناتك وسيتواصل معك مسؤول الشراء في المدينة المنورة خلال دقائق.'
            : 'Share your items and Madinah neighborhood for an instant callback quote.'}
        </p>
      </div>

      {errorMsg && (
        <div
          role="alert"
          className="mb-4 flex items-start gap-2.5 rounded-lg border border-red-400/50 bg-red-500/10 px-3.5 py-2.5 text-xs font-medium text-red-500"
        >
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label
            htmlFor="quote-name"
            className="block text-xs font-semibold text-[var(--brand-ink)] mb-1.5"
          >
            {lang === 'ar' ? 'الاسم الكامل' : 'Your Name'}
          </label>
          <input
            id="quote-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={lang === 'ar' ? 'مثال: خالد الحربي' : 'e.g. Khalid Al-Harbi'}
            className="w-full h-11 rounded-lg border border-[var(--brand-border-strong)] bg-[var(--brand-surface-subtle)] px-3.5 text-sm text-[var(--brand-ink)] placeholder:text-[var(--brand-ink-subtle)] focus:border-[var(--brand-accent)] focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="quote-phone"
            className="block text-xs font-semibold text-[var(--brand-ink)] mb-1.5"
          >
            {lang === 'ar' ? 'رقم الجوال (واتساب / اتصال)' : 'Saudi Mobile Number'}
          </label>
          <input
            id="quote-phone"
            type="tel"
            dir="ltr"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="05XXXXXXXX"
            className="w-full h-11 rounded-lg border border-[var(--brand-border-strong)] bg-[var(--brand-surface-subtle)] px-3.5 text-sm text-[var(--brand-ink)] placeholder:text-[var(--brand-ink-subtle)] tabular-nums focus:border-[var(--brand-accent)] focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label
            htmlFor="quote-district"
            className="block text-xs font-semibold text-[var(--brand-ink)] mb-1.5"
          >
            {lang === 'ar' ? 'الحي في المدينة المنورة' : 'Madinah Neighborhood'}
          </label>
          <select
            id="quote-district"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="w-full h-11 rounded-lg border border-[var(--brand-border-strong)] bg-[var(--brand-surface-subtle)] px-3 text-sm text-[var(--brand-ink)] focus:border-[var(--brand-accent)] focus:outline-none"
          >
            {MADINAH_DISTRICTS.map((d) => (
              <option key={d.id} value={d.id}>
                {lang === 'ar' ? d.nameAr : d.nameEn}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="quote-category"
            className="block text-xs font-semibold text-[var(--brand-ink)] mb-1.5"
          >
            {lang === 'ar' ? 'نوع الأثاث أو الأجهزة' : 'Item Category'}
          </label>
          <select
            id="quote-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full h-11 rounded-lg border border-[var(--brand-border-strong)] bg-[var(--brand-surface-subtle)] px-3 text-sm text-[var(--brand-ink)] focus:border-[var(--brand-accent)] focus:outline-none"
          >
            {SERVICES_LIST.map((s) => (
              <option key={s.id} value={s.id}>
                {lang === 'ar' ? s.titleAr : s.titleEn}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-5">
        <label
          htmlFor="quote-details"
          className="block text-xs font-semibold text-[var(--brand-ink)] mb-1.5"
        >
          {lang === 'ar'
            ? 'وصف سريع للقطع وعددها (اختياري)'
            : 'Brief Item Description & Quantity (Optional)'}
        </label>
        <textarea
          id="quote-details"
          rows={3}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder={
            lang === 'ar'
              ? 'مثال: غرفة نوم نظيفة + مكيفين سبليت جري 24 وحدة + كنب زاوية'
              : 'e.g. Clean king bedroom set + two 24k BTU Gree split ACs + L-shaped sofa'
          }
          className="w-full rounded-lg border border-[var(--brand-border-strong)] bg-[var(--brand-surface-subtle)] p-3.5 text-sm text-[var(--brand-ink)] placeholder:text-[var(--brand-ink-subtle)] focus:border-[var(--brand-accent)] focus:outline-none resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full h-12 inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--brand-accent)] px-6 text-sm font-semibold text-[var(--brand-accent-text)] hover:bg-[var(--brand-accent-hover)] transition-colors cursor-pointer"
      >
        <Send className="w-4 h-4 shrink-0" />
        <span>
          {lang === 'ar'
            ? 'اطلب التسعيرة المجانية الآن'
            : 'Request Free Valuation Now'}
        </span>
      </button>

      <p className="text-[11px] text-[var(--brand-ink-subtle)] mt-3 text-center">
        {lang === 'ar'
          ? 'معاينة وتسعير مجاني بدون أي التزام · خصوصية تامة لبياناتك'
          : '100% free no-obligation quote · Your contact details stay private'}
      </p>
    </form>
  );
}
