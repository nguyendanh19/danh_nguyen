const { expect } = require('@playwright/test');
 
class Actions {
    constructor(page) {
        this.page = page;
    }

    //Xpath locators
    //AutomationPractice
    imgPracticeLogo = () => this.page.locator(`//header[@class="jumbotron text-center header_style"]/a/img`);
    linkPractice = (link) => this.page.locator(`//header[@class="jumbotron text-center header_style"]/a[contains(text(),'${link}')]`);
    btnPracticeHeaderbutton = (btnheader) => this.page.locator(`//div[@style="text-align: right;margin-top: -30px;"]//button[contains(text(),'${btnheader}')]`);
    txtPracticeTitle = () => this.page.locator(`//h1`);
    txtPracticeLegend = (lgend) => this.page.locator(`//div[@class="block large-row-spacer"]/div//legend[contains(text(),'${lgend}')]`);
    radioPracticebtn = (btnradio) => this.page.locator(`//fieldset[legend[text()='Radio Button Example']]//label[contains(.,'${btnradio}')]/input`);
    txtPracticeSuggestion = () => this.page.locator(`//div[@class="cen-left-align"]/fieldset/input`);
    btnPracticeSuggestionlist = (suggestionlist) => this.page.locator(`//li[contains(@class,'ui-menu-item')]//div[contains(text(),'${suggestionlist}')]`);
    txtPracticeSelectedSuggestion = () => this.page.locator(`//input[@id='autocomplete']`);
    txtPracticeDropdownlist = () => this.page.locator(`//div[@class="cen-right-align"]//select`);
    btnPracticeDropdownlistoption = () => this.page.locator(`//div[@class="cen-right-align"]//select[@id='dropdown-class-example']`);
    btnPracticeCheckbox = (checkbox) => this.page.locator(`//div[@id="checkbox-example"]//input[@type="checkbox" and @value='${checkbox}']`);
    checkboxByLabel = (labelText) => this.page.locator(`//div[@id="checkbox-example"]//label[contains(normalize-space(), '${labelText}')]/input`);
    btnPracticeOpenwindow = (openwindow) => this.page.locator(`//fieldset[legend[text()='Switch Window Example']]/button[contains(text(),'${openwindow}')]`);
    btnNewWindow = (accessbtn) => this.newPage.locator(`//div[@class="support-button float-right d-none d-md-block"]//a[contains(., '${accessbtn}')]`);
    btnPracticeOpennewtab = (opennewtab) => this.page.locator(`//fieldset[legend[text()='Switch Tab Example']]/a[contains(text(),'${opennewtab}')]`);
    btnPracticeOpentab = (opentab) => this.newPage.locator(`//fieldset[legend[text()='Switch Tab Example']]/a[contains(text(),'${opentab}')]`);
    txtPracticeSwithtoalert = (switchtoalert) => this.page.locator(`//fieldset[legend[text()='Switch To Alert Example']]//*[@id='${switchtoalert}']`);
    tablePracticeHeader = (tableheader) => this.page.locator(`//fieldset[legend[text()='Web Table Example']]//th[contains(text(),'${tableheader}')]`);
    tablePracticeRow = (rowIndex) => this.page.locator(`//fieldset[legend[text()='Web Table Example']]//tr[${rowIndex}]`);

    //Actions
    //Header
    // Go to the Practice page
    async gotoPracticepage() {
        await this.page.goto('https://rahulshettyacademy.com/AutomationPractice/');
        const logoLocator = this.imgPracticeLogo();
        await expect(logoLocator).toBeVisible({ timeout: 2000 });
    }

    // Click on a header link
    async clickHeaderlink(link) {
        const headerLocator = this.linkPractice(link);
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            headerLocator.click()
        ]);
        await newPage.waitForLoadState('load');
        this.page = newPage;
    }

    // Verify the URL Path
        async verifyUrlPath(expectedPath) {
        await expect(this.page).toHaveURL(new RegExp(`${expectedPath}$`));
    }

    // Verify the full URL
    async verifyURLfull(expectedUrl) {
        await expect(this.page).toHaveURL(expectedUrl, { timeout: 5000 });
    }

    // Click on the Header button
    async clickHeaderbtn(btnheader) {
        const Headerbutton = this.btnPracticeHeaderbutton(btnheader);
        await expect(Headerbutton).toBeVisible({ timeout: 2000 });
        await Headerbutton.click();
    }

    // Click on the Radio button
    async clickRadiobtn(btnradio) {
        const radioButton = this.radioPracticebtn(btnradio);
        await expect(radioButton).toBeVisible({ timeout: 2000 });
        await radioButton.click();
    }

    // Verify the Radio button is selected
    async verifyRadiobtnSelected(btnradio) {
        const radioButton = this.radioPracticebtn(btnradio);
        await expect(radioButton).toBeChecked({ timeout: 2000 });
    }

    // Fill data to the suggestion field
    async fillSuggestionField(text) {
        const suggestionField = this.txtPracticeSuggestion();
        await expect(suggestionField).toBeVisible({ timeout: 2000 });
        await suggestionField.fill(text);
    }

    // Click on the Suggestion button
    async clickSuggestionbtn(suggestion) {
        const suggestionButton = this.btnPracticeSuggestionlist(suggestion);
        await expect(suggestionButton).toBeVisible({ timeout: 2000 });
        await suggestionButton.click();
    }

    // Verify the suggestion is selected
    async verifySuggestionSelected(verifysuggestion) {
    const inputField = this.txtPracticeSelectedSuggestion();
    await expect(inputField).toHaveValue(verifysuggestion, { timeout: 3000 });
    }

    // Click the dropdown list
    async clickDropdownList() {
        const dropdown = this.txtPracticeDropdownlist();
        await expect(dropdown).toBeVisible({ timeout: 2000 });
        await dropdown.click();
    }

    // Select option from dropdown list
    async selectDropdownOption(dropdownlistoption) {
        const dropdown = this.btnPracticeDropdownlistoption(dropdownlistoption);
        await expect(dropdown).toBeVisible({ timeout: 2000 });
        await dropdown.selectOption({ label: dropdownlistoption });
    }

    // Verify the option was selected from dropdown list
    async verifyDropdownOptionSelected(expectedLabel) {
    const dropdown = this.txtPracticeDropdownlist();
    const selectedOption = dropdown.locator('option:checked');
    await expect(selectedOption).toHaveText(expectedLabel, { timeout: 3000 });
    }

    // Tick choose the checkbox
    async tickCheckbox(checkbox) {
        const checkboxElement = this.btnPracticeCheckbox(checkbox);
        await expect(checkboxElement).toBeVisible({ timeout: 2000 });
        await checkboxElement.check();
    }

    // Verify the checkbox is checked
    async verifyCheckboxChecked(checkbox) {
        const checkboxElement = this.btnPracticeCheckbox(checkbox);
        await expect(checkboxElement).toBeChecked({ timeout: 2000 });
    }

    // Tick multiple checkboxes
    async tickCheckboxes(optionList) {
        for (const option of optionList) {
        const checkbox = this.checkboxByLabel(option);
        await checkbox.check();
        }
    }

    // Verify multiple checkboxes are selected
    async verifyCheckboxesSelected(optionList) {
        for (const option of optionList) {
        const checkbox = this.checkboxByLabel(option);
        await expect(checkbox).toBeChecked();
        await this.page.waitForTimeout(1000);
        }
    }

    // Click on the Open Window button
    async click_and_switch_to_new_window(locatorText) {
        const [newPage] = await Promise.all([
            this.page.waitForEvent('popup'),
            this.btnPracticeOpenwindow(locatorText).click()
        ]);
        this.newPage = newPage;
        return newPage;
    }

    // Verify the Access button display on the new window
    async verifyAccessButtonDisplayed(accessbtn) {
        const accessButton = this.newPage.locator(
            `//a[contains(., "${accessbtn}")]`
        );
        await expect(accessButton).toHaveCount(1);
    }

    // Click on the Open Tab button
    async clickAndSwitchToNewTab(opentab) {
        const [newTab] = await Promise.all([
            this.page.waitForEvent('popup'),
            this.btnPracticeOpennewtab(opentab).click()
        ]);
        this.newTab = newTab;
        return newTab;
    }

    // Verify the Access button display on the new tab
    async verifyAccessButtonDisplayed_NewTab(accessbtn) {
        const accessButton = this.newTab.locator(`//a[contains(., "${accessbtn}")]`);
    await expect(accessButton).toBeVisible();
    }

    // Fill data into the Enter Your Name
    async fillEnterYourName(name) {
        const nameField = this.txtPracticeSwithtoalert("name");
        await expect(nameField).toBeVisible({ timeout: 2000 });
        await nameField.fill(name);
    }

    // Click on the button
    async clickAlertButton(switchtoalert) {
        const alertButton = this.txtPracticeSwithtoalert(switchtoalert);
        await expect(alertButton).toBeVisible({ timeout: 2000 });
        await alertButton.click();
    }

    // Handle the Alert button
    async verifyMessagepopup(expectedMessage) {
        this.page.once('dialog', async (dialog) => {
            expect(dialog.type()).toBe('alert');
            expect(dialog.message()).toBe(expectedMessage);
            await new Promise(resolve => setTimeout(resolve, 3000));
            await this.page.accept();
        });
    }

    // Handle the Confirm button
    async verifyConfirmpopup(switchtoalert, accept = true) {
        this.page.once('dialog', async (dialog) => {
            console.log("Confirm text: ", dialog.message());
            if (accept) {
                await dialog.accept();
            } else {
                await dialog.dismiss();
            }
        });
        await this.page.click(switchtoalert);
    }

    // Handle the Confirm button (Cancel case)
    async verifyConfirmpopup_cancel(expectedMessage) {
        this.page.once('dialog', async (dialog) => {
            expect(dialog.type()).toBe('confirm'); //Verify correct type
            expect(dialog.message()).toBe(expectedMessage); //Verify message
            console.log("Popup confirm message: ", dialog.message());
            await new Promise(resolve => setTimeout(resolve, 3000)); //waiting
            await dialog.dismiss();  //Click Cancel
        });
    }

    //========================================================================================================================================
    //Xpath locators
    //Header
//     btnHeader = (headerlink) => this.page.locator(`//div[@class="header-links"]//a[contains(text(),"${headerlink}")]`);
//     btnHeader_topcartlink = (headerlink) => this.page.locator(`//li[@id="topcartlink"]/a/span[contains(text(),"${headerlink}")]`);
//     txtTitle = (title) => this.page.locator(`//div[@class="page-title"]/h1[contains(text(),"${title}")]`);
 
//     //Register page
//     radiobtnRegistergender = (gender) => this.page.locator(`//input[@id="${gender}"]`);
//     txtInformation = (information) => this.page.locator(`//input[@name="${information}"]`);
//     txtRegistermessageconfirm = (messageconfirm) => this.page.locator(`//div[@class="page-body"]/div[contains(text(),"${messageconfirm}")]`);
//     txtRegisterverifyaccountuser = (accountuser) => this.page.locator(`//div[@class="header-links"]/ul/li/a[contains(text(),"${accountuser}")]`);
//     txtRegistererror = (error) => this.page.locator(`//div[@class="message-error"]//div/ul/li[contains(text(),"${error}")]`);
//     txtFieldvalidationerror = (fieldvalidationerror) => this.page.locator(`//span[@class="field-validation-error"]/span[contains(text(),"${fieldvalidationerror}")]`);
 
//     //Login page
//     btnSubmit = (submit) => this.page.locator(`//input[@class="${submit}"]`);
//     checkboxLoginrememberme = (rememberme) => this.page.locator(`//input[@id="${rememberme}"]`);
//     txtLoginunsuccessfulmessage = (unsuccessfulmessage) => this.page.locator(`//div[@class="message-error"]/div/span[contains(text(),"${unsuccessfulmessage}")]`);
//     txtLoginvalidateaccountmessage = (validateaccountmessage) => this.page.locator(`//div[@class="message-error"]/div/ul/li[contains(text(),"${validateaccountmessage}")]`);
//     btnLoginforgotpassword = (forgotpassword) => this.page.locator(`//div[@class="inputs reversed"]/span/a[contains(text(),"${forgotpassword}")]`);
 
//     //Dashboard page
//     btnDashboardtopmenu = (topmenu) => this.page.locator(`//ul[@class="top-menu"]/li/a[contains(text(),"${topmenu}")]`);
//     btnDashboardsublistfirstlevel = (sublistfirstlevel) => this.page.locator(`//ul[@class="top-menu"]/li/ul/li/a[contains(text(),"${sublistfirstlevel}")]`);
//     btnDashboardsortby = (sortby) => this.page.locator(`//div[@class="product-sorting"]/select/option[contains(text(),"${sortby}")]`);
//     btnDashboardviewas = (viewas) => this.page.locator(`//div[@class="product-viewmode"]/select/option[contains(text(),"${viewas}")]`);
    
//     btnDashboardproductitem = (productitem) => this.page.locator(`//div[@class="product-item"]//div/h2/a[contains(text(),"${productitem}")]`);
//     txtDashboardproductname = (productname) => this.page.locator(`//div[@class="product-name"]/h1[contains(text(),"${productname}")]`);
//     txtDashboardproductprice = (productprice) => this.page.locator(`//div[@class="product-price"]/span[contains(text(),"${productprice}")]`);
//     txtDashboardrecipientinformation = (recipientinformation) => this.page.locator(`//input[@class="${recipientinformation}"]`);
//     txtDashboardmessageinformation = (recipientinformation) => this.page.locator(`//textarea[@class="${recipientinformation}"]`);
//     txtDashboardbarnotification = (barnotification) => this.page.locator(`//div[@id="bar-notification"]//p[@class="content" and contains(normalize-space(),"${barnotification}")]`);
//     countDashboardcartquantity = (cartquantity) => this.page.locator(`//li[@id="topcartlink"]/a/span[contains(text(),"${cartquantity}")]`);
    
//     //Shopping cart page
//     txtShoppingcart_item_productname = (cart_item_productname) => this.page.locator(`//tr[@class="cart-item-row"]/td/a[contains(text(),"${cart_item_productname}")]`);
//     txtShoppingcart_item_from = (cart_item_from) => this.page.locator(`//tr[@class="cart-item-row"]/td/div[@class="attributes" and contains(normalize-space(.),"${cart_item_from}")]`);
//     txtShoppingcart_item_for = (cart_item_for) => this.page.locator(`//tr[@class="cart-item-row"]/td/div[@class="attributes"and contains(normalize-space(.),"${cart_item_for}")]`);
//     txtShoppingcart_item_price = (cart_item_price) => this.page.locator(`//tr[@class="cart-item-row"]//span[@class="product-unit-price" and contains(text(),"${cart_item_price}")]`);
//     txtShoppingcart_item_qty = (productName, cart_item_qty) => this.page.locator(`//tr[@class="cart-item-row"][.//a[text()="${productName}"]]//input[@class="qty-input" and @value="${cart_item_qty}"]`);
//     txtShoppingcart_item_total = (productName, cart_item_total) => this.page.locator(`//tr[@class="cart-item-row"][.//a[text()="${productName}"]]//span[@class="product-subtotal" and contains(text(),"${cart_item_total}")]`);
//     txtShoppingcart_totals_information = (label) => this.page.locator(`//table[contains(@class,'cart-total')]//tr[.//td[contains(@class,'cart-total-left')]//*[contains(normalize-space(.),"${label}")]]//td[contains(@class,'cart-total-right')]//span[not(*)]`);
//     txtShoppingcart_totals_total = (art_totals_total) => this.page.locator(`//td[@class="cart-total-right"]//span/strong[contains(text(),"${art_totals_total}")]`);
//     checkboxShoppingcart_remove = (remove) => this.page.locator(`//tr[@class='cart-item-row'][.//a[contains(text(),'${remove}')]]//input[@type='checkbox']`);
//     txtShoppingcart_pagebody_message = (pagebody_message) => this.page.locator(`//div[@class="page-body"]/div[contains(text(),"${pagebody_message}")]`);

//     //--------------------------------------------------------------------------------------------
//     //Actions
//     //Header
//     async clickHeaderlink(headerlink) {
//         const headerLocator = this.btnHeader(headerlink);
//         await expect(headerLocator).toBeVisible({ timeout: 2000 });
//         await headerLocator.click();
//     }
 
//     //Click top cart link
//     async clickHeader_topcartlink(headerlink) {
//         const headerLocator = this.btnHeader_topcartlink(headerlink);
//         await expect(headerLocator).toBeVisible({ timeout: 2000 });
//         await headerLocator.click();
//     }
 
//     async verifyUrlPath(expectedPath) {
//         await expect(this.page).toHaveURL(new RegExp(`${expectedPath}$`));
//     }
 
//     async verifyURLfull(expectedUrl) {
//         await expect(this.page).toHaveURL(expectedUrl);
//     }
 
//     //Click Submit button
//     async clickSubmitbutton(submit) {
//         // await this.btnSubmit(submit).click();
//         const submitLocator = this.btnSubmit(submit);
//         await expect(submitLocator).toBeVisible({ timeout: 2000 });
//         await submitLocator.click();
//     }
// //--------------------------------------------------------------------------------------------    
//     //Register
//     //Verify title page
//     async verifyTitle(title) {
//         const Title = this.txtTitle(title);
//         await expect(Title).toBeVisible({ timeout: 2000 });
//         await expect(Title).toHaveText(title);
//     }
 
//     //Select Gender
//     async selectGender(radiobtnRegistergender) {
//         // await this.radiobtnRegistergender(radiobtnRegistergender).click();
//         const genderLocator = this.radiobtnRegistergender(radiobtnRegistergender);
//         await expect(genderLocator).toBeVisible({ timeout: 2000 });
//         await genderLocator.click();
//     }
 
//     //Fill data Register page
//     async fillRegisterfields(firstname, lastname, email, password, confirmpassword) {
//         await this.txtInformation("FirstName").fill(firstname);
//         await this.txtInformation("LastName").fill(lastname);
//         await this.txtInformation("Email").fill(email);
//         await this.txtInformation("Password").fill(password);
//         await this.txtInformation("ConfirmPassword").fill(password);
//         await this.txtInformation("ConfirmPassword").fill(confirmpassword);
//     }
 
//     //Verify message register successful
//     async verifyRegistermessage(messageconfirm) {
//         const successMessage = await this.txtRegistermessageconfirm(messageconfirm);
//         await expect(successMessage).toBeVisible({ timeout: 2000 });
//         await expect(successMessage).toHaveText(messageconfirm);
//     }
 
//     // //Click Continue button
//     // async clickContinuebutton(continuebtn) {
//     //     await this.btnRegisterContinue(continuebtn).click();
//     // }
 
//     //Verify account user
//     async verifyAccountuser(accountuser) {
//         const successMessage = await this.txtRegisterverifyaccountuser(accountuser);
//         await expect(successMessage).toBeVisible({ timeout: 2000 });
//         await expect(successMessage).toHaveText(accountuser);
//     }
 
//     //Verify error message register with existing email
//     async verifyRegistererrormessage(error) {
//         const errorMessage = await this.txtRegistererror(error);
//         await expect(errorMessage).toHaveText(error);
//     }
 
//     //Verify error message for each field
//     async verifyRegisterfielderrormessage(informationerror) {
//         const errorMessage = await this.txtFieldvalidationerror(informationerror);
//         await expect(errorMessage).toHaveText(informationerror);
//     }
// //--------------------------------------------------------------------------------------------
//     //Login
//     //Fill text
//     async fillloginfields(emailaddress, password) {
//         await this.txtInformation("Email").fill(emailaddress);
//         await this.txtInformation("Password").fill(password);
//     }
 
//     //Check remember me checkbox
//     async checkrememberme(rememberme) {
//         await this.checkboxLoginrememberme(rememberme).check();
//     }
 
//     //Verify error message Login unsuccessful
//     async verifyLoginunsuccessfulmessage(unsuccessfulmessage) {
//         const errorMessage = await this.txtLoginunsuccessfulmessage(unsuccessfulmessage);
//         await expect(errorMessage).toHaveText(unsuccessfulmessage);
//     }
 
//     //Verify error message validate account
//     async verifyErrormessagevalidationaccount(validateaccountmessage) {
//         const errorMessage = await this.txtLoginvalidateaccountmessage(validateaccountmessage);
//         await expect(errorMessage).toHaveText(validateaccountmessage);
//     }
 
//     //Verify error message for Email field
//     async verifyRegisterfielderrormessage(fieldvalidationerror) {
//         const errorMessage = await this.txtFieldvalidationerror(fieldvalidationerror);
//         await expect(errorMessage).toHaveText(fieldvalidationerror);
//     }
 
//     //Click forgot password link
//     async clickforgotpassword(forgotpassword) {
//         const forgotpasswordlink = await this.btnLoginforgotpassword(forgotpassword);
//         await forgotpasswordlink.click();
//     }
 
// //--------------------------------------------------------------------------------------------
//     //Dashboard
//     //Select the featured product
//     async selectfeaturedproduct(productitem) {
//         const featuredProduct = await this.btnDashboardproductitem(productitem);
//         await featuredProduct.click();
//     }
 
//     //Verify product name on the product detail page
//     async verifyproductname(productname) {
//         const successMessage = await this.txtDashboardproductname(productname);
//         await expect(successMessage).toHaveText(productname);
//     }
 
//     //Verify product price on the product detail page
//     async verifyproductprice(productprice) {
//         const successMessage = await this.txtDashboardproductprice(productprice);   
//         await expect(successMessage).toHaveText(productprice);
//     }
 
//     //Fill recipient information for the virtual gift card product
//     async fillrecipientinformation(recipientname, recipientemail, message) {
//         await this.txtDashboardrecipientinformation("recipient-name").fill(recipientname);
//         await this.txtDashboardrecipientinformation("recipient-email").fill(recipientemail);
//     }
//     async fillmessageinformation(message) {
//         await this.txtDashboardmessageinformation("message").fill(message);
//     }    
 
//     //Click Add to cart button
//     async clickAddtocartbutton(addtocart) {
//         await this.btnSubmit(addtocart).click();
//     }
 
//     //Verify the notification bar message
//     async verifynotificationbarmessage(barnotification) {
//         const successMessage = await this.txtDashboardbarnotification(barnotification);
//         await expect(successMessage).toBeVisible({ timeout: 2000 });
//         await expect(successMessage).toHaveText(barnotification);
//     }
 
//     //Verify the cart quantity
//     async verifycartquantity(cartquantity) {
//         const successMessage = await this.countDashboardcartquantity(cartquantity);
//         await expect(successMessage).toBeVisible({ timeout: 2000 });
//         await expect(successMessage).toHaveText(cartquantity);
//     }

//     //Select the Desktops from the Computer
//     async selectsublistfromtopmenu(sublistfirstlevel) {
//         await this.btnDashboardsublistfirstlevel(sublistfirstlevel).selectOption(sublistfirstlevel);
//     }



// //--------------------------------------------------------------------------------------------
//     //Shopping cart
//     //Verify product name value in the Product table - Shopping cart page
//     async verify_cart_item_productname(cart_item_productname) {
//         const successMessage = await this.txtShoppingcart_item_productname(cart_item_productname);
//         await expect(successMessage).toHaveText(cart_item_productname);
//     }   
 
//     //Verify From value in the Product table - Shopping cart page
//     async verify_cart_item_from(cart_item_from) {
//         const successMessage = await this.txtShoppingcart_item_from(cart_item_from);
//         await expect(successMessage).toContainText(cart_item_from);
//     }
 
//     //Verify For value in the Product table - Shopping cart page
//     async verify_cart_item_for(cart_item_for) {
//         const successMessage = await this.txtShoppingcart_item_for(cart_item_for);
//         await expect(successMessage).toContainText(cart_item_for);
//     }
 
//     //Verify Price value in the Product table - Shopping cart page
//     async verify_cart_item_price(cart_item_price) {
//         const successMessage = await this.txtShoppingcart_item_price(cart_item_price);
//         await expect(successMessage).toHaveText(cart_item_price);
//     }   
 
//     //Verify Quantity value in the Product table - Shopping cart page
//     async verify_cart_item_qty(productName, cart_item_qty) {
//         const successMessage = await this.txtShoppingcart_item_qty(productName, cart_item_qty);
//         await expect(successMessage).toHaveValue(cart_item_qty);
//     }
 
//     //Verify Total value in the Product table - Shopping cart page
//     async verify_cart_item_total(productName, cart_item_total) {
//         const successMessage = await this.txtShoppingcart_item_total(productName, cart_item_total);
//         await expect(successMessage).toHaveText(cart_item_total);
//     }   
 
//     //Verify Subtotal in the Shopping cart page
//     async verify_cart_totals_information(label, expectedValue) {
//         const successMessage = await this.txtShoppingcart_totals_information(label);
//         await expect(successMessage).toHaveText(expectedValue);
//     }
 
//     //Verify Total in the Shopping cart page
//     async verify_cart_totals_total(cart_totals_total) {
//         const successMessage = await this.txtShoppingcart_totals_total(cart_totals_total);
//         await expect(successMessage).toHaveText(cart_totals_total);
//     }

//     //Remove product from cart
//     async click_the_remove_checkbox(remove) {
//         await this.checkboxShoppingcart_remove(remove).click();
//     }

//     //Verify empty cart message
//     async verifyEmptyCartMessage(emptyCartMessage) {
//         const successMessage = await this.txtShoppingcart_pagebody_message(emptyCartMessage);
//         await expect(successMessage).toBeVisible({ timeout: 2000 });
//         await expect(successMessage).toHaveText(emptyCartMessage);
//     }

//     // check the product is removed from cart
//     async verifyProductRemovedFromCart(page, productName) {
//         const productLocator = page.locator(`//tr[@class='cart-item-row'][.//a[contains(text(),'${productName}')]]`);
//         await expect(productLocator).not.toBeVisible();
//         const count = await productLocator.count();
//         if (count === 0) {
//         console.log(`'${productName}'`);
//     } else {
//         throw new Error(`'${productName}'`);
//     }
//     }

}
module.exports = Actions;