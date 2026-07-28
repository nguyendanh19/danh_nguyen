// tests/login.spec.js — pure-Playwright twin of features/login-clean.feature
const { test } = require('./fixtures');

const EMAIL = process.env.DEMO_EMAIL || 'cuibap1@yopmail.com';
const PASSWORD = process.env.DEMO_PASSWORD || '1234567890';

test.describe('Sign in', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.open();
    });

    test('signs in with valid credentials', async ({ loginPage }) => {
        await loginPage.login(EMAIL, PASSWORD);
        await loginPage.expectSignedInAs(EMAIL);
    });

    test('rejects empty credentials', async ({ loginPage }) => {
        await loginPage.login('', '');
        await loginPage.expectLoginError('Login was unsuccessful. Please correct the errors and try again.');
        await loginPage.expectLoginError('No customer account found');
    });

    test('rejects an invalid email format', async ({ loginPage }) => {
        await loginPage.login('DN_test', '');
        await loginPage.expectFieldError('Please enter a valid email address.');
    });

    test('rejects wrong credentials', async ({ loginPage }) => {
        await loginPage.login('123@yopmail.com', '123');
        await loginPage.expectLoginError('The credentials provided are incorrect');
    });

    test('navigates to the forgot-password page', async ({ loginPage }) => {
        await loginPage.openForgotPassword();
        await loginPage.expectUrl('/passwordrecovery');
        await loginPage.expectTitle('Password recovery');
    });

    test('keeps me signed in when "Remember me" is ticked', async ({ loginPage }) => {
        await loginPage.login(EMAIL, PASSWORD, { remember: true });
        await loginPage.expectSignedInAs(EMAIL);
    });
});
