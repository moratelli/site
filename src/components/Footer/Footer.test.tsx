import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { render } from '../../test/test-utils'
import { Footer } from './Footer'

describe('Footer', () => {
  it('renders all social links', () => {
    render(<Footer />)

    const linkedInLink = screen.getByRole('link', { name: /linkedin/i })
    const githubLink = screen.getByRole('link', { name: /github/i })
    const blogLink = screen.getAllByRole('link', { name: /blog/i })[0]

    expect(linkedInLink).toHaveAttribute('href', 'https://linkedin.com/in/pedromoratelli')
    expect(githubLink).toHaveAttribute('href', 'https://github.com/moratelli')
    expect(blogLink).toHaveAttribute('href', '/blog')
  })

  it('has security attributes on external links', () => {
    render(<Footer />)

    const linkedInLink = screen.getByRole('link', { name: /linkedin/i })
    const githubLink = screen.getByRole('link', { name: /github/i })

    expect(linkedInLink).toHaveAttribute('target', '_blank')
    expect(linkedInLink).toHaveAttribute('rel', 'noopener noreferrer')

    expect(githubLink).toHaveAttribute('target', '_blank')
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('does not have target=_blank on internal blog link', () => {
    render(<Footer />)

    const blogLinks = screen.getAllByRole('link', { name: /blog/i })

    blogLinks.forEach((link) => {
      const href = link.getAttribute('href')
      if (href === '/blog') {
        expect(link).not.toHaveAttribute('target', '_blank')
      }
    })
  })

  it('renders LanguageSwitcher component', () => {
    render(<Footer />)

    // LanguageSwitcher contains language buttons
    expect(screen.getByRole('button', { name: /switch to en/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /switch to fr/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /switch to pt/i })).toBeInTheDocument()
  })

  it('renders social media icons', () => {
    render(<Footer />)

    const footer = screen.getByRole('contentinfo')

    // Check for Font Awesome icon classes
    const icons = footer.querySelectorAll('i[class*="fa-"]')
    expect(icons.length).toBeGreaterThanOrEqual(3)
  })

  it('renders with proper semantic HTML structure', () => {
    render(<Footer />)

    const footer = screen.getByRole('contentinfo')
    const nav = screen.getByRole('navigation')

    expect(footer).toBeInTheDocument()
    expect(footer).toContainElement(nav)
  })

  it('displays translated content', () => {
    const { i18n } = render(<Footer />)

    // Default language is English
    expect(i18n.language).toBe('en')

    // Footer should render some text content (from Trans components)
    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveTextContent(/./i) // Has some text content
  })
})
