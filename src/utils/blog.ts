import type { BlogPost } from '../types/blog'

// Dynamically import all markdown files from the blog directory
const blogPostsRaw = import.meta.glob<string>('../content/blog/en/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

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

/**
 * Browser-compatible YAML frontmatter parser for markdown blog posts.
 *
 * Parses simple YAML frontmatter (key: value pairs and arrays with []) without Node.js dependencies.
 * Does not support complex YAML features (nested objects, multi-line strings, etc.).
 *
 * @param markdown - Raw markdown string with optional frontmatter delimited by ---
 * @returns Parsed frontmatter data object and remaining content
 *
 * @example
 * ```typescript
 * const result = parseFrontmatter(`---
 * title: 'My Post'
 * tags: ['react', 'typescript']
 * ---
 * # Content here
 * `)
 * // result.data = { title: 'My Post', tags: ['react', 'typescript'] }
 * // result.content = '# Content here'
 * ```
 */
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
    for (const path in blogPostsRaw) {
      const markdown = blogPostsRaw[path]
      if (!markdown) {
        continue
      }

      // Extract slug from file path (e.g., '../content/blog/en/welcome-to-my-blog.md' -> 'welcome-to-my-blog')
      const slug = path.split('/').pop()?.replace('.md', '') ?? ''

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
    // In production, this error will be caught by ErrorBoundary
    // Development errors will be visible in the console anyway
    if (import.meta.env.DEV) {
      console.error('Error loading blog posts:', error)
    }
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
