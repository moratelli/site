import {
  classAtSenai1xWebp,
  classAtSenai2xWebp,
  classAtSenai3xWebp,
  classAtSenaiJpeg,
  senai1xWebp,
  senai2xWebp,
  senaiPng,
} from '@assets/assets'
import { memo } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Milestone } from './MilestoneBase'

export const Senai = memo(() => {
  const { t, i18n } = useTranslation()

  return (
    <Milestone
      className="school"
      gradient="sky"
      companyName={t('myJourney.school.title')}
      dates={t('myJourney.school.dates')}
      href="https://www.senai.br"
      logo={{
        webp1x: senai1xWebp,
        webp2x: senai2xWebp,
        fallback: senaiPng,
        alt: "SENAI's logo",
      }}
      tags={t('myJourney.school.tags', { returnObjects: true })}
      photos={[
        {
          webp1x: classAtSenai1xWebp,
          webp2x: classAtSenai2xWebp,
          webp3x: classAtSenai3xWebp,
          fallback: classAtSenaiJpeg,
          alt: 'The logo of SENAI',
          caption: t('myJourney.school.photoCaption'),
        },
      ]}
    >
      <p>
        <Trans
          i18n={i18n}
          i18nKey="myJourney.school.paragraph1"
          components={[
            <a
              className="text-gradient-sky"
              href="https://www.senai.br"
              target="_blank"
              rel="noopener noreferrer"
            />,
          ]}
        />
      </p>
      <p>{t('myJourney.school.paragraph2')}</p>
    </Milestone>
  )
})

Senai.displayName = 'Senai'
