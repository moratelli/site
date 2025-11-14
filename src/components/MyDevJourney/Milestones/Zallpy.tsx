import {
  workingAtZallpy1xWebp,
  workingAtZallpy2xWebp,
  workingAtZallpy3xWebp,
  workingAtZallpyJpeg,
  zallpy1xWebp,
  zallpy2xWebp,
  zallpyPng,
} from '../../../assets/assets'

export const Zallpy = () => (
  <article className="zallpy">
    <div>
      <header>
        <div>
          <h1 className="text-gradient-zallpy">Zallpy Digital</h1>
          <h3 className="text-gradient-zallpy">Dec 2021 - Present</h3>
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
        I joined{' '}
        <a className="text-gradient-zallpy" href="https://zallpy.com" target="_blank">
          Zallpy Digital
        </a>{' '}
        to integrate a team focused on Mobile Full Stack Development. We develop features for BMW's
        apps:{' '}
        <a
          className="text-gradient-zallpy"
          href="https://apps.apple.com/us/app/my-bmw/id1519034860"
          target="_blank"
          id="myBmwLink"
        >
          My BMW
        </a>{' '}
        and{' '}
        <a
          className="text-gradient-zallpy"
          href="https://apps.apple.com/us/app/mini/id1519458349"
          target="_blank"
          id="miniLink"
        >
          MINI
        </a>
      </p>
      <p>
        It's fun to work again with Flutter and TypeScript. I also get the chance to learn and apply
        modern software design patterns, like{' '}
        <a
          href="https://medium.com/mobilepeople/backend-for-frontend-pattern-why-you-need-to-know-it-46f94ce420b0"
          target="_blank"
          className="text-gradient-zallpy"
        >
          BFFs
        </a>
      </p>
      <ul className="info-bits">
        <li>
          BMW has very high standards regarding software quality, testing, DevOps, and automation
        </li>
        <li>
          I work with multiple teams across the globe in English to deliver high quality software
          features
        </li>
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
        <p>IN THE OFFICE</p>
      </div>
    </div>
  </article>
)
