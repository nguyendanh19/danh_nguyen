const { expect } = require("playwright/test");

module.exports = Common;

class Common {
    constructor(page) {
        this.page = page;
    }

}