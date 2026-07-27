// pages/examples/ShoppingCartPage.js
const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');
const { expectTotalsWithin } = require('./components');

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

    async removeProduct(productName) {
        await this.row(productName).locator('input[name="removefromcart"]').check();
        await this.update();
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

    async expectTotals(totals) {
        await expectTotalsWithin(this.totals, totals);
    }

    async acceptTerms() {
        await this.termsCheckbox.check();
    }

    async checkout() {
        await this.checkoutButton.click();
    }
}

module.exports = ShoppingCartPage;
