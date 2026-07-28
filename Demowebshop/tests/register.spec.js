// tests/register.spec.js — pure-Playwright twin of features/register-clean.feature
const { test, expect } = require('./fixtures');
const { uniqueEmail } = require('./test-data');

const NAME = { firstName: 'Bắp', lastName: 'Nguyễn' };
const PASSWORD = '1234567890';

test.describe('Register', () => {
    test('registers a new account successfully', async ({ page, registerPage }) => {
        const email = uniqueEmail();

        await registerPage.open();
        await registerPage.selectGender('male');
        await registerPage.register({ ...NAME, email, password: PASSWORD });

        await registerPage.expectCompleted();
        await registerPage.continueToStore();
        await expect(page.getByRole('link', { name: email })).toBeVisible();
    });

    test('rejects an email that is already registered', async ({ page, registerPage }) => {
        const email = uniqueEmail();

        // Create the account first, so the duplicate is produced by this test.
        await registerPage.open();
        await registerPage.selectGender('male');
        await registerPage.register({ ...NAME, email, password: PASSWORD });
        await registerPage.expectCompleted();
        await registerPage.continueToStore();
        await page.getByRole('link', { name: 'Log out' }).click();

        // Now the same email must be refused.
        await registerPage.open();
        await registerPage.selectGender('male');
        await registerPage.register({ ...NAME, email, password: PASSWORD });
        await registerPage.expectError('The specified email already exists');
    });
});
