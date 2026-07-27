// pages/OrderDetailsPage.js
// The "Order information" screen — reused for both a past order and the freshly
// placed one. Exposes the same expect* API as CheckoutPage's confirm step, so the
// feature's "address / product / totals" steps work on either screen.
const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');
const { expectTextsWithin, expectTotalsWithin, expectProductRow } = require('./components');

class OrderDetailsPage extends BasePage {
    constructor(page) {
        super(page);
        this.reorderButton = page.getByRole('button', { name: 'Re-order' });
        this.overview = page.locator('.order-overview');
        this.products = page.locator('.section.products');
        this.totals = page.locator('.cart-total');
    }

    section(which) {
        return this.page.locator(which === 'shipping' ? '.shipping-info' : '.billing-info');
    }

    async expectOverview({ order, date, status, total }) {
        if (order) await expect(this.overview).toContainText(`Order #${order}`);
        if (date) await expect(this.overview).toContainText(`Order Date: ${date}`);
        if (status) await expect(this.overview).toContainText(`Order Status: ${status}`);
        if (total) await expect(this.overview).toContainText(`Order Total: ${total}`);
    }

    async expectOrderNumber(orderNumber) {
        await expect(this.overview).toContainText(`Order #${orderNumber}`);
    }

    async expectAddress(which, fields) {
        await expectTextsWithin(this.section(which), Object.values(fields));
    }

    async expectProduct(row) {
        await expectProductRow(this.products, row);
    }

    async expectTotals(totals) {
        await expectTotalsWithin(this.totals, totals);
    }

    async reorder() {
        await this.reorderButton.click();
    }
}

module.exports = OrderDetailsPage;
