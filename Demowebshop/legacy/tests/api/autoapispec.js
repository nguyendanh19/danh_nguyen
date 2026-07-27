import { test, expect, request } from '@playwright/test';
import { UserAPI } from '../pages/UserAPI.js';

test('GET /productsList - should return product data', async () => {
    const apiContext = await request.newContext({
        baseURL: 'https://automationexercise.com/api',
        extraHTTPHeaders: {
            Authorization: 'Bearer Klee8jW5ZFdCHC4lpSU1hMeFTp7L0DfxJqqvlcP0Io9UET7kvZmUOYiScf5sQXql'
        }
    });

    const userAPI = new UserAPI(apiContext);
    const response = await userAPI.getProductsList();
    // Kiểm tra status
    expect(response.status()).toBe(200);

    // Kiểm tra response body
    const body = await response.json();
    expect(body).toHaveProperty('products');
    expect(body.products.length).toBeGreaterThan(0);

    // In thử product đầu tiên nếu cần debug
    console.log(body.products[0]);
});