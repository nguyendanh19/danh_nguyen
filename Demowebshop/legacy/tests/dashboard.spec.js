const { test, expect } = require('@playwright/test');
const Actions = require('../pages/Actions');
 
test('Add a product to the cart and verify it on the Shopping Cart page with other products', async ({ page }) => {
    let action = new Actions(page);
    await page.goto('https://demowebshop.tricentis.com/');
    await page.waitForTimeout(2000);
 
    // Verify user is logged in
    await action.verifyAccountuser('dn1@yopmail.com');
 
    // Select the featured product
    await action.selectfeaturedproduct('$25 Virtual Gift Card');
 
    // Verify the URL path to ensure correct navigation
    await action.verifyUrlPath('/25-virtual-gift-card');
 
    // Verify navigation to the product detail page
    await action.verifyproductname('$25 Virtual Gift Card');
 
    // Verify the product price
    await action.verifyproductprice('25.00');
 
    // Fill recipient information for the virtual gift card product
    await action.fillrecipientinformation('Danh Nguyen', 'dn01@yopmail.com');
    await action.fillmessageinformation('Cuibap mua hàng, nhớ trả tiền nha mầy!');
    await page.waitForTimeout(2000); 
 
    // Click the Add to cart button
    await action.clickSubmitbutton('button-1 add-to-cart-button');
 
    // Verify the success notification message
    await action.verifynotificationbarmessage('The product has been added to your shopping cart');
 
    // Verify the cart quantity is updated
    await action.verifycartquantity('(2)');
 
    // Navigate to the Shopping cart page
    await action.clickHeader_topcartlink('Shopping cart');
 
    // Verify the URL path to ensure correct navigation
    await action.verifyUrlPath('/cart');
 
    // Verify navigation to the Shopping Cart page
    await action.verifyTitle('Shopping cart');
 
    // Verify product name value in the Product table - Shopping cart page
    await action.verify_cart_item_productname('$25 Virtual Gift Card');
 
    // Verify From value in the Product table - Shopping cart page
    await action.verify_cart_item_from('Cuibap Nguyen');
 
    // Verify For value in the Product table - Shopping cart page
    await action.verify_cart_item_for ('Danh Nguyen');
 
    // Verify Price value in the Product table - Shopping cart page
    await action.verify_cart_item_price('$25 Virtual Gift Card', '25.00');
 
    // Verify Quantity value in the Product table - Shopping cart page
    await action.verify_cart_item_qty('$25 Virtual Gift Card', '1');

    // Verify Total value in the Product table - Shopping cart page
    await action.verify_cart_item_total('$25 Virtual Gift Card', '25.00');

    // Verify Sub-Total value in the Totals area - Shopping cart page
    await action.verify_cart_totals_information('Sub-Total', '1615.00');

    // Verify Shipping value in the Totals area - Shopping cart page
    await action.verify_cart_totals_information('Shipping', '0.00');

    // Verify Tax value in the Totals area - Shopping cart page
    await action.verify_cart_totals_information('Tax', '0.00');
 
    // Verify Total value in the Totals area - Shopping cart page
    await action.verify_cart_totals_total('1615.00');
});

test('Remove one product from the cart and verify on the Cart page that the remaining products are still present', async ({ page }) => {
    let action = new Actions(page);
    await page.goto('https://demowebshop.tricentis.com/');
    await page.waitForTimeout(2000);
 
    // Verify user is logged in
    await action.verifyAccountuser('dn1@yopmail.com');

    // Navigate to the Shopping cart page
    await action.clickHeader_topcartlink('Shopping cart');

    // Verify the URL path to ensure correct navigation
    await action.verifyUrlPath('/cart');

    // Verify navigation to the Shopping Cart page
    await action.verifyTitle('Shopping cart');

    // Click the checkbox remove product
    await action.click_the_remove_checkbox('14.1-inch Laptop')

    // Click the Update shopping cart for the product
    await action.clickSubmitbutton('button-2 update-cart-button');

    // Verify the product is not in the cart
    await action.verifyProductRemovedFromCart(page, '14.1-inch Laptop');

    // Verify the cart quantity is updated
    await action.verifycartquantity('(1)');

    // Verify Sub-Total value in the Totals area - Shopping cart page
    await action.verify_cart_totals_information('Sub-Total', '25.00');

    // Verify Shipping value in the Totals area - Shopping cart page
    await action.verify_cart_totals_information('Shipping', 'Not required');

    // Verify Tax value in the Totals area - Shopping cart page
    await action.verify_cart_totals_information('Tax', '0.00');

    // Verify Total value in the Totals area - Shopping cart page
    await action.verify_cart_totals_total('25.00');
});

test('Add a product to the cart and verify it on the Shopping Cart page', async ({ page }) => {
    let action = new Actions(page);
    await page.goto('https://demowebshop.tricentis.com/');
    await page.waitForTimeout(2000);
 
    // Verify user is logged in
    await action.verifyAccountuser('dn1@yopmail.com');
 
    // Select the featured product
    await action.selectfeaturedproduct('$25 Virtual Gift Card');
 
    // Verify the URL path to ensure correct navigation
    await action.verifyUrlPath('/25-virtual-gift-card');
 
    // Verify navigation to the product detail page
    await action.verifyproductname('$25 Virtual Gift Card');
 
    // Verify the product price
    await action.verifyproductprice('25.00');
 
    // Fill recipient information for the virtual gift card product
    await action.fillrecipientinformation('Danh Nguyen', 'dn01@yopmail.com');
    await action.fillmessageinformation('Cuibap mua hàng, nhớ trả tiền nha mầy!');
 
    // Click the Add to cart button
    await action.clickSubmitbutton('button-1 add-to-cart-button');
 
    // Verify the success notification message
    await action.verifynotificationbarmessage('The product has been added to your shopping cart');
 
    // Verify the cart quantity is updated
    await action.verifycartquantity('(2)');
 
    // Navigate to the Shopping cart page
    await action.clickHeader_topcartlink('Shopping cart');
 
    // Verify the URL path to ensure correct navigation
    await action.verifyUrlPath('/cart');
 
    // Verify navigation to the Shopping Cart page
    await action.verifyTitle('Shopping cart');
 
    // Verify product name value in the Product table - Shopping cart page
    await action.verify_cart_item_productname('$25 Virtual Gift Card');
 
    // Verify From value in the Product table - Shopping cart page
    await action.verify_cart_item_from('Cuibap Nguyen');
 
    // Verify For value in the Product table - Shopping cart page
    await action.verify_cart_item_for ('Danh Nguyen');
 
    // Verify Price value in the Product table - Shopping cart page
    await action.verify_cart_item_price('25.00');
 
    // Verify Quantity value in the Product table - Shopping cart page
    await action.verify_cart_item_qty('$25 Virtual Gift Card', '2');

    // Verify Total value in the Product table - Shopping cart page
    await action.verify_cart_item_total('$25 Virtual Gift Card', '50.00');

    // Verify Sub-Total value in the Totals area - Shopping cart page
    await action.verify_cart_totals_information('Sub-Total', '50.00');

    // Verify Shipping value in the Totals area - Shopping cart page
    await action.verify_cart_totals_information('Shipping', 'Not required');

    // Verify Tax value in the Totals area - Shopping cart page
    await action.verify_cart_totals_information('Tax', '0.00');

    // Verify Total value in the Totals area - Shopping cart page
    await action.verify_cart_totals_total('50.00');
});

test('Remove last product from the cart', async ({ page }) => {
    let action = new Actions(page);
    await page.goto('https://demowebshop.tricentis.com/');
    await page.waitForTimeout(2000);

    // Verify user is logged in
    await action.verifyAccountuser('dn1@yopmail.com');

    // Navigate to the Shopping cart page
    await action.clickHeader_topcartlink('Shopping cart');

    // Verify the URL path to ensure correct navigation
    await action.verifyUrlPath('/cart');

    // Verify navigation to the Shopping Cart page
    await action.verifyTitle('Shopping cart');

    // Click the checkbox remove product
    await action.click_the_remove_checkbox('$25 Virtual Gift Card');

    // Click the Update shopping cart for the product
    await action.clickSubmitbutton('button-2 update-cart-button');

    // Verify the success notification message
    await action.verifyEmptyCartMessage('Your Shopping Cart is empty!');
    await page.waitForTimeout(2000);

    // Verify the cart quantity is updated
    await action.verifycartquantity('(0)');
});