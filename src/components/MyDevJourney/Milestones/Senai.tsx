import {
  classAtSenai1xWebp,
  classAtSenai2xWebp,
  classAtSenai3xWebp,
  classAtSenaiJpeg,
  senai1xWebp,
  senai2xWebp,
  senaiPng,
} from '../../../assets/assets'

export const Senai = () => (
  <article className="school">
    <div>
      <header>
        <div>
          <h1 className="text-gradient-sky">Education</h1>
          <h3 className="text-gradient-sky">2019 - 2020</h3>
        </div>
        <picture>
          <source type="image/webp" srcSet={`${senai1xWebp} 1x, ${senai2xWebp} 2x`} />
          <img src={senaiPng} srcSet={`${senai1xWebp} 1x, ${senai2xWebp} 2x`} alt="SENAI's logo" />
        </picture>
      </header>
      <p>
        My software development journey began at{' '}
        <a className="text-gradient-sky" href="https://sc.senai.br/" target="_blank">
          SENAI
        </a>
        , in Florianópolis, Brazil
      </p>
      <p>
        There, I learned the fundamentals of web development, including React, Node.js, and SQL,
        alongside the principles of good software practices
      </p>
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
        <p>CLASS AT SENAI</p>
      </div>
    </div>
  </article>
)
