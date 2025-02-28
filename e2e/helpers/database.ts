import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import util from 'util';

// Use absolute paths
const SERVER_ROOT = path.resolve(__dirname, '../../../proofofcombat-server');
const E2E_DB_PATH = path.join(SERVER_ROOT, 'e2e-data');
const E2E_UI_PORT = '3001';  // Different from default 3000
const E2E_SERVER_PORT = '4001';  // Different from default 4000
const E2E_SOCKET_PORT = '2097';  // Different from default 2096
const E2E_HTTP_PORT = '8881';  // Different from default 8880
const E2E_HTTPS_PORT = '8444';  // Different from default 8443

export async function cleanDatabase() {
  if (fs.existsSync(E2E_DB_PATH)) {
    fs.rmSync(E2E_DB_PATH, { recursive: true, force: true });
  }
  // Ensure the directory exists
  fs.mkdirSync(E2E_DB_PATH, { recursive: true });
}

export async function seedFixture(fixtureName: string, dbPath: string): Promise<void> {
  // Get the fixture path
  const fixturePath = path.resolve(__dirname, '../fixtures', `${fixtureName}.json`);
  if (!fs.existsSync(fixturePath)) {
    throw new Error(`Fixture ${fixtureName} not found at ${fixturePath}`);
  }

  // Run the server's seeding script
  return new Promise((resolve, reject) => {
    const seederProcess = exec(
      `ts-node e2e/seed-fixture-cli.ts "${fixturePath}"`,
      {
        env: {
          ...process.env,
          DB_PATH: dbPath
        },
        cwd: SERVER_ROOT
      }
    );

    seederProcess.stdout?.on('data', (data) => {
      console.log(`Seeder output: ${data}`);
    });

    seederProcess.stderr?.on('data', (data) => {
      console.error(`Seeder error: ${data}`);
    });

    seederProcess.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Seeder process exited with code ${code}`));
      }
    });
  });
}

export async function startServer() {
  console.log('Starting server with environment:', {
    NODE_ENV: 'test',
    PORT: E2E_SERVER_PORT,
    SOCKET_PORT: E2E_SOCKET_PORT,
    HTTP_PORT: E2E_HTTP_PORT,
    HTTPS_PORT: E2E_HTTPS_PORT,
    DB_PATH: E2E_DB_PATH,
  });

  // Start the server in a separate process with environment variables
  const serverProcess = exec(
    'yarn run ts-node ./index.ts',
    {
      env: {
        ...process.env,
        NODE_ENV: 'test',
        PORT: E2E_SERVER_PORT,
        SOCKET_PORT: E2E_SOCKET_PORT,
        HTTP_PORT: E2E_HTTP_PORT,
        HTTPS_PORT: E2E_HTTPS_PORT,
        DB_PATH: E2E_DB_PATH,
        SECRET: 'test-secret'  // Add a consistent secret for tests
      },
      cwd: SERVER_ROOT,
    }
  );

  // Wait for server to be ready
  return new Promise((resolve, reject) => {
    let isSocketReady = false;
    let isApolloReady = false;

    serverProcess.stdout?.on('data', (data) => {
      console.log(`Server output: ${data}`);
      
      if (data.includes('Socket ready')) {
        console.log('Socket server is ready');
        isSocketReady = true;
      }
      if (data.includes('Apollo Server ready')) {
        console.log('Apollo server is ready');
        isApolloReady = true;
      }

      // Resolve when both socket and Apollo are ready
      if (isSocketReady && isApolloReady) {
        console.log('Both servers are ready, resolving...');
        resolve(serverProcess);
      }
    });

    serverProcess.stderr?.on('data', (data) => {
      console.error(`Server Error: ${data}`);
    });

    serverProcess.on('error', (error) => {
      console.error('Server process error:', error);
      reject(error);
    });

    serverProcess.on('exit', (code) => {
      if (code !== null) {
        console.error(`Server process exited with code ${code}`);
        reject(new Error(`Server process exited with code ${code}`));
      }
    });
  });
}

export async function stopServer(serverProcess: any) {
  if (serverProcess) {
    serverProcess.kill();
    await new Promise(resolve => setTimeout(resolve, 1000)); // Give the server time to shut down
  }
}

// Export ports for use in other test files
export { E2E_UI_PORT, E2E_SERVER_PORT, E2E_SOCKET_PORT, E2E_DB_PATH };
