# DemoWebShop — Test Automation (Playwright + Cucumber)

End-to-end **UI and API test automation** for the public demo e-commerce site
[DemoWebShop by Tricentis](https://demowebshop.tricentis.com), built with
**Playwright (JavaScript)** using the **Page Object Model**, plus a **Cucumber BDD**
layer for behaviour-driven scenarios.

> Practice / portfolio project demonstrating automation design: reusable page
> objects, data-driven tests (JSON/CSV), BDD, and API testing.

---

## 🧰 Tech Stack

| Area | Tool |
|---|---|
| Test runner | [`@playwright/test`](https://playwright.dev) |
| BDD | [`@cucumber/cucumber`](https://cucumber.io) |
| Language | JavaScript (CommonJS) |
| Design pattern | Page Object Model (POM) |
| Test data | JSON / CSV (data-driven) |
| Config / secrets | `dotenv` (`.env`) |

---

## 📁 Project Structure

```
.
├── features/                 # Clean BDD suite (the maintained cases)
│   ├── *.feature             # login / register / task52 / task72 / task73 / task74
│   ├── step-definitions/     # thin steps, one file per feature
│   └── support/hooks.js      # browser/context lifecycle, @loggedIn / @guest
├── pages/                    # Page Object Model (one focused class per screen)
│   ├── BasePage.js           # shared navigation + assertions
│   ├── LoginPage.js  RegisterPage.js  AccountPage.js  AccountOrdersPage.js
│   ├── CatalogPage.js  ShoppingCartPage.js  CheckoutPage.js  OrderDetailsPage.js
│   └── components.js         # reusable address / product / totals assertions
├── legacy/                   # ORIGINAL hand-written cases, kept for comparison
│   ├── features/ pages/ tests/ ...  (uses the old Actions god-object)
│   └── README.md             # old → new mapping + how to run
├── cucumber.js               # Cucumber config (active suite)
├── .env.example              # Template for local secrets
└── data/ utils/ ...          # (moved under legacy/ — used by the legacy specs)
```

> The clean suite is self-contained and runs green headless. The `legacy/`
> folder holds the pre-refactor originals for side-by-side study — see
> [legacy/README.md](legacy/README.md).

---

## 🚀 Getting Started

### 1. Install
```bash
npm install
npx playwright install
```

### 2. Configure environment
Copy the template and fill in your own values (the `.env` file is git-ignored):
```bash
cp .env.example .env
```

### 3. Run tests

| Command | What it runs |
|---|---|
| `npm test` | The clean BDD suite (all `.feature` scenarios) |
| `npm run test:headed` | Same, with a visible browser |
| `npm run test:login` | Login scenarios only (`@login-clean`) |
| `npm run test:legacy` | The original cases under `legacy/` (Cucumber) |
| `npm run test:legacy:pw` | The original Playwright specs under `legacy/` |

Run a single feature by tag, e.g.:
```bash
npx cucumber-js --tags @task74-dynamic
```

---

## ✅ Coverage

- **Authentication** — login (valid / invalid / empty / bad format), forgot password, registration
- **Product & Cart** — browse categories, product detail, add to cart, mini-cart, quantity update, remove
- **Checkout** — billing/shipping, payment, confirm order, order confirmation & order history
- **My Account** — customer info, addresses, change password
- **Data-driven** — same login flow across JSON and CSV data sets
- **API** — login and account operations at the service layer

---

## 🧩 Key Practices Demonstrated

- **Page Object Model** — locators and actions centralised in `pages/`, kept out of specs
- **BDD** — Gherkin features with reusable step definitions and tag-based browser/auth selection (`@loggedIn`, `@guest`)
- **Session reuse** — `global-setup.js` logs in once and stores `storageState.json`
- **Data-driven testing** — external JSON/CSV inputs
- **Secrets kept out of git** — credentials/tokens read from `.env`

---

## 👤 Author

**danh_nguyen** — QA / Test Automation Engineer
