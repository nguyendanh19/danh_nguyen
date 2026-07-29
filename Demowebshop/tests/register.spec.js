// tests/register.spec.js — pure-Playwright twin of features/register-clean.feature
// All accounts created here carry the Au_ marker (see support/test-data.js).
const { test, expect } = require('./fixtures');
const { uniqueEmail, TEST_USER } = require('../support/test-data');

const { firstName, lastName, password } = TEST_USER;

test.describe('Register', () => {
    test('registers a new account successfully', { tag: ['@smoke', '@regression'] }, async ({ page, registerPage }) => {
        const email = uniqueEmail();

        await registerPage.open();
        await registerPage.selectGender('male');
        await registerPage.register({ firstName, lastName, email, password });

        await registerPage.expectCompleted();
        await registerPage.continueToStore();
        await expect(page.getByRole('link', { name: email })).toBeVisible();
    });

    test('rejects an email that is already registered', { tag: '@regression' }, async ({ page, registerPage }) => {
        const email = uniqueEmail();

        // Create the account first, so the duplicate is produced by this test.
        await registerPage.open();
        await registerPage.selectGender('male');
        await registerPage.register({ firstName, lastName, email, password });
        await registerPage.expectCompleted();
        await registerPage.continueToStore();
        await page.getByRole('link', { name: 'Log out' }).click();

        // Now the same email must be refused.
        await registerPage.open();
        await registerPage.selectGender('male');
        await registerPage.register({ firstName, lastName, email, password });
        await registerPage.expectError('The specified email already exists');
    });
});
