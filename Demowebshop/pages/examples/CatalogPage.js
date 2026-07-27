// pages/examples/CatalogPage.js
const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

class CatalogPage extends BasePage {
    /** Add a product from the Books category to the cart, by its visible name. */
    async addBookToCart(productName) {
        await this.goto('/books');
        const item = this.page.locator('.product-item', { hasText: productName });
        await item.getByRole('button', { name: 'Add to cart' }).click();
        await expect(this.page.locator('#bar-notification.success')).toBeVisible();
    }
}

module.exports = CatalogPage;
