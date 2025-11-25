import { lazy, Suspense } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { BlogErrorBoundary } from './components/ErrorBoundary/BlogErrorBoundary'
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary'

import './css/style.css'

// Lazy load route components
const HomePage = lazy(() => import('./HomePage').then((module) => ({ default: module.HomePage })))
const BlogList = lazy(() =>
  import('./components/Blog/BlogList').then((module) => ({ default: module.BlogList }))
)
const BlogPost = lazy(() =>
  import('./components/Blog/BlogPost').then((module) => ({ default: module.BlogPost }))
)

// Loading component
const LoadingFallback = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
    }}
  >
    <p>Loading...</p>
  </div>
)

export const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ErrorBoundary>
                <Suspense fallback={<LoadingFallback />}>
                  <HomePage />
                </Suspense>
              </ErrorBoundary>
            }
          />
          <Route
            path="/blog"
            element={
              <ErrorBoundary>
                <Suspense fallback={<LoadingFallback />}>
                  <BlogList />
                </Suspense>
              </ErrorBoundary>
            }
          />
          <Route
            path="/blog/:slug"
            element={
              <BlogErrorBoundary>
                <Suspense fallback={<LoadingFallback />}>
                  <BlogPost />
                </Suspense>
              </BlogErrorBoundary>
            }
          />
        </Routes>
      </Router>
    </ErrorBoundary>
  )
}
