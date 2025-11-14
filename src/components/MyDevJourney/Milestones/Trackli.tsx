import { trackli1xWebp, trackli2xWebp, trackliPng } from '../../../assets/assets'

export const Trackli = () => (
  <article className="trackli">
    <div>
      <header>
        <div>
          <h1 className="text-gradient-trackli">Trackli</h1>
          <h3 className="text-gradient-trackli">Jan 2020 - Apr 2020</h3>
        </div>
        <picture>
          <source type="image/webp" srcSet={`${trackli1xWebp} 1x, ${trackli2xWebp} 2x`} />
          <img
            src={trackliPng}
            srcSet={`${trackli1xWebp} 1x, ${trackli2xWebp} 2x`}
            alt="Trackli's logo"
          />
        </picture>
      </header>
      <p>
        <a className="text-gradient-trackli" href="https://trackli.com.br" target="_blank">
          Trackli
        </a>{' '}
        gave me my first opportunity in the field as an intern
      </p>
      <p>
        While there, I worked on creating a new frontend for the company's telemetry platform, using
        HTML, CSS and JavaScript
      </p>
    </div>
  </article>
)
