import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Footer } from './components/Footer/Footer'
import { Introduction } from './components/Introduction/Introduction'
import { MyJourney } from './components/MyJourney/MyJourney'
import { Skills } from './components/Skills/Skills'
import { TrustedBy } from './components/TrustedBy/TrustedBy'

export const HomePage = () => {
  const { i18n } = useTranslation()

  useEffect(() => {
    const myBmwLink = document.getElementById('myBmwLink') as HTMLAnchorElement
    const miniLink = document.getElementById('miniLink') as HTMLAnchorElement
    const isAndroid = navigator.userAgent.toLowerCase().includes('android')

    if (isAndroid) {
      myBmwLink.href =
        'https://play.google.com/store/apps/details?id=de.bmw.connected.mobile20.row&hl=fr&gl=US'
      miniLink.href =
        'https://play.google.com/store/apps/details?id=de.mini.connected.mobile20.na&hl=fr&gl=US'
    }
  }, [])

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
