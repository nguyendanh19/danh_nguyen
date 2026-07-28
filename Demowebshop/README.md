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
├── tests/                    # Pure-Playwright spec suite (same page objects)
│   ├── login / register / account / catalog / cart-checkout / reorder .spec.js
│   ├── fixtures.js           # custom fixtures injecting the page objects
│   ├── test-data.js          # shared data + unique-email helper
│   └── global-setup.js       # one-time sign-in → storageState.json
├── legacy/                   # ORIGINAL hand-written cases, kept for comparison
│   ├── features/ pages/ tests/ ...  (uses the old Actions god-object)
│   └── README.md             # old → new mapping + how to run
├── playwright.config.js      # Spec suite: projects guest / loggedIn
├── cucumber.js               # BDD suite config
└── .env.example              # Template for local secrets
```

> **Two runners, one Page Object Model.** The same classes in `pages/` back both
> the Cucumber BDD scenarios (`features/`) and the pure-Playwright specs
> (`tests/`) — the BDD layer wires them through step definitions, the spec layer
> through Playwright fixtures. Both suites are self-contained and run green
> headless. `legacy/` holds the pre-refactor originals for side-by-side study —
> see [legacy/README.md](legacy/README.md).

### BDD ↔ spec twins

| Feature (BDD) | Spec (Playwright) |
|---|---|
| `login-clean.feature` | `login.spec.js` |
| `register-clean.feature` | `register.spec.js` |
| `task52-clean.feature` | `account.spec.js` |
| `task72-clean.feature` | `catalog.spec.js` |
| `task73-clean.feature` | `cart-checkout.spec.js` |
| `task74-dynamic.feature` | `reorder.spec.js` |

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

**Playwright specs** (`tests/`)

| Command | What it runs |
|---|---|
| `npm test` | All specs (projects `guest` + `loggedIn`) |
| `npm run test:headed` | Same, with a visible browser |
| `npm run test:ui` | Playwright UI mode |
| `npm run test:guest` / `npm run test:loggedin` | One project only |
| `npm run report` | Open the last HTML report |

**BDD scenarios** (`features/`)

| Command | What it runs |
|---|---|
| `npm run test:bdd` | All `.feature` scenarios |
| `npm run test:bdd:headed` | Same, with a visible browser |
| `npm run test:bdd:login` | Login scenarios only (`@login-clean`) |

**Legacy originals**

| Command | What it runs |
|---|---|
| `npm run test:legacy` | Original Cucumber cases under `legacy/` |
| `npm run test:legacy:pw` | Original Playwright specs under `legacy/` |

Run one feature by tag, or one spec file:
```bash
npx cucumber-js --tags @task74-dynamic
npx playwright test tests/reorder.spec.js
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
