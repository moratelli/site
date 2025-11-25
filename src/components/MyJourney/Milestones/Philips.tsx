import { philips1xWebp, philips2xWebp, philipsPng } from '@assets/assets'
import { memo } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Milestone } from './MilestoneBase'

export const Philips = memo(() => {
  const { t, i18n } = useTranslation()

  return (
    <Milestone
      id="philips"
      className="philips"
      gradient="philips"
      companyName="Philips"
      href="https://www.philips.com.br/healthcare"
      logo={{
        webp1x: philips1xWebp,
        webp2x: philips2xWebp,
        fallback: philipsPng,
        alt: "Philips's logo",
      }}
    >
      <p>
        <Trans
          i18n={i18n}
          i18nKey="myJourney.philips.paragraph1"
          components={[
            <a
              className="text-gradient-philips"
              href="https://www.philips.com.br/healthcare"
              target="_blank"
              rel="noopener noreferrer"
            />,
            <a
              className="text-gradient-philips"
              href="https://www.philips.com.br/healthcare/resources/landing/solucao-tasy"
              target="_blank"
              rel="noopener noreferrer"
            />,
          ]}
        />
      </p>
      <p>{t('myJourney.philips.paragraph2')}</p>
    </Milestone>
  )
})

Philips.displayName = 'Philips'
