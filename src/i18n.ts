import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import am from './locales/am.json';

// Get saved language from localStorage or default to English
const getSavedLanguage = (): string => {
  // Check localStorage first
  try {
    const savedLang = localStorage.getItem('language');
    if (savedLang && ['en', 'am'].includes(savedLang)) {
      return savedLang;
    }
  } catch (e) {
    // localStorage might not be available (e.g., SSR)
    console.warn('Could not access localStorage:', e);
  }
  
  // Always default to English (reverse: prioritize English over browser language)
  return 'en';
};

// Initialize with default language to avoid hydration mismatch
const initialLanguage = getSavedLanguage();

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      am: { translation: am }
    },
    lng: initialLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });

// Save language to localStorage when changed - wrapped in useEffect friendly way
const handleLanguageChange = (lng: string) => {
  try {
    localStorage.setItem('language', lng);
  } catch (e) {
    console.warn('Could not save to localStorage:', e);
  }
  // Only update document lang if we're in browser
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lng;
  }
};

// Listen for language changes and persist
i18n.on('languageChanged', handleLanguageChange);

export default i18n;
