// pages/examples/CatalogPage.js
// Catalog browsing: categories, search, product pages, add-to-cart, mini cart.
const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

class CatalogPage extends BasePage {
    constructor(page) {
        super(page);
        this.topMenu = page.locator('.top-menu');
        this.searchBox = page.locator('#small-searchterms');
        this.addToCartButton = page.locator('.add-to-cart-panel').getByRole('button', { name: 'Add to cart' });
        this.notification = page.locator('#bar-notification');
        this.miniCart = page.locator('.mini-shopping-cart');
    }

    async openCategory(name) {
        await this.topMenu.getByRole('link', { name }).first().click();
    }

    async openSubCategory(name) {
        await this.topMenu.getByRole('link', { name }).first().click();
    }

    async openProduct(name) {
        await this.page.locator('.product-item .product-title a', { hasText: name }).first().click();
    }

    async search(term) {
        await this.searchBox.fill(term);
        await this.page.getByRole('button', { name: 'Search' }).click();
    }

    /** Convenience used by the dynamic checkout flow: add a book to the cart. */
    async addBookToCart(productName) {
        await this.goto('/books');
        const item = this.page.locator('.product-item', { hasText: productName });
        await item.getByRole('button', { name: 'Add to cart' }).click();
        await expect(this.notification).toContainText('added to your shopping cart');
    }

    async addToCart() {
        await this.addToCartButton.click();
        await expect(this.notification).toContainText('added to your shopping cart');
    }

    /** Search for a product by exact name, open it, and add it to the cart. */
    async addProductByName(name) {
        await this.search(name);
        await this.openProduct(name);
        await this.addToCart();
    }

    async expectProductPage(name, price) {
        await expect(this.page.locator('.product-name h1')).toHaveText(name);
        await expect(this.page.locator('.product-price span').first()).toHaveText(price);
    }

    async expectInGrid(name, price) {
        const item = this.page.locator('.product-item', { hasText: name });
        await expect(item).toContainText(name);
        await expect(item).toContainText(price);
    }

    async openMiniCart() {
        // The flyout opens on hover; keep the pointer on the cart link and give the
        // flyout time to appear (a single hover can miss under load).
        const cartLink = this.page.locator('#topcartlink');
        await cartLink.hover();
        if (!(await this.miniCart.isVisible().catch(() => false))) {
            await cartLink.hover();
        }
        await expect(this.miniCart).toBeVisible({ timeout: 15000 });
    }

    async expectMiniCart({ count, subTotal, items = [] }) {
        if (count) await expect(this.miniCart).toContainText(`${count} item(s)`);
        if (subTotal) await expect(this.miniCart).toContainText(`Sub-Total: ${subTotal}`);
        for (const it of items) {
            const row = this.miniCart.locator('.item', { hasText: it.name });
            if (it.price) await expect(row).toContainText(`Unit price: ${it.price}`);
            if (it.quantity) await expect(row).toContainText(`Quantity: ${it.quantity}`);
        }
    }
}

module.exports = CatalogPage;
