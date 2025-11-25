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

  test('stores language preference in localStorage', async ({ page }) => {
    await page.goto('/')

    // Click French button
    await page.getByRole('button', { name: /switch to fr/i }).click()

    // Wait for language change
    await page.waitForTimeout(200)

    // Check localStorage contains language preference
    const storedLang = await page.evaluate(() => localStorage.getItem('i18nextLng'))
    expect(storedLang).toMatch(/fr/)
  })
})
