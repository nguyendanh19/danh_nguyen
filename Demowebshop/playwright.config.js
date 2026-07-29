// playwright.config.js — config for the pure-Playwright spec suite (tests/).
// The BDD suite has its own runner (cucumber.js); both share pages/ and support/.
const { defineConfig, devices } = require('@playwright/test');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '.env') });

module.exports = defineConfig({
    testDir: './tests',
    // End-to-end shop flows (register -> cart -> multi-step checkout, sometimes
    // twice in one test) need well above the 30s default.
    timeout: 150 * 1000,
    expect: { timeout: 10 * 1000 },
    // Safe to parallelise: each worker registers its own Au_ account (see
    // fixtures.js), so no two tests share a cart or an order history.
    fullyParallel: true,
    workers: process.env.CI ? 2 : undefined,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    reporter: process.env.CI
        ? [['github'], ['html', { open: 'never' }]]
        : [['list'], ['html', { open: 'never' }]],

    use: {
        baseURL: 'https://demowebshop.tricentis.com',
        viewport: { width: 1440, height: 900 },
        actionTimeout: 15000,
        navigationTimeout: 30000,
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    },

    projects: [
        {
            // Specs that must start signed out (login, register, account setup).
            name: 'guest',
            testMatch: ['**/login.spec.js', '**/register.spec.js', '**/account.spec.js'],
            use: { ...devices['Desktop Chrome'], storageState: undefined },
        },
        {
            // Specs that need a signed-in session — supplied per worker by authTest.
            name: 'loggedIn',
            testMatch: ['**/catalog.spec.js', '**/cart-checkout.spec.js', '**/reorder.spec.js'],
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});
