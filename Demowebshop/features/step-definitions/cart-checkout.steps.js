// features/step-definitions/cart-checkout.steps.js
// Reuses cart/checkout steps from catalog, order-details and reorder steps.
const { When } = require('@cucumber/cucumber');
const CatalogPage = require('../../pages/CatalogPage');
const ShoppingCartPage = require('../../pages/ShoppingCartPage');

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
