// tests/global-setup.js
// Signs in once and stores the session so the "loggedIn" project can reuse it.
const { chromium } = require('@playwright/test');
const fs = require('fs');

const STATE_PATH = 'storageState.json';

async function globalSetup() {
    if (fs.existsSync(STATE_PATH)) return; // reuse an existing session

    const email = process.env.DEMO_EMAIL;
    const password = process.env.DEMO_PASSWORD;
    if (!email || !password) {
        throw new Error('DEMO_EMAIL / DEMO_PASSWORD missing — copy .env.example to .env');
    }

    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://demowebshop.tricentis.com/login');
    await page.getByLabel('Email:').fill(email);
    await page.getByLabel('Password:').fill(password);
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.getByRole('link', { name: email }).waitFor();

    await page.context().storageState({ path: STATE_PATH });
    await browser.close();
}

module.exports = globalSetup;
