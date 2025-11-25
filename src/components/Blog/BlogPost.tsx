import { useSetAtom } from 'jotai'
import { useCallback, useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'
import { getPostBySlug } from '../../utils/blog'
import { selectedTagAtom } from './blogAtoms'
import { BlogBrand } from './BlogBrand'

export const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>()
  const post = useMemo(() => (slug ? getPostBySlug(slug) : undefined), [slug])
  const navigate = useNavigate()
  const setSelectedTag = useSetAtom(selectedTagAtom)

  const handleTagClick = useCallback(
    (tag: string) => {
      setSelectedTag(tag)
      navigate('/blog')
    },
    [setSelectedTag, navigate]
  )

  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }, [])

  const markdownComponents = useMemo(
    () => ({
      code({ className, children, ...props }: { className?: string; children?: React.ReactNode }) {
        const match = /language-(\w+)/.exec(className || '')
        const isInline = !match
        return !isInline ? (
          <SyntaxHighlighter style={vscDarkPlus} language={match[1]} PreTag="div">
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        ) : (
          <code className={className} {...props}>
            {children}
          </code>
        )
      },
    }),
    []
  )

  if (!post) {
    return <Navigate to="/blog" replace />
  }

  return (
    <article className="blog-post">
      <BlogBrand />

      <header className="blog-post-header">
        <h1 className="text-gradient-sky">{post.title}</h1>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        {post.tags.length > 0 && (
          <div className="tags">
            {post.tags.map((tag, index) => {
              const gradients = ['sky', 'mint', 'lime', 'peach', 'sunset']
              const gradientClass = gradients[index % gradients.length]
              return (
                <button
                  key={tag}
                  className={`border-gradient-${gradientClass}`}
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </button>
              )
            })}
          </div>
        )}
      </header>

      <div className="blog-post-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
          {post.content}
        </ReactMarkdown>
      </div>

      <div className="blog-post-nav">
        <Link to="/" className="back-link">
          ← Home
        </Link>
        <Link to="/blog" className="back-link">
          ← Back to Blog
        </Link>
      </div>
    </article>
  )
}
