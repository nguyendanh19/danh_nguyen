// pages/examples/AccountOrdersPage.js
// "My account" navigation + the Orders list.
const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

class AccountOrdersPage extends BasePage {
    constructor(page) {
        super(page);
        this.accountLink = page.locator('.header-links a.account'); // header shows the signed-in email
        this.leftMenu = page.locator('.listbox');
    }

    async openFromHeader() {
        await this.accountLink.click();
    }

    /** Left-menu entry, e.g. openSection('Orders'). */
    async openSection(name) {
        await this.leftMenu.getByRole('link', { name }).click();
    }

    orderCard(orderNumber) {
        return this.page.locator('.order-item', { hasText: `Order Number: ${orderNumber}` });
    }

    async expectOrderListed(orderNumber, { status, date, total }) {
        const card = this.orderCard(orderNumber);
        await expect(card).toContainText(`Order status: ${status}`);
        await expect(card).toContainText(`Order Date: ${date}`);
        await expect(card).toContainText(`Order Total: ${total}`);
    }

    async openDetails(orderNumber) {
        await this.orderCard(orderNumber).getByRole('button', { name: 'Details' }).click();
    }
}

module.exports = AccountOrdersPage;
