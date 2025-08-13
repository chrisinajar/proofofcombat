import { test, expect } from '@playwright/test';
import { E2E_UI_PORT, E2E_DB_PATH, cleanDatabase, startServer, stopServer, seedFixture } from '../helpers/database';
import { waitForCombat } from '../helpers/test-utils';

let server: any;

test.describe('Combat attack availability', () => {
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

  test('new character (no weapons) sees all attack types', async ({ page }) => {
    // Sign up and login
    await page.click('[data-testid="show-signup-button"]');
    await page.fill('[data-testid="signup-username-input"]', 'attacktest');
    await page.fill('[data-testid="signup-password-input"]', 'password');
    await page.click('[data-testid="signup-submit-button"]');
    await page.fill('[data-testid="login-username-input"]', 'attacktest');
    await page.fill('[data-testid="login-password-input"]', 'password');
    await page.click('[data-testid="login-submit-button"]');

    // Navigate to combat
    await page.getByTestId('combat-nav').click();

    // Challenge first monster
    await page.click('#challenge-select');
    await page.click('li[role="option"]:first-child');
    await page.click('#challenge-button');
    await waitForCombat(page);

    // All five attack types should be visible
    await expect(page.locator('#attack-with-melee')).toBeVisible();
    await expect(page.locator('#attack-with-ranged')).toBeVisible();
    await expect(page.locator('#attack-with-cast')).toBeVisible();
    await expect(page.locator('#attack-with-holy')).toBeVisible();
    await expect(page.locator('#attack-with-blood')).toBeVisible();
  });

  test('melee-only: shows Melee + Smite only', async ({ page }) => {
    await stopServer(server);
    await cleanDatabase();
    await seedFixture('equip-melee', E2E_DB_PATH);
    server = await startServer();

    await page.goto(`http://localhost:${E2E_UI_PORT}`);
    await page.fill('[data-testid="login-username-input"]', 'prerebirthtest');
    await page.fill('[data-testid="login-password-input"]', 'testpassword');
    await page.click('[data-testid="login-submit-button"]');
    await page.getByTestId('combat-nav').click();
    // wait for hero to load fully
    await page.waitForSelector('[data-testid="character-level"]');
    await page.click('#challenge-select');
    await page.click('li[role="option"]:first-child');
    await page.click('#challenge-button');
    await waitForCombat(page);

    await expect(page.locator('#attack-with-melee')).toBeVisible();
    await expect(page.locator('#attack-with-holy')).toBeVisible();
    await expect(page.locator('#attack-with-cast')).toHaveCount(0);
    await expect(page.locator('#attack-with-ranged')).toHaveCount(0);
    await expect(page.locator('#attack-with-blood')).toHaveCount(0);
  });

  test('focus-only: shows Cast + Smite + Blood', async ({ page }) => {
    await stopServer(server);
    await cleanDatabase();
    await seedFixture('equip-focus', E2E_DB_PATH);
    server = await startServer();

    await page.goto(`http://localhost:${E2E_UI_PORT}`);
    await page.fill('[data-testid="login-username-input"]', 'prerebirthtest');
    await page.fill('[data-testid="login-password-input"]', 'testpassword');
    await page.click('[data-testid="login-submit-button"]');
    await page.getByTestId('combat-nav').click();
    await page.waitForSelector('[data-testid="character-level"]');
    await page.click('#challenge-select');
    await page.click('li[role="option"]:first-child');
    await page.click('#challenge-button');
    await waitForCombat(page);

    await expect(page.locator('#attack-with-cast')).toBeVisible();
    await expect(page.locator('#attack-with-holy')).toBeVisible();
    await expect(page.locator('#attack-with-blood')).toBeVisible();
    await expect(page.locator('#attack-with-melee')).toHaveCount(0);
    await expect(page.locator('#attack-with-ranged')).toHaveCount(0);
  });

  test('shield-only: shows Melee + Smite + Blood', async ({ page }) => {
    await stopServer(server);
    await cleanDatabase();
    await seedFixture('equip-shield', E2E_DB_PATH);
    server = await startServer();

    await page.goto(`http://localhost:${E2E_UI_PORT}`);
    await page.fill('[data-testid="login-username-input"]', 'prerebirthtest');
    await page.fill('[data-testid="login-password-input"]', 'testpassword');
    await page.click('[data-testid="login-submit-button"]');
    await page.getByTestId('combat-nav').click();
    await page.waitForSelector('[data-testid="character-level"]');
    await page.click('#challenge-select');
    await page.click('li[role="option"]:first-child');
    await page.click('#challenge-button');
    await waitForCombat(page);

    await expect(page.locator('#attack-with-melee')).toBeVisible();
    await expect(page.locator('#attack-with-holy')).toBeVisible();
    await expect(page.locator('#attack-with-blood')).toBeVisible();
    await expect(page.locator('#attack-with-cast')).toHaveCount(0);
    await expect(page.locator('#attack-with-ranged')).toHaveCount(0);
  });

  test('ranged-only: shows only Ranged', async ({ page }) => {
    await stopServer(server);
    await cleanDatabase();
    await seedFixture('equip-ranged', E2E_DB_PATH);
    server = await startServer();

    await page.goto(`http://localhost:${E2E_UI_PORT}`);
    await page.fill('[data-testid="login-username-input"]', 'prerebirthtest');
    await page.fill('[data-testid="login-password-input"]', 'testpassword');
    await page.click('[data-testid="login-submit-button"]');
    await page.getByTestId('combat-nav').click();
    await page.waitForSelector('[data-testid="character-level"]');
    await page.click('#challenge-select');
    await page.click('li[role="option"]:first-child');
    await page.click('#challenge-button');
    await waitForCombat(page);

    await expect(page.locator('#attack-with-ranged')).toBeVisible();
    await expect(page.locator('#attack-with-melee')).toHaveCount(0);
    await expect(page.locator('#attack-with-cast')).toHaveCount(0);
    await expect(page.locator('#attack-with-holy')).toHaveCount(0);
    await expect(page.locator('#attack-with-blood')).toHaveCount(0);
  });

  test('battlemage: shows Melee + Cast + Smite', async ({ page }) => {
    await stopServer(server);
    await cleanDatabase();
    await seedFixture('equip-battlemage', E2E_DB_PATH);
    server = await startServer();

    await page.goto(`http://localhost:${E2E_UI_PORT}`);
    await page.fill('[data-testid="login-username-input"]', 'prerebirthtest');
    await page.fill('[data-testid="login-password-input"]', 'testpassword');
    await page.click('[data-testid="login-submit-button"]');
    await page.getByTestId('combat-nav').click();
    await page.click('#challenge-select');
    await page.click('li[role=\"option\"]:first-child');
    await page.click('#challenge-button');
    await waitForCombat(page);

    await expect(page.locator('#attack-with-melee')).toBeVisible();
    await expect(page.locator('#attack-with-cast')).toBeVisible();
    await expect(page.locator('#attack-with-holy')).toBeVisible();
    await expect(page.locator('#attack-with-ranged')).toHaveCount(0);
    await expect(page.locator('#attack-with-blood')).toHaveCount(0);
  });

  test('equipping focus updates attack buttons via cache', async ({ page }) => {
    await stopServer(server);
    await cleanDatabase();
    await seedFixture('equip-swap', E2E_DB_PATH);
    server = await startServer();

    // Login
    await page.goto(`http://localhost:${E2E_UI_PORT}`);
    await page.fill('[data-testid="login-username-input"]', 'prerebirthtest');
    await page.fill('[data-testid="login-password-input"]', 'testpassword');
    await page.click('[data-testid="login-submit-button"]');

    // Go to combat and assert initial buttons (melee-only state)
    await page.getByTestId('combat-nav').click();
    await page.waitForSelector('[data-testid="character-level"]');
    await page.click('#challenge-select');
    await page.click('li[role="option"]:first-child');
    await page.click('#challenge-button');
    await waitForCombat(page);
    await expect(page.locator('#attack-with-melee')).toBeVisible();
    await expect(page.locator('#attack-with-cast')).toHaveCount(0);

    // Switch to inventory and equip the focus in left hand
    await page.getByTestId('inventory-nav').click();
    await page.click('#leftHand-equip-select');
    await page.click('li[role="option"]:has-text("Feathered Stick")');

    // Return to combat; re-challenge to ensure combat UI is active
    await page.getByTestId('combat-nav').click();
    await page.click('#challenge-select');
    await page.click('li[role="option"]:first-child');
    await page.click('#challenge-button');
    await waitForCombat(page);
    await expect(page.locator('#attack-with-cast')).toBeVisible();
    await expect(page.locator('#attack-with-melee')).toHaveCount(0);
    await expect(page.locator('#attack-with-holy')).toBeVisible();
    await expect(page.locator('#attack-with-blood')).toBeVisible();
  });
});
