const { Given, When, Then, After } = require('@cucumber/cucumber');
const Actions = require('../../pages/Actions');
const { chromium } = require('playwright');

let browser, context;
let page;
let loginPage;

//Dashboard page
//Navigate between header bars
Given('I am on Home page, the {string} will displayed', async function (headerbar) {
    this.action = new Actions(this.page);
    await this.action.txtDashboardverifyheaderbar(headerbar)
});

//Click on the header bar button
When ('I click on the {string} button on the header bar', async function (homepage) {
    await this.action.clickheaderbar(homepage);
    await this.page.waitForTimeout(6000);
});

//Verify navigate to the header page successfully
Then('The URL is {string}, the {string} displayed', async function (url, headerbar) {
    await this.action.verifyNavigationtoheaderpage(url);
    // await this.action.txtDashboardverifyhomepage(classname)
    await this.action.verifynavigatetoheaderbar(headerbar)
});

//Veify logout success
Then('Logout successfully, the {string} displayed', async function (classname) {
    await this.action.verifyLoginPage(classname);
});

//Verify navigate to the shopping cart page
Then('Navigate to the Shopping Cart page successfully, the URL is {string}, and the {string} is displayed', async function (url, shoppingcart) {
    await this.action.verifyNavigationtoheaderpage(url);
    await this.action.verifyshoppingcartpage(shoppingcart);
});

//Verify navigate to the video tutorial
Then('The URL Youtube is {string}, the {string} displayed', async function (url, title) {
    await this.action.verifyNavigationtoheaderpage(url);
    // await this.action.txtDashboardverifyhomepage(classname)
    await this.action.verifynavigatetoyoutube(title)
});