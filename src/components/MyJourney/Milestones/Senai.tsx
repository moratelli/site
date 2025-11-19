import { Trans, useTranslation } from 'react-i18next'
import {
  classAtSenai1xWebp,
  classAtSenai2xWebp,
  classAtSenai3xWebp,
  classAtSenaiJpeg,
  senai1xWebp,
  senai2xWebp,
  senaiPng,
} from '../../../assets/assets'

export const Senai = () => {
  const { t, i18n } = useTranslation()

  return (
    <article className="school">
      <div>
        <header>
          <div>
            <h1 className="text-gradient-sky">{t('myJourney.school.title')}</h1>
            <h3 className="text-gradient-sky">{t('myJourney.school.dates')}</h3>
          </div>
          <picture>
            <source type="image/webp" srcSet={`${senai1xWebp} 1x, ${senai2xWebp} 2x`} />
            <img
              src={senaiPng}
              srcSet={`${senai1xWebp} 1x, ${senai2xWebp} 2x`}
              alt="SENAI's logo"
            />
          </picture>
        </header>
        <Trans
          i18n={i18n}
          i18nKey="myJourney.school.paragraph1"
          components={[
            <a className="text-gradient-sky" href="https://www.senai.br" target="_blank" />,
          ]}
        />
        <p>{t('myJourney.school.paragraph2')}</p>
      </div>
      <div className="photo-container">
        <div className="photo-with-subtitles">
          <picture>
            <source
              type="image/webp"
              srcSet={`${classAtSenai1xWebp} 1x, ${classAtSenai2xWebp} 2x, ${classAtSenai3xWebp} 3x`}
            />
            <img
              src={classAtSenaiJpeg}
              srcSet={`${classAtSenai1xWebp} 1x, ${classAtSenai2xWebp} 2x, ${classAtSenai3xWebp} 3x`}
              alt="The logo of SENAI"
            />
          </picture>
          <p>{t('myJourney.school.photoCaption', 'CLASS AT SENAI')}</p>
        </div>
      </div>
    </article>
  )
}
