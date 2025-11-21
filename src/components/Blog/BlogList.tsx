import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllPosts, getAllTags } from '../../utils/blog'

export const BlogList = () => {
  const allPosts = getAllPosts()
  const allTags = getAllTags()
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  console.log('Loaded posts:', allPosts)

  const filteredPosts = selectedTag
    ? allPosts.filter((post) => post.tags.includes(selectedTag))
    : allPosts

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <section className="blog">
      <Link to="/" className="nav-link">
        ← Back to Home
      </Link>
      <header className="blog-header">
        <h2 className="blog-title">
          <span className="text-gradient-sunset">pedromoratelli</span>/
          <span className="text-gradient-sky">blog</span>
        </h2>
        <p className="blog-subtitle">Reflections on code, career, and the industry.</p>
      </header>

      {allTags.length > 0 && (
        <div className="tag-filter">
          <button
            className={selectedTag === null ? 'active' : ''}
            onClick={() => setSelectedTag(null)}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              className={selectedTag === tag ? 'active' : ''}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      <div className="blog-posts">
        {filteredPosts.length === 0 && <p>No blog posts found. Check the console for errors.</p>}
        {filteredPosts.map((post) => (
          <article key={post.slug} className="blog-post-preview">
            <header>
              <div>
                <h1>
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h1>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </div>
            </header>
            <p>{post.excerpt}</p>
            {post.tags.length > 0 && (
              <div className="tags">
                {post.tags.map((tag, index) => {
                  const gradients = ['sky', 'mint', 'lime', 'peach', 'sunset']
                  const gradientClass = gradients[index % gradients.length]
                  return (
                    <span key={tag} className={`border-gradient-${gradientClass}`}>
                      {tag}
                    </span>
                  )
                })}
              </div>
            )}
            <Link to={`/blog/${post.slug}`} className="read-more">
              Read more →
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
