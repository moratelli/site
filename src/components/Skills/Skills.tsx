export const Skills = () => {
  const skills = [
    'Team Leadership',
    '.NET Core',
    'Node.js',
    'React & Next.js',
    'Flutter',
    'TypeScript',
    'NestJS',
    'Docker & Kubernetes',
    'Azure',
    'CI/CD & DevOps',
    'French, German & English',
    'International Projects',
  ]

  return (
    <section className="skills">
      <h2 className="section-title">Skills</h2>
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
