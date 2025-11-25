import { memo } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { philips1xWebp, philips2xWebp, philipsPng } from '../../../assets/assets'
import { Tags } from '../../Tags/Tags'

export const Philips = memo(() => {
  const { t, i18n } = useTranslation()
  const tags = t('myJourney.philips.tags', { returnObjects: true }) as string[]

  return (
    <article className="philips">
      <div>
        <header>
          <div>
            <h1 className="text-gradient-philips">Philips</h1>
            <h3 className="text-gradient-philips">{t('myJourney.philips.dates')}</h3>
          </div>
          <a href="https://www.philips.com.br/healthcare" target="_blank" rel="noopener noreferrer">
            <picture>
              <source type="image/webp" srcSet={`${philips1xWebp} 1x, ${philips2xWebp} 2x`} />
              <img
                src={philipsPng}
                srcSet={`${philips1xWebp} 1x, ${philips2xWebp} 2x`}
                alt="Philips's logo"
              />
            </picture>
          </a>
        </header>
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
        <Tags tags={tags} />
      </div>
    </article>
  )
})

Philips.displayName = 'Philips'
