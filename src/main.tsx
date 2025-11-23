import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import './css/style.css'
import './i18n/config'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Loading…</div>}>
      <App />
      <Analytics />
      <SpeedInsights />
    </Suspense>
  </StrictMode>
)
