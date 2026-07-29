// features/step-definitions/common.steps.js
//
// Truly generic navigation/assertion steps for the clean templates. They operate
// on this.page directly, so they are NOT coupled to any single page object and
// can be shared by every feature.
const { Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Then('I should land on {string}', async function (target) {
    const pattern = target.startsWith('http') ? target : new RegExp(`${target}$`);
    await expect(this.page).toHaveURL(pattern);
});

Then('the page title should be {string}', async function (title) {
    await expect(this.page.getByRole('heading', { name: title })).toBeVisible();
});
