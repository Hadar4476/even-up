import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

import enTranslations from "./en.json";
import heTranslations from "./he.json";

export const defaultNS = "translation";

export const resources = {
  en: { translation: enTranslations },
  he: { translation: heTranslations },
} as const;

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

export type TranslationKeys = NestedKeyOf<typeof resources.en.translation>;

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    ns: ["translation"],
    defaultNS,
    resources,
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
