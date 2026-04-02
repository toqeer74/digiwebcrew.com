export const locales = ['en', 'ur', 'ar'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale = 'en';

