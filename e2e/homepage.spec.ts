import { expect, test } from '@playwright/test'

test.describe('Homepage', () => {
  test('loads and displays all main sections', async ({ page }) => {
    await page.goto('/')

    // Check Introduction section
    await expect(page.locator('header.introduction')).toBeVisible()

    // Check Skills section
    await expect(page.getByRole('heading', { name: /skills/i })).toBeVisible()

    // Check My Journey section
    await expect(page.getByRole('heading', { name: /my journey/i })).toBeVisible()

    // Check Trusted By section
    await expect(page.getByRole('heading', { name: /trusted by/i })).toBeVisible()

    // Check Footer
    await expect(page.locator('footer')).toBeVisible()
  })

  test('has proper page metadata', async ({ page }) => {
    await page.goto('/')

    // Check title
    await expect(page).toHaveTitle(/pedro moratelli/i)

    // Check meta description exists
    const metaDescription = page.locator('meta[name="description"]')
    await expect(metaDescription).toHaveAttribute('content', /.+/)
  })

  test('renders platform links', async ({ page }) => {
    await page.goto('/')

    // Check for social/platform links
    const links = page.locator('a[href*="github.com"], a[href*="linkedin.com"]')
    await expect(links.first()).toBeVisible()
  })
})
