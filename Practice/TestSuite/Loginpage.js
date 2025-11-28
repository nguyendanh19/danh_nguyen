const {expect} = require('@playwright/test');
const BasePage = require('./BasePage');
import { test, expect } from '@playwright/test';
test('has title', async ({ page }) => {
    await page.goto('https://google.com/');
    await page.waitForTimeout(6000);
});
    
class BasePage {
    constructor(page) {
        this.page = page;
    }

    //Xpath locators
    txtLoginEmailAddressfield = (EmailAddress) => this.page.locator(`//input[@placeholder="${EmailAddress}"]`);
    txtLoginPasswordfield = (Password) => this.page.locator(`//input[@placeholder="${Password}"]`);
    btnLogin = (Login) => this.page.locator(`//button[@type="submit"]`);
    txtLoginErrorMessage = (ErrorMessage) => this.page.locator(`//div[@class="error-message"]`);

    //Login function


    async login(email, password) {
        await this.txtLoginEmailAddressfield().fill(email);
        await this.txtLoginPasswordfield().fill(password);
        await this.btnLogin().click();
    }

    //verify login success
    async verifyLoginSuccess() {
        const successMessage = await this.page.locator('//div[@class="success-message"]');
        await expect(successMessage).toBeVisible();
    }

//    async navigateTo(url) {
//        await this.page.goto(url);
//    }
//
//    async waitForElement(selector) {
//        await this.page.waitForSelector(selector);
//    }
//
//    async clickElement(selector) {
//        await this.page.click(selector);
//    }
//
//    async fillInput(selector, text) {
//        await this.page.fill(selector, text);
//    }
//
//    async getText(selector) {
//        return await this.page.textContent(selector);
//    }
}