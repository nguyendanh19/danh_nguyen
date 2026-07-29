#!/usr/bin/env node
// scripts/cleanup-test-data.js
//
// Deletes data created by automation — and ONLY that data.
// Everything the suite creates is marked with the "Au_" prefix
// (see support/test-data.js), so cleanup can target it safely:
//
//     addresses / companies / names / emails starting with "Au_"
//
// Usage:
//     node scripts/cleanup-test-data.js            # dry-run, just report
//     node scripts/cleanup-test-data.js --apply    # actually delete
//
// DemoWebShop is a public practice site with no DB access, so this script cleans
// what the UI exposes (cart + saved addresses). cleanupViaDatabase() below is the
// hook to fill in on a real project — the marker strategy is identical.
require('dotenv').config();
const { chromium } = require('@playwright/test');
const { AU } = require('../support/test-data');

const APPLY = process.argv.includes('--apply');
const BASE_URL = 'https://demowebshop.tricentis.com';

// Guard: never let a cleanup run against production.
const ENV = (process.env.TEST_ENV || 'practice').toLowerCase();
if (['prod', 'production', 'live'].includes(ENV)) {
    console.error('✖ Refusing to run cleanup against a production environment.');
    process.exit(1);
}

async function cleanupViaUi() {
    const email = process.env.DEMO_EMAIL;
    const password = process.env.DEMO_PASSWORD;
    if (!email || !password) throw new Error('DEMO_EMAIL / DEMO_PASSWORD missing — see .env.example');

    const browser = await chromium.launch();
    const page = await browser.newPage();
    const removed = { addresses: 0, cartLines: 0 };

    await page.goto(`${BASE_URL}/login`);
    await page.getByLabel('Email:').fill(email);
    await page.getByLabel('Password:').fill(password);
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.getByRole('link', { name: email }).waitFor();

    // 1) Saved addresses created by automation (marked with Au_).
    await page.goto(`${BASE_URL}/customer/addresses`);
    const auAddresses = page.locator('.section.address-item', { hasText: AU });
    let count = await auAddresses.count();
    console.log(`• Au_ addresses found: ${count}`);
    while (count > 0) {
        const card = auAddresses.first();
        const label = (await card.innerText()).split('\n')[0];
        if (APPLY) {
            await card.getByRole('button', { name: 'Delete' }).click();
            await page.waitForLoadState('domcontentloaded');
            removed.addresses += 1;
            console.log(`  ✔ deleted address: ${label}`);
        } else {
            console.log(`  (dry-run) would delete address: ${label}`);
            break; // nothing is removed in dry-run, so stop looping
        }
        count = await auAddresses.count();
    }

    // 2) Leftover cart lines from an interrupted run.
    await page.goto(`${BASE_URL}/cart`);
    const removeBoxes = page.locator('.cart-item-row input[name="removefromcart"]');
    const lines = await removeBoxes.count();
    console.log(`• Cart lines found: ${lines}`);
    if (lines > 0) {
        if (APPLY) {
            for (let i = 0; i < lines; i++) await removeBoxes.nth(i).check();
            await page.getByRole('button', { name: 'Update shopping cart' }).click();
            removed.cartLines = lines;
            console.log(`  ✔ emptied the cart (${lines} line(s))`);
        } else {
            console.log(`  (dry-run) would empty the cart (${lines} line(s))`);
        }
    }

    await browser.close();
    return removed;
}

/**
 * Real-project hook: same Au_ marker, but straight against the database.
 * Kept here as the reference shape — DemoWebShop gives us no DB credentials.
 *
 *   const sql = require('mssql');
 *   const pool = await sql.connect(process.env.DB_CONN);
 *   await pool.request()
 *       .input('marker', sql.VarChar, `${AU}%`)
 *       .query(`DELETE FROM Orders    WHERE CustomerEmail LIKE @marker;
 *               DELETE FROM Addresses WHERE Company       LIKE @marker;
 *               DELETE FROM Customers WHERE Email         LIKE @marker;`);
 *
 * Rules: delete children before parents, use a restricted DB user, and keep the
 * production guard above.
 */
async function cleanupViaDatabase() {
    console.log('• DB cleanup: skipped (no database on this practice site)');
}

(async () => {
    console.log(`Cleanup marker: "${AU}"  |  mode: ${APPLY ? 'APPLY (deleting)' : 'DRY-RUN (no changes)'}`);
    const removed = await cleanupViaUi();
    await cleanupViaDatabase();
    console.log(`Done. addresses removed: ${removed.addresses}, cart lines removed: ${removed.cartLines}`);
    if (!APPLY) console.log('Re-run with --apply to actually delete.');
})().catch((err) => {
    console.error('✖ Cleanup failed:', err.message);
    process.exit(1);
});
