import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  // Folder where all Playwright test files are located
  testDir: "./tests",

  // Run test files in parallel to reduce execution time
  fullyParallel: true,

  // Prevent accidentally committing test.only() or describe.only()
  // CI will fail immediately if any .only exists
  forbidOnly: !!process.env.CI,

  // Retry failed tests only in CI
  // Local: 1 retry
  // GitHub Actions: 2 retries (helps avoid flaky failures)
  retries: process.env.CI ? 2 : 1,

  // Number of parallel workers
  // CI uses a single worker for stability
  // Local machine uses all available CPU cores
  workers: process.env.CI ? 1 : undefined,

  // Test reporters
  reporter: [
    // Displays test execution in terminal
    ["list"],

    // Generates HTML report
    // "never" prevents opening the browser automatically in CI
    ["html", { open: "never" }],
  ],

  use: {
    // Base URL for all page.goto() calls
    // Example:
    // page.goto("/login")
    // becomes
    // http://localhost:5173/login
    baseURL: "http://localhost:5173",

    // Local Development
    // -----------------
    // Opens Chrome so you can watch test execution
    //
    // GitHub Actions (CI)
    // -------------------
    // Runs without opening a browser window
    // Required because Ubuntu runners have no display (X Server)
    headless: !!process.env.CI,

    // Capture screenshots only when a test fails
    screenshot: "only-on-failure",

    // Save video only for failed tests
    video: "retain-on-failure",

    // Save Playwright trace only for failed tests
    // Helps debug failures in GitHub Actions
    trace: "retain-on-failure",
  },

  // --------------------------------------------------
  // Start application before Playwright
  // --------------------------------------------------
  //
  // Local Development
  // -----------------
  // Automatically starts the Vite development server.
  //
  // GitHub Actions (CI)
  // -------------------
  // The application is already running inside a Docker
  // container, so Playwright should NOT start another server.
  //
  webServer: process.env.CI
    ? undefined
    : {
      command: "npm run dev",
      url: "http://localhost:5173",
      reuseExistingServer: true,
      timeout: 120 * 1000,
    },

  // Browser projects
  projects: [
    {
      // Run tests only in Chromium
      name: "chromium",

      use: {
        // Use Playwright's Desktop Chrome configuration
        ...devices["Desktop Chrome"],
      },
    },

    // --------------------------------------------------
    // Future Browser Support (Uncomment when needed)
    // --------------------------------------------------

    /*
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
      },
    },

    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
      },
    },
    */
  ],
});