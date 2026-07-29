// tests/cart-checkout.spec.js — pure-Playwright twin of features/cart-checkout.feature
const { authTest: test, expect } = require('./fixtures');
const { PRODUCTS, CHECKOUT_ADDRESS } = require('../support/test-data');

test.describe('Shopping cart and checkout', () => {
    test.beforeEach(async ({ cartPage }) => {
        await cartPage.clearCart();
    });

    test('updates quantity, removes a line, then checks out',
        { tag: '@regression' },
        async ({ catalogPage, cartPage, checkoutPage, ordersPage }) => {
            await test.step('fill the cart', async () => {
                await catalogPage.addProductByName(PRODUCTS.computer);
                await catalogPage.addProductByName(PRODUCTS.phone);
                await cartPage.open();
                await cartPage.expectTitle('Shopping cart');
            });

            await test.step('change quantity and remove a product', async () => {
                await cartPage.setQuantity(PRODUCTS.phone, '2');
                await cartPage.selectRemove(PRODUCTS.computer);
                await cartPage.update();

                await cartPage.expectLine(PRODUCTS.phone, { price: '100.00', quantity: '2', total: '200.00' });
                await cartPage.expectTotals({ 'Sub-Total': '200.00', Total: '200.00' });
            });

            await test.step('add another product and re-check the totals', async () => {
                await catalogPage.addProductByName(PRODUCTS.training);
                await cartPage.open();
                await cartPage.expectLine(PRODUCTS.training, { price: '9000.00', quantity: '1', total: '9000.00' });
                await cartPage.expectTotals({ 'Sub-Total': '9200.00', Total: '9200.00' });
            });

            await test.step('check out and place the order', async () => {
                await cartPage.acceptTerms();
                await cartPage.checkout();

                const orderNumber = await checkoutPage.checkoutAndPlaceOrder(CHECKOUT_ADDRESS);
                expect(orderNumber).toMatch(/^\d+$/);

                await ordersPage.goto('/customer/orders');
                await ordersPage.expectOrderPresent(orderNumber);
            });
        });
});
