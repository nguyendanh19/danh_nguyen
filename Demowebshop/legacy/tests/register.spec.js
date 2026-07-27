const { test, expect } = require('@playwright/test');
const Actions = require('../pages/Actions');
 
test('Register new account successfully', async ({ page }) => {
    let action = new Actions(page);
    await page.goto('https://demowebshop.tricentis.com/');
    await page.waitForTimeout(2000);
 
    // Navigate to the Register page
    await action.clickHeaderlink('Register');
 
    // Verify the URL path to ensure correct navigation
    await action.verifyUrlPath('/register');
 
    // Verify navigation to the Register page
    await action.verifyTitle('Register');
 
    // Select Gender
    await action.selectGender('gender-male');
 
    // Fill in the registration form
    await action.fillRegisterfields('Cuibap', 'Nguyen', 'dn12@yopmail.com', '1234567890', '1234567890');
 
    // Click the Register button
    await action.clickSubmitbutton('button-1 register-next-step-button');
 
    // Verify the URL path to ensure correct navigation
    await action.verifyUrlPath('/registerresult/1');
 
    // Verify registration success
    await action.verifyRegistermessage('Your registration completed');
 
    // verify the URL full to ensure correct navigation
    await action.verifyURLfull('https://demowebshop.tricentis.com/registerresult/1');
    await page.waitForTimeout(2000);
 
    // Click the Continue button
    await action.clickSubmitbutton('button-1 register-continue-button');
 
    // Verify user is logged in
    await action.verifyAccountuser('dn12@yopmail.com');
    await page.waitForTimeout(2000);
});
 
test('Register new account with existing email', async ({ page }) => {
    let action = new Actions(page);
    await page.goto('https://demowebshop.tricentis.com/');
    await page.waitForTimeout(2000);
 
    // Navigate to the Register page
    await action.clickHeaderlink('Register');
 
    // Verify the URL path to ensure correct navigation
    await action.verifyUrlPath('/register');
 
    // Verify navigation to the Register page
    await action.verifyTitle('Register');
 
    // Select Gender
    await action.selectGender('gender-male');
 
    // Fill in the registration form
    await action.fillRegisterfields('Cuibap', 'Nguyen', 'dn1@yopmail.com', '1234567890', '1234567890');
 
    // Click the Register button
    await action.clickSubmitbutton('button-1 register-next-step-button');
 
    // Verify error message for existing email
    await action.verifyInformationerrormessage('The specified email already exists');   
    await page.waitForTimeout(2000);
});
 
test('Verify required fields', async ({ page }) => {
    let action = new Actions(page);
    await page.goto('https://demowebshop.tricentis.com/');
    await page.waitForTimeout(2000);
 
    // Navigate to the Register page
    await action.clickHeaderlink('Register');
 
    // Verify the URL path to ensure correct navigation
    await action.verifyUrlPath('/register');
 
    // Verify navigation to the Register page
    await action.verifyTitle('Register');
 
    // Select Gender
    await action.selectGender('gender-male');
 
    // Fill in the registration form
    await action.fillRegisterfields('', '', '', '', '1234567890');
 
    // Click the Register button
    await action.clickSubmitbutton('button-1 register-next-step-button');
 
    // Verify error message for Fist name field
    await action.verifyRegisterfielderrormessage('First name is required.');
 
    // Verify error message for Last name field
    await action.verifyRegisterfielderrormessage('Last name is required.');
 
    // Verify error message for Email field
    await action.verifyRegisterfielderrormessage('Email is required.');
 
    // Verify error message for Password field
    await action.verifyRegisterfielderrormessage('Password is required.');
 
    // Verify error message for Confirm Password field when passwords do not match
    await action.verifyRegisterfielderrormessage('The password and confirmation password do not match.');
    await page.waitForTimeout(2000);

    // Fill in the registration form
    await action.fillRegisterfields('', '', '', '1234567890', '');
 
    await action.clickSubmitbutton('button-1 register-next-step-button');
    await page.waitForTimeout(2000);
 
    // Verify error message for Confirm Password field
    await action.verifyRegisterfielderrormessage('Password is required.');
 
    // Fill in the registration form
    await action.fillRegisterfields('', '', '', '1', '');
 
    await action.clickSubmitbutton('button-1 register-next-step-button');
 
    // Verify error message for Confirm Password field
    await action.verifyRegisterfielderrormessage('The password should have at least 6 characters.');
    await page.waitForTimeout(2000);
});