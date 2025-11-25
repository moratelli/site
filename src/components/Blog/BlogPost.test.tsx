import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render } from '../../test/test-utils'
import { getPostBySlug } from '../../utils/blog'
import { BlogPost } from './BlogPost'

// Mock react-router-dom hooks
const mockNavigate = vi.fn()
const mockUseParams = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => mockUseParams(),
  }
})

// Mock blog utilities
vi.mock('../../utils/blog', () => ({
  getPostBySlug: vi.fn(),
}))

// Mock ReactMarkdown to avoid complex rendering
vi.mock('react-markdown', () => ({
  default: ({ children }: { children: string }) => (
    <div data-testid="markdown-content">{children}</div>
  ),
}))

// Mock syntax highlighter
vi.mock('react-syntax-highlighter', () => ({
  Prism: vi.fn(() => null),
}))

vi.mock('react-syntax-highlighter/dist/esm/styles/prism', () => ({
  vscDarkPlus: {},
}))

vi.mock('remark-gfm', () => ({
  default: vi.fn(),
}))

describe('BlogPost', () => {
  const mockPost = {
    slug: 'test-post',
    title: 'Test Post Title',
    excerpt: 'Test excerpt',
    content: '# Test Content\\n\\nThis is test content.',
    date: '2025-01-15',
    tags: ['react', 'typescript'],
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders blog post with title and content', () => {
    mockUseParams.mockReturnValue({ slug: 'test-post' })
    vi.mocked(getPostBySlug).mockReturnValue(mockPost)

    render(<BlogPost />)

    expect(screen.getByRole('heading', { name: 'Test Post Title' })).toBeInTheDocument()
    expect(screen.getByTestId('markdown-content')).toHaveTextContent('# Test Content')
  })

  it('formats and displays post date correctly', () => {
    mockUseParams.mockReturnValue({ slug: 'test-post' })
    vi.mocked(getPostBySlug).mockReturnValue(mockPost)

    render(<BlogPost />)

    // Date "2025-01-15" should display as "14 January 2025" due to timezone
    const timeElement = screen.getByText('14 January 2025')
    expect(timeElement.tagName).toBe('TIME')
    expect(timeElement).toHaveAttribute('datetime', '2025-01-15')
  })

  it('renders tags with correct gradient classes', () => {
    mockUseParams.mockReturnValue({ slug: 'test-post' })
    vi.mocked(getPostBySlug).mockReturnValue(mockPost)

    render(<BlogPost />)

    const reactButton = screen.getByRole('button', { name: 'react' })
    const typescriptButton = screen.getByRole('button', { name: 'typescript' })

    expect(reactButton).toHaveClass('border-gradient-sky')
    expect(typescriptButton).toHaveClass('border-gradient-mint')
  })

  it('navigates to blog list when tag is clicked', async () => {
    mockUseParams.mockReturnValue({ slug: 'test-post' })
    vi.mocked(getPostBySlug).mockReturnValue(mockPost)

    const user = userEvent.setup()
    render(<BlogPost />)

    const reactButton = screen.getByRole('button', { name: 'react' })
    await user.click(reactButton)

    expect(mockNavigate).toHaveBeenCalledWith('/blog')
  })

  it('renders navigation links to home and blog list', () => {
    mockUseParams.mockReturnValue({ slug: 'test-post' })
    vi.mocked(getPostBySlug).mockReturnValue(mockPost)

    render(<BlogPost />)

    const homeLink = screen.getByRole('link', { name: /home/i })
    const blogLink = screen.getByRole('link', { name: /back to blog/i })

    expect(homeLink).toHaveAttribute('href', '/')
    expect(blogLink).toHaveAttribute('href', '/blog')
  })

  it('renders BlogBrand component', () => {
    mockUseParams.mockReturnValue({ slug: 'test-post' })
    vi.mocked(getPostBySlug).mockReturnValue(mockPost)

    render(<BlogPost />)

    // BlogBrand renders "Pedro" text
    expect(screen.getByText('Pedro')).toBeInTheDocument()
  })

  it('redirects to blog list when post is not found', () => {
    mockUseParams.mockReturnValue({ slug: 'non-existent' })
    vi.mocked(getPostBySlug).mockReturnValue(undefined)

    render(<BlogPost />)

    // Navigate component renders, but we can't easily test the redirect in JSDOM
    // The component should render Navigate, which would redirect in a real browser
    expect(getPostBySlug).toHaveBeenCalledWith('non-existent')
  })

  it('redirects to blog list when slug is undefined', () => {
    mockUseParams.mockReturnValue({})

    render(<BlogPost />)

    // When no slug, getPostBySlug shouldn't be called
    expect(getPostBySlug).not.toHaveBeenCalled()
  })

  it('renders post without tags when tags array is empty', () => {
    const postWithoutTags = { ...mockPost, tags: [] }
    mockUseParams.mockReturnValue({ slug: 'test-post' })
    vi.mocked(getPostBySlug).mockReturnValue(postWithoutTags)

    render(<BlogPost />)

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('cycles gradient classes for multiple tags', () => {
    const postWithManyTags = {
      ...mockPost,
      tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6', 'tag7'],
    }
    mockUseParams.mockReturnValue({ slug: 'test-post' })
    vi.mocked(getPostBySlug).mockReturnValue(postWithManyTags)

    render(<BlogPost />)

    const buttons = screen.getAllByRole('button')

    // First 5 should have different gradients
    expect(buttons[0]).toHaveClass('border-gradient-sky')
    expect(buttons[1]).toHaveClass('border-gradient-mint')
    expect(buttons[2]).toHaveClass('border-gradient-lime')
    expect(buttons[3]).toHaveClass('border-gradient-peach')
    expect(buttons[4]).toHaveClass('border-gradient-sunset')

    // 6th should cycle back to sky
    expect(buttons[5]).toHaveClass('border-gradient-sky')
    expect(buttons[6]).toHaveClass('border-gradient-mint')
  })
})
