// features/support/hooks.js
const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium, firefox, webkit, request } = require('playwright');
const fs = require('fs');
const Actions = require('../../pages/Actions');

setDefaultTimeout(60 * 1000);

Before(async function ({ pickle }) {
    // ========== CONFIG ==========
    const browserType = process.env.BROWSER || 'chromium'; // 'firefox' | 'webkit'
    const headed = process.env.HEADED === 'true'; // true = headed, false = headless
    const browsers = { chromium, firefox, webkit };

    console.log(`Launching ${browserType} | Headed: ${headed}`);

    // ========== LAUNCH BROWSER ==========
    const browser = await browsers[browserType].launch({
        headless: !headed,
        args: ['--start-maximized'],
    });
    this.browser = browser;

    // ========== TAG LOGIC ==========
    console.log('Scenario tags:', pickle.tags.map(t => t.name));
    const hasLoggedInTag = pickle.tags.some(tag => tag.name === '@loggedIn');
    const hasGuestTag = pickle.tags.some(tag => tag.name === '@guest');

    let context;

    // ========== LOGGED-IN MODE ==========
    if (hasLoggedInTag) {
        if (!fs.existsSync('storageState.json')) {
            console.log('No storageState.json found — logging in to create it...');
            const tempContext = await browser.newContext({ ignoreHTTPSErrors: true });
            const tempPage = await tempContext.newPage();

            await tempPage.goto('https://demowebshop.tricentis.com/login', { waitUntil: 'domcontentloaded' });
            await tempPage.fill('#Email', 'cuibap6@yopmail.com');
            await tempPage.fill('#Password', '0987654321');
            await tempPage.click('input[value="Log in"]');
            await tempPage.waitForTimeout(3000);

            await tempContext.storageState({ path: 'storageState.json' });
            await tempContext.close();
            console.log('Created new storageState.json file.');
        }

        context = await browser.newContext({
            storageState: 'storageState.json',
            viewport: null,
        });
    }

    // ========== GUEST MODE ==========
    else if (hasGuestTag) {
        context = await browser.newContext({
            storageState: undefined,
            viewport: null,
        });
    }

    // ========== DEFAULT MODE ==========
    else {
        context = await browser.newContext({ viewport: null });
    }

    const page = await context.newPage();
    this.page = page;
    this.action = new Actions(page);
    this.context = context;

    console.log(hasLoggedInTag ? 'Opening DemoWebShop (logged in)' : 'Opening DemoWebShop (guest)');
    await page.goto('https://demowebshop.tricentis.com/');

    // ========== FULL VIEWPORT ==========
    const screenSize = await page.evaluate(() => ({
        width: window.screen.width,
        height: window.screen.height,
    }));
    await page.setViewportSize(screenSize);

    // ========== API CONTEXT (optional) ==========
    this.apiContext = await request.newContext({
        baseURL: 'https://automationexercise.com/login',
        extraHTTPHeaders: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer Klee8jW5ZFdCHC4lpSU1hMeFTp7L0DfxJqqvlcP0Io9UET7kvZmUOYiScf5sQXql',
        },
    });
});

After(async function () {
    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
});