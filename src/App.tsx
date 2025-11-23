import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { BlogList } from './components/Blog/BlogList'
import { BlogPost } from './components/Blog/BlogPost'
import { HomePage } from './HomePage'

import './css/style.css'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </Router>
  )
}

export default App
