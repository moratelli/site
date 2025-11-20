import { useTranslation } from 'react-i18next'
import {
  bmwPng,
  mini1xWebp,
  mini2xWebp,
  miniPng,
  philips1xShieldWebp,
  philips2xShieldWebp,
  philipsShieldPng,
  siemens1xWebp,
  siemens2xWebp,
  siemensPng,
} from '../../assets/assets'

export const TrustedBy = () => {
  const { t } = useTranslation()

  return (
    <section className="trusted-by">
      <h2 className="section-title">{t('trustedBy')}</h2>
      <div className="logos">
        <a href="https://www.bmw.com" target="_blank" rel="noopener noreferrer">
          <picture>
            <img src={bmwPng} alt="BMW logo" />
          </picture>
        </a>
        <a href="https://www.mini.com" target="_blank" rel="noopener noreferrer">
          <picture>
            <source type="image/webp" srcSet={`${mini1xWebp} 1x, ${mini2xWebp} 2x`} />
            <img src={miniPng} alt="Mini logo" />
          </picture>
        </a>
        <a href="https://www.siemens.com" target="_blank" rel="noopener noreferrer">
          <picture>
            <source type="image/webp" srcSet={`${siemens1xWebp} 1x, ${siemens2xWebp} 2x`} />
            <img src={siemensPng} alt="Siemens logo" />
          </picture>
        </a>
        <a
          href="https://www.philips.com.br/healthcare"
          target="_blank"
          rel="noopener noreferrer"
          id="philips-shield"
        >
          <picture>
            <source
              type="image/webp"
              srcSet={`${philips1xShieldWebp} 1x, ${philips2xShieldWebp} 2x`}
            />
            <img src={philipsShieldPng} alt="Philips logo" />
          </picture>
        </a>
      </div>
    </section>
  )
}
