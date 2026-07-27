const { test, expect } = require('@playwright/test');
const apiTests = require('../data/loginApiData.json');

test.describe('API Login with CSRF token', () => {

  for (const tc of apiTests) {
    test(tc.description, async ({ request }) => {
      const getResp = await request.get('https://demowebshop.tricentis.com/login', {
        ignoreHTTPSErrors: true
      });

      const cookiesHeader = getResp.headers()['set-cookie'];

      const html = await getResp.text();
      const match = html.match(/name="__RequestVerificationToken" type="hidden" value="([^"]+)"/);
      const token = match ? match[1] : null;

      expect(token).toBeTruthy();
      const postResp = await request.post('https://demowebshop.tricentis.com/login', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': cookiesHeader
        },
        form: {
          __RequestVerificationToken: token,
          Email: tc.formData.Email,
          Password: tc.formData.Password,
          RememberMe: tc.formData.RememberMe
        },
        ignoreHTTPSErrors: true
      });

      console.log(tc.description, '=> STATUS:', postResp.status());
      expect(postResp.status()).toBe(tc.expectedStatus);
    });
  }

});