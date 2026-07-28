// tests/account.spec.js — pure-Playwright twin of features/task52-clean.feature
// Self-contained: registers its own account, so it never collides with a fixed one.
const { test, expect } = require('./fixtures');
const { uniqueEmail } = require('./test-data');

const NAME = { firstName: 'Bắp', lastName: 'Nguyễn' };

test.describe('Account management', () => {
    test('registers, updates the profile, adds an address and changes the password', async ({
        page, registerPage, accountPage, loginPage,
    }) => {
        const email = uniqueEmail();
        const password = '1234567890';
        const newPassword = '0987654321';

        await test.step('register a new account', async () => {
            await registerPage.open();
            await registerPage.selectGender('male');
            await registerPage.register({ ...NAME, email, password });
            await registerPage.expectCompleted();
            await registerPage.continueToStore();
            await expect(page.getByRole('link', { name: email })).toBeVisible();
        });

        await test.step('update the profile', async () => {
            await accountPage.openInfo();
            await accountPage.updateInfo({ gender: 'female', ...NAME, email });
            await accountPage.expectInfo(NAME);
        });

        await test.step('add an address', async () => {
            await accountPage.openSection('Addresses');
            await accountPage.addAddress({
                ...NAME,
                email,
                company: 'Fsoft',
                country: 'Canada',
                state: 'Prince Edward Island',
                city: 'Nha Trang',
                address1: 'address1',
                zip: '1234AA',
                phone: '0799099999',
            });
            await accountPage.expectAddressListed(['Nha Trang', 'Canada']);
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
