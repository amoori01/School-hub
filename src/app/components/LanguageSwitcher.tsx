import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef, useCallback } from 'react';

const languages = [
  { code: 'en', name: 'English', nativeName: 'EN' },
  { code: 'am', name: 'Amharic', nativeName: 'AM' }
];

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isMounted = useRef(false);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  // Prevent state updates on unmounted components
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (isMounted.current) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = useCallback((langCode: string) => {
    // Only proceed if component is mounted
    if (!isMounted.current) return;
    
    i18n.changeLanguage(langCode).then(() => {
      if (isMounted.current) {
        setIsOpen(false);
      }
    });
  }, [i18n]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-secondary border border-border rounded-lg transition-all duration-300"
        aria-label={t('common.language')}
      >
        <span>{currentLanguage.nativeName}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-lg z-50 overflow-hidden">
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left hover:bg-accent transition-colors duration-150 ${
                  i18n.language === lang.code ? 'bg-accent text-accent-foreground' : 'text-foreground'
                }`}
              >
                <span className="font-medium">{lang.name}</span>
                {i18n.language === lang.code && (
                  <svg
                    className="w-5 h-5 ml-auto text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
