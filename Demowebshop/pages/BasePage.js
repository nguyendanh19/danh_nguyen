// pages/examples/BasePage.js
//
// Reference template — a small base class every Page Object can extend.
// Keeps shared plumbing (navigation, header, title checks) in one place so
// individual page objects stay focused on their own screen.
const { expect } = require('@playwright/test');

const BASE_URL = 'https://demowebshop.tricentis.com';

class BasePage {
    constructor(page) {
        this.page = page;
    }

    /** Navigate to a path relative to the site root, e.g. goto('/login'). */
    async goto(path = '/') {
        await this.page.goto(`${BASE_URL}${path}`);
    }

    /** A top navigation link, addressed by its visible name (not by CSS class). */
    headerLink(name) {
        return this.page.locator('.header-links').getByRole('link', { name });
    }

    /** Web-first assertion on the page <h1> title — no manual waits needed. */
    async expectTitle(title) {
        await expect(this.page.getByRole('heading', { name: title })).toBeVisible();
    }

    /** Assert the current URL, by suffix (path) or full URL. */
    async expectUrl(expected) {
        const pattern = expected.startsWith('http')
            ? expected
            : new RegExp(`${expected}$`);
        await expect(this.page).toHaveURL(pattern);
    }
}

module.exports = { BasePage, BASE_URL };
