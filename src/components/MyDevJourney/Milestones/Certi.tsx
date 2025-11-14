import { certi1xWebp, certi2xWebp, certiPng } from '../../../assets/assets'

export const Certi = () => (
  <article className="certi">
    <div>
      <header>
        <div>
          <h1 className="text-gradient-certi">Fundação CERTI</h1>
          <h3 className="text-gradient-certi">Apr 2020 - Jul 2021</h3>
        </div>
        <picture>
          <source type="image/webp" srcSet={`${certi1xWebp} 1x, ${certi2xWebp} 2x`} />
          <img
            src={certiPng}
            srcSet={`${certi1xWebp} 1x, ${certi2xWebp} 2x`}
            alt="Fundação CERTI's logo"
          />
        </picture>
      </header>
      <p>
        At{' '}
        <a className="text-gradient-certi" href="https://certi.org.br" target="_blank">
          Fundação CERTI
        </a>
        , I helped build a Flutter app that collected data from medical devices and sent that data
        to an AWS Gateway API
      </p>
      <p>I also helped create a dashboard with React and Node.js, using TypeScript</p>
      <p>
        During this time, I learned a great deal about agile software development and I started a
        new degree in Software Development at{' '}
        <a className="text-gradient-certi" href="https://anhanguera.com" target="_blank">
          Anhanguera
        </a>
      </p>
      <ul className="info-bits">
        <li>
          Fundação CERTI is a medium-sized software house specialized in innovation and bleeding
          edge tech
        </li>
      </ul>
    </div>
  </article>
)
