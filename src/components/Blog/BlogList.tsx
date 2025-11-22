import { atom, useAtom } from 'jotai'
import { Link } from 'react-router-dom'
import { getAllPosts, getAllTags } from '../../utils/blog'

const selectedTagAtom = atom<string | null>(null)

export const BlogList = () => {
  const allPosts = getAllPosts()
  const allTags = getAllTags()
  const [selectedTag, setSelectedTag] = useAtom(selectedTagAtom)

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
      <header className="blog-header">
        <h2 className="blog-title">
          <Link to="/" className="blog-title-part">
            <span className="text-gradient-sunset">pedromoratelli</span>
          </Link>
          <span className="blog-title-slash">/</span>
          <Link to="/blog" className="blog-title-part">
            <span className="text-gradient-sky">blog</span>
          </Link>
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
        {filteredPosts.length === 0 && <p>No blog posts found.</p>}
        {filteredPosts.map((post) => (
          <article key={post.slug} className="blog-post-preview">
            <header>
              <div>
                <h1 className="text-gradient-sky">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h1>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </div>
            </header>
            <p>{post.excerpt}</p>
            {post.tags.length > 0 && (
              <ul className="tags">
                {post.tags.map((tag) => (
                  <li key={tag} className="tag">
                    {tag}
                  </li>
                ))}
              </ul>
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
