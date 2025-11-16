import React from 'react'
import { useTranslation } from 'react-i18next'
import { LANGUAGE_LABELS, SUPPORTED_LANGUAGES, type SupportedLanguage } from '../../i18n/config'
import './LanguageSwitcher.css'

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation()

  const handleChange = (lng: string) => i18n.changeLanguage(lng)

  return (
    <div className="language-switcher" role="navigation" aria-label="Language selector">
      {SUPPORTED_LANGUAGES.map((lng) => (
        <button
          key={lng}
          onClick={() => handleChange(lng)}
          className={i18n.language === lng ? 'active' : ''}
          aria-pressed={i18n.language === lng}
          aria-label={`Switch to ${LANGUAGE_LABELS[lng as SupportedLanguage]}`}
        >
          {LANGUAGE_LABELS[lng as SupportedLanguage]}
        </button>
      ))}
    </div>
  )
}
