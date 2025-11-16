import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

// Load translation JSON files directly (they exist in the repo)
import en from './en.json'
import fr from './fr_CA.json'
import pt from './pt_BR.json'

export const SUPPORTED_LANGUAGES = ['en', 'fr_CA', 'pt_BR'] as const
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]

export const LANGUAGE_LABELS: Record<SupportedLanguage, string> = {
  en: 'English',
  fr_CA: 'Français',
  pt_BR: 'Português',
}

i18n
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next
  .use(initReactI18next)
  .init({
    // Provide both primary and language-only codes so browser-detected values
    // like 'fr' or 'pt' will be accepted and map to the same resources.
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      fr_CA: { translation: fr },
      pt: { translation: pt },
      pt_BR: { translation: pt },
    },
    fallbackLng: 'en',
    // include both language-only and locale-specific variants
    supportedLngs: ['en', 'fr', 'fr_CA', 'pt', 'pt_BR'],
    load: 'languageOnly',
    detection: {
      // order of detection
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    react: {
      useSuspense: true,
    },
  })

export default i18n
