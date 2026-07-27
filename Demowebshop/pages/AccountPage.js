// pages/AccountPage.js
// The "My account" area: customer info, addresses and change password.
const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

class AccountPage extends BasePage {
    constructor(page) {
        super(page);
        this.leftMenu = page.locator('.listbox');
        this.result = page.locator('.result');
    }

    async openSection(name) {
        await this.leftMenu.getByRole('link', { name }).click();
    }

    // --- Customer info ---
    async openInfo() {
        await this.goto('/customer/info');
    }

    async updateInfo({ gender, firstName, lastName, email }) {
        if (gender) await this.page.locator(gender === 'female' ? '#gender-female' : '#gender-male').check();
        await this.page.locator('#FirstName').fill(firstName);
        await this.page.locator('#LastName').fill(lastName);
        if (email) await this.page.locator('#Email').fill(email);
        await this.page.getByRole('button', { name: 'Save' }).click();
    }

    async expectInfo({ firstName, lastName }) {
        await expect(this.page.locator('#FirstName')).toHaveValue(firstName);
        await expect(this.page.locator('#LastName')).toHaveValue(lastName);
    }

    // --- Addresses ---
    async addAddress(a) {
        await this.page.getByRole('button', { name: 'Add new' }).click();
        const set = async (id, value) => { if (value) await this.page.locator(`#${id}`).fill(value); };
        await set('Address_FirstName', a.firstName);
        await set('Address_LastName', a.lastName);
        await set('Address_Email', a.email);
        await set('Address_Company', a.company);
        await this.page.locator('#Address_CountryId').selectOption({ label: a.country });
        if (a.state) {
            await expect(this.page.locator('#Address_StateProvinceId')).toBeEnabled();
            await this.page.locator('#Address_StateProvinceId').selectOption({ label: a.state });
        }
        await set('Address_City', a.city);
        await set('Address_Address1', a.address1);
        await set('Address_ZipPostalCode', a.zip);
        await set('Address_PhoneNumber', a.phone);
        await this.page.getByRole('button', { name: 'Save' }).click();
    }

    async expectAddressListed(values) {
        for (const v of values) {
            await expect(this.page.getByText(v, { exact: false }).first()).toBeVisible();
        }
    }

    // --- Change password ---
    async changePassword(oldPassword, newPassword) {
        await this.page.locator('#OldPassword').fill(oldPassword);
        await this.page.locator('#NewPassword').fill(newPassword);
        await this.page.locator('#ConfirmNewPassword').fill(newPassword);
        await this.page.getByRole('button', { name: 'Change password' }).click();
    }

    async expectResult(message) {
        await expect(this.result).toContainText(message);
    }
}

module.exports = AccountPage;
