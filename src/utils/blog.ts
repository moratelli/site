import type { BlogPost } from '../types/blog'

// Import markdown files directly
import i18nPost from '../content/blog/en/building-type-safe-i18n-react.md?raw'
import welcomePost from '../content/blog/en/welcome-to-my-blog.md?raw'

const blogPostsRaw: Record<string, string> = {
  'welcome-to-my-blog': welcomePost,
  'building-type-safe-i18n-react': i18nPost,
}

interface FrontmatterData {
  title?: string
  date?: string
  excerpt?: string
  slug?: string
  tags?: string[]
  [key: string]: string | string[] | undefined
}

interface ParsedMarkdown {
  data: FrontmatterData
  content: string
}

// Simple frontmatter parser (browser-compatible)
const parseFrontmatter = (markdown: string): ParsedMarkdown => {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
  const match = markdown.match(frontmatterRegex)

  if (!match) {
    return { data: {}, content: markdown }
  }

  const frontmatter = match[1]
  const content = match[2]
  const data: FrontmatterData = {}

  // Parse YAML-like frontmatter
  frontmatter.split('\n').forEach((line) => {
    const colonIndex = line.indexOf(':')
    if (colonIndex === -1) return

    const key = line.substring(0, colonIndex).trim()
    let value: string | string[] = line.substring(colonIndex + 1).trim()

    // Remove quotes
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }

    // Parse arrays
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value
        .slice(1, -1)
        .split(',')
        .map((item: string) => item.trim().replace(/^["']|["']$/g, ''))
    }

    data[key] = value
  })

  return { data, content }
}

export const getAllPosts = (): BlogPost[] => {
  const posts: BlogPost[] = []

  try {
    for (const slug in blogPostsRaw) {
      const markdown = blogPostsRaw[slug]
      if (!markdown) {
        console.warn(`No markdown content for ${slug}`)
        continue
      }

      const { data, content } = parseFrontmatter(markdown)

      posts.push({
        title: data.title ?? 'Untitled',
        date: data.date ?? new Date().toISOString(),
        excerpt: data.excerpt ?? '',
        slug: data.slug ?? slug,
        tags: Array.isArray(data.tags) ? data.tags : [],
        content,
      })
    }
  } catch (error) {
    console.error('Error loading blog posts:', error)
  }

  // Sort by date, newest first
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  const posts = getAllPosts()
  return posts.find((post) => post.slug === slug)
}

export const getAllTags = (): string[] => {
  const posts = getAllPosts()
  const tagSet = new Set<string>()

  posts.forEach((post) => {
    post.tags.forEach((tag) => tagSet.add(tag))
  })

  return Array.from(tagSet).sort()
}

export const getPostsByTag = (tag: string): BlogPost[] => {
  const posts = getAllPosts()
  return posts.filter((post) => post.tags.includes(tag))
}
