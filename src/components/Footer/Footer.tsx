import { Trans, useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher'

export const Footer = () => {
  const { i18n } = useTranslation()

  return (
    <footer>
      <nav>
        <ul>
          <li>
            <Link to="/blog">
              <i className="fa fa-comment text-gradient-sunset"></i>
            </Link>
            <p>
              <Trans
                i18n={i18n}
                i18nKey="footer.blog"
                components={[<Link to="/blog" className="text-gradient-sunset" />]}
              />
            </p>
          </li>
          <li>
            <a
              href="https://linkedin.com/in/pedromoratelli"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin text-gradient-sky"></i>
            </a>
            <p>
              <Trans
                i18n={i18n}
                i18nKey="footer.linkedIn"
                components={[
                  <a
                    href="https://linkedin.com/in/pedromoratelli"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gradient-sky"
                  />,
                ]}
              />
            </p>
          </li>
          <li>
            <a href="https://github.com/moratelli" target="_blank" rel="noopener noreferrer">
              <i className="fa fa-github text-gradient-lime"></i>
            </a>
            <p>
              <Trans
                i18n={i18n}
                i18nKey="footer.github"
                components={[
                  <a
                    href="https://github.com/moratelli"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gradient-lime"
                  />,
                ]}
              />
            </p>
          </li>
        </ul>
      </nav>
      <LanguageSwitcher />
    </footer>
  )
}
