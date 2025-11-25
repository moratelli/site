import { describe, expect, it } from 'vitest'
import { getAllPosts, getAllTags, getPostBySlug, getPostsByTag } from './blog'

describe('blog utilities', () => {
  describe('parseFrontmatter', () => {
    it('should parse blog posts correctly', () => {
      const posts = getAllPosts()
      expect(posts).toBeDefined()
      expect(posts.length).toBeGreaterThan(0)
    })

    it('should return posts sorted by date (newest first)', () => {
      const posts = getAllPosts()
      for (let i = 0; i < posts.length - 1; i++) {
        const currentDate = new Date(posts[i].date).getTime()
        const nextDate = new Date(posts[i + 1].date).getTime()
        expect(currentDate).toBeGreaterThanOrEqual(nextDate)
      }
    })

    it('should parse blog post properties correctly', () => {
      const posts = getAllPosts()
      const post = posts[0]

      expect(post).toHaveProperty('title')
      expect(post).toHaveProperty('date')
      expect(post).toHaveProperty('slug')
      expect(post).toHaveProperty('tags')
      expect(post).toHaveProperty('content')
      expect(Array.isArray(post.tags)).toBe(true)
    })
  })

  describe('getPostBySlug', () => {
    it('should return post when slug exists', () => {
      const post = getPostBySlug('welcome-to-my-blog')
      expect(post).toBeDefined()
      expect(post?.slug).toBe('welcome-to-my-blog')
    })

    it('should return undefined when slug does not exist', () => {
      const post = getPostBySlug('non-existent-slug')
      expect(post).toBeUndefined()
    })
  })

  describe('getAllTags', () => {
    it('should return all unique tags sorted alphabetically', () => {
      const tags = getAllTags()
      expect(tags).toBeDefined()
      expect(Array.isArray(tags)).toBe(true)

      // Check if sorted
      const sorted = [...tags].sort()
      expect(tags).toEqual(sorted)

      // Check uniqueness
      const uniqueTags = new Set(tags)
      expect(tags.length).toBe(uniqueTags.size)
    })
  })

  describe('getPostsByTag', () => {
    it('should return posts with the specified tag', () => {
      const allTags = getAllTags()
      if (allTags.length === 0) return

      const tag = allTags[0]
      const posts = getPostsByTag(tag)

      expect(posts).toBeDefined()
      expect(Array.isArray(posts)).toBe(true)
      posts.forEach((post) => {
        expect(post.tags).toContain(tag)
      })
    })

    it('should return empty array for non-existent tag', () => {
      const posts = getPostsByTag('non-existent-tag-xyz')
      expect(posts).toEqual([])
    })
  })
})
