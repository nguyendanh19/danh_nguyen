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
├── features/                 # Cucumber BDD
│   ├── *.feature             # Gherkin scenarios
│   ├── step-definitions/     # Step implementations
│   └── support/hooks.js      # Before/After hooks, browser + context setup
├── pages/                    # Page Object Model
│   ├── Actions.js            # Shared actions & locators (login, cart, checkout, account)
│   ├── LoginPage.js          # Login page object
│   ├── common.js             # Helpers
│   └── userapi.js            # API helpers
├── tests/                    # Playwright spec files
│   ├── login.spec.js         # UI login scenarios
│   ├── register.spec.js      # Registration
│   ├── dashboard.spec.js     # Product / cart / checkout flow
│   ├── loginjson.spec.js     # Data-driven (JSON)
│   ├── logincsv.spec.js      # Data-driven (CSV)
│   ├── loginapi.spec.js      # API-level login
│   ├── api/                  # API specs
│   └── global-setup.js       # One-time auth → storageState.json
├── data/                     # Test data (JSON / CSV)
├── utils/                    # csvHelper, etc.
├── playwright.config.js      # Projects: API / guest / loggedIn / chromium / firefox
├── cucumber.js               # Cucumber config
└── .env.example              # Template for local secrets
```

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
| `npm test` | All Playwright specs |
| `npm run test:headed` | With a visible browser |
| `npm run test:ui` | Playwright UI mode |
| `npm run test:chromium` | Chromium project only |
| `npm run test:api` | API project only |
| `npm run test:login` | Login spec only |
| `npm run test:bdd` | All Cucumber `.feature` scenarios |
| `npm run report` | Open the last HTML report |

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
