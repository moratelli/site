import { trackli1xWebp, trackli2xWebp, trackliPng } from '@assets/assets'
import { memo } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Milestone } from './MilestoneBase'

export const Trackli = memo(() => {
  const { t, i18n } = useTranslation()

  return (
    <Milestone
      id="trackli"
      className="trackli"
      gradient="trackli"
      companyName="Trackli"
      href="https://trackli.com.br"
      logo={{
        webp1x: trackli1xWebp,
        webp2x: trackli2xWebp,
        fallback: trackliPng,
        alt: "Trackli's logo",
      }}
    >
      <Trans
        i18n={i18n}
        i18nKey="myJourney.trackli.paragraph1"
        components={[
          <a
            className="text-gradient-trackli"
            href="https://trackli.com.br"
            target="_blank"
            rel="noopener noreferrer"
          />,
        ]}
      />
      <p>{t('myJourney.trackli.paragraph2')}</p>
    </Milestone>
  )
})

Trackli.displayName = 'Trackli'
