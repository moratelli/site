import { describe, expect, it } from 'vitest'
import en from '../i18n/en.json'
import fr_CA from '../i18n/fr_CA.json'
import pt_BR from '../i18n/pt_BR.json'

/**
 * Flattens a nested translation object into a flat key-value map
 * Example: { "a": { "b": "value" } } => { "a.b": "value" }
 */
const flattenTranslations = (obj: Record<string, unknown>, prefix = ''): Record<string, string> => {
  const result: Record<string, string> = {}

  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.assign(result, flattenTranslations(value as Record<string, unknown>, fullKey))
    } else {
      result[fullKey] = String(value)
    }
  }

  return result
}

describe('i18n Completeness', () => {
  const languages = {
    en,
    fr_CA,
    pt_BR,
  }

  const flatTranslations = Object.fromEntries(
    Object.entries(languages).map(([lang, translations]) => [
      lang,
      flattenTranslations(translations),
    ])
  )

  it('all languages have the same translation keys', () => {
    const enKeys = new Set(Object.keys(flatTranslations.en))
    const frKeys = new Set(Object.keys(flatTranslations.fr_CA))
    const ptKeys = new Set(Object.keys(flatTranslations.pt_BR))

    // Check French has all English keys
    const missingInFrench = [...enKeys].filter((key) => !frKeys.has(key))
    expect(
      missingInFrench,
      `French (fr_CA) is missing keys: ${missingInFrench.join(', ')}`
    ).toHaveLength(0)

    // Check Portuguese has all English keys
    const missingInPortuguese = [...enKeys].filter((key) => !ptKeys.has(key))
    expect(
      missingInPortuguese,
      `Portuguese (pt_BR) is missing keys: ${missingInPortuguese.join(', ')}`
    ).toHaveLength(0)

    // Check for extra keys in other languages
    const extraInFrench = [...frKeys].filter((key) => !enKeys.has(key))
    expect(
      extraInFrench,
      `French (fr_CA) has extra keys: ${extraInFrench.join(', ')}`
    ).toHaveLength(0)

    const extraInPortuguese = [...ptKeys].filter((key) => !enKeys.has(key))
    expect(
      extraInPortuguese,
      `Portuguese (pt_BR) has extra keys: ${extraInPortuguese.join(', ')}`
    ).toHaveLength(0)
  })

  it('no translation values are empty strings', () => {
    for (const [lang, translations] of Object.entries(flatTranslations)) {
      const emptyKeys = Object.entries(translations)
        .filter(([, value]) => value.trim() === '')
        .map(([key]) => key)

      expect(
        emptyKeys,
        `${lang} has empty translations for keys: ${emptyKeys.join(', ')}`
      ).toHaveLength(0)
    }
  })

  it('no untranslated values (still in English) in non-English languages', () => {
    const enTranslations = flatTranslations.en

    // Check French
    const untranslatedFrench = Object.entries(flatTranslations.fr_CA)
      .filter(([key, value]) => value === enTranslations[key])
      .map(([key]) => key)

    expect(
      untranslatedFrench,
      `French (fr_CA) has untranslated keys (same as English): ${untranslatedFrench.join(', ')}`
    ).toHaveLength(0)

    // Check Portuguese
    const untranslatedPortuguese = Object.entries(flatTranslations.pt_BR)
      .filter(([key, value]) => value === enTranslations[key])
      .map(([key]) => key)

    expect(
      untranslatedPortuguese,
      `Portuguese (pt_BR) has untranslated keys (same as English): ${untranslatedPortuguese.join(', ')}`
    ).toHaveLength(0)
  })

  it('all languages have non-zero translation count', () => {
    for (const [lang, translations] of Object.entries(flatTranslations)) {
      const count = Object.keys(translations).length
      expect(count, `${lang} should have at least one translation`).toBeGreaterThan(0)
    }
  })

  it('translation key counts match across all languages', () => {
    const enCount = Object.keys(flatTranslations.en).length
    const frCount = Object.keys(flatTranslations.fr_CA).length
    const ptCount = Object.keys(flatTranslations.pt_BR).length

    expect(frCount, 'French key count should match English').toBe(enCount)
    expect(ptCount, 'Portuguese key count should match English').toBe(enCount)
  })
})
