const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
// const { Before } = require('@cucumber/cucumber');
const Actions = require('../../pages/Actions');
const { chromium } = require('playwright');
const { expect } = require('@playwright/test');
const { title } = require('process');
const { name } = require('../../playwright.config');

let browser, context, page;

//Task 74
// Click on the "Shopping cart" button
Then('I should see that the Order number title is {string} appears in the My account Order list with information: Order Status {string}, Order Date {string}, Order Total {string}', async function(orderNumber_title, orderStatus, orderDate, orderTotal) {
    await this.action.verify_order_information(orderNumber_title, orderStatus, orderDate, orderTotal);
});

// Click on the Details button based on the Order number
Then('Based on the Order number {string}, I click on the Details button {string}', async function(orderNumber, btndetails) {
    await this.action.click_order_details_button(orderNumber, btndetails);
});

// Verify information Order overview area
Then('I should see the Order overview area with information: Order {string}, Order Date {string}, Order Status {string}, Order Total {string}', async function(orderNumber, orderDate, orderStatus, orderTotal) {
    await this.action.verify_order_overview_information(orderNumber, orderDate, orderStatus, orderTotal);
});

// Verify that the information in the Order details
Then('I should see the information in the {string} section on the Order details area will contain: Order Number title {string}, Name {string}, Email {string}, Phone {string}, Fax {string}, Company {string}, Address 1 {string}, Address 2 {string}, City state zip {string}, Country {string}, Payment/Shipping title {string}, Payment/Shipping Method {string}', async function(section, oi_order_detail_title, name, email, phone, fax, company, address1, address2, city_state_zip, country, payment_shippingTitle, payment_shippingMethod) {
    await this.action.txtMyaccount_orderinfo_orderdetail(section, oi_order_detail_title, name, email, phone, fax, company, address1, address2, city_state_zip, country, payment_shippingTitle, payment_shippingMethod);
});

// Verify the information in the Product(s) table
Then('I should see the information in the {string} section on the Product table will contain: Name {string}, Price {string}, Quantity {string}, Total {string}', async function(section, productName, price, quantity, total) {
    await this.action.txtMyaccount_orderinfo_product(section, productName, price, quantity, total);
});

//Verify that the information on the Total info in the Order information
Then('I should see the information Total info in the Order information page: Sub-Total {string}, Shipping {string}, Payment method additional fee {string}, Tax {string}, Order Total {string}', async function (subTotal, shipping, paymentFee, tax, orderTotal) {
    await this.action.verify_order_cart_total_information(subTotal, shipping, paymentFee, tax, orderTotal);
});

//Verify the Order number just generated will display on the Order list
Then('I should see the same Order number appears in the Order list', async function () {
  await this.action.verify_order_number_in_list();
});

// Verify that the Order number just generated will display on the Order information
Then('I should see the same Order number appears in the Order Information section', async function () {
  await this.action.verify_order_number_in_information();
});

// Click on the Detail button base on order number just generate before
When('I click on the Details button of the generated Order', async function () {
  await this.action.click_order_details_button_of_generated_order();
});

// Verify the Order Total on the Order overview area
Then('I should see the Order Total is {string} on the Order overview area', async function(orderTotal) {
    await this.action.verify_order_total_in_overview(orderTotal);
});