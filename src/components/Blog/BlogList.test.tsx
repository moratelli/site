import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { render } from '../../test/test-utils'
import { getAllPosts, getAllTags } from '../../utils/blog'
import { BlogList } from './BlogList'

// Mock the blog utilities
vi.mock('../../utils/blog', () => ({
  getAllPosts: vi.fn(),
  getAllTags: vi.fn(),
  getPostsByTag: vi.fn(),
}))

describe('BlogList', () => {
  const mockPosts = [
    {
      title: 'Welcome to My Blog',
      date: '2025-01-15',
      slug: 'welcome-to-my-blog',
      tags: ['react', 'typescript'],
      excerpt: 'This is my first blog post',
      content: '# Welcome',
    },
    {
      title: 'Building Type-Safe i18n',
      date: '2025-01-10',
      slug: 'building-type-safe-i18n-react',
      tags: ['react', 'i18n', 'typescript'],
      excerpt: 'Learn how to build type-safe i18n',
      content: '# i18n Guide',
    },
  ]

  const mockTags = ['react', 'typescript', 'i18n']

  beforeEach(() => {
    vi.mocked(getAllPosts).mockReturnValue(mockPosts)
    vi.mocked(getAllTags).mockReturnValue(mockTags)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render the BlogBrand component', () => {
    render(<BlogList />)
    expect(screen.getByText('pedromoratelli')).toBeInTheDocument()
    expect(screen.getByText('blog')).toBeInTheDocument()
  })

  it('should render all blog posts', () => {
    render(<BlogList />)

    expect(screen.getByText('Welcome to My Blog')).toBeInTheDocument()
    expect(screen.getByText('Building Type-Safe i18n')).toBeInTheDocument()
    expect(screen.getByText('This is my first blog post')).toBeInTheDocument()
    expect(screen.getByText('Learn how to build type-safe i18n')).toBeInTheDocument()
  })

  it('should format dates correctly', () => {
    render(<BlogList />)

    // Dates should display correctly (note: behavior depends on timezone)
    // 2025-01-15 and 2025-01-10 respectively
    expect(screen.getByText('15 January 2025')).toBeInTheDocument()
    expect(screen.getByText('10 January 2025')).toBeInTheDocument()
  })

  it('should render all tags as filter buttons', () => {
    render(<BlogList />)

    const tagFilter = document.querySelector('.tag-filter')
    expect(tagFilter).toBeInTheDocument()

    // Check filter buttons exist (there are duplicate tag buttons in posts)
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: 'react' }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('button', { name: 'typescript' }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('button', { name: 'i18n' }).length).toBeGreaterThan(0)
  })

  it('should filter posts by selected tag', async () => {
    const user = userEvent.setup()
    render(<BlogList />)

    // Initially shows all posts
    expect(screen.getByText('Welcome to My Blog')).toBeInTheDocument()
    expect(screen.getByText('Building Type-Safe i18n')).toBeInTheDocument()

    // Click on 'i18n' tag filter
    const i18nFilterButton = screen.getAllByRole('button', { name: 'i18n' })[0]
    await user.click(i18nFilterButton)

    // Should only show posts with 'i18n' tag
    await waitFor(() => {
      expect(screen.queryByText('Welcome to My Blog')).not.toBeInTheDocument()
      expect(screen.getByText('Building Type-Safe i18n')).toBeInTheDocument()
    })
  })

  it('should show all posts when "All" button is clicked', async () => {
    const user = userEvent.setup()
    render(<BlogList />)

    // Click on a specific tag first
    const reactFilterButton = screen.getAllByRole('button', { name: 'react' })[0]
    await user.click(reactFilterButton)

    // Then click "All" to reset filter
    const allButton = screen.getByRole('button', { name: 'All' })
    await user.click(allButton)

    // Should show all posts again
    await waitFor(() => {
      expect(screen.getByText('Welcome to My Blog')).toBeInTheDocument()
      expect(screen.getByText('Building Type-Safe i18n')).toBeInTheDocument()
    })
  })

  it('should highlight active filter button', async () => {
    const user = userEvent.setup()
    render(<BlogList />)

    const allButton = screen.getByRole('button', { name: 'All' })
    expect(allButton).toHaveClass('active')

    // Click on 'typescript' tag
    const typescriptFilterButton = screen.getAllByRole('button', { name: 'typescript' })[0]
    await user.click(typescriptFilterButton)

    await waitFor(() => {
      expect(allButton).not.toHaveClass('active')
      expect(typescriptFilterButton).toHaveClass('active')
    })
  })

  it('should display empty state when no posts match filter', async () => {
    const user = userEvent.setup()
    vi.mocked(getAllTags).mockReturnValue([...mockTags, 'python'])

    render(<BlogList />)

    // Click on tag that no posts have
    const pythonButton = screen.getByRole('button', { name: 'python' })
    await user.click(pythonButton)

    await waitFor(() => {
      expect(screen.getByText('No blog posts found.')).toBeInTheDocument()
      expect(screen.queryByText('Welcome to My Blog')).not.toBeInTheDocument()
    })
  })

  it('should render post tags as clickable buttons', async () => {
    const user = userEvent.setup()
    render(<BlogList />)

    const firstPost = screen.getByText('Welcome to My Blog').closest('article')
    expect(firstPost).toBeInTheDocument()

    const postTags = within(firstPost!).getAllByRole('button')
    expect(postTags.length).toBe(2) // react and typescript

    // Click on a tag within post to filter
    const reactButton = postTags.find((btn) => btn.textContent === 'react')
    expect(reactButton).toBeDefined()

    await user.click(reactButton!)

    // Check that the filter in tag-filter section is now active for 'react'
    await waitFor(() => {
      const tagFilter = document.querySelector('.tag-filter')
      const reactFilterButton = within(tagFilter as HTMLElement).getByRole('button', {
        name: 'react',
      })
      expect(reactFilterButton).toHaveClass('active')
    })
  })

  it('should render "Read more" links for each post', () => {
    render(<BlogList />)

    const readMoreLinks = screen.getAllByText('Read more →')
    expect(readMoreLinks).toHaveLength(2)

    expect(readMoreLinks[0]).toHaveAttribute('href', '/blog/welcome-to-my-blog')
    expect(readMoreLinks[1]).toHaveAttribute('href', '/blog/building-type-safe-i18n-react')
  })

  it('should render post titles as links', () => {
    render(<BlogList />)

    const titleLink1 = screen.getByRole('link', { name: 'Welcome to My Blog' })
    const titleLink2 = screen.getByRole('link', { name: 'Building Type-Safe i18n' })

    expect(titleLink1).toHaveAttribute('href', '/blog/welcome-to-my-blog')
    expect(titleLink2).toHaveAttribute('href', '/blog/building-type-safe-i18n-react')
  })

  it('should display message when there are no posts at all', () => {
    vi.mocked(getAllPosts).mockReturnValue([])
    vi.mocked(getAllTags).mockReturnValue([])

    render(<BlogList />)

    expect(screen.getByText('No blog posts found.')).toBeInTheDocument()
  })

  it('should not render tag filter section when there are no tags', () => {
    vi.mocked(getAllTags).mockReturnValue([])

    render(<BlogList />)

    expect(screen.queryByRole('button', { name: 'All' })).not.toBeInTheDocument()
  })
})
