// tests/reorder.spec.js — pure-Playwright twin of features/task74-dynamic.feature
// Creates its own order and asserts the AUTO-GENERATED order number, instead of
// depending on a hardcoded historical order.
const { authTest: test, expect } = require('./fixtures');
const { PRODUCTS, CHECKOUT_ADDRESS } = require('../support/test-data');

test.describe('Re-order', () => {
    test.beforeEach(async ({ cartPage }) => {
        await cartPage.clearCart();
    });

    test('places an order, verifies it, then re-orders it',
        { tag: ['@smoke', '@regression'] },
        async ({ catalogPage, cartPage, checkoutPage, ordersPage, orderDetailsPage }) => {
            let orderNumber;

            await test.step('place an order', async () => {
                await catalogPage.addBookToCart(PRODUCTS.book);
                await cartPage.open();
                await cartPage.acceptTerms();
                await cartPage.checkout();

                orderNumber = await checkoutPage.checkoutAndPlaceOrder(CHECKOUT_ADDRESS);
                expect(orderNumber).toMatch(/^\d+$/);
            });

            await test.step('the generated number shows up in the order history', async () => {
                await ordersPage.goto('/customer/orders');
                await ordersPage.expectOrderPresent(orderNumber);

                await ordersPage.openMostRecentDetails();
                await orderDetailsPage.expectOrderNumber(orderNumber);
            });

            await test.step('re-ordering produces a brand new order', async () => {
                await orderDetailsPage.reorder();
                await cartPage.expectUrl('/cart');
                await cartPage.acceptTerms();
                await cartPage.checkout();

                const secondOrder = await checkoutPage.checkoutAndPlaceOrder(CHECKOUT_ADDRESS);
                expect(secondOrder).toMatch(/^\d+$/);
                expect(secondOrder).not.toBe(orderNumber);

                await ordersPage.goto('/customer/orders');
                await ordersPage.expectOrderPresent(secondOrder);
            });
        });
});
