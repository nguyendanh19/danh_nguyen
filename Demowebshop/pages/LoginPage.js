class LoginPage {
    constructor(page) {
        this.page = page;
        this.emailField = page.locator('#Email');
        this.passwordField = page.locator('#Password');
        this.loginButton = page.locator('input[value="Log in"]');
    }

    async goto() {
        await this.page.goto('https://demowebshop.tricentis.com/login');
    }

    async login(email, password) {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }
}
module.exports = LoginPage;