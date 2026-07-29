// support/test-data.js
// Single source of test data for BOTH suites (Playwright specs + Cucumber BDD).
//
// ── DATA RULE ────────────────────────────────────────────────────────────────
// Every record a test creates MUST carry the "Au_" marker on its identifying
// fields (name / email / company). Cleanup then only has to target Au_*, and it
// can never touch data created by a human.
//
//   email    Au_12345678@yopmail.com
//   name     Au_Bap  Au_Nguyen
//   company  Au_Fsoft
//
// Never hardcode a plain name/email in a spec or a .feature — use these helpers.
// ─────────────────────────────────────────────────────────────────────────────

/** Marker prefixed to everything automation creates. */
const AU = 'Au_';

/** Tag any value as automation-created: au('Fsoft') -> 'Au_Fsoft'. */
const au = (value) => `${AU}${value}`;

/** Short unique-per-run id. */
const runId = () => Date.now().toString().slice(-8);

/** Unique, marked email so registration never clashes: Au_12345678@yopmail.com */
const uniqueEmail = (suffix = '') => `${AU}${runId()}${suffix}@yopmail.com`;

/** Person used when a test registers its own account. */
const TEST_USER = {
    firstName: au('Bap'),
    lastName: au('Nguyen'),
    password: '1234567890',
};

/** Address entered when checkout asks for a new billing address. */
const CHECKOUT_ADDRESS = {
    firstName: au('Auto'),
    lastName: au('Tester'),
    email: process.env.DEMO_EMAIL || 'cuibap1@yopmail.com',
    company: au('Fsoft'),
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',
    address1: '123 Main St',
    zip: '90001',
    phone: '0123456789',
};

/** Address added from the My-account page. */
const ACCOUNT_ADDRESS = {
    company: au('Fsoft'),
    country: 'Canada',
    state: 'Prince Edward Island',
    city: au('NhaTrang'),
    address1: 'address1',
    zip: '1234AA',
    phone: '0799099999',
};

/** Catalog products under test (real shop data — not created by us). */
const PRODUCTS = {
    book: 'Computing and Internet',
    phone: 'Smartphone',
    computer: 'Build your own expensive computer',
    training: 'TCP Instructor Led Training',
};

module.exports = { AU, au, runId, uniqueEmail, TEST_USER, CHECKOUT_ADDRESS, ACCOUNT_ADDRESS, PRODUCTS };
