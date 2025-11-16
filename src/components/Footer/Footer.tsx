import { Trans, useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher'

export const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer>
      <LanguageSwitcher />
      <nav>
        <ul>
          <li>
            <a href="https://linkedin.com/in/pedromoratelli" target="_blank" rel="noreferrer">
              <i className="fab fa-linkedin text-gradient-sky"></i>
            </a>
            <p>
              <Trans
                i18nKey="footer.linkedIn"
                components={[
                  <a
                    href="https://linkedin.com/in/pedromoratelli"
                    target="_blank"
                    rel="noreferrer"
                    className="text-gradient-sky"
                  />,
                ]}
              />
            </p>
          </li>
          <li>
            <a href="https://linkedin.com/in/pedromoratelli" target="_blank" rel="noreferrer">
              <i className="fa fa-comment text-gradient-sunset"></i>
            </a>
            <p>
              <Trans
                i18nKey="footer.blog"
                components={[
                  <a
                    href="https://linkedin.com/in/pedromoratelli"
                    target="_blank"
                    rel="noreferrer"
                    className="text-gradient-sunset"
                  />,
                ]}
              />
            </p>
          </li>
          <li>
            <a href="https://linkedin.com/in/pedromoratelli" target="_blank" rel="noreferrer">
              <i className="fa fa-file-text text-gradient-lime"></i>
            </a>
            <p>
              <Trans
                i18nKey="footer.resume"
                components={[
                  <a
                    href="https://linkedin.com/in/pedromoratelli"
                    target="_blank"
                    rel="noreferrer"
                    className="text-gradient-lime"
                  />,
                ]}
              />
            </p>
          </li>
        </ul>
      </nav>
    </footer>
  )
}
