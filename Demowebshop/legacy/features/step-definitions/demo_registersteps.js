const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
// const { Before } = require('@cucumber/cucumber');
const Actions = require('../../pages/Actions');
const { chromium } = require('playwright');
const { expect } = require('@playwright/test')

let browser, context, page;

//Register new account successfully
Given('I am on the DemoWebShop registration page', async function () {
    await this.action.navigateToRegistrationPage();
});

When('I click on the {string} button on the header area', async function (headerlink) {
    await this.action.clickHeaderlink(headerlink);
});

Then('I should be navigate to the {string} page', async function (expectedPath) {
    await this.action.verifyUrlPath(expectedPath);
});

Then('I should see the {string} title', async function (title) {
    await this.action.verifyTitle(title);
});

When('I select the {string} gender', async function (radiobtnRegistergender) {
    await this.action.selectGender(radiobtnRegistergender);
});

When('I fill data into the registration form: First Name {string}, Last Name {string}, Email  {string}, Password {string}, Confirmpassword {string}', async function (firstName, lastName, email, password, confirmPassword) {
    await this.action.fill_Information_register_fields(firstName, lastName, email, password, confirmPassword);
});

When('I click on the {string} button to submit request', async function (submit) {
    await this.action.clickSubmitbutton(submit);
});

Then('I should see a success message, {string}', async function (messageconfirm) {
    await this.action.verify_Information_message_confirm(messageconfirm);
});

Then('I should be redirected to the {string} page', async function (expectedUrl) {
    await this.action.verifyURLfull(expectedUrl);
});

Then('I should see my account information display on the Dashboard page, {string}', async function (accountuser) {
    await this.action.verifyAccountuser(accountuser);
});

//Register new account with existing email
Then('I should see an error message, {string}', async function (error) {
    await this.action.verifyInformationerrormessage(error);
});