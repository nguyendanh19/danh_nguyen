// pages/CheckoutPage.js
// One-page checkout: the 5 steps, the confirm-order review, placing the order,
// and the "order completed" screen. The confirm review reuses the same
// expectAddress / expectProduct / expectTotals API as OrderDetailsPage.
const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');
const { expectTextsWithin, expectTotalsWithin, expectProductRow } = require('./components');

// Stable container ids stay INSIDE the page object — the feature never sees them.
const STEP_CONTAINER = {
    'billing address': '#billing-buttons-container',
    'shipping address': '#shipping-buttons-container',
    'shipping method': '#shipping-method-buttons-container',
    'payment method': '#payment-method-buttons-container',
    'payment information': '#payment-info-buttons-container',
};

class CheckoutPage extends BasePage {
    constructor(page) {
        super(page);
        this.billingSelect = page.locator('#billing-address-select');
        this.shippingSelect = page.locator('#shipping-address-select');
        this.methodList = page.locator('.method-list');
        this.paymentInfo = page.locator('#opc-payment_info');
        this.products = page.locator('.cart');
        this.totals = page.locator('.cart-total');
    }

    async expectStep(title) {
        await expect(this.page.locator('.step-title h2', { hasText: title })).toBeVisible();
    }

    async expectAddressPreselected(which, address) {
        const select = which === 'shipping' ? this.shippingSelect : this.billingSelect;
        await expect(select).toContainText(address);
    }

    /** Click the "Continue" button of a named step (e.g. 'billing address'). */
    async continuePast(stepName) {
        const container = STEP_CONTAINER[stepName.toLowerCase()];
        await this.page.locator(container).getByRole('button', { name: 'Continue' }).click();
    }

    async chooseShippingMethod(label) {
        await this.methodList.getByText(label, { exact: false }).click();
    }

    async choosePaymentMethod(label) {
        await this.methodList.getByText(label, { exact: false }).click();
    }

    async expectPaymentInfo(text) {
        await expect(this.paymentInfo).toContainText(text);
    }

    // --- Confirm order review (same shape as OrderDetailsPage) ---
    section(which) {
        return this.page.locator(which === 'shipping' ? '.shipping-info' : '.billing-info');
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

    async placeOrder() {
        await this.page.locator('#confirm-order-buttons-container')
            .getByRole('button', { name: 'Confirm' }).click();
    }

    /** Fill the "new billing address" form (only shown when no address is saved). */
    async fillBillingAddress(a) {
        const set = async (id, value) => {
            const el = this.page.locator(`#${id}`);
            if (value && await el.count()) await el.fill(value);
        };
        await set('BillingNewAddress_FirstName', a.firstName);
        await set('BillingNewAddress_LastName', a.lastName);
        await set('BillingNewAddress_Email', a.email);
        await set('BillingNewAddress_City', a.city);
        await set('BillingNewAddress_Address1', a.address1);
        await set('BillingNewAddress_ZipPostalCode', a.zip);
        await set('BillingNewAddress_PhoneNumber', a.phone);
        await this.page.locator('#BillingNewAddress_CountryId').selectOption({ label: a.country });
        const state = this.page.locator('#BillingNewAddress_StateProvinceId');
        if (a.state && await state.count()) await state.selectOption({ label: a.state });
    }

    /** Walk all checkout steps and place the order; returns the generated number. */
    async checkoutAndPlaceOrder(address) {
        // Wait for the billing step to render, then decide: use a saved address if
        // one is offered, otherwise fill the new-address form.
        const newAddressCountry = this.page.locator('#BillingNewAddress_CountryId');
        await this.billingSelect.or(newAddressCountry).first().waitFor({ state: 'attached' });
        if (!(await this.billingSelect.isVisible())) {
            await this.fillBillingAddress(address);
        }
        await this.continuePast('billing address');
        await this.continuePast('shipping address');            // ship to same address
        await this.methodList.locator('input[type=radio]:visible').first().check();
        await this.continuePast('shipping method');
        await this.choosePaymentMethod('Cash On Delivery');
        await this.continuePast('payment method');
        await this.continuePast('payment information');
        await this.placeOrder();
        return this.readOrderNumber();
    }

    // --- Order completed screen ---
    async expectConfirmation(message) {
        await expect(this.page.getByRole('heading', { name: 'Thank you' })).toBeVisible();
        await expect(this.page.getByText(message)).toBeVisible();
    }

    async readOrderNumber() {
        const text = await this.page.locator('.order-completed')
            .getByText(/Order number:/).textContent();
        return text.match(/\d+/)[0];
    }

    async openOrderDetailsFromConfirmation() {
        await this.page.getByRole('link', { name: 'Click here for order details' }).click();
    }
}

module.exports = CheckoutPage;
