// tests/fixtures.js
// Custom Playwright fixtures.
//
//   test      — page objects injected, no authentication (guest specs)
//   authTest  — same, plus a PER-WORKER signed-in account
//
// Data isolation: each parallel worker registers its own Au_ account, so specs
// never share a cart/order history and the suite can run fully parallel.
const base = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const LoginPage = require('../pages/LoginPage');
const RegisterPage = require('../pages/RegisterPage');
const AccountPage = require('../pages/AccountPage');
const AccountOrdersPage = require('../pages/AccountOrdersPage');
const CatalogPage = require('../pages/CatalogPage');
const ShoppingCartPage = require('../pages/ShoppingCartPage');
const CheckoutPage = require('../pages/CheckoutPage');
const OrderDetailsPage = require('../pages/OrderDetailsPage');
const { TEST_USER, uniqueEmail } = require('../support/test-data');

const AUTH_DIR = path.resolve(__dirname, '..', '.auth');

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

const authTest = test.extend({
    // Worker-scoped: registers one Au_ account per worker and caches its session.
    workerStorageState: [async ({ browser }, use, workerInfo) => {
        fs.mkdirSync(AUTH_DIR, { recursive: true });
        const file = path.join(AUTH_DIR, `worker-${workerInfo.workerIndex}.json`);

        if (!fs.existsSync(file)) {
            const page = await browser.newPage({ storageState: undefined });
            const email = uniqueEmail(`w${workerInfo.workerIndex}`);

            const register = new RegisterPage(page);
            await register.open();
            await register.selectGender('male');
            await register.register({
                firstName: TEST_USER.firstName,
                lastName: TEST_USER.lastName,
                email,
                password: TEST_USER.password,
            });
            await register.expectCompleted();
            await register.continueToStore();

            await page.context().storageState({ path: file });
            await page.close();
        }
        await use(file);
    }, { scope: 'worker' }],

    storageState: async ({ workerStorageState }, use) => use(workerStorageState),
});

module.exports = { test, authTest, expect: base.expect };
