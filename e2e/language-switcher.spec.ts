import { expect, test } from '@playwright/test'

test.describe('Language Switcher', () => {
  test('switches language and updates content', async ({ page }) => {
    await page.goto('/')

    // Get initial content
    const introduction = page.locator('header.introduction')
    const initialText = await introduction.textContent()

    // Find and click Portuguese button
    const ptButton = page.getByRole('button', { name: /switch to pt/i })
    await ptButton.click()

    // Wait for content to change
    await expect(introduction).not.toHaveText(initialText || '')

    // Check button is active
    await expect(ptButton).toHaveClass(/active/)
  })

  test('preserves scroll position on language change', async ({ page }) => {
    await page.goto('/')

    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 500))
    await page.waitForTimeout(100)

    const scrollBefore = await page.evaluate(() => window.scrollY)
    expect(scrollBefore).toBeGreaterThan(0)

    // Change language
    await page.getByRole('button', { name: /switch to fr/i }).click()

    // Wait for scroll restoration
    await page.waitForTimeout(200)

    // Should be near the same position (within 50px tolerance)
    const scrollAfter = await page.evaluate(() => window.scrollY)
    expect(Math.abs(scrollAfter - scrollBefore)).toBeLessThan(50)
  })

  test('updates URL with language parameter', async ({ page }) => {
    await page.goto('/')

    // Click French button
    await page.getByRole('button', { name: /switch to fr/i }).click()

    // Check URL contains language
    await expect(page).toHaveURL(/lng=fr/)
  })
})
