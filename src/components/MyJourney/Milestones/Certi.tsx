import { Trans, useTranslation } from 'react-i18next'
import { certi1xWebp, certi2xWebp, certiPng } from '../../../assets/assets'

export const Certi = () => {
  const { t, i18n } = useTranslation()

  const infoBits = t('myJourney.certi.infoBits', { returnObjects: true }) as string[]

  return (
    <article className="certi">
      <div>
        <header>
          <div>
            <h1 className="text-gradient-certi">Fundação CERTI</h1>
            <h3 className="text-gradient-certi">{t('myJourney.certi.dates')}</h3>
          </div>
          <picture>
            <source type="image/webp" srcSet={`${certi1xWebp} 1x, ${certi2xWebp} 2x`} />
            <img
              src={certiPng}
              srcSet={`${certi1xWebp} 1x, ${certi2xWebp} 2x`}
              alt="Fundação CERTI's logo"
            />
          </picture>
        </header>{' '}
        <p>
          <Trans
            i18n={i18n}
            i18nKey="myJourney.certi.paragraph1"
            components={[
              <a className="text-gradient-certi" href="https://certi.org.br" target="_blank" />,
            ]}
          />
        </p>
        <p>{t('myJourney.certi.paragraph2')}</p>
        <p>
          <Trans
            i18n={i18n}
            i18nKey="myJourney.certi.paragraph3"
            components={[
              <a className="text-gradient-certi" href="https://anhanguera.com" target="_blank" />,
            ]}
          />
        </p>
        <ul className="info-bits">
          {infoBits.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>
    </article>
  )
}
