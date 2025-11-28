// tests/global-setup.js
import { chromium } from '@playwright/test';

async function globalSetup(config) {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Login
    await page.goto('https://demowebshop.tricentis.com/');
    await page.click('.ico-login');
    await page.fill('#Email', 'dn1@yopmail.com');
    await page.fill('#Password', '1234567890');
    await page.click('input[value="Log in"]');

    // Save session
    await page.context().storageState({ path: 'storageState.json' });
    await browser.close();
}

export default globalSetup;