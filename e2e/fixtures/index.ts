import fs from 'fs';
import path from 'path';

export interface FixtureData {
  accounts: Record<string, any>;
  heroes: Record<string, any>;
}

export async function loadFixture(fixtureName: string): Promise<FixtureData> {
  const fixturePath = path.join(__dirname, `${fixtureName}.json`);
  if (!fs.existsSync(fixturePath)) {
    throw new Error(`Fixture ${fixtureName} not found at ${fixturePath}`);
  }
  
  const fixtureContent = fs.readFileSync(fixturePath, 'utf-8');
  return JSON.parse(fixtureContent);
}

export async function seedFixture(fixtureName: string, dbPath: string): Promise<void> {
  // Import from server project to avoid any direct database interaction in UI
  const { seedFixture: serverSeedFixture } = require('../../../proofofcombat-server/e2e/seed-fixture');
  process.env.DB_PATH = dbPath;
  const fixture = await loadFixture(fixtureName);
  await serverSeedFixture(fixture);
} 