/* eslint-disable react-refresh/only-export-components */
import type { RenderOptions } from '@testing-library/react'
import { render } from '@testing-library/react'
import { Provider } from 'jotai'
import type { ReactElement, ReactNode } from 'react'
import { I18nextProvider } from 'react-i18next'
import { BrowserRouter } from 'react-router-dom'
import i18n from '../i18n/config'

interface AllTheProvidersProps {
  children: ReactNode
}

const AllTheProviders = ({ children }: AllTheProvidersProps) => {
  return (
    <I18nextProvider i18n={i18n}>
      <Provider>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    </I18nextProvider>
  )
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) => {
  const result = render(ui, { wrapper: AllTheProviders, ...options })
  return { ...result, i18n }
}

// Re-export everything from @testing-library/react
export * from '@testing-library/react'
// Export custom render function
export { customRender as render }
