// tests/account.spec.js — pure-Playwright twin of features/account.feature
// Self-contained: registers its own Au_ account, so it never collides with a
// fixed one and every record it leaves behind is identifiable for cleanup.
const { test, expect } = require('./fixtures');
const { uniqueEmail, TEST_USER, ACCOUNT_ADDRESS } = require('../support/test-data');

const { firstName, lastName, password } = TEST_USER;

test.describe('Account management', () => {
    test('registers, updates the profile, adds an address and changes the password',
        { tag: '@regression' },
        async ({ page, registerPage, accountPage, loginPage }) => {
            const email = uniqueEmail();
            const newPassword = '0987654321';

            await test.step('register a new account', async () => {
                await registerPage.open();
                await registerPage.selectGender('male');
                await registerPage.register({ firstName, lastName, email, password });
                await registerPage.expectCompleted();
                await registerPage.continueToStore();
                await expect(page.getByRole('link', { name: email })).toBeVisible();
            });

            await test.step('update the profile', async () => {
                await accountPage.openInfo();
                await accountPage.updateInfo({ gender: 'female', firstName, lastName, email });
                await accountPage.expectInfo({ firstName, lastName });
            });

            await test.step('add an address', async () => {
                await accountPage.openSection('Addresses');
                await accountPage.addAddress({ ...ACCOUNT_ADDRESS, firstName, lastName, email });
                await accountPage.expectAddressListed([ACCOUNT_ADDRESS.city, ACCOUNT_ADDRESS.country]);
            });

            await test.step('change the password', async () => {
                await accountPage.openSection('Change password');
                await accountPage.changePassword(password, newPassword);
                await accountPage.expectResult('Password was changed');
            });

            await test.step('sign in again with the new password', async () => {
                await page.getByRole('link', { name: 'Log out' }).click();
                await loginPage.open();
                await loginPage.login(email, newPassword);
                await loginPage.expectSignedInAs(email);
            });
        });
});
