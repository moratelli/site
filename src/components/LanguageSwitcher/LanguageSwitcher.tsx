import { useTranslation } from 'react-i18next'
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from '../../i18n/config'
import './LanguageSwitcher.css'

const LANGUAGE_CONFIG: Record<SupportedLanguage, { emoji: string; label: string }> = {
  en: { emoji: '🇬🇧', label: 'EN' },
  fr_CA: { emoji: '🇫🇷', label: 'FR' },
  pt_BR: { emoji: '🇧🇷', label: 'PT' },
}

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation()

  const handleChange = (lng: SupportedLanguage) => {
    i18n.changeLanguage(lng)
  }

  return (
    <div className="language-switcher" role="navigation" aria-label="Language selector">
      {SUPPORTED_LANGUAGES.map((lng) => {
        const isActive = i18n.language === lng || i18n.language.startsWith(lng.split('_')[0])
        return (
          <button
            key={lng}
            onClick={() => handleChange(lng)}
            className={isActive ? 'active' : ''}
            aria-pressed={isActive}
            aria-label={`Switch to ${LANGUAGE_CONFIG[lng].label}`}
          >
            <span className="flag">{LANGUAGE_CONFIG[lng].emoji}</span>
            <span className="label">{LANGUAGE_CONFIG[lng].label}</span>
          </button>
        )
      })}
    </div>
  )
}
