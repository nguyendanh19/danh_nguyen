const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
// const { Before } = require('@cucumber/cucumber');
const Actions = require('../../pages/Actions');
const { chromium } = require('playwright');
const { expect } = require('@playwright/test');
const { title } = require('process');
const { name } = require('../../playwright.config');

let browser, context, page;

//Task 73
// Click on the "Shopping cart" button
Then('I should see the number count item is {string}', async function (cartquantity) {
    await this.action.verifycartquantity(cartquantity);
});

// Click on the top cart link
Then('I click on the {string} link button on the header area', async function (topcartlink) {
    await this.action.clickHeader_topcartlink(topcartlink);
});

// Input new data quantity
When('I update new data to Product {string} with the quantity is {string}', async function (productName, newQty) {
    await this.action.update_cart_item_qty(productName, newQty);
});

// Click on the checkbox remove product
Then('I click on the checkbox remove product {string}', async function (remove) {
    await this.action.click_the_remove_checkbox(remove);
});

// Verify the cart table.
Then('I should see the Product name {string}, price {string}, Qty {string}, Total {string}', async function (productName, productPrice, productQty, productTotal) {
    await this.action.verify_cart_item_productname(productName);
    await this.action.verify_cart_item_price(productName, productPrice);
    await this.action.verify_cart_item_qty(productName, productQty);
    await this.action.verify_cart_item_total(productName, productTotal);
});

// Verify the total information
Then('I should see the Total information, Sub-Total {string}, Shipping {string}, Tax {string}, Total {string}', async function (subTotal, shipping, tax, cart_totals_total) {
    await this.action.verify_cart_totals_information('Sub-Total', subTotal);
    await this.action.verify_cart_totals_information('Shipping', shipping);
    await this.action.verify_cart_totals_information('Tax', tax);
    await this.action.verify_cart_totals_total(cart_totals_total);
});

// Tick the Total agree checkbox
Then('I tick on the checkbox, {string}', async function (cart_checkbox) {
    await this.action.tick_total_agree_checkbox(cart_checkbox);
});

// Click on the Checkout button
When('I click on the Checkout button {string}', async function (cart_checkout) {
    await this.action.click_checkout_button(cart_checkout);
});

// Verify the step title on the Checkout page
Then('I should see the step title on the Checkout page, {string}', async function (checkout_title_step) {
    await this.action.verify_checkout_title_step(checkout_title_step);
});

// Verify the Billing address on the Checkout page
Then('I should see the {string} step on the Checkout page, Address is {string}', async function (checkout_step, checkout_address) {
    await this.action.verify_checkout_billing_address(checkout_step, checkout_address);
});

// Click submit button on the Checkout page 
When('I submit request on the {string} step via click on the {string} button on the Checkout page', async function (checkout_step, checkout_submit) {
    await this.action.click_checkout_submit_button(checkout_step, checkout_submit);
});

// Select Shipping Method radio button
When('I select the {string} radio button on the Checkout page', async function (radio_checkout) {
    await this.action.select_checkout_shipping_method(radio_checkout);
});

// Verify the information on the Payment Information step
Then('I verify the information on the Payment Information step, {string}', async function (checkout_pay_info) {
    await this.action.verify_checkout_payment_information(checkout_pay_info);
});

// Verify the information  on the Confirm Order step
Then('I should see the {string} area will contain the information about: Title {string}, Name {string}, Email {string}, Phone {string}, Fax {string}, Company {string}, Address1 {string}, Address2 {string}, City {string}, Country {string}', async function (cforder_title, title, name, email, phone, fax, company, address1, address2, city, country) {
    await this.action.verify_cforder_information(cforder_title, title, name, email, phone, fax, company, address1, address2, city, country);
});

//Verify the information Payment Method on the Confirm Order step
Then('I should see the {string} area will contain the information about: Title {string}, Payment Method {string}', async function (cforder_title, title, payment_method) {
    await this.action.verify_cforder_payment_information(cforder_title, title, payment_method);
});

// Verify the total information on the Checkout page
Then('I should see the information cart item area on the Confirm Order step about: Product name {string}, price {string}, Qty {string}, Total {string}', async function (productName, productPrice, qty, productTotal) {
    await this.action.verify_cart_item_productname(productName);
    await this.action.verify_cart_item_price(productName, productPrice);
    await this.action.verify_checkout_product_item_qty(productName, qty);
    await this.action.verify_cart_item_total(productName, productTotal);
});

// Verify the information on the Cart footer
Then('I should see the Total information on the Confirm Order step about, Sub-Total {string}, Shipping method {string}, Shipping {string}, Payment {string}, Tax {string}, Total {string}', async function (subTotal, shippingMethod, shipping, paymentFee, tax, cart_totals_total) {
        await this.action.verify_cart_totals_information_checkout('Sub-Total:', subTotal);
        await this.action.verify_cart_totals_information_checkout('Shipping:', shipping, shippingMethod);
        await this.action.verify_cart_totals_information_checkout('Payment method additional fee:', paymentFee);
        await this.action.verify_cart_totals_information_checkout('Tax:', tax);
        await this.action.verify_cart_totals_total(cart_totals_total);
    }
);

// Verify the message on the Thank You page
Then('I should see the Thank You message on the Thank You page, {string}', async function (thank_message) {
    await this.action.verify_thank_you_message(thank_message);
});

// Verify and get data order number on the Thank you page
Then('I should see the Order number generated', async function () {
  await this.action.verify_and_get_order_number();
});

//Verify that the URL contains the Order number (after clicking)
Then('I should be redirected to the Order Details page containing that Order number', async function () {
  await this.action.verify_Order_Details_URL();
});

// Click on the "Click here for order details" button
When('I click on the {string} button to navigate to the Order Details page', async function (order_detail) {
    await this.action.clickCheckout_thank_orderdetail(order_detail);
});
