---
title: 'Building a Type-Safe i18n System with React'
date: 2025-11-18
excerpt: 'How I implemented internationalization in my portfolio using react-i18next with full TypeScript support and smooth language transitions.'
slug: 'building-type-safe-i18n-react'
tags: ['react', 'typescript', 'i18n']
---

# Building a Type-Safe i18n System with React

One of the recent features I added to my portfolio was full internationalization support for English, French (Canadian), and Brazilian Portuguese. Here's how I built it with full type safety.

## The Challenge

I wanted my site to:

- Support multiple languages seamlessly
- Have type-safe translation keys
- Preserve scroll position when switching languages
- Handle dynamic content with embedded links

## The Solution

### 1. Setting Up i18next

I used the `react-i18next` library with browser language detection:

```typescript
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      fr_CA: { translation: frTranslations },
      pt_BR: { translation: ptTranslations },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })
```

### 2. Type Safety with TypeScript

The key to type safety is augmenting the i18next types:

```typescript
declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      translation: TranslationSchema
    }
  }
}
```

This gives you autocomplete and type checking for all translation keys!

### 3. Handling Layout Shifts

Different languages have different text lengths. To prevent jarring layout shifts, I implemented smooth scroll position preservation:

```typescript
const handleLanguageChange = (lng: string) => {
  const scrollPercentage = window.scrollY / document.documentElement.scrollHeight

  i18n.changeLanguage(lng).then(() => {
    requestAnimationFrame(() => {
      const newScrollPosition = scrollPercentage * document.documentElement.scrollHeight
      window.scrollTo({ top: newScrollPosition, behavior: 'smooth' })
    })
  })
}
```

## Results

The implementation provides:

- ✅ Full type safety across all translations
- ✅ Smooth language switching without jarring jumps
- ✅ Automatic browser language detection
- ✅ Clean, maintainable code structure

You can see it in action by switching languages in the footer! 🌍
