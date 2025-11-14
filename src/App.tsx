import { useEffect } from 'react'
import { Footer } from './components/Footer/Footer'
import { Introduction } from './components/Introduction/Introduction'
import { MyDevJourney } from './components/MyDevJourney/MyDevJourney'
import { Skills } from './components/Skills/Skills'
import './css/style.css'

function App() {
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

  return (
    <>
      <Introduction />
      <main>
        <Skills />
        <MyDevJourney />
      </main>
      <Footer />
    </>
  )
}

export default App
