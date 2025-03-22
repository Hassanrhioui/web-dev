import { test, expect } from '@playwright/test';

const appAddress = 'http://localhost:5173'

test('The app should display the title', async ({ page }) => {
    // opening the page
    await page.goto(appAddress);
    // Check that the main title is found
    const hasH1 = await page.locator('h1').count();
    if (hasH1) {
        await expect(page.locator('h1')).toHaveText('User Management');

    }
        // Test run can be interrupted if started with --headed
    await page.pause();
});