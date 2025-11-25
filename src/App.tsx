import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { BlogList } from './components/Blog/BlogList'
import { BlogPost } from './components/Blog/BlogPost'
import { BlogErrorBoundary } from './components/ErrorBoundary/BlogErrorBoundary'
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary'
import { HomePage } from './HomePage'

import './css/style.css'

export const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ErrorBoundary>
                <HomePage />
              </ErrorBoundary>
            }
          />
          <Route
            path="/blog"
            element={
              <ErrorBoundary>
                <BlogList />
              </ErrorBoundary>
            }
          />
          <Route
            path="/blog/:slug"
            element={
              <BlogErrorBoundary>
                <BlogPost />
              </BlogErrorBoundary>
            }
          />
        </Routes>
      </Router>
    </ErrorBoundary>
  )
}
