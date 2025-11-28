// pages/UserAPI.js
import { request } from '@playwright/test';

export class UserAPI {
    constructor(apiContext) {
        this.apiContext = apiContext;
    }

    async getProductsList() {
        return await this.apiContext.get('/products');
    }
}