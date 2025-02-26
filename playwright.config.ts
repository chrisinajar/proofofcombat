import { PlaywrightTestConfig, devices } from '@playwright/test';
import { E2E_UI_PORT, E2E_SOCKET_PORT } from './e2e/helpers/database';

const config: PlaywrightTestConfig = {
  testDir: './e2e/tests',
  timeout: 15000,
  expect: {
    timeout: 10000
  },
  fullyParallel: false, // We need this false because we're using a single database
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1, // We need this to be 1 because we're using a single database
  reporter: 'list',
  use: {
    actionTimeout: 0,
    baseURL: `http://localhost:${E2E_UI_PORT}`,
    trace: 'on-first-retry',
    video: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
  outputDir: 'test-results/',
  webServer: {
    command: `NEXT_PUBLIC_BASE_URL=http://localhost:8881/graphql NEXT_PUBLIC_CHAT_URL=http://localhost:${E2E_SOCKET_PORT} PORT=${E2E_UI_PORT} yarn dev`,
    port: Number(E2E_UI_PORT),
    reuseExistingServer: !process.env.CI,
  },
};

export default config;
