// features/step-definitions/catalog.steps.js
const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const CatalogPage = require('../../pages/CatalogPage');
const ShoppingCartPage = require('../../pages/ShoppingCartPage');

Given('my cart is empty', async function () {
    await new ShoppingCartPage(this.page).clearCart();
});

When('I open the {string} category', async function (name) {
    this.catalog = new CatalogPage(this.page);
    await this.catalog.openCategory(name);
});

When('I open the {string} sub-category', async function (name) {
    await this.catalog.openSubCategory(name);
});

When('I open the product {string}', async function (name) {
    await this.catalog.openProduct(name);
});

Then('the product page shows name {string} and price {string}', async function (name, price) {
    await this.catalog.expectProductPage(name, price);
});

When('I add the product to the cart', async function () {
    await this.catalog.addToCart();
});

Then('I see the {string} notification', async function (text) {
    await expect(this.catalog.notification).toContainText(text);
});

When('I search for {string}', async function (term) {
    await this.catalog.search(term);
});

Then('the grid shows product {string} priced {string}', async function (name, price) {
    await this.catalog.expectInGrid(name, price);
});

When('I open the mini cart', async function () {
    await this.catalog.openMiniCart();
});

Then('the mini cart shows:', async function (dataTable) {
    await this.catalog.expectMiniCart(dataTable.rowsHash());
});

Then('the mini cart contains {string} priced {string} quantity {string}', async function (name, price, quantity) {
    await this.catalog.expectMiniCart({ items: [{ name, price, quantity }] });
});
