# QA Automation Portfolio — danh_nguyen

Practice and portfolio projects for **test automation**, built while learning and
applying automation on public demo sites. Main focus: **Playwright (JavaScript)**
with the **Page Object Model** and **Cucumber BDD**, plus some **Cypress**.

---

## 📦 Projects

| Project | Stack | Target site | Highlights |
|---|---|---|---|
| **[Demowebshop](./Demowebshop)** ⭐ | Playwright + Cucumber (POM) | demowebshop.tricentis.com | Most complete: UI + API, BDD, data-driven (JSON/CSV), full e2e checkout flow. See its [README](./Demowebshop/README.md). |
| [Practice](./Practice) | Playwright + Cucumber (POM) | demowebshop / automationexercise | Early practice: login, register, dashboard, API. |
| [cypress](./cypress) | Cypress | — | Cypress e2e experiments. |

> ⭐ **Start with [Demowebshop](./Demowebshop)** — it's the cleanest, most complete example.

---

## 🧰 Skills Demonstrated

- **Playwright** (JavaScript) — Page Object Model, fixtures, projects, `storageState` auth
- **BDD** — Cucumber / Gherkin feature files with reusable step definitions
- **API testing** — request context, GraphQL/REST-style checks
- **Data-driven testing** — external JSON / CSV data sets
- **Cypress** — end-to-end UI testing
- **Good hygiene** — secrets kept out of git (`.env`), dependencies not committed

---

## 🚀 Running a Project

Each project is self-contained. Move into it, install, and run:

```bash
cd Demowebshop
npm install
npx playwright install
npm test
```

See each project's own README / `package.json` scripts for details.

---

## 👤 Author

**danh_nguyen** — QA / Test Automation Engineer
