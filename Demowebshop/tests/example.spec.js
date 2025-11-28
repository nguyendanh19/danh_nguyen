// @ts-check
import { test, expect } from '@playwright/test';
import { title } from 'process';

test('has title', async ({ page }) => {
  await page.goto('https://automationexercise.com/login');
  //await page.waitForLoadState('load');
  await page.waitForTimeout(6000);

  // Expect a title "to contain" a substring.
  await expect (page.locator('//*[@class="login-form"]/h2')).toHaveText('Login to your account');
  //expect(page).toHaveTitle(/Login/); 
});