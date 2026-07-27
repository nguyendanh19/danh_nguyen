// tests/global-setup.js
const { chromium } = require('@playwright/test');

async function globalSetup() {
    const email = process.env.DEMO_EMAIL || 'dn1@yopmail.com';
    const password = process.env.DEMO_PASSWORD || '1234567890';

    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Login
    await page.goto('https://demowebshop.tricentis.com/');
    await page.click('.ico-login');
    await page.fill('#Email', email);
    await page.fill('#Password', password);
    await page.click('input[value="Log in"]');

    // Save session
    await page.context().storageState({ path: 'storageState.json' });
    await browser.close();
}

module.exports = globalSetup;
