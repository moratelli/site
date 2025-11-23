import { useAtom } from 'jotai'
import { Link } from 'react-router-dom'
import { getAllPosts, getAllTags } from '../../utils/blog'
import { selectedTagAtom } from './blogAtoms'
import { BlogBrand } from './BlogBrand'

export const BlogList = () => {
  const allPosts = getAllPosts()
  const allTags = getAllTags()
  const [selectedTag, setSelectedTag] = useAtom(selectedTagAtom)

  const handleTagClick = (tag: string | null) => {
    setSelectedTag(tag)
  }

  const filteredPosts = selectedTag
    ? allPosts.filter((post) => post.tags.includes(selectedTag))
    : allPosts

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)

    return date.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <section className="blog">
      <BlogBrand />

      {allTags.length > 0 && (
        <div className="tag-filter">
          <button
            className={selectedTag === null ? 'active' : ''}
            onClick={() => handleTagClick(null)}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              className={selectedTag === tag ? 'active' : ''}
              onClick={() => handleTagClick(tag)}
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
            {post.tags.length > 0 && (
              <ul className="tags">
                {post.tags.map((tag) => (
                  <li key={tag}>
                    <button onClick={() => handleTagClick(tag)}>{tag}</button>
                  </li>
                ))}
              </ul>
            )}
            <p>{post.excerpt}</p>
            <Link to={`/blog/${post.slug}`} className="read-more">
              Read more →
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
