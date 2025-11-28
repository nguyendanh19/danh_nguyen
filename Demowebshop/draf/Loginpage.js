//The login page extends the base page and contains locators and methods for specific interactions.

const BasePage = require('./Basepage');

class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        this.usernameInput = '//*[@data-qa="login-email"]';
        this.passwordInput = '//*[@data-qa="login-password"]';
        this.loginButton = '//*[@data-qa="login-button"]';
    }

    async enterUsername(username) {
        await this.page.fill(this.usernameInput, username);
    }

    async enterPassword(password) {
        await this.page.fill(this.passwordInput, password);
    }

    async clickLoginButton() {
        await this.page.click(this.loginButton);
    }

    async login(username, password) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }
}

module.exports = LoginPage;