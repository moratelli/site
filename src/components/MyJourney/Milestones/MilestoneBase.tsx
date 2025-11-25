import { Tags } from '@components/Tags/Tags'
import type { ReactNode } from 'react'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'

interface LogoAssets {
  webp1x: string
  webp2x: string
  fallback: string
  alt: string
}

interface PhotoAssets {
  webp1x: string
  webp2x: string
  webp3x: string
  fallback: string
  alt: string
  caption?: string
}

interface MilestoneProps {
  id: string
  className: string
  gradient: string
  companyName: string
  href: string
  logo: LogoAssets
  hasInfoBits?: boolean
  photos?: PhotoAssets[]
  children: ReactNode
}

/**
 * Base milestone component that provides consistent structure for journey timeline entries.
 *
 * Provides:
 * - Header with company name, dates, and logo
 * - Flexible content area (children) for custom paragraphs with Trans/links
 * - Automatic tags display
 * - Optional info bits list
 * - Optional photo containers with captions
 *
 * Reduces boilerplate while allowing each milestone to customize paragraph content.
 */
export const Milestone = memo(
  ({
    id,
    className,
    gradient,
    companyName,
    href,
    logo,
    hasInfoBits,
    photos,
    children,
  }: MilestoneProps) => {
    const { t } = useTranslation()

    const tags = t(`myJourney.${id}.tags`, { returnObjects: true }) as string[]
    const infoBits = hasInfoBits
      ? (t(`myJourney.${id}.infoBits`, { returnObjects: true }) as string[])
      : []

    return (
      <article className={className}>
        <div>
          <header>
            <div>
              <h1 className={`text-gradient-${gradient}`}>{companyName}</h1>
              <h3 className={`text-gradient-${gradient}`}>{t(`myJourney.${id}.dates`)}</h3>
            </div>
            <a href={href} target="_blank" rel="noopener noreferrer">
              <picture>
                <source type="image/webp" srcSet={`${logo.webp1x} 1x, ${logo.webp2x} 2x`} />
                <img
                  src={logo.fallback}
                  srcSet={`${logo.webp1x} 1x, ${logo.webp2x} 2x`}
                  alt={logo.alt}
                />
              </picture>
            </a>
          </header>

          {children}

          <Tags tags={tags} />

          {hasInfoBits && infoBits.length > 0 && (
            <ul className="info-bits">
              {infoBits.map((bit) => (
                <li key={bit}>{bit}</li>
              ))}
            </ul>
          )}
        </div>

        {photos && photos.length > 0 && (
          <div className="photo-container">
            {photos.map((photo, index) => (
              <div key={index} className="photo-with-subtitles">
                <picture>
                  <source
                    type="image/webp"
                    srcSet={`${photo.webp1x} 1x, ${photo.webp2x} 2x, ${photo.webp3x} 3x`}
                  />
                  <img
                    src={photo.fallback}
                    srcSet={`${photo.webp1x} 1x, ${photo.webp2x} 2x, ${photo.webp3x} 3x`}
                    alt={photo.alt}
                  />
                </picture>
                {photo.caption && <p>{t(photo.caption, photo.caption)}</p>}
              </div>
            ))}
          </div>
        )}
      </article>
    )
  }
)

Milestone.displayName = 'Milestone'
