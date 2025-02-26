import { Page } from '@playwright/test';

export async function waitForDelay(page: Page): Promise<void> {
  try {
    // Wait for delay to start
    await page.waitForSelector(".is-in-delay");
    console.log("Delay started");   
    // Wait for delay to finish
    await page.waitForSelector(".no-delay");
    console.log("Delay finished");
  } catch (e) {
    // If we don't see the delay bar at all, assume the action was instant
  }
}

export async function waitForCombat(page: Page): Promise<void> {
  // Wait for combat display to be visible
  await page.waitForSelector('#combat-display', { state: 'visible' });
  
  // Wait for attack button to be enabled
  await page.waitForSelector('#attack-with-melee:not([disabled])', { state: 'visible' });
}

export async function waitForCombatResult(page: Page): Promise<void> {
  // Wait for the fight result to be visible
  await page.waitForSelector('#fight-did-win, #fight-did-lose', { state: 'visible' });
}

export async function waitForLevelUp(page: Page): Promise<void> {
  // Wait for the level up message
  await page.waitForSelector('#fight-level-up', { state: 'visible' });
}

export async function waitForQuestDialog(page: Page): Promise<void> {
  // Wait for the quest dialog to appear
  await page.waitForSelector('div[role="dialog"][aria-labelledby="quest-event-title"]', { state: 'visible' });
} 