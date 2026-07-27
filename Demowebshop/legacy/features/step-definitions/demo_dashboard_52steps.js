const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
// const { Before } = require('@cucumber/cucumber');
const Actions = require('../../pages/Actions');
const { chromium, firefox } = require('playwright');
const { expect } = require('@playwright/test')

let browser, context, page;

//Task 52
Given('I am on the Dashboard Demo Web Shop page, displaying the {string} title', async function (dashboard_title) {
    await this.action.verifyDashboardtitle(dashboard_title);
});

When('I update new data into the account information fields on the My account page: First name {string}, Last name {string}, Email {string}', async function (firstname, lastname, email) {
    await this.action.account_information_fields(firstname, lastname, email);
});

Then('I should see the updated information: First name {string}, Last name {string}, Email {string}', async function (firstname, lastname, email) {
    await this.action.verify_information_fields(firstname, lastname, email);
});

//Left menu
When('I click on the {string} on the left menu', async function (mya_leftmenu) {
    await this.action.click_left_menu(mya_leftmenu);
});

//Add new address
When('I fill data into the Add new address page, First name {string}, Last name {string}, Email {string}, Company {string}, City {string}, Address 1 {string}, Address 2 {string}, ZipPostalCode {string}, PhoneNumber {string}, FaxNumber {string}', async function (firstname, lastname, email, company, city, address1, address2, zippostalcode, phonenumber, faxnumber) {
    await this.action.fill_data_add_new_address(firstname, lastname, email, company, city, address1, address2, zippostalcode, phonenumber, faxnumber);
});

When('I select the Country {string} and State {string}', async function (countryName, stateName) {
    await this.action.select_country_state_province(countryName, stateName);
});

Then('I should see the information address about Title {string}, Name {string}, Email {string}, Phone {string}, Fax {string}, Company {string}, Address 1 {string}, Address 2 {string}, City State Zip {string}, Country {string}', async function (title, name, email, phone, fax, company, address1, address2, city_state_zip, country) {
    await this.action.verify_added_new_address(title, name, email, phone, fax, company, address1, address2, city_state_zip, country);
});

//Change password
When('I fill data into the Change password fields, Old Password {string}, New Password {string}, Confirm Password {string}', async function (oldPassword, newPassword, confirmPassword) {
    await this.action.fill_Information_change_password_fields(oldPassword, newPassword, confirmPassword);
});

