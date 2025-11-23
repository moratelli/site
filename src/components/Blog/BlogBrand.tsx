import { Link } from 'react-router-dom'

export const BlogBrand = () => {
  return (
    <header className="blog-brand">
      <h2 className="blog-brand-title">
        <Link to="/" className="blog-brand-part" title="Go to the Home Page">
          <span className="text-gradient-sunset">pedromoratelli</span>
        </Link>
        <span className="blog-brand-slash">/</span>
        <Link to="/blog" className="blog-brand-part" title="Go to the Blog Page">
          <span className="text-gradient-sky">blog</span>
        </Link>
      </h2>
      <p className="blog-brand-subtitle">Reflections on code, career, and the industry.</p>
    </header>
  )
}
