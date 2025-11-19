import { Trans, useTranslation } from 'react-i18next'
import { philips1xWebp, philips2xWebp, philipsPng } from '../../../assets/assets'

export const Philips = () => {
  const { t, i18n } = useTranslation()

  return (
    <article className="philips">
      <div>
        <header>
          <div>
            <h1 className="text-gradient-philips">Philips</h1>
            <h3 className="text-gradient-philips">{t('myJourney.philips.dates')}</h3>
          </div>
          <picture>
            <source type="image/webp" srcSet={`${philips1xWebp} 1x, ${philips2xWebp} 2x`} />
            <img
              src={philipsPng}
              srcSet={`${philips1xWebp} 1x, ${philips2xWebp} 2x`}
              alt="Philips's logo"
            />
          </picture>
        </header>
        <p>
          <Trans
            i18n={i18n}
            i18nKey="myJourney.philips.paragraph1"
            components={[
              <a
                className="text-gradient-philips"
                href="https://www.philips.com.br/healthcare/resources/landing/solucao-tasy"
                target="_blank"
              />,
            ]}
          />
        </p>
        <p>{t('myJourney.philips.paragraph2')}</p>
      </div>
    </article>
  )
}
