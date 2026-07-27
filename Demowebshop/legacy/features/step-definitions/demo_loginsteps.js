const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
// const { Before } = require('@cucumber/cucumber');
const Actions = require('../../pages/Actions');
const { chromium } = require('playwright');
const { expect } = require('@playwright/test')

let browser, context, page;

//Login account successfully
When('I fill data to the username {string} and password {string}', async function (username, password) {
    await this.action.fillloginfields(username, password);
});

When('I tick the checkbox {string} checkbox', async function (rememberme) {
    await this.action.checkrememberme(rememberme);
});

Then('I should be logged in successfully, and see {string} account', async function (accountuser) {
    await this.action.verifyAccountuser(accountuser);
});

//Login failed, Username and Password was empty
Then('I should see an error message {string}', async function (unsuccessfulmessage) {
    await this.action.verifyLoginunsuccessfulmessage(unsuccessfulmessage);
});

Then('I should see an error message validate account {string}', async function (validateaccountmessage) {
    await this.action.verifyErrormessagevalidationaccount(validateaccountmessage);
});

//Login failed, value Email field is invalid format
Then('I should see an error message email {string}', async function (informationerror) {
    await this.action.verifyInformationrormessage(informationerror);
});

//Login failed, invalid credentials

//Navigate to forgot password page
When('I click on the Forgot password? {string} button', async function (forgotpassword) {
    await this.action.clickforgotpassword(forgotpassword);
});