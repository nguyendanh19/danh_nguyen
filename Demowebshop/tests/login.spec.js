const { test, expect } = require('@playwright/test');
const Actions = require('../pages/Actions');
 
test.use({ storageState: undefined }); // Ensure no stored state is used for login tests
 
test('Login the Demo Web Shop portal with valid account successfully', async ({ page }) => {
    let action = new Actions(page);
    await page.goto('https://demowebshop.tricentis.com/');
    await page.waitForTimeout(2000);
 
    // Navigate to the Login page
    await action.clickHeaderlink('Log in');
 
    // Verify the URL path to ensure correct navigation
    await action.verifyUrlPath('/login');
 
    // Verify navigation to the Login page
    await action.verifyTitle('Welcome, Please Sign In!');
 
    // Fill in the username and password fields
    await action.fillloginfields('dn1@yopmail.com', '1234567890')
 
    //Tick the Remember me checkbox
    await action.checkrememberme('RememberMe');
 
    // Click the login button
    await action.clickSubmitbutton('button-1 login-button');
 
    // verify the URL full to ensure correct navigation
    await action.verifyURLfull('https://demowebshop.tricentis.com');
 
    // Verify user is logged in
    await action.verifyAccountuser('dn1@yopmail.com');
    await page.waitForTimeout(2000);
});
 
test('Login the Demo Web Shop portal without data to the Email and Password fields', async ({ page }) => {
    let action = new Actions(page);
    await page.goto('https://demowebshop.tricentis.com/');
    await page.waitForTimeout(2000);
 
    // Navigate to the Login page
    await action.clickHeaderlink('Log in');
 
    // Verify navigation to the Login page
    await action.verifyTitle('Welcome, Please Sign In!');
 
    // Fill in the username and password fields
    await action.fillloginfields('', '')
 
    // Click the login button
    await action.clickSubmitbutton('button-1 login-button');
 
    // Verify error message Loguin unsuccessful
    await action.verifyLoginunsuccessfulmessage('Login was unsuccessful. Please correct the errors and try again.');
 
    // Verify error message validate account
    await action.verifyErrormessagevalidationaccount('No customer account found');
    await page.waitForTimeout(2000);
});
 
test('Login the Demo Web Shop portal with Email field is invalid format', async ({ page }) => {
    let action = new Actions(page);
    await page.goto('https://demowebshop.tricentis.com/');
    await page.waitForTimeout(2000);
 
    // Navigate to the Login page
    await action.clickHeaderlink('Log in');
 
    // Verify the URL path to ensure correct navigation
    await action.verifyUrlPath('/login');
 
    // Verify navigation to the Login page
    await action.verifyTitle('Welcome, Please Sign In!');
 
    // Fill in the username and password fields
    await action.fillloginfields('DN_test', '')
 
    // Click the login button
    await action.clickSubmitbutton('button-1 login-button');
 
    // Verify error message for Email field
    await action.verifyRegisterfielderrormessage('Please enter a valid email address.');
    await page.waitForTimeout(2000);
});
 
test('Login the Demo Web Shop portal with invalid credentials', async ({ page }) => {
    let action = new Actions(page);
    await page.goto('https://demowebshop.tricentis.com/');
    await page.waitForTimeout(2000);
 
    // Navigate to the Login page
    await action.clickHeaderlink('Log in');
 
    // Verify the URL path to ensure correct navigation
    await action.verifyUrlPath('/login');
 
    // Verify navigation to the Login page
    await action.verifyTitle('Welcome, Please Sign In!');
 
    // Fill in the username and password fields
    await action.fillloginfields('123@yopmail.com', '123')
 
    // Click the login button
    await action.clickSubmitbutton('button-1 login-button');
 
    // Verify error message Loguin unsuccessful
    await action.verifyLoginunsuccessfulmessage('Login was unsuccessful. Please correct the errors and try again.');
 
    // Verify the error message Login with invalid credentials
    await action.verifyErrormessagevalidationaccount('The credentials provided are incorrect');
    await page.waitForTimeout(2000);
});
 
test('Verify the Forgot password link on the Login page', async ({ page }) => {
    let action = new Actions(page);
    await page.goto('https://demowebshop.tricentis.com/');
    await page.waitForTimeout(2000);
 
    // Navigate to the Login page
    await action.clickHeaderlink('Log in');
 
    // Verify the URL path to ensure correct navigation
    await action.verifyUrlPath('/login');
    
    // Verify navigation to the Login page
    await action.verifyTitle('Welcome, Please Sign In!');
 
    // Click the "Forgot password" link
    await action.clickforgotpassword('Forgot password?');
 
    // verify the URL full to ensure correct navigation
    await action.verifyURLfull('https://demowebshop.tricentis.com/passwordrecovery');
 
    // Verify navigation to the "Forgot password" page
    await action.verifyTitle('Password recovery');
    await page.waitForTimeout(2000);
});