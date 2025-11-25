import { expect, test } from '@playwright/test'

test.describe('Blog Navigation', () => {
  test('navigates to blog list from homepage', async ({ page }) => {
    await page.goto('/')

    // Find and click blog link
    const blogLink = page.getByRole('link', { name: /blog/i })
    await blogLink.click()

    // Should be on blog page
    await expect(page).toHaveURL(/\/blog/)

    // Should see blog section
    await expect(page.locator('.blog')).toBeVisible()
  })

  test('filters blog posts by tag', async ({ page }) => {
    await page.goto('/blog')

    // Wait for posts to load
    await page.waitForSelector('.blog-post-preview', { timeout: 5000 })

    // Count initial posts
    const initialCount = await page.locator('.blog-post-preview').count()
    expect(initialCount).toBeGreaterThan(0)

    // Click a tag if available
    const firstTag = page.locator('.tag').first()
    if (await firstTag.isVisible()) {
      await firstTag.click()

      // Posts should be filtered (count may change)
      await page.waitForTimeout(100)
      const filteredCount = await page.locator('.blog-post-preview').count()
      expect(filteredCount).toBeGreaterThan(0)
    }
  })

  test('navigates to individual blog post', async ({ page }) => {
    await page.goto('/blog')

    // Wait for posts to load
    await page.waitForSelector('.blog-post-preview', { timeout: 5000 })

    // Click first post link
    const firstPostLink = page.locator('.blog-post-preview a').first()
    await firstPostLink.click()

    // Should be on post page
    await expect(page).toHaveURL(/\/blog\/.+/)

    // Should see post content
    await expect(page.locator('article')).toBeVisible()
  })

  test('renders markdown content properly', async ({ page }) => {
    await page.goto('/blog')

    // Wait for posts to load
    await page.waitForSelector('.blog-post-preview', { timeout: 5000 })

    // Click first post link
    await page.locator('.blog-post-preview a').first().click()

    // Wait for navigation
    await page.waitForURL(/\/blog\/.+/)

    // Check for markdown elements
    const article = page.locator('article.blog-post')
    await expect(article).toBeVisible()

    // Should have headings
    const headings = article.locator('h1, h2, h3')
    const headingCount = await headings.count()
    expect(headingCount).toBeGreaterThan(0)
  })

  test('navigates back to blog list from post', async ({ page }) => {
    await page.goto('/blog')
    await page.waitForSelector('.blog-post-preview', { timeout: 5000 })
    await page.locator('.blog-post-preview a').first().click()
    await page.waitForURL(/\/blog\/.+/)

    // Find and click back link
    const backLink = page.getByRole('link', { name: /back to blog/i })
    await backLink.click()

    // Should be back on blog list
    await expect(page).toHaveURL(/\/blog$/)
  })
})
