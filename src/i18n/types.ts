// Translation schema typing for TypeScript safety
export interface TranslationSchema {
  introduction: string
  skills: {
    title: string
    list: string[]
  }
  myJourney: {
    title: string
    school: {
      paragraph_1: string
      paragraph_2: string
    }
    trackli: {
      dates: string
      paragraph_1: string
      paragraph_2: string
    }
    certi: {
      dates: string
      paragraph_1: string
      paragraph_2: string
      paragraph_3: string
      info_bits: string[]
    }
    philips: {
      dates: string
      paragraph_1: string
      paragraph_2: string
    }
    zallpy: {
      dates: string
      paragraph_1: string
      paragraph_2: string
      paragraph_3: string
      paragraph_4: string
      info_bits: string[]
      photo_caption?: string
    }
  }
  today: {
    title: string
    paragraph_1: string
    paragraph_2: string
  }
  footer: {
    linkedIn: string
    blog: string
    resume: string
  }
}

// augment i18next types
import 'i18next'

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      translation: TranslationSchema
    }
  }
}
