import { useTranslation } from 'react-i18next'

export const Skills = () => {
  const { t } = useTranslation()
  const skills = t('skills.list', { returnObjects: true }) as string[]

  return (
    <section className="skills">
      <h2 className="section-title">{t('skills.title', 'Skills')}</h2>
      <ul>
        {skills.map((skill) => (
          <li key={skill} className="border-gradient-sky">
            <span className="text-gradient-lime">{skill}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
