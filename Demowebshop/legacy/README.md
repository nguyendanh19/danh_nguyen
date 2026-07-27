# Legacy — original hand-written cases

These are the **original** test cases (before the clean rewrite). They are kept
here for reference and side-by-side comparison with the maintained suite in
`../features` + `../pages`.

## What's here
- `features/` — original Gherkin features
  - `demo_login`, `demo_register`, `demo_dashboard_52/72/73/74` — DemoWebShop flows
    (each has a clean replacement in `../features/*.feature`)
  - `dashboard.feature`, `api.feature` — automationexercise.com (UI + API)
- `features/step-definitions/` — original steps (use the `Actions` god-object)
- `pages/` — original page objects, incl. `Actions.js` (one class for every screen)
- `tests/` — original Playwright specs (UI + data-driven JSON/CSV + API)
- `data/`, `utils/`, `urls.js`, `payload/`, `playwright.config.js` — their support files

## Old → new mapping
| Original (here) | Clean rewrite (`../features`) |
|---|---|
| demo_login | login-clean |
| demo_register | register-clean |
| demo_dashboard_52 | task52-clean |
| demo_dashboard_72 | task72-clean |
| demo_dashboard_73 | task73-clean |
| demo_dashboard_74 | task74-clean (dry-run) + task74-dynamic (self-contained) |

## Running the legacy suite
From the `Demowebshop/` folder:
```
npx cucumber-js --config legacy/cucumber.js
```
Legacy Playwright specs use `legacy/playwright.config.js`. Note several legacy
cases are data-bound (fixed account / historical order) and may not run green
without that exact data — that is precisely what the clean rewrites fixed.
