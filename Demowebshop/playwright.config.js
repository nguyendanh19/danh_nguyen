// playwright.config.js — config for the pure-Playwright spec suite (tests/).
// The BDD suite has its own runner (cucumber.js); both share pages/.
const { defineConfig, devices } = require('@playwright/test');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '.env') });

module.exports = defineConfig({
    testDir: './tests',
    // Specs share one shop account (and therefore one cart), so keep them serial.
    fullyParallel: false,
    workers: 1,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    reporter: [['list'], ['html', { open: 'never' }]],
    globalSetup: './tests/global-setup.js',

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
            // Specs that need an existing signed-in session.
            name: 'loggedIn',
            testMatch: ['**/catalog.spec.js', '**/cart-checkout.spec.js', '**/reorder.spec.js'],
            use: { ...devices['Desktop Chrome'], storageState: 'storageState.json' },
        },
    ],
});
