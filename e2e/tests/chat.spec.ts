import { test, expect } from '@playwright/test';
import { E2E_UI_PORT, cleanDatabase, startServer, stopServer } from '../helpers/database';

let server: any;

test.describe('Chat', () => {
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

  test('should send and display chat messages', async ({ page }) => {
    // Sign up and login first
    await page.click('[data-testid="show-signup-button"]');
    await page.fill('[data-testid="signup-username-input"]', 'testuser');
    await page.fill('[data-testid="signup-password-input"]', 'testpassword');
    await page.click('[data-testid="signup-submit-button"]');
    await page.fill('[data-testid="login-username-input"]', 'testuser');
    await page.fill('[data-testid="login-password-input"]', 'testpassword');
    await page.click('[data-testid="login-submit-button"]');

    // Wait for character level to confirm we're logged in
    await page.waitForSelector('[data-testid="character-level"]');

    // Set up console message monitoring before sending messages
    const consoleMessages: string[] = [];
    page.on('console', msg => {
      consoleMessages.push(msg.text());
    });

    // Type and send a chat message
    const testMessage = 'Hello world!';
    await page.fill('#chat-input', testMessage);
    await page.click('button[aria-label="send chat"]');

    // Wait for the message to appear in the chat
    // We need to wait for both the message content and the username
    await page.waitForSelector(`text=testuser`, { timeout: 5000 });
    await page.waitForSelector(`text=${testMessage}`, { timeout: 5000 });

    // Verify the message appears with the correct username
    const messageElement = await page.waitForSelector(`text=${testMessage}`, { timeout: 5000 });
    expect(messageElement).toBeTruthy();

    // Send another message to test callback
    const testMessage2 = 'Testing callback!';
    await page.fill('#chat-input', testMessage2);
    await page.click('button[aria-label="send chat"]');

    // Wait for console log that indicates callback was called
    await expect.poll(() => {
      return consoleMessages.some(msg => msg.includes('Got chat event!'));
    }, { timeout: 5000 }).toBeTruthy();

    // Also verify the second message appears
    await page.waitForSelector(`text=${testMessage2}`, { timeout: 5000 });
  });
}); 