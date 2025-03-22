import { test, expect } from '@playwright/test';

// Define the application's local address
const appAddress = 'http://localhost:5173';

// Generate random user data
const name = (Math.random() + 1).toString(36).substring(7);
const email = `${name}@${(Math.random() + 1).toString(36).substring(7)}.io`;

/**
 * Test Case: Adds a new user
 * - Opens the app
 * - Fills out the name and email fields
 * - Clicks the "Create" button
 * - Verifies that the new user appears in the list
 */
test('adds a new user', async ({ page }) => {
    // Navigate to the app
    await page.goto(appAddress);

    // Fill the name and email fields
    await page.fill('input[placeholder="Name"]', name);
    await page.fill('input[placeholder="Email"]', email);

    // Click the "Create" button
    await page.click('button:has-text("Create")');
    await page.pause();

    // Wait for the success message and check if it appears
    await expect(page.locator(`text=User created successfully: ${name}`)).toBeVisible();
    await page.pause();

    // Ensure the new user appears in the list
    const userItem = page.locator(`li:has-text("Name: ${name}, Email: ${email}")`);
    await expect(userItem).toBeVisible();
});