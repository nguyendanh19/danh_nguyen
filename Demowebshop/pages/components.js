// pages/examples/components.js
//
// Small reusable assertions shared by the order-details and confirm-order screens
// (both render the same key-value blocks, product rows and totals tables).
// Keeping them here avoids the copy-paste that bloated pages/Actions.js.
const { expect } = require('@playwright/test');

/** Assert every given text is visible somewhere inside a section scope. */
async function expectTextsWithin(scope, values) {
    for (const value of values) {
        if (!value) continue;
        await expect(scope.getByText(value, { exact: false }).first()).toBeVisible();
    }
}

/** Assert a totals table: match each row by its exact left-cell label
 *  (so "Total" does not also match "Sub-Total"), then check the right cell. */
async function expectTotalsWithin(scope, totals) {
    const rows = scope.locator('tr');
    const count = await rows.count();
    for (const [label, value] of Object.entries(totals)) {
        let matched = false;
        for (let i = 0; i < count; i++) {
            const left = (await rows.nth(i).locator('.cart-total-left').innerText()).trim().replace(/:$/, '');
            if (left === label) {
                await expect(rows.nth(i).locator('.cart-total-right')).toContainText(value);
                matched = true;
                break;
            }
        }
        if (!matched) throw new Error(`Totals row "${label}" not found`);
    }
}

/** Assert one product row (found by name) contains its price / qty / total. */
async function expectProductRow(scope, { name, price, quantity, total }) {
    const row = scope.locator('tr', { hasText: name }).first();
    await expect(row).toBeVisible();
    for (const value of [price, quantity, total]) {
        if (value) await expect(row).toContainText(value);
    }
}

module.exports = { expectTextsWithin, expectTotalsWithin, expectProductRow };
