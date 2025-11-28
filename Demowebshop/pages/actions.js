const { expect } = require('@playwright/test');
 
class Actions {
    constructor(page) {
        this.page = page;
    }
 
    //Xpath locators
    //Header
    btnHeader = (headerlink) => this.page.locator(`//div[@class="header-links"]//a[contains(text(),"${headerlink}")]`);
    btnHeader_topcartlink = (topcartlink) => this.page.locator(`//li[@id="topcartlink"]/a/span[contains(text(),"${topcartlink}")]`);
    txtTitle = (title) => this.page.locator(`//div[@class="page-title"]/h1[contains(text(),"${title}")]`);
    txtSearch_field = () => this.page.locator(`//div[@class="search-box"]//input[@id="small-searchterms"]`);

    //Register page
    imgRegisterLogo = () => this.page.locator(`//div[@class="header-logo"]//img`);
    radiobtnInformationgender = (gender) => this.page.locator(`//input[@id="${gender}"]`);
    txtInformation = (information) => this.page.locator(`//input[@name="${information}"]`);
    txtInformationmessageconfirm = (messageconfirm) => this.page.locator(`//div[@class="page-body"]/div[contains(text(),"${messageconfirm}")]`);
    txtRegisterverifyaccountuser = (accountuser) => this.page.locator(`//div[@class="header-links"]/ul/li/a[contains(text(),"${accountuser}")]`);
    txtInformationerror = (error) => this.page.locator(`//div[@class="page-body"]//span[contains(text(),"${error}")]`);
    txtFieldvalidationerror = (fieldvalidationerror) => this.page.locator(`//span[@class="field-validation-error"]/span[contains(text(),"${fieldvalidationerror}")]`);
 
    //Login page
    btnSubmit = (submit) => this.page.locator(`//input[@class="${submit}"]`);
    checkboxLoginrememberme = (rememberme) => this.page.locator(`//input[@id="${rememberme}"]`);
    txtLoginunsuccessfulmessage = (unsuccessfulmessage) => this.page.locator(`//div[@class="message-error"]/div/span[contains(text(),"${unsuccessfulmessage}")]`);
    txtLoginvalidateaccountmessage = (validateaccountmessage) => this.page.locator(`//div[@class="message-error"]/div/ul/li[contains(text(),"${validateaccountmessage}")]`);
    btnLoginforgotpassword = (forgotpassword) => this.page.locator(`//div[@class="inputs reversed"]/span/a[contains(text(),"${forgotpassword}")]`);
 
    //Dashboard page
    txtDashboard_title = (dashboard_title) => this.page.locator(`//div[@class="page-body"]//h2[contains(text(),"${dashboard_title}")]`);
    btnDashboardtopmenu = (topmenu) => this.page.locator(`//ul[@class="top-menu"]/li/a[contains(text(),"${topmenu}")]`);
    btnDashboardsublistfirstlevel = (sublistfirstlevel) => this.page.locator(`//ul[@class="top-menu"]/li/ul/li/a[contains(text(),"${sublistfirstlevel}")]`);
    btnDashboardsortby = (sortby) => this.page.locator(`//div[@class="product-sorting"]/select/option[contains(text(),"${sortby}")]`);
    btnDashboardviewas = (viewas) => this.page.locator(`//div[@class="product-viewmode"]/select/option[contains(text(),"${viewas}")]`);
    btnDashboard_categories = (categories) => this.page.locator(`//div[@class="leftside-3"]//li/a[contains(text(),"${categories}")]`);
    btnDashboard_sub_category_item = (sub_category_item) => this.page.locator(`//div[@class="page-body"]//h2/a[contains(text(),"${sub_category_item}")]`);
    btnDashboard_product_add_to_cart = (product_add_to_cart) => this.page.locator(`//div[@class="product-essential"]//input[@id="${product_add_to_cart}"]`);
    btnDashboard_product_item = (productitem) => this.page.locator(`//div[@class="product-item"]//div/h2/a[contains(text(),"${productitem}")]`);
    txtDashboard_productdetail_name = (productname) => this.page.locator(`//div[@class="product-name"]/h1[contains(text(),"${productname}")]`);
    txtDashboard_productdetail_price = (productprice) => this.page.locator(`//div[@class="product-price"]/span[contains(text(),"${productprice}")]`);
    txtDashboard_productgrid_name = (productGrid_name) => this.page.locator(`//div[@class="product-grid"]//a[contains(text(),"${productGrid_name}")]`);
    txtDashboard_productgrid_price = (productGrid_price) => this.page.locator(`//div[@class="product-grid"]//span[contains(text(),"${productGrid_price}")]`);
    txtDashboard_bar_notification = (barnotification) => this.page.locator(`//div[@id="bar-notification"]//p[@class="content" and contains(normalize-space(),"${barnotification}")]`);
    btnDashboard_minicart = () => this.page.locator(`//div[@class="mini-shopping-cart"]`);
    txtDashboard_minicart_count_item = (mini_cart_count) => this.page.locator(`//div[@class="count"]/a[contains(text(),"${mini_cart_count}")]`);
    txtDashboard_minicart_product_name = (first_item, mini_product_name) => this.page.locator(`//div[@class="mini-shopping-cart"]//div[@class="${first_item}"]//a[contains(text(),"${mini_product_name}")]`);
    txtDashboard_minicart_price = (first_item, mini_product_price) => this.page.locator(`//div[@class="mini-shopping-cart"]//div[@class="${first_item}"]//div[@class="price" and contains(., "Unit price: ${mini_product_price}")]`);
    txtDashboard_minicart_quantity = (first_item, mini_product_quantity) => this.page.locator(`//div[@class="mini-shopping-cart"]//div[@class="${first_item}"]//div[@class="quantity" and contains(., "Quantity: ${mini_product_quantity}")]`);
    txtDashboard_minicart_subTotals = (mini_subTotals) => this.page.locator(`//div[@class="mini-shopping-cart"]/div[@class="totals" and contains(., "Sub-Total: ${mini_subTotals}")]`);

    txtDashboardrecipientinformation = (recipientinformation) => this.page.locator(`//input[@class="${recipientinformation}"]`);
    txtDashboardmessageinformation = (recipientinformation) => this.page.locator(`//textarea[@class="${recipientinformation}"]`);
    countDashboard_cart_quantity = (cartquantity) => this.page.locator(`//li[@id="topcartlink"]/a/span[contains(text(),"${cartquantity}")]`);
    
    //Shopping cart page
    txtShoppingcart_item_productname = (cart_item_productname) => this.page.locator(`//tr[@class="cart-item-row"]/td/a[contains(text(),"${cart_item_productname}")]`);
    txtShoppingcart_item_from = (cart_item_from) => this.page.locator(`//tr[@class="cart-item-row"]/td/div[@class="attributes" and contains(normalize-space(.),"${cart_item_from}")]`);
    txtShoppingcart_item_for = (cart_item_for) => this.page.locator(`//tr[@class="cart-item-row"]/td/div[@class="attributes"and contains(normalize-space(.),"${cart_item_for}")]`);
    txtShoppingcart_item_price = (product_name,cart_item_price) => this.page.locator(`//tr[@class="cart-item-row"][.//a[text()="${product_name}"]]//span[@class="product-unit-price" and contains(text(),"${cart_item_price}")]`);
    txtShoppingcart_item_qty = (productName) => this.page.locator(`//tr[@class="cart-item-row"][.//a[text()="${productName}"]]//input[@class="qty-input"]`);
    txtShoppingcart_item_total = (productName, cart_item_total) => this.page.locator(`//tr[@class="cart-item-row"][.//a[text()="${productName}"]]//span[@class="product-subtotal" and contains(text(),"${cart_item_total}")]`);
    txtCheckout_totals_information = (label) => this.page.locator(`//table[@class='cart-total']//tr[.//td[contains(@class,'cart-total-left')]//*[contains(normalize-space(.),"${label}")]]`);
    txtShoppingcart_totals_information = (label) => this.page.locator(`//table[contains(@class,'cart-total')]//tr[.//td[contains(@class,'cart-total-left')]//*[contains(normalize-space(.),"${label}")]]//td[contains(@class,'cart-total-right')]//span[not(*)]`);
    txtShoppingcart_totals_total = (cart_totals_total) => this.page.locator(`//td[@class="cart-total-right"]//span/strong[contains(text(),"${cart_totals_total}")]`);
    checkboxShoppingcart_remove = (remove) => this.page.locator(`//tr[@class='cart-item-row'][.//a[contains(text(),'${remove}')]]//input[@type='checkbox']`);
    txtShoppingcart_pagebody_message = (pagebody_message) => this.page.locator(`//div[@class="page-body"]/div[contains(text(),"${pagebody_message}")]`);
    checkboxShoppingcart = (cart_checkbox) => this.page.locator(`//input[@id="${cart_checkbox}"]`);
    btnShoppingcart_checkout = (cart_checkout) => this.page.locator(`//button[@id="${cart_checkout}"]`);
    txtCheckout_title_step = (checkout_title_step) => this.page.locator(`//div[@class="page-body checkout-data"]//div[@class="step-title"]//h2[contains(text(),"${checkout_title_step}")]`);
    dropdownCheckout_address = (checkout_step, checkout_address) => this.page.locator(`//div[@class="page-body checkout-data"]//select[@id="${checkout_step}"][.//option[contains(text(),"${checkout_address}")]]`);
    btnCheckout_back = () => this.page.locator(`//div[@id="shipping-buttons-container"]/p[@class="back-link"]/a`);
    btnCheckout_submit = (step_container, checkout_submit) => this.page.locator(`//div[@id="${step_container}"]//input[@class="${checkout_submit}"]`);
    radioCheckout = (radio_checkout) => this.page.locator(`//ul[@class="method-list"]//div/label[contains(text(),"${radio_checkout}")]`);
    txtCheckout_payment_information = (checkout_pay_info) => this.page.locator(`//li[@id="opc-payment_info"]//p[contains(text(),"${checkout_pay_info}")]`);
    txtCheckout_cforder_title = (cforder_title, cforder_title_name) => this.page.locator(`//ul[@class="${cforder_title}"]//strong[contains(text(),"${cforder_title_name}")]`);
    txtCheckout_cforder_information = (cforder_title, cforder_information) => this.page.locator(`//ul[@class="${cforder_title}"]//li[contains(normalize-space(.),"${cforder_information}")]`);
    txtCheckout_cforder_totalcart = (label) => this.page.locator(`//table[@class='cart-total']//tr[td[@class='cart-total-left']//span[contains(normalize-space(.), '${label}')]]`);
    txtCheckout_cforder_item_qty = (productName, qty) => this.page.locator(`//tr[@class="cart-item-row"][.//a[text()="${productName}"]]//td[@class="qty nobr"]/span[contains(text(),"${qty}")]`);
    txtCheckout_thank_message = (thank_message) => this.page.locator(`//div[@class="section order-completed"]//strong[contains(text(),"${thank_message}")]`);
    txtOrder_number = () => this.page.locator(`//ul[@class="details"]//li[contains(text(),"Order number:")]`);
    btnCheckout_thank_orderdetail = (order_detail) => this.page.locator(`//div[@class="page checkout-page"]//a[contains(text(),"${order_detail}")]`);

    //My account
    btnMyaccount_leftmenu = (mya_leftmenu) => this.page.locator(`//div[@class="listbox"]//li/a[contains(text(),"${mya_leftmenu}")]`);
    txtMyaccount_addresses = (mya_addresses) => this.page.locator(`//div[@class="edit-address"]//input[@id="${mya_addresses}"]`);
    // txtMyaccount_addresses_country = (mya_addresses_country) => this.page.locator(`//div[@class="edit-address"]//option[contains(text(),"${mya_addresses_country}")]`);
    txtMyaccount_addresses_country = () => this.page.locator('//select[@id="Address_CountryId"]');
    txtMyaccount_addresses_state = () => this.page.locator('//select[@id="Address_StateProvinceId"]');
    txtMyaccount_errormessage = (mya_errormessage) => this.page.locator(`//div[@class="edit-address"]//span[contains(text(),"${mya_errormessage}")]`);
    txtMyaccount_sectionaddress = (mya_section_address) => this.page.locator(`//div[@class="section address-item"]//li[.//*[contains(text(),"${mya_section_address}")] or contains(normalize-space(.),"${mya_section_address}")]`);
    txtMyaccount_information = (mya_information) => this.page.locator(`//div[@class="form-fields"]//input[@id="${mya_information}"]`); //First name/Last name/Email
    txtMyaccount_order_ordertitle = (orderNumber_title) => this.page.locator(`//div[@class="order-list"]//strong[contains(normalize-space(.),"Order Number: ${orderNumber_title}")]`);
    txtMyaccount_order_orderinfo = (orderNumber) => this.page.locator(`//div[@class="order-list"]//div[@class="section order-item"][div[@class="title"]/strong[contains(normalize-space(.),"Order Number: ${orderNumber}")]]`);
    btnMyaccount_order_details = (orderNumber,btndetails) => this.page.locator(`//div[contains(@class,'order-item')][.//strong[contains(normalize-space(.), 'Order Number: ${orderNumber}')]]//input[contains(@class,'${btndetails}')]`);
    txtMyaccount_orderinfo = (orderinfo) => this.page.locator(`//div[@class="order-overview"][div[@class="order-number"]/strong[contains(normalize-space(.),"Order #${orderinfo}")]]`);
    txtMyaccount_orderinfo_orderdetail = (section, oi_order_detail_title) => this.page.locator(`//ul[@class="${section}"]//li[contains(normalize-space(.), "${oi_order_detail_title}")]`);
    txtMyaccount_orderinfo_product = (productName) => this.page.locator(`//div[@class="section products"]//tr[.//td[contains(@class,"name")]//a[normalize-space(text())="${productName}"]]`);
    txtMyaccount_orderinfo_carttotal = (label) => this.page.locator(`//table[contains(@class,"cart-total")]//tr[.//td[contains(@class,"cart-total-left")]//*[normalize-space(.)="${label}"]]//td[contains(@class,"cart-total-right")]//span[normalize-space()]`);
    txtOrder_in_list = (orderNumber) => this.page.locator(`//div[@class='order-list']//strong[contains(normalize-space(.),"Order Number: ${orderNumber}")]`);
    txtOrder_number_info = () => this.page.locator(`//div[@class='order-overview']//div[@class='order-number']//strong`);
    btnMyaccount_order_details_by_number = (orderNumber) => this.page.locator(`//div[contains(@class,'order-item')][.//strong[contains(normalize-space(.),"Order Number: ${orderNumber}")]]//input[contains(@class,'order-details-button')]`);
    txtMyaccount_order_overview = (orderNumber) => this.page.locator(`//div[@class="order-overview"][div[@class="order-number"]/strong[contains(normalize-space(.),"Order #${orderNumber}")]]`);

    //--------------------------------------------------------------------------------------------
    //Actions

    //Header
    async clickHeaderlink(headerlink) {
        const headerLocator = this.btnHeader(headerlink);
        await expect(headerLocator).toBeVisible({ timeout: 2000 });
        await headerLocator.click();
    }
 
    //Click top cart link
    async clickHeader_topcartlink(topcartlink) {
        const headerLocator = this.btnHeader_topcartlink(topcartlink);
        await expect(headerLocator).toBeVisible({ timeout: 2000 });
        await headerLocator.click();
    }
 
    async verifyUrlPath(expectedPath) {
        await expect(this.page).toHaveURL(new RegExp(`${expectedPath}$`));
        await this.page.waitForTimeout(2000);
    }
 
    async verifyURLfull(expectedUrl) {
        await expect(this.page).toHaveURL(expectedUrl);
        await this.page.waitForTimeout(2000);
    }
 
    //Click Submit button
    async clickSubmitbutton(submit) {
        // await this.btnSubmit(submit).click();
        const submitLocator = this.btnSubmit(submit);
        await expect(submitLocator).toBeVisible({ timeout: 2000 });
        await submitLocator.click();
    }

    //Search field
    async fill_data_search_field(productName) {
        const searchField = this.txtSearch_field();
        await expect(searchField).toBeVisible({ timeout: 2000 });
        await searchField.fill(productName);
    }

//--------------------------------------------------------------------------------------------    
    //Register
    //Navigate to the registration page
    async navigateToRegistrationPage() {
        await this.page.goto('https://demowebshop.tricentis.com/');
        const logoLocator = this.imgRegisterLogo();
        await expect(logoLocator).toBeVisible({ timeout: 2000 });
    }

    //Verify title page
    async verifyTitle(title) {
        const Title = this.txtTitle(title);
        await expect(Title).toBeVisible({ timeout: 2000 });
        await expect(Title).toHaveText(title);
    }
 
    //Select Gender
    async selectGender(radiobtnInformationgender) {
        // await this.radiobtnInformationgender(radiobtnInformationgender).click();
        const genderLocator = this.radiobtnInformationgender(radiobtnInformationgender);
        await expect(genderLocator).toBeVisible({ timeout: 2000 });
        await genderLocator.click();
    }
 
    //Fill data Register page
    async fill_Information_register_fields(firstname, lastname, email, password, confirmpassword) {
        await this.txtInformation("FirstName").fill(firstname);
        await this.txtInformation("LastName").fill(lastname);
        await this.txtInformation("Email").fill(email);
        await this.txtInformation("Password").fill(password);
        await this.txtInformation("ConfirmPassword").fill(password);
        await this.txtInformation("ConfirmPassword").fill(confirmpassword);
    }
 
    //Verify message register successful
    async verify_Information_message_confirm(messageconfirm) {
        const successMessage = await this.txtInformationmessageconfirm(messageconfirm);
        await expect(successMessage).toBeVisible({ timeout: 2000 });
        await expect(successMessage).toHaveText(messageconfirm);
    }
 
    // //Click Continue button
    // async clickContinuebutton(continuebtn) {
    //     await this.btnRegisterContinue(continuebtn).click();
    // }
 
    //Verify account user
    async verifyAccountuser(accountuser) {
        const successMessage = await this.txtRegisterverifyaccountuser(accountuser);
        await expect(successMessage).toBeVisible({ timeout: 2000 });
        await expect(successMessage).toHaveText(accountuser);
    }
 
    //Verify error message register with existing email
    async verifyInformationerrormessage(error) {
        const errorMessage = await this.txtInformationerror(error);
        await expect(errorMessage).toBeVisible({ timeout: 2000 });
        await expect(errorMessage).toHaveText(error);
    }
 
    //Verify error message for each field
    async verifyInformationrormessage(informationerror) {
        const errorMessage = await this.txtFieldvalidationerror(informationerror);
        await expect(errorMessage).toBeVisible({ timeout: 2000 });
        await expect(errorMessage).toHaveText(informationerror);
    }
//--------------------------------------------------------------------------------------------
    //Login
    //Fill text
    async fillloginfields(emailaddress, password) {
        await this.txtInformation("Email").fill(emailaddress);
        await this.txtInformation("Password").fill(password);
    }
 
    //Check remember me checkbox
    async checkrememberme(rememberme) {
        await this.checkboxLoginrememberme(rememberme).check();
    }
 
    //Verify error message Login unsuccessful
    async verifyLoginunsuccessfulmessage(unsuccessfulmessage) {
        const errorMessage = await this.txtLoginunsuccessfulmessage(unsuccessfulmessage);
        await expect(errorMessage).toBeVisible({ timeout: 2000 });
        await expect(errorMessage).toHaveText(unsuccessfulmessage);
    }
 
    //Verify error message validate account
    async verifyErrormessagevalidationaccount(validateaccountmessage) {
        const errorMessage = await this.txtLoginvalidateaccountmessage(validateaccountmessage);
        await expect(errorMessage).toBeVisible({ timeout: 2000 });  
        await expect(errorMessage).toHaveText(validateaccountmessage);
    }
 
    //Verify error message for Email field
    // async verifyRegisterfielderrormessage(fieldvalidationerror) {
    //     const errorMessage = await this.txtFieldvalidationerror(fieldvalidationerror);
    //     await expect(errorMessage).toBeVisible({ timeout: 2000 });
    //     await expect(errorMessage).toHaveText(fieldvalidationerror);
    // }
 
    //Click forgot password link
    async clickforgotpassword(forgotpassword) {
        const forgotpasswordlink = await this.btnLoginforgotpassword(forgotpassword);
        await forgotpasswordlink.click();
    }
 
//--------------------------------------------------------------------------------------------
    //Dashboard
    //Navigate to the Dashboard page
    async verifyDashboardtitle(dashboard_title) {
        const title = await this.txtDashboard_title(dashboard_title);
        await expect(title).toBeVisible({ timeout: 2000 });
        await expect(title).toHaveText(dashboard_title);
    }

    //Select the featured product
    async selectfeaturedproduct(productitem) {
        const featuredProduct = await this.btnDashboard_product_item(productitem);
        await featuredProduct.click();
    }
 
    //Verify product name on the product detail page
    async verifyproductname(productname) {
        const successMessage = await this.txtDashboard_productdetail_name(productname);
        await expect(successMessage).toHaveText(productname);
    }
 
    //Verify product price on the product detail page
    async verifyproductprice(productprice) {
        const successMessage = await this.txtDashboard_productdetail_price(productprice);   
        await expect(successMessage).toHaveText(productprice);
    }

    //Verify product name on the product grid
    async verify_productgrid_name(productGrid_name) {
        const successMessage = await this.txtDashboard_productgrid_name(productGrid_name);
        await expect(successMessage).toHaveText(productGrid_name);
    }

    //Verify product price on the product grid
    async verify_productgrid_price(productGrid_price) {
        const successMessage = await this.txtDashboard_productgrid_price(productGrid_price);
        await expect(successMessage).toHaveText(productGrid_price);
    }

    //Fill recipient information for the virtual gift card product
    async fillrecipientinformation(recipientname, recipientemail, message) {
        await this.txtDashboardrecipientinformation("recipient-name").fill(recipientname);
        await this.txtDashboardrecipientinformation("recipient-email").fill(recipientemail);
    }
    async fillmessageinformation(message) {
        await this.txtDashboardmessageinformation("message").fill(message);
    }    
 
    //Click Add to cart button
    async clickAddtocartbutton(addtocart) {
        await this.btnSubmit(addtocart).click();
    }
 
    //Verify the notification bar message
    async verifynotificationbarmessage(barnotification) {
        const successMessage = await this.txtDashboard_bar_notification(barnotification);
        await expect(successMessage).toBeVisible({ timeout: 2000 });
        await expect(successMessage).toHaveText(barnotification);
    }
 
    //Verify the cart quantity
    async verifycartquantity(cartquantity) {
        const successMessage = await this.countDashboard_cart_quantity(cartquantity);
        await expect(successMessage).toBeVisible({ timeout: 2000 });
        await expect(successMessage).toHaveText(cartquantity);
    }

    //Select the Desktops from the Computer
    async selectsublistfromtopmenu(sublistfirstlevel) {
        await this.btnDashboardsublistfirstlevel(sublistfirstlevel).selectOption(sublistfirstlevel);
    }

    //Click on a category in the main menu
    async click_category(categories) {
        const categoryButton = await this.btnDashboard_categories(categories);
        await expect(categoryButton).toBeVisible({ timeout: 2000 });
        await categoryButton.click();
    }
    
    //Select the category item
    async select_category_item(sub_category_item) {
        const categoryItemButton = await this.btnDashboard_sub_category_item(sub_category_item);
        await expect(categoryItemButton).toBeVisible({ timeout: 2000 });
        await categoryItemButton.click();
    }

    //Click on the Add to cart product
    async click_add_to_cart_product(product_add_to_cart) {
        const addToCartButton = await this.btnDashboard_product_add_to_cart(product_add_to_cart);
        await expect(addToCartButton).toBeVisible({ timeout: 2000 });
        await addToCartButton.click();
    }

    //Hover the mini cart
    async hover_mini_cart() {
        const headerCart = this.page.locator('//li[@id="topcartlink"]');
        await expect(headerCart).toBeVisible({ timeout: 2000 });
        await headerCart.hover();
    //waiting mini cart popup displays
        const miniCart = this.page.locator('//div[@class="mini-shopping-cart"]');
        await expect(miniCart).toBeVisible({ timeout: 2000 });
    }

    //Verify count number item on the mini cart
    async verify_mini_cart_item_count(mini_cart_count) {
        const successMessage = await this.txtDashboard_minicart_count_item(mini_cart_count);
        await expect(successMessage).toBeVisible({ timeout: 2000 });
        await expect(successMessage).toHaveText(mini_cart_count);
    }

    //Verify product name on the mini cart
    async verify_mini_product_name(first_item, mini_product_name) {
        const successMessage = await this.txtDashboard_minicart_product_name(first_item, mini_product_name);
        await expect(successMessage).toBeVisible({ timeout: 2000 });
        await expect(successMessage).toHaveText(mini_product_name);
    }

    //Verify product price on the mini cart
    async verify_mini_product_price(first_item, mini_product_price) {
        const successMessage = await this.txtDashboard_minicart_price(first_item, mini_product_price);
        await expect(successMessage).toBeVisible({ timeout: 2000 });
        await expect(successMessage).toContainText(mini_product_price);
    }

    //Verify product quantity on the mini cart
    async verify_mini_product_quantity(first_item, mini_product_quantity) {
        const successMessage = await this.txtDashboard_minicart_quantity(first_item, mini_product_quantity);
        await expect(successMessage).toBeVisible({ timeout: 2000 });
        await expect(successMessage).toContainText(mini_product_quantity);
    }

    //Verify Sub-Total on the mini cart
    async verify_mini_cart_sub_total(mini_subTotals) {
        const successMessage = await this.txtDashboard_minicart_subTotals(mini_subTotals);
        await expect(successMessage).toBeVisible({ timeout: 2000 });
        await expect(successMessage).toContainText(mini_subTotals);
    }


//--------------------------------------------------------------------------------------------
    //Shopping cart
    //Verify product name value in the Product table - Shopping cart page
    async verify_cart_item_productname(cart_item_productname) {
        const successMessage = await this.txtShoppingcart_item_productname(cart_item_productname);
        await expect(successMessage).toHaveText(cart_item_productname);
    }   
 
    //Verify From value in the Product table - Shopping cart page
    async verify_cart_item_from(cart_item_from) {
        const successMessage = await this.txtShoppingcart_item_from(cart_item_from);
        await expect(successMessage).toContainText(cart_item_from);
    }
 
    //Verify For value in the Product table - Shopping cart page
    async verify_cart_item_for(cart_item_for) {
        const successMessage = await this.txtShoppingcart_item_for(cart_item_for);
        await expect(successMessage).toContainText(cart_item_for);
    }
 
    //Verify Price value in the Product table - Shopping cart page
    async verify_cart_item_price(product_name, cart_item_price) {
        const successMessage = await this.txtShoppingcart_item_price(product_name, cart_item_price);
        await expect(successMessage).toHaveText(cart_item_price);
    }   
    
    //Update new data Quantity value in the Product table - Shopping cart page
    async update_cart_item_qty(productName, newQty) {
        const qtyInput = this.txtShoppingcart_item_qty(productName);
        await qtyInput.fill(newQty);
    }

    //Verify Quantity value in the Product table - Shopping cart page
    async verify_cart_item_qty(productName, cart_item_qty) {
        const successMessage = await this.txtShoppingcart_item_qty(productName, cart_item_qty);
        await expect(successMessage).toHaveValue(cart_item_qty);
    }

    //Verify Total value in the Product table - Shopping cart page
    async verify_cart_item_total(productName, cart_item_total) {
        const successMessage = await this.txtShoppingcart_item_total(productName, cart_item_total);
        await expect(successMessage).toHaveText(cart_item_total);
    }   
 
    //Verify Subtotal in the Shopping cart page
    async verify_cart_totals_information(label, expectedValue) {
        const successMessage = await this.txtShoppingcart_totals_information(label);
        await expect(successMessage).toHaveText(expectedValue);
    }
 
    //Verify Total in the Shopping cart page
    async verify_cart_totals_total(cart_totals_total) {
        const successMessage = await this.txtShoppingcart_totals_total(cart_totals_total);
        await expect(successMessage).toHaveText(cart_totals_total);
    }

    //Remove product from cart
    async click_the_remove_checkbox(remove) {
        await this.checkboxShoppingcart_remove(remove).click();
    }

    //Verify empty cart message
    async verifyEmptyCartMessage(emptyCartMessage) {
        const successMessage = await this.txtShoppingcart_pagebody_message(emptyCartMessage);
        await expect(successMessage).toBeVisible({ timeout: 2000 });
        await expect(successMessage).toHaveText(emptyCartMessage);
    }

    // check the product is removed from cart
    async verifyProductRemovedFromCart(page, productName) {
        const productLocator = page.locator(`//tr[@class='cart-item-row'][.//a[contains(text(),'${productName}')]]`);
        await expect(productLocator).not.toBeVisible();
        const count = await productLocator.count();
        if (count === 0) {
        console.log(`'${productName}'`);
    } else {
        throw new Error(`'${productName}'`);
    }
    }

    //Tick the Total agree checkbox
    async tick_total_agree_checkbox(cart_checkbox) {
        const checkbox = this.checkboxShoppingcart(cart_checkbox);
        await expect(checkbox).toBeVisible({ timeout: 2000 });
        await checkbox.check();
    }

    //Click on the Checkout button on the Shopping cart page
    async click_checkout_button(cart_checkout) {
        const checkoutButton = this.btnShoppingcart_checkout(cart_checkout);
        await expect(checkoutButton).toBeVisible({ timeout: 2000 });
        await checkoutButton.click();
    }

    //Verify the information on the Cart footer
    async verify_cart_totals_information_checkout(label, expectedValue, expectedMethod = null) {
        const row = this.txtCheckout_totals_information(label);
 
    // If it is a Shipping line, there may be a "selected-shipping-method"
        if (expectedMethod) {
        const method = row.locator('.selected-shipping-method');
        await expect(method).toHaveText(new RegExp(expectedMethod.trim(), 'i'));
    }
 
    // Get the value in the right-hand column
        const price = row.locator('.cart-total-right .product-price');
        await expect(price).toHaveText(expectedValue);
    }

    //Verify the step title on the Checkout page
    async verify_checkout_title_step(checkout_title_step) {
        const Title = this.txtCheckout_title_step(checkout_title_step);
        await expect(Title).toBeVisible({ timeout: 2000 });
        await expect(Title).toHaveText(checkout_title_step);
    }

    //Verify the Billing address on the Checkout page
    async verify_checkout_billing_address(checkout_step, checkout_address) {
        const addressLocator = this.dropdownCheckout_address(checkout_step, checkout_address);
        await expect(addressLocator).toContainText(checkout_address);
    }

    //Click submit button on the Checkout page
    async click_checkout_submit_button(step_container, checkout_submit) {
        const submitLocator = this.btnCheckout_submit(step_container, checkout_submit);
        await expect(submitLocator).toBeVisible({ timeout: 2000 });
        await submitLocator.click(checkout_submit);
    }

    //Select Shipping Method radio button
    async select_checkout_shipping_method(radio_checkout) {
        const shippingMethodLocator = this.radioCheckout(radio_checkout);
        await expect(shippingMethodLocator).toBeVisible({ timeout: 2000 });
        await shippingMethodLocator.click();
    }

    //Verify the information on the Payment Information step
    async verify_checkout_payment_information(checkout_pay_info) {
        const paymentInfoLocator = this.txtCheckout_payment_information(checkout_pay_info);
        await expect(paymentInfoLocator).toBeVisible({ timeout: 2000 });
        await expect(paymentInfoLocator).toHaveText(checkout_pay_info);
    }

    //Verify the title name on the Confirm Order step
    async verify_cforder_title_name(cforder_title, cforder_title_name) {
        const titleLocator = this.txtCheckout_cforder_title(cforder_title, cforder_title_name);
        await expect(titleLocator).toBeVisible({ timeout: 2000 });
        await expect(titleLocator).toHaveText(cforder_title_name);
    }

    //Verify the qty on the product item - Checkout page
    async verify_checkout_product_item_qty(productName, qty) {
        const qtyLocator = this.txtCheckout_cforder_item_qty(productName, qty);
        await expect(qtyLocator).toBeVisible({ timeout: 2000 });
        await expect(qtyLocator).toHaveText(qty);
    }

    //Verify the information on the Confirm Order step
    async verify_cforder_information(cforder_title, title, name, email, phone, fax, company, address1, address2, city_state_zip, country) {
        await expect(this.txtCheckout_cforder_information(cforder_title, title)).toContainText(title, { timeout: 2000 });
        await expect(this.txtCheckout_cforder_information(cforder_title, name)).toContainText(name, { timeout: 2000 });
        await expect(this.txtCheckout_cforder_information(cforder_title, email)).toContainText(email, { timeout: 2000 });
        await expect(this.txtCheckout_cforder_information(cforder_title, phone)).toContainText(phone, { timeout: 2000 });
        await expect(this.txtCheckout_cforder_information(cforder_title, fax)).toContainText(fax, { timeout: 2000 });
        await expect(this.txtCheckout_cforder_information(cforder_title, company)).toContainText(company, { timeout: 2000 });
        await expect(this.txtCheckout_cforder_information(cforder_title, address1)).toContainText(address1, { timeout: 2000 });
        await expect(this.txtCheckout_cforder_information(cforder_title, address2)).toContainText(address2, { timeout: 2000 });
        await expect(this.txtCheckout_cforder_information(cforder_title, city_state_zip)).toContainText(city_state_zip, { timeout: 2000 });
        await expect(this.txtCheckout_cforder_information(cforder_title, country)).toContainText(country, { timeout: 2000 });
    }

    //Verify the information Payment Method on the Confirm Order step
    async verify_cforder_payment_information(cforder_title, title, payment_method) {
        await expect(this.txtCheckout_cforder_information(cforder_title, title)).toContainText(title, { timeout: 2000 });
        await expect(this.txtCheckout_cforder_information(cforder_title, payment_method)).toContainText(payment_method, { timeout: 2000 });
    }
    
    //Verify the message on the Thank You page
    async verify_thank_you_message(thank_message) {
        const thankyoumessage = this.txtCheckout_thank_message(thank_message);
        await expect(thankyoumessage).toBeVisible({ timeout: 2000 });
        await expect(thankyoumessage).toHaveText(thank_message);
    }

    //Verify and get data order number on the Thank you page
    async verify_and_get_order_number() {
        const orderText = await this.txtOrder_number().textContent();
        const orderNumber = orderText.match(/\d+/)[0];
        this.orderNumber = orderNumber;
        console.log(`Order number captured: ${orderNumber}`);
        return orderNumber;
    }

    //Verify that the URL contains the Order number (after clicking)
    async verify_Order_Details_URL() {
        const currentURL = this.page.url();
        expect(currentURL).toContain(this.orderNumber);
        console.log(`Verified URL contains order number: ${this.orderNumber}`);
    }

    //Click on the "Click here for order details" button
    async clickCheckout_thank_orderdetail(order_detail) {
        const orderDetailLocator = this.btnCheckout_thank_orderdetail(order_detail);
        await expect(orderDetailLocator).toBeVisible({ timeout: 2000 });
        await orderDetailLocator.click();
    }

    //Verify that the order number information on the Order list
    async verify_order_information(orderNumber_title, orderStatus, orderDate, orderTotal) {
    const orderInfoLocator = this.txtMyaccount_order_orderinfo(orderNumber_title);
    await expect(orderInfoLocator.locator('.info li', { hasText: 'Order status:' })).toContainText(`Order status: ${orderStatus}`);
    await expect(orderInfoLocator.locator('.info li', { hasText: 'Order Date:' })).toContainText(`Order Date: ${orderDate}`);
    await expect(orderInfoLocator.locator('.info li', { hasText: 'Order Total:' })).toContainText(`Order Total: ${orderTotal}`);
    }

    //Click on the Details button based on the Order number
    async click_order_details_button(orderNumber, btndetails) {
        const detailsButtonLocator = this.btnMyaccount_order_details(orderNumber, btndetails);
        await expect(detailsButtonLocator).toBeVisible({ timeout: 2000 });
        await detailsButtonLocator.click();
    }

    //Verify information Order overview area
    async verify_order_overview_information(orderinfo, orderDate, orderStatus, orderTotal) {
        const orderOverviewLocator = this.txtMyaccount_orderinfo(orderinfo);
        await expect(orderOverviewLocator.locator('.order-details span', { hasText: 'Order Date:' })).toContainText(`Order Date: ${orderDate}`);
        await expect(orderOverviewLocator.locator('.order-details span', { hasText: 'Order Status:' })).toContainText(`Order Status: ${orderStatus}`);
        const orderTotalLocator = orderOverviewLocator.locator('.order-total');
        await expect(orderTotalLocator).toContainText(`Order Total: ${orderTotal}`);
    }

    //Verify that the information in the Order details area
    async verify_order_details_information(section, oi_order_detail_title, name, email, phone, fax, company, address1, address2, city_state_zip, country, payment_shippingTitle, payment_shippingMethod) {
        await expect(this.txtMyaccount_orderinfo_orderdetail(section, oi_order_detail_title)).toContainText(oi_order_detail_title, { timeout: 2000 });
        await expect(this.txtMyaccount_orderinfo_orderdetail(section, name)).toContainText(name, { timeout: 2000 });
        await expect(this.txtMyaccount_orderinfo_orderdetail(section, email)).toContainText(email, { timeout: 2000 });
        await expect(this.txtMyaccount_orderinfo_orderdetail(section, phone)).toContainText(phone, { timeout: 2000 });
        await expect(this.txtMyaccount_orderinfo_orderdetail(section, fax)).toContainText(fax, { timeout: 2000 });
        await expect(this.txtMyaccount_orderinfo_orderdetail(section, company)).toContainText(company, { timeout: 2000 });
        await expect(this.txtMyaccount_orderinfo_orderdetail(section, address1)).toContainText(address1, { timeout: 2000 });
        await expect(this.txtMyaccount_orderinfo_orderdetail(section, address2)).toContainText(address2, { timeout: 2000 });
        await expect(this.txtMyaccount_orderinfo_orderdetail(section, city_state_zip)).toContainText(city_state_zip, { timeout: 2000 });
        await expect(this.txtMyaccount_orderinfo_orderdetail(section, country)).toContainText(country, { timeout: 2000 });
        await expect(this.txtMyaccount_orderinfo_orderdetail(section, payment_shippingTitle)).toContainText(payment_shippingTitle, { timeout: 2000 });
        await expect(this.txtMyaccount_orderinfo_orderdetail(section, payment_shippingMethod)).toContainText(payment_shippingMethod, { timeout: 2000 });
    }

    //Verify the information in the Product(s) table
    async verify_order_product_information(productName, price, quantity, total) {
        const productRow = this.txtMyaccount_orderinfo_product(productName); 
        await expect(section.locator('.title strong')).toContainText(productTitle, {timeout: 2000})
        await expect(productRow.locator('td.name')).toContainText(productName, { timeout: 2000 });
        await expect(productRow.locator('td.price')).toContainText(price, { timeout: 2000 });
        await expect(productRow.locator('td.quantity')).toContainText(quantity, { timeout: 2000 });
        await expect(productRow.locator('td.total')).toContainText(total, { timeout: 2000 });
    }

    //Verify that the information on the Total info in the Order information
    async verify_order_cart_total_information(subTotal, shipping, paymentFee, tax, orderTotal) {
        await expect(this.txtMyaccount_orderinfo_carttotal('Sub-Total:')).toContainText(subTotal);
        await expect(this.txtMyaccount_orderinfo_carttotal('Shipping:')).toContainText(shipping);
        await expect(this.txtMyaccount_orderinfo_carttotal('Payment method additional fee:')).toContainText(paymentFee);
        await expect(this.txtMyaccount_orderinfo_carttotal('Tax:')).toContainText(tax);
        await expect(this.txtMyaccount_orderinfo_carttotal('Order Total:')).toContainText(orderTotal);
    }

    //Verify the Order number just generated will display on the Order list
    async verify_order_number_in_list() {
        // check if the orderNumber is saved
        if (!this.orderNumber) {
            throw new Error('No order number found. Did you call verify_and_get_order_number() first?');
        }
        // locator to find order number in order list
        const orderLocator = this.txtOrder_in_list(this.orderNumber);
        // verify element is visible
        await expect(orderLocator).toBeVisible({ timeout: 5000 }); 
        console.log(`Verified order number ${this.orderNumber} appears in order list.`);
    }

    //Verify that the Order number just generated will display on the Order information
    async verify_order_number_in_information() {
        if (!this.orderNumber) {
            throw new Error('No order number found. Did you call verify_and_get_order_number() first?');
        }
 
        const infoLocator = this.txtOrder_number_info();
        const infoText = await infoLocator.textContent();
        const infoNumber = infoText.match(/\d+/)[0];
        expect(infoNumber).toBe(this.orderNumber); 
        console.log(`Verified order number ${infoNumber} matches the captured order ${this.orderNumber}.`);
    }

    //Click on the Detail button base on order number just generate before
    async click_order_details_button_of_generated_order() {
        if (!this.orderNumber) {
            throw new Error('Order number not found — make sure verify_and_get_order_number() was called before this step.');
        }
    const detailsButtonLocator = this.btnMyaccount_order_details_by_number(this.orderNumber);
    await expect(detailsButtonLocator).toBeVisible({ timeout: 3000 });
    await detailsButtonLocator.click();
    console.log(`Clicked Details button for generated Order Number: ${this.orderNumber}`);
    }

    //Verify that the information Order Total field on the Order overview area
    async verify_order_total_in_overview(orderTotal) {
    // Check whether the orderNumber is saved or not
    if (!this.orderNumber) {
        throw new Error('Order number not found — call verify_and_get_order_number() before this step.');
    }
    const orderOverviewLocator = this.txtMyaccount_order_overview(this.orderNumber);
    // Identify the location of the Order Total
    const orderTotalLocator = orderOverviewLocator.locator('.order-total');
    await expect(orderTotalLocator).toContainText(`Order Total: ${orderTotal}`, { timeout: 3000 });
    console.log(`Verified Order Total: ${orderTotal} for Order #${this.orderNumber}`);
    }


//--------------------------------------------------------------------------------------------
    //My account
    //Customer info
    async account_information_fields (firstname,lastname,email) {
        await this.txtMyaccount_information("FirstName").fill(firstname);
        await this.txtMyaccount_information("LastName").fill(lastname);
        await this.txtMyaccount_information("Email").fill(email);
    }

    //Verify update new data to the Customer info
    async verify_information_fields(firstname, lastname, email) {
        await expect(this.page.locator('#FirstName'))
            .toHaveValue(firstname, { timeout: 2000 });
        await expect(this.page.locator('#LastName'))
            .toHaveValue(lastname, { timeout: 2000 });
        await expect(this.page.locator('#Email'))
            .toHaveValue(email, { timeout: 2000 });
    }

    //Left menu
    async click_left_menu(mya_leftmenu) {
        const leftmenu = this.btnMyaccount_leftmenu(mya_leftmenu);
        await expect(leftmenu).toBeVisible({ timeout: 2000 });
        await leftmenu.click();
    }

    //My account - Add new address
    async fill_data_add_new_address(firstname, lastname, email, company, city, address1, address2, zippostalcode, phonenumber, faxnumber) {
        await this.txtMyaccount_addresses("Address_FirstName").fill(firstname);
        await this.txtMyaccount_addresses("Address_LastName").fill(lastname);
        await this.txtMyaccount_addresses("Address_Email").fill(email);
        await this.txtMyaccount_addresses("Address_Company").fill(company);
        await this.txtMyaccount_addresses("Address_City").fill(city);
        await this.txtMyaccount_addresses("Address_Address1").fill(address1);
        await this.txtMyaccount_addresses("Address_Address2").fill(address2);
        await this.txtMyaccount_addresses("Address_ZipPostalCode").fill(zippostalcode);
        await this.txtMyaccount_addresses("Address_PhoneNumber").fill(phonenumber);
        await this.txtMyaccount_addresses("Address_FaxNumber").fill(faxnumber);
    }

    // async select_country_state_province(countryid, stateprovinceid) {
    //     await this.txtMyaccount_addresses_country().selectOption({ label: countryid });
    //     await this.page.waitForTimeout(2000);
    //     await this.txtMyaccount_addresses_state().selectOption({ label: stateprovinceid });
    // }

    async select_country_state_province(countryName, stateName) {
    await this.txtMyaccount_addresses_country().selectOption({ label: countryName });
    await this.page.waitForTimeout(1500);
    await this.txtMyaccount_addresses_state().selectOption({ label: stateName });
    }

    //Verify added new address
    async verify_added_new_address(title, name, email, phone, fax, company, address1, address2, city_state_zip, country) {
        await expect(this.txtMyaccount_sectionaddress(title)).toContainText(title, { timeout: 2000 });
        await expect(this.txtMyaccount_sectionaddress(name)).toContainText(name, { timeout: 2000 });
        await expect(this.txtMyaccount_sectionaddress(email)).toContainText(email, { timeout: 2000 });
        await expect(this.txtMyaccount_sectionaddress(phone)).toContainText(phone, { timeout: 2000 });
        await expect(this.txtMyaccount_sectionaddress(fax)).toContainText(fax, { timeout: 2000 });
        await expect(this.txtMyaccount_sectionaddress(company)).toContainText(company, { timeout: 2000 });
        await expect(this.txtMyaccount_sectionaddress(address1)).toContainText(address1, { timeout: 2000 });
        await expect(this.txtMyaccount_sectionaddress(address2)).toContainText(address2, { timeout: 2000 });
        await expect(this.txtMyaccount_sectionaddress(city_state_zip)).toContainText(city_state_zip, { timeout: 2000 });
        await expect(this.txtMyaccount_sectionaddress(country)).toContainText(country, { timeout: 2000 });
    }

    //Fill data information change password
    async fill_Information_change_password_fields(oldPassword, newPassword, confirmPassword) {
        await this.txtInformation("OldPassword").fill(oldPassword);
        await this.txtInformation("NewPassword").fill(newPassword);
        await this.txtInformation("ConfirmNewPassword").fill(confirmPassword);
    }
}
module.exports = Actions;