// tests/test-data.js — shared, dynamic test data for the spec suite.

/** A fresh address used when checkout asks for a new billing address. */
const CHECKOUT_ADDRESS = {
    firstName: 'Auto',
    lastName: 'Tester',
    email: 'cuibap1@yopmail.com',
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',
    address1: '123 Main St',
    zip: '90001',
    phone: '0123456789',
};

/** Unique email per run, so registration never clashes with an existing account. */
const uniqueEmail = () => `auto${Date.now()}@yopmail.com`;

const PRODUCTS = {
    book: 'Computing and Internet',
    phone: 'Smartphone',
    computer: 'Build your own expensive computer',
    training: 'TCP Instructor Led Training',
};

module.exports = { CHECKOUT_ADDRESS, uniqueEmail, PRODUCTS };
