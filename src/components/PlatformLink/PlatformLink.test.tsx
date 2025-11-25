import { render, screen } from '@testing-library/react'
import { Provider } from 'jotai'
import { useHydrateAtoms } from 'jotai/utils'
import type { ReactNode } from 'react'
import { describe, expect, it } from 'vitest'
import { isAndroidAtom } from '../../atoms/platformAtoms'
import { PlatformLink } from './PlatformLink'

interface TestProviderProps {
  children: ReactNode
  isAndroid: boolean
}

const TestProvider = ({ children, isAndroid }: TestProviderProps) => {
  const HydrateAtoms = ({ children }: { children: ReactNode }) => {
    useHydrateAtoms([[isAndroidAtom, isAndroid]])
    return children
  }

  return (
    <Provider>
      <HydrateAtoms>{children}</HydrateAtoms>
    </Provider>
  )
}

describe('PlatformLink', () => {
  it('should render iOS link when not on Android', () => {
    render(
      <TestProvider isAndroid={false}>
        <PlatformLink
          iosHref="https://apps.apple.com/app"
          androidHref="https://play.google.com/app"
        >
          Download App
        </PlatformLink>
      </TestProvider>
    )

    const link = screen.getByText('Download App')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://apps.apple.com/app')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('should render Android link when on Android', () => {
    render(
      <TestProvider isAndroid={true}>
        <PlatformLink
          iosHref="https://apps.apple.com/app"
          androidHref="https://play.google.com/app"
        >
          Download App
        </PlatformLink>
      </TestProvider>
    )

    const link = screen.getByText('Download App')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://play.google.com/app')
  })

  it('should pass through additional props', () => {
    render(
      <TestProvider isAndroid={false}>
        <PlatformLink
          iosHref="https://apps.apple.com/app"
          androidHref="https://play.google.com/app"
          className="custom-class"
          data-testid="platform-link"
        >
          Download
        </PlatformLink>
      </TestProvider>
    )

    const link = screen.getByTestId('platform-link')
    expect(link).toHaveClass('custom-class')
  })
})
