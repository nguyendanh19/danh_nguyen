const { Given, When, Then, Before, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const LoginPage = require('../../pages/LoginPage');

setDefaultTimeout(60 * 1000);

let browser, page, loginPage;

Before(async () => {
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
    loginPage = new LoginPage(page);
}); // Fixed the missing closing parenthesis

Given('I navigate to the login page', async () => {
    await loginPage.navigateTo('https://automationexercise.com/login');
});

When('I enter valid credentials', async () => {
    await loginPage.login('testuser@dntest1@yopmail.com', '1234567890');
   // await loginPage.clickLoginButton();  
//    await loginButton.click();
});

Then('I should be redirected to the dashboard', async () => {
    const title = await loginPage.getTitle();
    if (title !== 'Logged in as dntest1') {
        throw new Error(`Expected title to be 'Dashboard', but got '${title}'`);
    }

    await browser.close();
});