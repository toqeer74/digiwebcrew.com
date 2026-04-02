import type { Locale } from "@/types/i18n";

const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  ur: () => import("@/dictionaries/ur.json").then((module) => module.default),
  ar: () => import("@/dictionaries/ar.json").then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
  return dictionaries[locale as keyof typeof dictionaries] 
    ? dictionaries[locale as keyof typeof dictionaries]() 
    : dictionaries.en();
};

