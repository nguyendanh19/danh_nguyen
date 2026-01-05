//*[@id="mainMenu"]/li[3]/ul/li[1]/a[@href="https://demo.phppointofsale.com/index.php/customers"]
//div[@class="text-center"]//div[3]//h3[contains(text(),"28")]

//table[@id='sortable_table']//tr[.//td/a[normalize-space(.)='air fryer (Clone)']]//a[contains(@class,'edit_action')]
//tr[.//td/a[normalize-space(.)='RICE']]//a[contains(@class,'edit_action')]
const { expect } = require('@playwright/test');
 
class Actions {
    constructor(page) {
        this.page = page;
    }
//Practive on the https://demo.phppointofsale.com/
//Login:
//Title: 
	txtLogin_title = (login_title) => this.page.locator(`//div[@class="holder"]//h2[contains(text(),"${login_title}")]`); //Press login to continue

//Login fields: 
	txtLogin_fields = (login_fields) => this.page.locator(`//div[@class="holder"]//input[@id="${login_fields}"]`); //username/password

//Login button:
	btnLogin_remember = (btnLogin_remember) => this.page.locator(`//div[@class="holder"]//div/a[contains(text(), "${btnLogin_remember}")]`); //Reset password?
	btnSubmit = (submit) => this.page.locator(`//button[@type="${submit}"]`); //btnsubmit: Login

//Dashboard
//Top_bar
	btnDashboard_title = (btndashboard_title) => this.page.locator(`//div[@class="top-bar hidden-print"]//a[contains(text(),'${btndashboard_title}')]`)
	btnDashboard_topbar = (btnDashboard_topbar) => this.page.locator(`//div[@class="top-bar hidden-print"]//li//span[contains(text(),'${btnDashboard_topbar}')]`)
	btnDashboard_topbar_dropdown = (parent, child) => this.page.locator(`//div[@class="top-bar hidden-print"]//li[.//span[normalize-space(.)='${parent}']]//li/a/span[contains(text(),'${child}')]`)
	txtDashboard_search = () => this.page.locator(`//form[@id="search_form"]`)
//Left_menu
	btnDashboard_leftmenu = (parent, child = null) => child
   ? this.page.locator(`//li[contains(@class,'has_sub_menu')][.//span[normalize-space()='${parent}']]//a[.//span[normalize-space()='${child}']]`)
    : this.page.locator(`//span[normalize-space()='${parent}']/ancestor::a`);

//Edit button each row on table
    btnDashboard_table_Edit = (parent, child) => this.page.locator(`//table[@id="sortable_table"]//tr[.//td/a[normalize-space(.)='${parent}']]//a[contains(@class,'${child}')]`)

//Option button on the dropdown-toggle each row on the table
    btnDashboard_dropdowntoggle = (parent, child) => this.page.locator(`//table[@id="sortable_table"]//tr[.//td/a[normalize-space(.)='${parent}']]//a[normalize-space(.)='${child}']`)

}
module.exports = Actions;