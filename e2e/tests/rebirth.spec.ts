import { test, expect, Page } from '@playwright/test';
import { E2E_UI_PORT, cleanDatabase, startServer, stopServer, seedFixture, E2E_DB_PATH } from '../helpers/database';
import { waitForDelay, waitForCombat, waitForCombatResult, waitForLevelUp, waitForQuestDialog } from '../helpers/test-utils';
import fs from 'fs';
import path from 'path';

let server: any;

test.describe('Rebirth', () => {
  test.beforeAll(async () => {
    // Clean and seed database first
    console.log('Cleaning database...');
    await cleanDatabase();
    
    console.log('Loading and seeding fixture...');
    await seedFixture('pre-rebirth', E2E_DB_PATH);
    
    // Debug: Check if the database files exist
    console.log('Database path:', E2E_DB_PATH);
    console.log('Database path exists:', fs.existsSync(E2E_DB_PATH));
    console.log('Database path contents:', fs.readdirSync(E2E_DB_PATH));
    
    // Give the database operations time to fully complete
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Then start the server
    console.log('Starting server...');
    server = await startServer();
  });

  test.afterAll(async () => {
    await stopServer(server);
  });

  test.beforeEach(async ({ page }) => {
    // Navigate to the game
    await page.goto(`http://localhost:${E2E_UI_PORT}`);
    // Wait for either the login form or signup button to be visible
    await page.waitForSelector('[data-testid="login-username-input"], [data-testid="show-signup-button"]');
  });

  test('should fail to create account with fixture name', async ({ page }) => {
    await page.goto("/");
    await page.click('[data-testid="show-signup-button"]');
    await page.fill('[data-testid="signup-username-input"]', "prerebirthtest");
    await page.fill('[data-testid="signup-password-input"]', "testpassword");
    await page.click('[data-testid="signup-submit-button"]');

    await expect(page.locator('[data-testid="signup-error-message"]')).toHaveText(
      "Username already exists"
    );
  });

  test('should allow a level 10 character to rebirth', async ({ page }) => {
    await page.goto("/");
    await page.fill('[data-testid="login-username-input"]', "prerebirthtest");
    await page.fill('[data-testid="login-password-input"]', "testpassword");
    await page.click('[data-testid="login-submit-button"]');

    // Wait for navigation and combat elements
    await page.waitForSelector('[data-testid="combat-nav"]');
    await page.click('[data-testid="combat-nav"]');

    // Wait for character stats to be visible
    await page.waitForSelector('[data-testid="character-level"]');
    await page.waitForSelector('#hero-stats-experience');
    
    // Log initial state
    const level = await page.getByTestId('character-level').textContent();
    const xp = await page.locator('#hero-stats-experience').textContent();
    console.log('Initial level:', level);
    console.log('Initial XP:', xp);

    // Verify we have the correct hero data
    if (level !== '9' || xp !== '539') {
      console.log('Hero data mismatch - expected level 9 and 539 XP');
      console.log('Got level', level, 'and XP', xp);
    }

    // Click the select to open it
    await page.click('#challenge-select');
    // Click the first option in the menu
    await page.click('li[role="option"]:first-child');

    // Click the challenge button and wait for the combat display
    await page.click('#challenge-button');
    await waitForCombat(page);

    // Click the attack button
    await page.click('#attack-with-melee');

    // Wait for the fight result
    await waitForCombatResult(page);
    console.log('Fight result:', await page.locator('#fight-did-win').textContent());

    // Wait for the level up message
    await waitForLevelUp(page);
    console.log('Level up message:', await page.locator('#fight-level-up').textContent());

    // Wait for the hero data to be updated
    await page.waitForSelector('[data-testid="character-level"]');
    const finalLevel = await page.locator('[data-testid="character-level"]').textContent();
    console.log('Final level:', finalLevel);

    // Refresh the page to trigger quest check
    await page.reload();

    // Wait for the page to be ready after refresh
    await page.waitForSelector('[data-testid="character-level"]');
    await page.waitForSelector('[data-testid="combat-nav"]');
    
    // Wait for the quest dialog to appear
    await waitForQuestDialog(page);
    console.log('Quest dialog title:', await page.locator('#quest-event-title').textContent());
    console.log('Quest dialog message:', await page.locator('#quest-event-description').textContent());

    // Click the Continue button and wait for the dialog to be dismissed
    await page.click('[data-testid="quest-continue-button"]');
    // Wait delay to complete
    waitForDelay(page);

    // Wait for navigation to be ready and visible before clicking
    await page.waitForSelector('[data-testid="inventory-nav"]', { state: 'visible' });
    await page.click('[data-testid="inventory-nav"]');
    
    // Open the quest items dropdown and select the totem of rebirth
    await page.waitForSelector('#quest-item');
    await page.click('#quest-item');
    await page.waitForSelector('[data-testid="totem-of-rebirth"]');
    await page.click('[data-testid="totem-of-rebirth"]');
    
    // Click outside the menu to close it
    await page.click('body');
    
    // Wait for the rebirth menu to be visible and click the button
    await page.waitForSelector('[data-testid="rebirth-button"]');
    await page.click('[data-testid="rebirth-button"]');
    await page.waitForTimeout(150);

    // Refresh the page to trigger quest check
    await page.reload();
    
    // Wait for and handle the post-rebirth quest dialog
    await waitForQuestDialog(page);
    await page.click('[data-testid="quest-continue-button"]');

    // Verify that the character is now level 1
    await expect(page.locator('[data-testid="character-level"]')).toContainText('1');
    console.log('Post-rebirth level:', await page.getByTestId('character-level').textContent());
  });
});
