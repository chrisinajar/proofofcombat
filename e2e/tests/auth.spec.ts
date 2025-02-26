import { test, expect } from '@playwright/test';
import { E2E_UI_PORT, cleanDatabase, startServer, stopServer } from '../helpers/database';

let server: any;

test.describe('Authentication', () => {
  test.beforeAll(async () => {
    await cleanDatabase();
    server = await startServer();
  });

  test.afterAll(async () => {
    await stopServer(server);
  });

  test.beforeEach(async ({ page }) => {
    await page.goto(`http://localhost:${E2E_UI_PORT}`);
  });

  test('should allow signup and login', async ({ page }) => {
    // Click the signup button
    await page.click('[data-testid="show-signup-button"]');

    // Fill in signup form
    await page.fill('[data-testid="signup-username-input"]', 'testuser');
    await page.fill('[data-testid="signup-password-input"]', 'testpassword');
    await page.click('[data-testid="signup-submit-button"]');

    // After signup, the login form should automatically appear
    await page.waitForSelector('[data-testid="login-username-input"]', { state: 'visible' });

    // Fill in login form
    await page.fill('[data-testid="login-username-input"]', 'testuser');
    await page.fill('[data-testid="login-password-input"]', 'testpassword');
    await page.click('[data-testid="login-submit-button"]');

    // Should redirect to game and show character level
    await page.waitForSelector('[data-testid="character-level"]');
    const levelText = await page.textContent('[data-testid="character-level"]');
    expect(levelText).toContain('1'); // New characters start at level 1
  });
}); 