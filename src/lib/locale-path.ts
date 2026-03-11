import { defaultLocale, type Locale } from "@/types/i18n";

function normalizePath(path: string) {
  if (!path) return "/";
  return path.startsWith("/") ? path : `/${path}`;
}

export function localePrefix(locale: Locale | string) {
  return locale === defaultLocale ? "" : `/${locale}`;
}

export function localePath(locale: Locale | string, path: string = "/") {
  const normalized = normalizePath(path);
  const prefix = localePrefix(locale);

  if (normalized === "/") return prefix || "/";
  return `${prefix}${normalized}`;
}

