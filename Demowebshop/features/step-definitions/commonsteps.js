const { Given, When, Then, After} = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const Actions = require('../../pages/Actions');
const LoginPage = require('../../pages/LoginPage')

// let browser, context;
// let page;
// let loginPage;

//Check the email already for signup
Given('I check the email already for sigup successfully with Username {string} and Password {string}', async function (username, password) {
    const loginPage = new LoginPage(this.page);
    await this.page.goto('https://demowebshop.tricentis.com/login');
    await this.page.waitForTimeout(2000)
    await this.action.fillloginfields(username, password);
    await this.action.clickSubmitbutton("button-1 login-button");

    // this.action = new Actions(this.page);
    // await this.page.goto('https://demowebshop.tricentis.com/login');
    // await this.page.waitForTimeout(6000)
    // await this.action.fillloginfields("signup-name", name);
    // await this.action.fillloginfields("signup-email", emailaddress);
    // await this.action.clicksubmit("signup-button");

    
    // await page.waitForTimeout(6000);
    // await action.verifyNavigationToSignupPage('Enter Account Information');
});

//Login action
Given('I login to the Automationexercise page with  the Email address {string} and Password {string}', async function (emailaddress, password) {
    this.action = new Actions(this.page);
    await this.page.goto('https://automationexercise.com/login');
    await this.page.waitForTimeout(6000);
    await this.action.fillloginfields("login-email", emailaddress);
    await this.action.fillloginfields("login-password", password);
    await this.action.clicksubmit("login-button");
});

//Verify login success
Then('The {string} display on the Dashboard page', async function (classname) {
    await this.page.waitForTimeout(2000);
    await this.action.verifyAccountuser(classname);
});

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

// //Verify signup success, navigate to signup page
// Then('The email already to register, the {string} display on the Dashboard page', async function (classname) {
//     await this.action.verifyNavigationToSignupPage(classname);
// });

// Given('Navigate to the Sign up page', async function () {
//     this.action = new Actions(this.page);
//     await this.page.goto('https://automationexercise.com/signup');
//     await this.page.waitForTimeout(6000);
// });

// //Fill in the signup fields
// When('I choose the gender is {string}', async function (gender) {
//     await this.action.choosethegender(gender);
// });

// When('I fill data for the account infomation: {string}, {string}, {string}, and {string}', async function (password, day, month, year) {
//     await this.action.fillaccountinfomation(password, day, month, year);
// });

After(async function () {
    if (this.page) await this.page.close();
    if (this.browser) await this.browser.close();
});

module.exports = Actions;