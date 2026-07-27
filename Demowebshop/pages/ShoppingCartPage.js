// pages/ShoppingCartPage.js
const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

class ShoppingCartPage extends BasePage {
    constructor(page) {
        super(page);
        this.updateButton = page.getByRole('button', { name: 'Update shopping cart' });
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
        this.termsCheckbox = page.locator('#termsofservice');
        this.totals = page.locator('.cart-total');
    }

    async open() {
        await this.goto('/cart');
    }

    /** Empty the cart so a scenario starts from a known state. */
    async clearCart() {
        await this.open();
        const removeBoxes = this.page.locator('.cart-item-row input[name="removefromcart"]');
        const count = await removeBoxes.count();
        if (count === 0) return;
        for (let i = 0; i < count; i++) await removeBoxes.nth(i).check();
        await this.update();
    }

    /** Tick a product's remove checkbox; call update() afterwards to apply. */
    async selectRemove(productName) {
        await this.row(productName).locator('input[name="removefromcart"]').check();
    }

    row(productName) {
        return this.page.locator('tr.cart-item-row', { hasText: productName });
    }

    async setQuantity(productName, quantity) {
        await this.row(productName).locator('input.qty-input').fill(quantity);
    }

    async update() {
        await this.updateButton.click();
    }

    async expectLine(productName, { price, quantity, total }) {
        const row = this.row(productName);
        if (price) await expect(row.locator('.product-unit-price')).toContainText(price);
        if (quantity) await expect(row.locator('input.qty-input')).toHaveValue(quantity);
        if (total) await expect(row.locator('.product-subtotal')).toContainText(total);
    }

    /** Totals table: match a row by its exact left-cell label, assert the right cell. */
    async expectTotals(totals) {
        const rows = this.totals.locator('tr');
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

    async acceptTerms() {
        await this.termsCheckbox.check();
    }

    async checkout() {
        await this.checkoutButton.click();
    }
}

module.exports = ShoppingCartPage;
