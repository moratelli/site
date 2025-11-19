// Translation schema typing for TypeScript safety
export interface TranslationSchema {
  introduction: {
    paragraph1: string
    paragraph2: string
  }
  skills: {
    title: string
    list: string[]
  }
  myJourney: {
    title: string
    school: {
      title: string
      dates: string
      paragraph1: string
      paragraph2: string
    }
    trackli: {
      dates: string
      paragraph1: string
      paragraph2: string
    }
    certi: {
      dates: string
      paragraph1: string
      paragraph2: string
      paragraph3: string
      infoBits: string[]
    }
    philips: {
      dates: string
      paragraph1: string
      paragraph2: string
    }
    zallpy: {
      dates: string
      paragraph1: string
      paragraph2: string
      paragraph3: string
      paragraph4: string
      infoBits: string[]
      photo_caption?: string
    }
  }
  today: {
    title: string
    paragraph1: string
    paragraph2: string
  }
  footer: {
    linkedIn: string
    blog: string
    github: string
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
