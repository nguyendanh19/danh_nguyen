// tests/catalog.spec.js — pure-Playwright twin of features/task72-clean.feature
const { test } = require('./fixtures');
const { PRODUCTS } = require('./test-data');

test.describe('Catalog and mini cart', () => {
    test.beforeEach(async ({ cartPage }) => {
        await cartPage.clearCart(); // known starting state -> stable totals
    });

    test('adds products from a category and from search, then checks the mini cart', async ({
        catalogPage,
    }) => {
        await test.step('add a product from the Computers > Desktops category', async () => {
            await catalogPage.goto('/');
            await catalogPage.openCategory('Computers');
            await catalogPage.openSubCategory('Desktops');
            await catalogPage.expectUrl('/desktops');
            await catalogPage.expectTitle('Desktops');

            await catalogPage.openProduct(PRODUCTS.computer);
            await catalogPage.expectProductPage(PRODUCTS.computer, '1800.00');
            await catalogPage.addToCart();
        });

        await test.step('add a product found through search', async () => {
            await catalogPage.search(PRODUCTS.phone);
            await catalogPage.expectTitle('Search');
            await catalogPage.expectInGrid(PRODUCTS.phone, '100.00');

            await catalogPage.openProduct(PRODUCTS.phone);
            await catalogPage.expectProductPage(PRODUCTS.phone, '100.00');
            await catalogPage.addToCart();
        });

        await test.step('mini cart reflects both products', async () => {
            await catalogPage.openMiniCart();
            await catalogPage.expectMiniCart({
                count: '2',
                subTotal: '1915.00',
                items: [{ name: PRODUCTS.phone, price: '100.00', quantity: '1' }],
            });
        });
    });
});
