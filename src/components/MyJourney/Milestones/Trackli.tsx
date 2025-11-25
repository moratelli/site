import { trackli1xWebp, trackli2xWebp, trackliPng } from '@assets/assets'
import { Tags } from '@components/Tags/Tags'
import { memo } from 'react'
import { Trans, useTranslation } from 'react-i18next'

export const Trackli = memo(() => {
  const { t, i18n } = useTranslation()
  const tags = t('myJourney.trackli.tags', { returnObjects: true }) as string[]

  return (
    <article className="trackli">
      <div>
        <header>
          <div>
            <h1 className="text-gradient-trackli">Trackli</h1>
            <h3 className="text-gradient-trackli">{t('myJourney.trackli.dates')}</h3>
          </div>
          <a href="https://trackli.com.br" target="_blank" rel="noopener noreferrer">
            <picture>
              <source type="image/webp" srcSet={`${trackli1xWebp} 1x, ${trackli2xWebp} 2x`} />
              <img
                src={trackliPng}
                srcSet={`${trackli1xWebp} 1x, ${trackli2xWebp} 2x`}
                alt="Trackli's logo"
              />
            </picture>
          </a>
        </header>
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
        <Tags tags={tags} />
      </div>
    </article>
  )
})

Trackli.displayName = 'Trackli'
