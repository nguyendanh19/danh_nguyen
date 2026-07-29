// features/step-definitions/task74-dynamic.steps.js
//
// Steps for the self-contained re-order flow. Reuses from task74-clean.steps.js:
//   "Given I am signed in on the DemoWebShop store" and "When I re-order this order".
const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const CatalogPage = require('../../pages/CatalogPage');
const ShoppingCartPage = require('../../pages/ShoppingCartPage');
const CheckoutPage = require('../../pages/CheckoutPage');
const AccountOrdersPage = require('../../pages/AccountOrdersPage');
const OrderDetailsPage = require('../../pages/OrderDetailsPage');

const { CHECKOUT_ADDRESS } = require('../../support/test-data');

When('I add the book {string} to the cart', async function (productName) {
    this.catalog = new CatalogPage(this.page);
    await this.catalog.addBookToCart(productName);
    this.cart = new ShoppingCartPage(this.page);
});

When('I check out and place the order', async function () {
    await this.cart.open();
    await this.cart.acceptTerms();
    await this.cart.checkout();
    this.checkout = new CheckoutPage(this.page);
    this.orderNumber = await this.checkout.checkoutAndPlaceOrder(CHECKOUT_ADDRESS);
});

Then('an order number is generated', async function () {
    expect(this.orderNumber).toMatch(/^\d+$/);
});

Then('that order appears in my order history', async function () {
    this.account = new AccountOrdersPage(this.page);
    await this.account.goto('/customer/orders');
    await this.account.expectOrderPresent(this.orderNumber);
});

When('I open the details of my most recent order', async function () {
    await this.account.openMostRecentDetails();
    this.screen = new OrderDetailsPage(this.page);
});

Then('the same order number is shown on the order details', async function () {
    await this.screen.expectOrderNumber(this.orderNumber);
});
