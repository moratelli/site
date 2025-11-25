import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { render } from '../../test/test-utils'
import { LanguageSwitcher } from './LanguageSwitcher'

describe('LanguageSwitcher', () => {
  let scrollYSpy: ReturnType<typeof vi.spyOn>
  let scrollToSpy: ReturnType<typeof vi.spyOn>
  let requestAnimationFrameSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    // Mock scroll-related properties
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      writable: true,
      configurable: true,
      value: 2000,
    })

    scrollYSpy = vi.spyOn(window, 'scrollY', 'get').mockReturnValue(500)
    scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
    requestAnimationFrameSpy = vi
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((cb: FrameRequestCallback) => {
        cb(0)
        return 0
      })
  })

  afterEach(() => {
    scrollYSpy.mockRestore()
    scrollToSpy.mockRestore()
    requestAnimationFrameSpy.mockRestore()
  })

  it('renders all language buttons', () => {
    render(<LanguageSwitcher />)

    expect(screen.getByRole('button', { name: /switch to en/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /switch to fr/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /switch to pt/i })).toBeInTheDocument()
  })

  it('marks current language as active', () => {
    render(<LanguageSwitcher />)

    // Default language is 'en' from test-utils setup
    const enButton = screen.getByRole('button', { name: /switch to en/i })
    expect(enButton).toHaveClass('active')
    expect(enButton).toHaveAttribute('aria-pressed', 'true')
  })

  it('switches language when button is clicked', async () => {
    const user = userEvent.setup()
    const { i18n } = render(<LanguageSwitcher />)

    const ptButton = screen.getByRole('button', { name: /switch to pt/i })
    await user.click(ptButton)

    await waitFor(() => {
      expect(i18n.language).toBe('pt_BR')
    })
  })

  it('updates active state after language change', async () => {
    const user = userEvent.setup()
    render(<LanguageSwitcher />)

    const ptButton = screen.getByRole('button', { name: /switch to pt/i })
    const enButton = screen.getByRole('button', { name: /switch to en/i })

    // Initially EN is active
    expect(enButton).toHaveClass('active')
    expect(ptButton).not.toHaveClass('active')

    // Click PT button
    await user.click(ptButton)

    await waitFor(() => {
      expect(ptButton).toHaveClass('active')
      expect(enButton).not.toHaveClass('active')
    })
  })

  it('preserves scroll position as percentage after language change', async () => {
    const user = userEvent.setup()
    render(<LanguageSwitcher />)

    // scrollY = 500, scrollHeight = 2000, so 25% down
    const frButton = screen.getByRole('button', { name: /switch to fr/i })
    await user.click(frButton)

    await waitFor(() => {
      expect(requestAnimationFrameSpy).toHaveBeenCalled()
      // Should scroll to 25% of 2000 = 500
      expect(scrollToSpy).toHaveBeenCalledWith({
        top: 500,
        behavior: 'smooth',
      })
    })
  })

  it('handles scroll restoration with different content heights', async () => {
    const user = userEvent.setup()
    render(<LanguageSwitcher />)

    // Start: scrollY = 500, scrollHeight = 2000 (25%)
    const frButton = screen.getByRole('button', { name: /switch to fr/i })

    // Simulate content height change after language switch
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      writable: true,
      configurable: true,
      value: 3000,
    })

    await user.click(frButton)

    await waitFor(() => {
      // Should scroll to 25% of 3000 = 750
      expect(scrollToSpy).toHaveBeenCalledWith({
        top: 750,
        behavior: 'smooth',
      })
    })
  })

  it('displays correct emoji and label for each language', () => {
    render(<LanguageSwitcher />)

    const enButton = screen.getByRole('button', { name: /switch to en/i })
    const frButton = screen.getByRole('button', { name: /switch to fr/i })
    const ptButton = screen.getByRole('button', { name: /switch to pt/i })

    expect(enButton).toHaveTextContent('🇬🇧')
    expect(enButton).toHaveTextContent('EN')

    expect(frButton).toHaveTextContent('🇫🇷')
    expect(frButton).toHaveTextContent('FR')

    expect(ptButton).toHaveTextContent('🇧🇷')
    expect(ptButton).toHaveTextContent('PT')
  })

  it('has proper accessibility attributes', () => {
    render(<LanguageSwitcher />)

    const nav = screen.getByRole('navigation')
    expect(nav).toHaveAttribute('aria-label', 'Language selector')

    const buttons = screen.getAllByRole('button')
    buttons.forEach((button) => {
      expect(button).toHaveAttribute('aria-label')
      expect(button).toHaveAttribute('aria-pressed')
    })
  })

  it('handles partial language match for active state', () => {
    const { i18n } = render(<LanguageSwitcher />)

    // Set language to 'en-US' (which starts with 'en')
    i18n.changeLanguage('en-US')

    const enButton = screen.getByRole('button', { name: /switch to en/i })
    expect(enButton).toHaveClass('active')
    expect(enButton).toHaveAttribute('aria-pressed', 'true')
  })
})
