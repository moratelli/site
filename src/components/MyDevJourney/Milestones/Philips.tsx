import { philips1xWebp, philips2xWebp, philipsPng } from '../../../assets/assets'

export const Philips = () => (
  <article className="philips">
    <div>
      <header>
        <div>
          <h1 className="text-gradient-philips">Philips</h1>
          <h3 className="text-gradient-philips">Aug 2021 - Dec 2021</h3>
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
        I worked in maintaining and developing new features for{' '}
        <a
          className="text-gradient-philips"
          href="https://www.philips.com.br/healthcare/resources/landing/solucao-tasy"
          target="_blank"
        >
          Tasy
        </a>
        , an integrated healthcare management system used by more than 900 health institutions in
        Brazil
      </p>
      <p>Further improved my Web Development skills using AngularJS, JavaScript, and Java</p>
    </div>
  </article>
)
