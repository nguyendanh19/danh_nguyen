// features/step-definitions/register.steps.js
// Reuses guest/register/log-out steps from account.steps & order-details.steps.
const { When, Then } = require('@cucumber/cucumber');
const RegisterPage = require('../../pages/RegisterPage');

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
