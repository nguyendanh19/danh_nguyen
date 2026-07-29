// features/step-definitions/login.steps.js
//
// Reference template — thin steps that delegate to the LoginPage object.
// Each step is one line: no locators, no waits, no assertions inline.
const { Given, When, Then } = require('@cucumber/cucumber');
const LoginPage = require('../../pages/LoginPage');

Given('I am on the DemoWebShop sign-in page', async function () {
    this.loginPage = new LoginPage(this.page);
    await this.loginPage.open();
});

When('I sign in with email {string} and password {string}', async function (email, password) {
    await this.loginPage.login(email, password);
});

// Data Table variant — reads named rows, so the .feature stays readable and the
// step signature never grows even if more fields are added later.
When('I sign in with the following details:', async function (dataTable) {
    const { Email, Password } = dataTable.rowsHash();
    await this.loginPage.login(Email, Password);
});

When('I follow the forgot-password link', async function () {
    await this.loginPage.openForgotPassword();
});

Then('I should be signed in as {string}', async function (email) {
    await this.loginPage.expectSignedInAs(email);
});

Then('I should see the sign-in error {string}', async function (message) {
    await this.loginPage.expectLoginError(message);
});

Then('I should see the field error {string}', async function (message) {
    await this.loginPage.expectFieldError(message);
});

// Note: generic "I should land on {string}" and "the page title should be {string}"
// live in common.steps.js so they are shared by every feature.
