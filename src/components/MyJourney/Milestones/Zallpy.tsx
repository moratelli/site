import {
  workingAtZallpy1xWebp,
  workingAtZallpy2xWebp,
  workingAtZallpy3xWebp,
  workingAtZallpyJpeg,
  zallpy1xWebp,
  zallpy2xWebp,
  zallpyPng,
} from '@assets/assets'
import { PlatformLink } from '@components/PlatformLink/PlatformLink'
import { memo } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Milestone } from './MilestoneBase'

export const Zallpy = memo(() => {
  const { t, i18n } = useTranslation()

  return (
    <Milestone
      className="zallpy"
      gradient="zallpy"
      companyName="Zallpy Digital"
      dates={t('myJourney.zallpy.dates')}
      href="https://zallpy.com"
      logo={{
        webp1x: zallpy1xWebp,
        webp2x: zallpy2xWebp,
        fallback: zallpyPng,
        alt: "Zallpy Digital's logo",
      }}
      tags={t('myJourney.zallpy.tags', { returnObjects: true })}
      infoBits={t('myJourney.zallpy.infoBits', { returnObjects: true })}
      photos={[
        {
          webp1x: workingAtZallpy1xWebp,
          webp2x: workingAtZallpy2xWebp,
          webp3x: workingAtZallpy3xWebp,
          fallback: workingAtZallpyJpeg,
          alt: 'A work selfie',
          caption: t('myJourney.zallpy.photoCaption'),
        },
      ]}
    >
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
    </Milestone>
  )
})

Zallpy.displayName = 'Zallpy'
