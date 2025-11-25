import { memo } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import {
  workingAtZallpy1xWebp,
  workingAtZallpy2xWebp,
  workingAtZallpy3xWebp,
  workingAtZallpyJpeg,
  zallpy1xWebp,
  zallpy2xWebp,
  zallpyPng,
} from '../../../assets/assets'
import { PlatformLink } from '../../PlatformLink/PlatformLink'
import { Tags } from '../../Tags/Tags'

export const Zallpy = memo(() => {
  const { t, i18n } = useTranslation()

  const infoBits: string[] = t('myJourney.zallpy.infoBits', { returnObjects: true })
  const tags: string[] = t('myJourney.zallpy.tags', { returnObjects: true })

  return (
    <article className="zallpy">
      <div>
        <header>
          <div>
            <h1 className="text-gradient-zallpy">Zallpy Digital</h1>
            <h3 className="text-gradient-zallpy">{t('myJourney.zallpy.dates')}</h3>
          </div>
          <a href="https://zallpy.com" target="_blank" rel="noopener noreferrer">
            <picture>
              <source type="image/webp" srcSet={`${zallpy1xWebp} 1x, ${zallpy2xWebp} 2x`} />
              <img
                src={zallpyPng}
                srcSet={`${zallpy1xWebp} 1x, ${zallpy2xWebp} 2x`}
                alt="Zallpy Digital's logo"
              />
            </picture>
          </a>
        </header>
        <p>
          <Trans
            i18n={i18n}
            i18nKey="myJourney.zallpy.paragraph1"
            components={[
              <a
                className="text-gradient-zallpy"
                href="https://zallpy.com"
                target="_blank"
                rel="noopener noreferrer"
              />,
              <PlatformLink
                className="text-gradient-zallpy"
                iosHref="https://apps.apple.com/us/app/my-bmw/id1519034860"
                androidHref="https://play.google.com/store/apps/details?id=de.bmw.connected.mobile20.row&hl=fr&gl=US"
              />,
              <PlatformLink
                className="text-gradient-zallpy"
                iosHref="https://apps.apple.com/us/app/mini/id1519458349"
                androidHref="https://play.google.com/store/apps/details?id=de.mini.connected.mobile20.na&hl=fr&gl=US"
              />,
            ]}
          />
        </p>
        <p>
          <Trans
            i18n={i18n}
            i18nKey="myJourney.zallpy.paragraph2"
            components={[
              <a
                href="https://medium.com/mobilepeople/backend-for-frontend-pattern-why-you-need-to-know-it-46f94ce420b0"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gradient-zallpy"
              />,
            ]}
          />
        </p>
        <p>
          <Trans
            i18n={i18n}
            i18nKey="myJourney.zallpy.paragraph3"
            components={[
              <a
                href="https://www.linkedin.com/posts/pedromoratelli_agile-scrum-flowmetrics-activity-7338234241899462656-EAyW?utm_source=share&utm_medium=member_desktop&rcm=ACoAACsD5ugBhJw4o-_p8ThGeHy_m-nO7QErcag0"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gradient-zallpy"
              />,
            ]}
          />
        </p>
        <p>
          {' '}
          <Trans
            i18n={i18n}
            i18nKey="myJourney.zallpy.paragraph4"
            components={[
              <a
                href="https://www.linkedin.com/posts/pedromoratelli_last-week-i-was-invited-to-our-projects-activity-7307856358991683584-_lqZ?utm_source=share&utm_medium=member_desktop&rcm=ACoAACsD5ugBhJw4o-_p8ThGeHy_m-nO7QErcag"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gradient-zallpy"
              />,
            ]}
          />
        </p>
        <Tags tags={tags} />
        <ul className="info-bits">
          {infoBits.map((bit, i) => (
            <li key={i}>{bit}</li>
          ))}
        </ul>
      </div>
      <div className="photo-container">
        <div className="photo-with-subtitles">
          <picture>
            <source
              type="image/webp"
              srcSet={`${workingAtZallpy1xWebp} 1x, ${workingAtZallpy2xWebp} 2x, ${workingAtZallpy3xWebp} 3x`}
            />
            <img
              src={workingAtZallpyJpeg}
              srcSet={`${workingAtZallpy1xWebp} 1x, ${workingAtZallpy2xWebp} 2x, ${workingAtZallpy3xWebp} 3x`}
              alt="A work selfie"
            />
          </picture>
          <p>{t('myJourney.zallpy.photoCaption', 'IN THE OFFICE')}</p>
        </div>
      </div>
    </article>
  )
})

Zallpy.displayName = 'Zallpy'
