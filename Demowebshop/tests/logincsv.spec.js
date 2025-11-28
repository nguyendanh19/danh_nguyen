const { test, expect } = require('@playwright/test');
const { readCSV } = require('../utils/csvHelper');
const users = readCSV('data/loginData.csv'); // Load CSV immediately (sync)

test.describe('Login with CSV Data', () => {
  for (const user of users) {
    test(`Login test for ${user.EMAIL || 'Empty EMAIL'} - expect ${user.EXPECTED_RESULT}`, async ({ page }) => {
      await page.goto('https://demowebshop.tricentis.com/login');

      if (user.EMAIL) {
        await page.fill('#Email', user.EMAIL);
      }
      if (user.PASSWORD) {
        await page.fill('#Password', user.PASSWORD);
      }
      await page.click('input[value="Log in"]');

      if (user.EXPECTED_RESULT === 'success') {
        await expect(page.locator('a[href="/logout"]')).toBeVisible();
        await page.goto('https://demowebshop.tricentis.com/logout');
      } else {
        await expect(page.locator('.validation-summary-errors'))
          .toContainText(/Login was unsuccessful|No customer account found|The credentials provided are incorrect/i);
      }
    });
  }
});