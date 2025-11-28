const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
// const { Before } = require('@cucumber/cucumber');
const Actions = require('../../pages/Actions');
const { chromium } = require('playwright');
const { expect } = require('@playwright/test')

let browser, context, page;

//Task 72
//Click on a category in the main menu
When('I click on the {string} category in main menu', async function (categories) {
    await this.action.click_category(categories);
});

//Select the category item
When('I select the {string} category item', async function (sub_category_item) {
    await this.action.select_category_item(sub_category_item);
});

//Select the featured product
When('I choose the {string} featured product', async function (productitem) {
    await this.action.selectfeaturedproduct(productitem);
});

//Verify product name on the product detail page
Then('I should see the product name {string} and price {string}', async function (productname, productprice) {
    await this.action.verifyproductname(productname);
    await this.action.verifyproductprice(productprice);
});

//Verify the notification bar message
Then('I should see the notification confirmation message, {string}', async function (barnotification) {
    await this.action.verifynotificationbarmessage(barnotification);
});

//Fill data into search field
When('I fill data into the search field with {string} value', async function (productName) {
    await this.action.fill_data_search_field(productName);
});

//Verify product name and price on the product grid
Then('I should see the product name {string} and price {string} on the product grid', async function (productGrid_name, productGrid_price) {
    await this.action.verify_productgrid_name(productGrid_name);
    await this.action.verify_productgrid_price(productGrid_price);
});

//Verify count number item
Then('I should see the {string} count number item in mini cart', async function (mini_cart_count) {
    await this.action.hover_mini_cart();
    await this.action.verify_mini_cart_item_count(mini_cart_count);
});

//Verify mini cart information
Then('I should see the mini cart information, item {string}, product name {string}, price {string}, quantity {string}, and Sub-Total {string}', async function (first_item, mini_product_name, mini_product_price, mini_product_quantity, mini_subTotals) {
    await this.action.hover_mini_cart();
    await this.action.verify_mini_product_name(first_item, mini_product_name);
    await this.action.verify_mini_product_price(first_item, mini_product_price);
    await this.action.verify_mini_product_quantity(first_item, mini_product_quantity);
    await this.action.verify_mini_cart_sub_total(mini_subTotals);
});