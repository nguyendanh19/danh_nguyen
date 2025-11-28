// features/support/hooks.js
//const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const Actions = require('../../pages/Actions');

let browser, context, page;

setDefaultTimeout(60 * 1000);

Before(async function () {
    browser = await chromium.launch({
        headless: false,
        args: ['--start-maximized'],
        proxy: {
            server: 'http://10.243.0.124:8080',
            username: 'danhnh15',
            password: 'X8nuRPnJ2025'
        }
    });
 
    context = await browser.newContext({ viewport: null });
    page = await context.newPage();
 
    this.browser = browser;
    this.context = context;
    this.page = page;
    this.action = new Actions(page);

    // const context = await this.browser.newContext({
    //     viewport: null
    // });
    // this.page = await context.newPage();

    // const screenSize = await this.page.evaluate(() => {
    //     return { width: window.screen.width, height: window.screen.height };
    // });
    // await this.page.setViewportSize(screenSize);
    // this.action = new Actions(this.page);
});

After(async function () {
    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
});