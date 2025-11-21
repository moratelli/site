import { Trans, useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import { avatar1xWebp, avatar2xWebp, avatar3xWebp, avatarJpeg } from '../../assets/assets'

export const Introduction = () => {
  const { i18n } = useTranslation()
  const location = useLocation()
  const isOnBlog = location.pathname.startsWith('/blog')

  return (
    <header className="introduction">
      {isOnBlog && (
        <Link to="/" className="nav-link">
          ← Back to Home
        </Link>
      )}
      {!isOnBlog && (
        <Link to="/blog" className="nav-link">
          Read My Thoughts →
        </Link>
      )}
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
        <Trans
          i18n={i18n}
          i18nKey="introduction.paragraph1"
          components={[<span className="text-gradient-mint" />]}
        />
      </h1>
      <h1>
        <Trans
          i18n={i18n}
          i18nKey="introduction.paragraph2"
          components={[
            <span className="text-gradient-sunset" />,
            <span className="text-gradient-sky" />,
          ]}
        />
      </h1>
    </header>
  )
}
