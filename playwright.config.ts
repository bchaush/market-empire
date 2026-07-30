import { defineConfig, devices } from '@playwright/test'

/**
 * E2E-001 (docs/testing/initial-test-plan.md) cannot be implemented yet:
 * no gameplay screens exist (Phase 1 only builds the engine foundation,
 * per Issue #7). This config wires Playwright up and ready for Phase 2;
 * no spec files exist yet, so `playwright test` currently finds nothing
 * to run.
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:5173',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
})
