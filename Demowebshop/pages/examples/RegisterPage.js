// pages/examples/RegisterPage.js
const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

class RegisterPage extends BasePage {
    constructor(page) {
        super(page);
        this.firstName = page.locator('#FirstName');
        this.lastName = page.locator('#LastName');
        this.email = page.locator('#Email');
        this.password = page.locator('#Password');
        this.confirmPassword = page.locator('#ConfirmPassword');
        this.registerButton = page.getByRole('button', { name: 'Register' });
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.result = page.locator('.result');
    }

    async open() {
        await this.goto('/register');
        await this.expectTitle('Register');
    }

    selectGender(gender) {
        return this.page.locator(gender === 'female' ? '#gender-female' : '#gender-male').check();
    }

    async register({ firstName, lastName, email, password }) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.email.fill(email);
        await this.password.fill(password);
        await this.confirmPassword.fill(password);
        await this.registerButton.click();
    }

    async expectCompleted() {
        await expect(this.result).toContainText('Your registration completed');
    }

    async continueToStore() {
        await this.continueButton.click();
    }

    async expectError(message) {
        await expect(this.page.getByText(message)).toBeVisible();
    }
}

module.exports = RegisterPage;
