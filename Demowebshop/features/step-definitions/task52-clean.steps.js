// features/step-definitions/examples/task52-clean.steps.js
// Reuses "I log out" (task74-clean), "I should land on" (common-clean).
const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const RegisterPage = require('../../pages/RegisterPage');
const AccountPage = require('../../pages/AccountPage');
const LoginPage = require('../../pages/LoginPage');

Given('I am on the DemoWebShop store as a guest', async function () {
    await expect(this.page.getByRole('link', { name: 'Register' })).toBeVisible();
    this.newEmail = `auto${Date.now()}@yopmail.com`;
    this.password = '1234567890';
});

When('I register a new account named {string} {string}', async function (firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.register = new RegisterPage(this.page);
    await this.register.open();
    await this.register.selectGender('male');
    await this.register.register({ firstName, lastName, email: this.newEmail, password: this.password });
});

Then('my registration is confirmed', async function () {
    await this.register.expectCompleted();
    await this.register.continueToStore();
});

Then('I am signed in with my new account', async function () {
    await expect(this.page.getByRole('link', { name: this.newEmail })).toBeVisible();
});

When('I update my profile to gender {string}, first name {string}, last name {string}',
    async function (gender, firstName, lastName) {
        this.account = new AccountPage(this.page);
        await this.account.openInfo();
        await this.account.updateInfo({ gender, firstName, lastName, email: this.newEmail });
    });

Then('my profile shows first name {string}, last name {string}', async function (firstName, lastName) {
    await this.account.expectInfo({ firstName, lastName });
});

When('I add a new address:', async function (dataTable) {
    const a = dataTable.rowsHash();
    await this.account.openSection('Addresses');
    await this.account.addAddress({
        ...a,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.newEmail,
    });
});

Then('my address list shows {string} and {string}', async function (a, b) {
    await this.account.expectAddressListed([a, b]);
});

When('I change my password to {string}', async function (newPassword) {
    await this.account.openSection('Change password');
    await this.account.changePassword(this.password, newPassword);
    this.password = newPassword;
});

Then('I see the account message {string}', async function (message) {
    await this.account.expectResult(message);
});

When('I sign in again with my new account and password {string}', async function (password) {
    const login = new LoginPage(this.page);
    await login.open();
    await login.login(this.newEmail, password);
});
