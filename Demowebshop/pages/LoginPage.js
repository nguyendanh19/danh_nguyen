// pages/examples/LoginPage.js
//
// Reference template — a focused Page Object for ONE screen (the sign-in page).
// Compare with pages/Actions.js (the 780-line "god object"):
//   - user-facing locators (getByRole / getByLabel) instead of XPath + CSS classes
//   - no hardcoded waitForTimeout — Playwright auto-waits, assertions are web-first
//   - assertions live in expect* methods, so steps stay thin and readable
const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        // Locators are addressed the way a user perceives them, not by CSS class.
        this.emailInput = page.getByLabel('Email:');
        this.passwordInput = page.getByLabel('Password:');
        this.rememberMe = page.getByLabel('Remember me?');
        this.logInButton = page.getByRole('button', { name: 'Log in' });
        this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot password?' });
    }

    async open() {
        await this.goto('/login');
        await this.expectTitle('Welcome, Please Sign In!');
    }

    async login(email, password, { remember = false } = {}) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        if (remember) await this.rememberMe.check();
        await this.logInButton.click();
    }

    async openForgotPassword() {
        await this.forgotPasswordLink.click();
    }

    // --- Assertions (web-first: they wait for the condition, no sleeps) ---

    /** After a successful login the header shows the account email as a link. */
    async expectSignedInAs(email) {
        await expect(this.page.getByRole('link', { name: email })).toBeVisible();
    }

    /** Summary error shown on a failed login attempt. */
    async expectLoginError(message) {
        await expect(this.page.getByText(message)).toBeVisible();
    }

    /** Inline field-validation error (e.g. bad email format). */
    async expectFieldError(message) {
        await expect(this.page.getByText(message)).toBeVisible();
    }
}

module.exports = LoginPage;
