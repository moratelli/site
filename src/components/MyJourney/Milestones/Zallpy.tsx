import { Trans, useTranslation } from 'react-i18next'
import {
  workingAtZallpy1xWebp,
  workingAtZallpy2xWebp,
  workingAtZallpy3xWebp,
  workingAtZallpyJpeg,
  zallpy1xWebp,
  zallpy2xWebp,
  zallpyPng,
} from '../../../assets/assets'

export const Zallpy = () => {
  const { t, i18n } = useTranslation()

  const infoBits: string[] = t('myJourney.zallpy.info_bits', { returnObjects: true })

  return (
    <article className="zallpy">
      <div>
        <header>
          <div>
            <h1 className="text-gradient-zallpy">Zallpy Digital</h1>
            <h3 className="text-gradient-zallpy">{t('myJourney.zallpy.dates')}</h3>
          </div>
          <picture>
            <source type="image/webp" srcSet={`${zallpy1xWebp} 1x, ${zallpy2xWebp} 2x`} />
            <img
              src={zallpyPng}
              srcSet={`${zallpy1xWebp} 1x, ${zallpy2xWebp} 2x`}
              alt="Zallpy Digital's logo"
            />
          </picture>
        </header>
        <p>
          <Trans
            i18n={i18n}
            i18nKey="myJourney.zallpy.paragraph_1"
            components={[
              <a className="text-gradient-zallpy" href="https://zallpy.com" target="_blank" />,
              <a
                className="text-gradient-zallpy"
                href="https://apps.apple.com/us/app/my-bmw/id1519034860"
                target="_blank"
                id="myBmwLink"
              />,
              <a
                className="text-gradient-zallpy"
                href="https://apps.apple.com/us/app/mini/id1519458349"
                target="_blank"
                id="miniLink"
              />,
            ]}
          />
        </p>
        <p>
          <Trans
            i18n={i18n}
            i18nKey="myJourney.zallpy.paragraph_2"
            components={[
              <a
                href="https://medium.com/mobilepeople/backend-for-frontend-pattern-why-you-need-to-know-it-46f94ce420b0"
                target="_blank"
                className="text-gradient-zallpy"
              />,
            ]}
          />
        </p>
        <ul className="info-bits">
          {infoBits.map((bit, i) => (
            <li key={i}>{bit}</li>
          ))}
        </ul>
      </div>
      <div className="photo-container">
        <div className="photo-with-subtitles">
          <picture>
            <source
              type="image/webp"
              srcSet={`${workingAtZallpy1xWebp} 1x, ${workingAtZallpy2xWebp} 2x, ${workingAtZallpy3xWebp} 3x`}
            />
            <img
              src={workingAtZallpyJpeg}
              srcSet={`${workingAtZallpy1xWebp} 1x, ${workingAtZallpy2xWebp} 2x, ${workingAtZallpy3xWebp} 3x`}
              alt="A work selfie"
            />
          </picture>
          <p>{t('zallpy.photo_caption', 'IN THE OFFICE')}</p>
        </div>
      </div>
    </article>
  )
}
