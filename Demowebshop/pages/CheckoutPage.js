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

        // Picking a country reloads the state list over AJAX. Wait for the wanted
        // option to actually exist, otherwise selectOption hangs until it times out.
        // State is optional on this form, so a missing option must not fail checkout.
        if (a.state) {
            const state = this.page.locator('#BillingNewAddress_StateProvinceId');
            const option = state.locator('option', { hasText: a.state });
            await option.first().waitFor({ state: 'attached', timeout: 15000 }).catch(() => {});
            if (await option.count()) await state.selectOption({ label: a.state });
        }
    }

    /** Id of the checkout step currently on screen, e.g. 'billing-buttons-container'. */
    async currentStepContainer() {
        return this.page.evaluate(() => {
            const el = [...document.querySelectorAll('[id$="-buttons-container"]')]
                .find((e) => e.offsetParent !== null);
            return el ? el.id : null;
        });
    }

    /**
     * Walk the one-page checkout and place the order; returns the generated number.
     *
     * Driven by whichever step is actually visible rather than a fixed sequence:
     * the shop skips or reorders steps depending on whether the account already
     * has a saved address, so a hardcoded order breaks on the second checkout.
     */
    async checkoutAndPlaceOrder(address) {
        let billingFilled = false;

        // The steps render after the checkout page loads — wait for the first one,
        // otherwise the loop below sees "no step" and exits immediately.
        await this.page.waitForFunction(
            () => [...document.querySelectorAll('[id$="-buttons-container"]')]
                .some((e) => e.offsetParent !== null),
            null,
            { timeout: 20000 },
        );

        for (let guard = 0; guard < 10; guard++) {
            const container = await this.currentStepContainer();
            if (!container) break;

            if (container.startsWith('billing')) {
                // Fill the new-address form once: re-selecting the country would
                // restart the AJAX state reload and the step would never advance.
                if (!billingFilled && !(await this.billingSelect.isVisible().catch(() => false))) {
                    await this.fillBillingAddress(address);
                }
                billingFilled = true;
            } else if (container.startsWith('shipping-method')) {
                await this.methodList.locator('input[type=radio]:visible').first().check();
            } else if (container.startsWith('payment-method')) {
                await this.choosePaymentMethod('Cash On Delivery');
            } else if (container.startsWith('confirm-order')) {
                await this.placeOrder();
                break;
            }

            await this.page.locator(`#${container}`)
                .getByRole('button', { name: 'Continue' }).click();

            // Wait until the visible step actually changes before looking again.
            await this.page.waitForFunction(
                (previous) => {
                    const el = [...document.querySelectorAll('[id$="-buttons-container"]')]
                        .find((e) => e.offsetParent !== null);
                    return el && el.id !== previous;
                },
                container,
                { timeout: 20000 },
            ).catch(() => {});
        }
        return this.readOrderNumber();
    }

    // --- Order completed screen ---
    async expectConfirmation(message) {
        await expect(this.page.getByRole('heading', { name: 'Thank you' })).toBeVisible();
        await expect(this.page.getByText(message)).toBeVisible();
    }

    async readOrderNumber() {
        await this.page.waitForURL('**/checkout/completed/**', { timeout: 30000 });
        const text = await this.page.locator('.order-completed')
            .getByText(/Order number:/).textContent();
        return text.match(/\d+/)[0];
    }

    async openOrderDetailsFromConfirmation() {
        await this.page.getByRole('link', { name: 'Click here for order details' }).click();
    }
}

module.exports = CheckoutPage;
