import { useTranslation } from 'react-i18next'
import {
  laraAndI1xWebp,
  laraAndI2xWebp,
  laraAndI3xWebp,
  laraAndIJpeg,
  ottawa1xWebp,
  ottawa2xWebp,
  ottawa3xWebp,
  ottawaJpeg,
  panda1xWebp,
  panda2xWebp,
  panda3xWebp,
  pandaJpeg,
  paris1xWebp,
  paris2xWebp,
  paris3xWebp,
  parisJpeg,
  passport1xWebp,
  passport2xWebp,
  passportPng,
} from '../../../assets/assets'

export const Today = () => {
  const { t } = useTranslation()

  return (
    <article className="today">
      <div>
        <h1 className="text-gradient-lime">{t('today.title', 'Today')}</h1>
        <p>{t('today.paragraph1')}</p>
        <p>{t('today.paragraph2')}</p>
      </div>
      <aside>
        <picture>
          <source type="image/webp" srcSet={`${passport1xWebp} 1x, ${passport2xWebp} 2x`} />
          <img
            id="passport"
            src={passportPng}
            srcSet={`${passport1xWebp} 1x, ${passport2xWebp} 2x`}
            alt="An image of a passport and a plane ticket"
          />
        </picture>
        <div className="photo">
          <picture>
            <source
              type="image/webp"
              srcSet={`${paris1xWebp} 1x, ${paris2xWebp} 2x, ${paris3xWebp} 3x`}
            />
            <img
              src={parisJpeg}
              srcSet={`${paris1xWebp} 1x, ${paris2xWebp} 2x, ${paris3xWebp} 3x`}
              alt="A picture of Paris, France"
            />
          </picture>
        </div>
        <div className="photo">
          <picture>
            <source
              type="image/webp"
              srcSet={`${ottawa1xWebp} 1x, ${ottawa2xWebp} 2x, ${ottawa3xWebp} 3x`}
            />
            <img
              src={ottawaJpeg}
              srcSet={`${ottawa1xWebp} 1x, ${ottawa2xWebp} 2x, ${ottawa3xWebp} 3x`}
              alt="A picture of Ottawa, Canada"
            />
          </picture>
        </div>
        <div className="photo">
          <picture>
            <source
              type="image/webp"
              srcSet={`${laraAndI1xWebp} 1x, ${laraAndI2xWebp} 2x, ${laraAndI3xWebp} 3x`}
            />
            <img
              src={laraAndIJpeg}
              srcSet={`${laraAndI1xWebp} 1x, ${laraAndI2xWebp} 2x, ${laraAndI3xWebp} 3x`}
              alt="A photo of Lara and I"
            />
          </picture>
        </div>
        <div className="photo">
          <picture>
            <source
              type="image/webp"
              srcSet={`${panda1xWebp} 1x, ${panda2xWebp} 2x, ${panda3xWebp} 3x`}
            />
            <img
              src={pandaJpeg}
              srcSet={`${panda1xWebp} 1x, ${panda2xWebp} 2x, ${panda3xWebp} 3x`}
              alt="A photo of our cat Panda"
            />
          </picture>
        </div>
      </aside>
    </article>
  )
}
