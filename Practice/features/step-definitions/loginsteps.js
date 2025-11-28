// const { Given, When, Then, After} = require('@cucumber/cucumber');
// const { chromium } = require('playwright');
// const Actions = require('../../pages/Actions');

// let browser, context;
// let page;
// let loginPage;

// //Login page
// //Naviagate to login page
// Given('I am on the login page', async function () {
//     this.action = new Actions(this.page);  
//     await this.page.goto('https://automationexercise.com/login');
//     await this.page.waitForTimeout(6000);
// });

// //Fill in the login fields
// When('I fill the {string} field with {string}', async function (field, value) {
//     await this.action.fillloginfields(field, value);
// });

// //Click on the submit button
// When('I click on the {string} button', async function (button) {
//     await this.action.clicksubmit(button);
// });

// //Verify login success
// Then('Verify that Login successfully, the {string} display on the Dashboard page', async function (classname) {
//     await this.action.verifyLoginSuccess(classname);
// });

// //Verify login with invalid credentials
// Then('Verify that Login failed, the error message {string} display on the Login page', async function (classname) {
//     await this.action.verifyErrorMessage(classname);
// });

// //Verify signup success, navigate to signup page
// Then('Verify that Signup successfully, the {string} display on the Dashboard page', async function (classname) {
//     await this.action.verifyNavigationToSignupPage(classname);
// });

// //Verify signup with existing email
// Then('Verify that Signup failed, the error message {string} display on the Login page', async function (classname) {
//     await this.action.verifySignupErrorMessage(classname);
// });

// //Signup page
// //Naviagate to signup page
// Given('Navigate to the Sign up page', async function () {
//     this.action = new Actions(this.page);
//     await this.page.goto('https://automationexercise.com/signup');
//     await this.page.waitForTimeout(3000);
// });

// //Choose the gender - Mr or Mrs
// When('I choose the gender is {string}', async function (btnSignupgender) {
//     await this.action.choosethegender(btnSignupgender);
//     await this.page.waitForTimeout(6000);
// });

// //Fill in the account information
// When('I fill data to the account infomation: {string}, {string}, {string}, and {string}', async function (password, day, month, year) {
//     await this.action.fillaccountinfomation(password, day, month, year);
// });

// //Tick the checkbox signup news letter
// When('I tick the {string} and {string} checkboxes', async function (checkboxSignupnewsletter, checkboxSignupnoptin) {
//     await this.action.checkboxSignupnewsletter(checkboxSignupnewsletter);
//     await this.action.checkboxSignupnoptin(checkboxSignupnoptin);
// });

// //Scroll to the country field
// When('I scroll to the {string} field', async function (country) {
//     await this.action.scrollToElement(country);
// });

// //Fill in the address information
// When('I fill data to the address infomation: {string}, {string}, {string}, {string}, {string}, {string}, {string}, {string}, {string}, and {string}', async function (firstname, lastname, company, address, address2, country, state, city, zipcode, phonenumber) {
//     await this.action.filladdressinformation(firstname, lastname, company, address, address2, country, state, city, zipcode, phonenumber);
// });

// //Click on the create account button
// When('I click on the Create Account button, {string}', async function (btnCreateAccount) {
//     await this.action.clickcreateaccount(btnCreateAccount);
// });

// //Verify email already registered
// Given('Navigate to the Create Account page', async function () {
//     this.action = new Actions(this.page);
//     await this.page.goto('https://automationexercise.com/account_created');
//     await this.page.waitForTimeout(3000);
// });
// Then('Navigate to the Account Created, {string}', async function (classname) {
//     await this.action.verifycreateaccounturl(classname);
// });
// Then('Create new account successfully, navigate to the {string} page', async function (classname) {
//     await this.action.verifycreateaccountsuccessful(classname);
// });

// After(async function () {
//     if (this.page) await this.page.close();
//     if (this.browser) await this.browser.close();
// });