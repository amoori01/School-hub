# Internationalization (i18n) Setup Guide

This document provides instructions on how to use and extend the internationalization system in the School Hub application.

## Overview

The application uses **react-i18next** for internationalization. The system supports:
- English (en) - Default
- Amharic (አማርኛ)

## Quick Start

### Using Translations in Components

To use translations in any component:

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <h1>{t('hero.title')}</h1>
  );
}
```

### Translation Keys Structure

Translations are organized by sections in the JSON files:

```json
{
  "common": {
    "key": "value"
  },
  "header": {
    "title": "...",
    "subtitle": "..."
  },
  "hero": {
    "title": "...",
    "subtitle": "..."
  },
  // ... more sections
}
```

## Adding Translations

### 1. Add Translation Keys

Edit `src/locales/en.json` for English and `src/locales/am.json` for Amharic:

```json
{
  "sectionName": {
    "keyName": "Translation text"
  }
}
```

### 2. Use in Component

```tsx
const { t } = useTranslation();
<p>{t('sectionName.keyName')}</p>
```

## Changing Language Programmatically

```tsx
import { useTranslation } from 'react-i18next';

function LanguageChanger() {
  const { i18n } = useTranslation();
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  
  return (
    <button onClick={() => changeLanguage('am')}>Switch to Amharic</button>
  );
}
```

## Adding a New Language

To add a new language (e.g., French):

1. **Create translation file:**
   ```bash
   cp src/locales/en.json src/locales/fr.json
   ```

2. **Edit `src/locales/fr.json`** with French translations

3. **Update `src/i18n.ts`:**
   ```typescript
   import fr from './locales/fr.json';
   
   // Add to resources:
   resources: {
     en: { translation: en },
     am: { translation: am },
     fr: { translation: fr }  // Add this
   }
   ```

4. **Update language switcher** (`src/app/components/LanguageSwitcher.tsx`):
   ```typescript
   const languages = [
     { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
     { code: 'am', name: 'Amharic', nativeName: 'አማርኛ', flag: '🇪🇹' },
     { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' }  // Add this
   ];
   ```

## Font Support

Amharic and other Ethiopic scripts are supported through:
- **Noto Sans Ethiopic** - Primary font
- Fallback to system fonts

Font is automatically applied when the language is switched to Amharic (`:lang(am)`).

## Automatic Language Detection

The system automatically detects user preference:
1. Checks localStorage for saved language
2. Falls back to browser language
3. Defaults to English if no match

## File Structure

```
src/
├── i18n.ts                 # i18n configuration
├── locales/
│   ├── en.json            # English translations
│   └── am.json            # Amharic translations
└── app/
    └── components/
        └── LanguageSwitcher.tsx  # Language switcher component
```

## Best Practices

1. **Use descriptive keys:** `hero.title` instead of `h1`
2. **Group related content:** Use nested objects for sections
3. **Include all languages:** Keep translations in sync
4. **Use fallback values:** Provide default text if key is missing
   ```tsx
   {t('key', 'Default text')}
   ```
5. **Test RTL languages:** Verify layout works with Amharic

## Running the Application

```bash
npm run dev    # Development server
npm run build  # Production build
```

## Language Switcher

The language switcher is already integrated into the Header component. Users can:
- Click the dropdown to see available languages
- Select their preferred language
- The selection is persisted in localStorage
