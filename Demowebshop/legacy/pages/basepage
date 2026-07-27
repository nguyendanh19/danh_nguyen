//The base page contains common functions for all pages.

class BasePage {
        constructor(page) {
            this.page = page;
        }

        async navigateTo(url) {
            await this.page.goto(url);
        }

        async getTitle() {
            return this.page.title();
        }
    }
 
module.exports = BasePage;