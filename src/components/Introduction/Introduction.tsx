import { avatar1xWebp, avatar2xWebp, avatar3xWebp, avatarJpeg } from '../../assets/assets'

export const Introduction = () => {
  return (
    <header className="introduction">
      <picture>
        <source
          type="image/webp"
          srcSet={`${avatar1xWebp} 1x, ${avatar2xWebp} 2x, ${avatar3xWebp} 3x`}
        />
        <img
          src={avatarJpeg}
          srcSet={`${avatar1xWebp} 1x, ${avatar2xWebp} 2x, ${avatar3xWebp} 3x`}
          alt="A headshot picture of Pedro Moratelli"
          loading="eager"
          decoding="async"
        />
      </picture>
      <h1>
        Hello! <br />
        I'm <span className="text-gradient-mint">Pedro Moratelli</span>, a{' '}
        <span className="text-gradient-sunset">Tech Lead</span>.
      </h1>
    </header>
  )
}
