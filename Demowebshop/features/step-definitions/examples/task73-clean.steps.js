// features/step-definitions/examples/task73-clean.steps.js
// Reuses cart/checkout steps from task72-clean, task74-clean and task74-dynamic.
const { When } = require('@cucumber/cucumber');
const CatalogPage = require('../../../pages/examples/CatalogPage');
const ShoppingCartPage = require('../../../pages/examples/ShoppingCartPage');

When('I add the product {string} to the cart', async function (name) {
    this.catalog = new CatalogPage(this.page);
    await this.catalog.addProductByName(name);
    this.cart = new ShoppingCartPage(this.page);
});

When('I go to the shopping cart', async function () {
    await this.cart.open();
});

When('I mark {string} for removal', async function (name) {
    await this.cart.selectRemove(name);
});
