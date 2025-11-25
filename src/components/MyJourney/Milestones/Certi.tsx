import { certi1xWebp, certi2xWebp, certiPng } from '@assets/assets'
import { memo } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Milestone } from './MilestoneBase'

export const Certi = memo(() => {
  const { t, i18n } = useTranslation()

  return (
    <Milestone
      id="certi"
      className="certi"
      gradient="certi"
      companyName="Fundação CERTI"
      href="https://certi.org.br"
      logo={{
        webp1x: certi1xWebp,
        webp2x: certi2xWebp,
        fallback: certiPng,
        alt: "Fundação CERTI's logo",
      }}
      hasInfoBits
    >
      <p>
        <Trans
          i18n={i18n}
          i18nKey="myJourney.certi.paragraph1"
          components={[
            <a
              className="text-gradient-certi"
              href="https://certi.org.br"
              target="_blank"
              rel="noopener noreferrer"
            />,
          ]}
        />
      </p>
      <p>{t('myJourney.certi.paragraph2')}</p>
      <p>
        <Trans
          i18n={i18n}
          i18nKey="myJourney.certi.paragraph3"
          components={[
            <a
              className="text-gradient-certi"
              href="https://anhanguera.com"
              target="_blank"
              rel="noopener noreferrer"
            />,
          ]}
        />
      </p>
    </Milestone>
  )
})

Certi.displayName = 'Certi'
