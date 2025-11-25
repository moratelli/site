import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { ErrorBoundary } from './ErrorBoundary'

const ThrowError = () => {
  throw new Error('Test error')
}

const WorkingComponent = () => <div>Working Component</div>

describe('ErrorBoundary', () => {
  it('should render children when there is no error', () => {
    render(
      <BrowserRouter>
        <ErrorBoundary>
          <WorkingComponent />
        </ErrorBoundary>
      </BrowserRouter>
    )

    expect(screen.getByText('Working Component')).toBeInTheDocument()
  })

  it('should render error UI when child component throws', () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <BrowserRouter>
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      </BrowserRouter>
    )

    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument()
    expect(
      screen.getByText("We're sorry, but something unexpected happened. Please try again.")
    ).toBeInTheDocument()
    expect(screen.getByText('Try Again')).toBeInTheDocument()
    expect(screen.getByText('Go Home')).toBeInTheDocument()

    consoleSpy.mockRestore()
  })

  it('should render custom fallback when provided', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const CustomFallback = <div>Custom Error Message</div>

    render(
      <BrowserRouter>
        <ErrorBoundary fallback={CustomFallback}>
          <ThrowError />
        </ErrorBoundary>
      </BrowserRouter>
    )

    expect(screen.getByText('Custom Error Message')).toBeInTheDocument()
    expect(screen.queryByText('Oops! Something went wrong')).not.toBeInTheDocument()

    consoleSpy.mockRestore()
  })
})
