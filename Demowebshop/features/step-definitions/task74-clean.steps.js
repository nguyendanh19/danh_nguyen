// features/step-definitions/task74-clean.steps.js
//
// Thin steps for the clean Task 74. Reuses "I should land on {string}" and
// "the page title should be {string}" from login-clean.steps.js.
//
// `this.screen` points at whichever screen currently renders the order review
// (OrderDetailsPage or CheckoutPage), so the address/product/totals steps are
// shared between the order-details page and the confirm-order step.
const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const AccountOrdersPage = require('../../pages/AccountOrdersPage');
const OrderDetailsPage = require('../../pages/OrderDetailsPage');
const ShoppingCartPage = require('../../pages/ShoppingCartPage');
const CheckoutPage = require('../../pages/CheckoutPage');

Given('I am signed in on the DemoWebShop store', async function () {
    await expect(this.page.getByRole('heading', { name: 'Welcome to our store' })).toBeVisible();
    this.account = new AccountOrdersPage(this.page);
});

// --- My Account / Orders ---
When('I open my account from the header', async function () {
    await this.account.openFromHeader();
});

When('I open the {string} section from the account menu', async function (section) {
    await this.account.openSection(section);
});

Then('the order {string} is listed with status {string}, date {string}, total {string}',
    async function (orderNumber, status, date, total) {
        await this.account.expectOrderListed(orderNumber, { status, date, total });
    });

When('I open the details of order {string}', async function (orderNumber) {
    await this.account.openDetails(orderNumber);
    this.screen = new OrderDetailsPage(this.page);
});

// --- Shared order-review assertions (order details AND confirm order) ---
Then('the order overview shows order {string}, date {string}, status {string}, total {string}',
    async function (order, date, status, total) {
        await this.screen.expectOverview({ order, date, status, total });
    });

Then('the order overview shows total {string}', async function (total) {
    await this.screen.expectOverview({ total });
});

Then('the order information shows the captured order number', async function () {
    await this.screen.expectOrderNumber(this.orderNumber);
});

Then('the {string} address section shows:', async function (which, dataTable) {
    await this.screen.expectAddress(which, dataTable.rowsHash());
});

Then('the product table shows:', async function (dataTable) {
    for (const r of dataTable.hashes()) {
        await this.screen.expectProduct({ name: r.Name, price: r.Price, quantity: r.Quantity, total: r.Total });
    }
});

Then('the order totals are:', async function (dataTable) {
    await this.screen.expectTotals(dataTable.rowsHash());
});

// --- Re-order into the cart ---
When('I re-order this order', async function () {
    await this.screen.reorder();
    this.cart = new ShoppingCartPage(this.page);
});

When('I set the quantity of {string} to {string}', async function (product, quantity) {
    await this.cart.setQuantity(product, quantity);
});

When('I update the shopping cart', async function () {
    await this.cart.update();
});

Then('the cart line {string} shows price {string}, quantity {string}, total {string}',
    async function (product, price, quantity, total) {
        await this.cart.expectLine(product, { price, quantity, total });
    });

Then('the cart totals are:', async function (dataTable) {
    await this.cart.expectTotals(dataTable.rowsHash());
});

When('I accept the terms of service', async function () {
    await this.cart.acceptTerms();
});

When('I proceed to checkout', async function () {
    await this.cart.checkout();
    this.checkout = new CheckoutPage(this.page);
});

// --- Checkout steps ---
Then('the current checkout step is {string}', async function (title) {
    await this.checkout.expectStep(title);
    // From the confirm step onward, review assertions run against the checkout page.
    if (title === 'Confirm order') this.screen = this.checkout;
});

Then('the {string} address is preselected as {string}', async function (which, address) {
    await this.checkout.expectAddressPreselected(which, address);
});

When('I continue past the {string} step', async function (stepName) {
    await this.checkout.continuePast(stepName);
});

When('I choose shipping method {string}', async function (label) {
    await this.checkout.chooseShippingMethod(label);
});

When('I choose payment method {string}', async function (label) {
    await this.checkout.choosePaymentMethod(label);
});

Then('the payment information reads {string}', async function (text) {
    await this.checkout.expectPaymentInfo(text);
});

// --- Place order & confirmation ---
When('I place the order', async function () {
    await this.checkout.placeOrder();
});

Then('I see the confirmation message {string}', async function (message) {
    await this.checkout.expectConfirmation(message);
});

When('I capture the generated order number', async function () {
    this.orderNumber = await this.checkout.readOrderNumber();
});

When('I open the order details from the confirmation', async function () {
    await this.checkout.openOrderDetailsFromConfirmation();
    this.screen = new OrderDetailsPage(this.page);
});

// --- Log out ---
When('I log out', async function () {
    await this.page.getByRole('link', { name: 'Log out' }).click();
});
