import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { isAndroidAtom } from './atoms/platformAtoms'
import { Footer } from './components/Footer/Footer'
import { Introduction } from './components/Introduction/Introduction'
import { MyJourney } from './components/MyJourney/MyJourney'
import { Skills } from './components/Skills/Skills'
import { TrustedBy } from './components/TrustedBy/TrustedBy'

export const HomePage = () => {
  const { i18n } = useTranslation()
  const [, setIsAndroid] = useAtom(isAndroidAtom)

  useEffect(() => {
    const isAndroid = navigator.userAgent.toLowerCase().includes('android')
    setIsAndroid(isAndroid)
  }, [setIsAndroid])

  useEffect(() => {
    // keep <html lang="..."> in sync for accessibility and SEO
    if (i18n && i18n.language) {
      document.documentElement.lang = i18n.language
    }
  }, [i18n])

  return (
    <>
      <Introduction />
      <main>
        <TrustedBy />
        <Skills />
        <MyJourney />
      </main>
      <Footer />
    </>
  )
}
