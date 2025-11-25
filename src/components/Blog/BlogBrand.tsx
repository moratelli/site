import { memo } from 'react'
import { Link } from 'react-router-dom'

/**
 * Blog branding header component displaying the site navigation breadcrumb.
 *
 * Shows "pedromoratelli/blog" style navigation with links to home and blog list.
 * Memoized to prevent unnecessary re-renders.
 */
export const BlogBrand = memo(() => {
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
})

BlogBrand.displayName = 'BlogBrand'
