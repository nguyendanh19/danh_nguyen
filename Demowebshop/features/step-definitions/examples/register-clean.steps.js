// features/step-definitions/examples/register-clean.steps.js
// Reuses guest/register/login-out steps from task52-clean & task74-clean.
const { When, Then } = require('@cucumber/cucumber');
const RegisterPage = require('../../../pages/examples/RegisterPage');

When('I try to register again with the same email', async function () {
    this.register = new RegisterPage(this.page);
    await this.register.open();
    await this.register.selectGender('male');
    await this.register.register({
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.newEmail,
        password: this.password,
    });
});

Then('I see the registration error {string}', async function (message) {
    await this.register.expectError(message);
});
