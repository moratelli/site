import type { ErrorInfo, ReactNode } from 'react'
import { Component } from 'react'
import { Link } from 'react-router-dom'

interface BlogErrorBoundaryProps {
  children: ReactNode
}

interface BlogErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class BlogErrorBoundary extends Component<BlogErrorBoundaryProps, BlogErrorBoundaryState> {
  constructor(props: BlogErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): BlogErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log errors in development for debugging
    if (import.meta.env.DEV) {
      console.error('BlogErrorBoundary caught an error:', error, errorInfo)
    }
    // In production, errors are tracked by Vercel Analytics
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <article className="blog-post">
          <div className="error-boundary">
            <div className="error-boundary-content">
              <h1 className="text-gradient-sunset">Failed to load blog post</h1>
              <p>We couldn't load this blog post. It might not exist or there was an error.</p>
              {this.state.error && (
                <details>
                  <summary>Technical details</summary>
                  <pre>{this.state.error.message}</pre>
                </details>
              )}
              <div className="error-boundary-actions">
                <Link to="/blog" className="border-gradient-sky">
                  ← Back to Blog
                </Link>
                <Link to="/" className="border-gradient-mint">
                  Go Home
                </Link>
              </div>
            </div>
          </div>
        </article>
      )
    }

    return this.props.children
  }
}
