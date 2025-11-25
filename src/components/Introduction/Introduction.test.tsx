import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { render } from '../../test/test-utils'
import { Introduction } from './Introduction'

describe('Introduction', () => {
  it('renders profile image with correct alt text', () => {
    render(<Introduction />)

    const image = screen.getByRole('img', { name: /pedro moratelli/i })
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('alt', 'A headshot picture of Pedro Moratelli')
  })

  it('uses responsive image srcset', () => {
    render(<Introduction />)

    const image = screen.getByRole('img')
    const srcset = image.getAttribute('srcset')

    expect(srcset).toContain('1x')
    expect(srcset).toContain('2x')
    expect(srcset).toContain('3x')
  })

  it('provides webp source with picture element', () => {
    render(<Introduction />)

    const picture = document.querySelector('picture')
    expect(picture).toBeInTheDocument()

    const webpSource = picture?.querySelector('source[type="image/webp"]')
    expect(webpSource).toBeInTheDocument()
  })

  it('uses eager loading for above-the-fold image', () => {
    render(<Introduction />)

    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('loading', 'eager')
    expect(image).toHaveAttribute('decoding', 'async')
  })

  it('renders introduction text with Trans components', () => {
    render(<Introduction />)

    const headings = screen.getAllByRole('heading', { level: 1 })
    expect(headings.length).toBeGreaterThanOrEqual(2)
  })

  it('applies gradient classes to text spans', () => {
    const { container } = render(<Introduction />)

    const sunsetGradient = container.querySelector('.text-gradient-sunset')
    const mintGradient = container.querySelector('.text-gradient-mint')
    const skyGradient = container.querySelector('.text-gradient-sky')

    expect(sunsetGradient).toBeInTheDocument()
    expect(mintGradient).toBeInTheDocument()
    expect(skyGradient).toBeInTheDocument()
  })

  it('uses semantic header element', () => {
    render(<Introduction />)

    const header = document.querySelector('header.introduction')
    expect(header).toBeInTheDocument()
  })

  it('renders with default English translations', () => {
    const { i18n } = render(<Introduction />)

    expect(i18n.language).toMatch(/^en/)

    // Introduction should have text content
    const header = document.querySelector('header.introduction')
    expect(header).toHaveTextContent(/./i) // Has some text content
  })

  it('renders jpeg fallback image', () => {
    render(<Introduction />)

    const image = screen.getByRole('img')
    const src = image.getAttribute('src')

    expect(src).toBeTruthy()
    expect(src).toMatch(/\.(jpg|jpeg)$/i)
  })
})
