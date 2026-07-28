// tests/fixtures.js
// Custom Playwright fixtures that inject the SAME page objects used by the BDD
// suite, so a spec never constructs page objects by hand:
//
//   test('...', async ({ loginPage }) => { await loginPage.open(); });
const base = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const RegisterPage = require('../pages/RegisterPage');
const AccountPage = require('../pages/AccountPage');
const AccountOrdersPage = require('../pages/AccountOrdersPage');
const CatalogPage = require('../pages/CatalogPage');
const ShoppingCartPage = require('../pages/ShoppingCartPage');
const CheckoutPage = require('../pages/CheckoutPage');
const OrderDetailsPage = require('../pages/OrderDetailsPage');

const test = base.test.extend({
    loginPage: async ({ page }, use) => use(new LoginPage(page)),
    registerPage: async ({ page }, use) => use(new RegisterPage(page)),
    accountPage: async ({ page }, use) => use(new AccountPage(page)),
    ordersPage: async ({ page }, use) => use(new AccountOrdersPage(page)),
    catalogPage: async ({ page }, use) => use(new CatalogPage(page)),
    cartPage: async ({ page }, use) => use(new ShoppingCartPage(page)),
    checkoutPage: async ({ page }, use) => use(new CheckoutPage(page)),
    orderDetailsPage: async ({ page }, use) => use(new OrderDetailsPage(page)),
});

module.exports = { test, expect: base.expect };
