const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
// const { Before } = require('@cucumber/cucumber');
const Actions = require('../../pages/Actions');
const { chromium } = require('playwright');
const { expect } = require('@playwright/test')

let browser, context, page;

// Practice page
// Verify the system navigate to the qasummit.org when click on the hypper link Book Now!
Given('I am on the Practice page', async function () {
    await this.action.gotoPracticepage();
});

When('I click on the {string} link', async function (link) {
    await this.action.clickHeaderlink(link);
});

Then('I should be navigate to the {string} page', async function (expectedUrl) {
    await this.action.verifyURLfull(expectedUrl);
});

// Verify the system navigate to the rahulshettyacademy.com when click on the Home button
When('I click on the {string} button', async function (btnheader) {
    await this.action.clickHeaderbtn(btnheader);
});

// Verify the system can select the "Radio1" radio button
When('I click on the {string} radio button', async function (btnradio) {
    await this.action.clickRadiobtn(btnradio);
});

Then('The {string} radio button should be selected', async function (btnradio) {
    await this.action.verifyRadiobtnSelected(btnradio);
});

// Verify fill data and select the option from suggestion field
When('I fill the suggestion field with {string}', async function (text) {
    await this.action.fillSuggestionField(text);
});

When('I select the {string} option from the suggestion list', async function (suggestion) {
    await this.action.clickSuggestionbtn(suggestion);
});

Then('I should see the suggestion {string} selected', async function (verifysuggestion) {
    await this.action.verifySuggestionSelected(verifysuggestion);
});

// Verify that the option selected from dropdown list
When('I click the dropdown list', async function () {
    await this.action.clickDropdownList();
});

When('I select the {string} from the dropdown list', async function (dropdownlistoption) {
    await this.action.selectDropdownOption(dropdownlistoption);
});

Then('I should see the {string} selected', async function (expectedLabel) {
    await this.action.verifyDropdownOptionSelected(expectedLabel);
});

// Verify the checkbox is checked
When('I tick the {string} checkbox', async function (checkbox) {
    await this.action.tickCheckbox(checkbox);
});

Then('The {string} checkbox should be checked', async function (checkbox) {
    await this.action.verifyCheckboxChecked(checkbox);
});

When('I tick the following checkboxes', async function (dataTable) {
  const options = dataTable.raw().flat();
  await this.action.tickCheckboxes(options);
});
 
Then('I should see the following checkboxes selected', async function (dataTable) {
  const options = dataTable.raw().flat();
  await this.action.verifyCheckboxesSelected(options);
});

// Verify that the new window will display when click on the Window button
When('I click the {string} button and switch to new window', async function (openwindow) {
  this.newPage = await this.action.click_and_switch_to_new_window(openwindow);
  await this.newPage.waitForTimeout(2000);
});
 
Then('I should see the new window with the {string} URL', async function (expectedUrl) {
  await expect(this.newPage).toHaveURL(expectedUrl);
});
 
Then('I should see the {string} button displayed', async function (accessbtn) {
  await this.action.verifyAccessButtonDisplayed(accessbtn);
});

// Verify that the new tab will display when click on the Open Tab button
When('I click the {string} button and switch to new tab', async function (opentab) {
  this.newTab = await this.action.clickAndSwitchToNewTab(opentab);
  await this.newTab.waitForTimeout(2000);
});

Then('I should see the new tab with the {string} URL', async function (expectedUrl) {
  await expect(this.newTab).toHaveURL(expectedUrl);
});

Then('I should see the {string} button displayed on the new tab', async function (accessbtn) {
  await this.action.verifyAccessButtonDisplayed_NewTab(accessbtn);
});

// Verify popup when fill and click on the Alert button
When('I fill data {string} into the Enter Your Name field', async function (name) {
  await this.action.fillEnterYourName(name);
});

When('I click the {string} button and handle it', async function (switchtoalert) {
  await this.action.clickAlertButton(switchtoalert);
});

Then('I should see the message {string} expected on the popup', async function (expectedMessage) {
  await this.action.verifyMessagepopup(expectedMessage);
});

Then('I should see the Confirm popup with the expected message {string} and click Cancel button', async function (expectedMessage) {
  await this.action.verifyConfirmpopup_cancel(expectedMessage);
});