// api request
const { Given, When, Then, Before, After, setDefaultTimeout } = require("@cucumber/cucumber");
const { chromium, expect, request } = require("@playwright/test");
const { urls, api_url_get_all_products_list, api_url_post_register_user_account, api_url_get_user_account, api_url_update_user_acocunt } = require("../../urls");
const Payload = require("../../payload/playload")
const { generateFromEmail, generateUsername } = require("unique-username-generator");
const { v4: uuidv4 } = require('uuid'); //npm install uuid

let apiRequest, email, name, password;

Before(async () => {
    apiRequest = await request.newContext();
});
Then('GET user account detail by email', async () => {
    console.log("email: ", email)
    const response = await apiRequest.get(`${api_url_get_user_account}?email=${email}`
    )
    expect(response.status()).toBe(200);

    // Lấy và in ra nội dung phản hồi
    const responseBody = await response.json();
    console.log(responseBody); // In ra chi tiết tài khoản người dùng

    // Kiểm tra dữ liệu trong phản hồi, ví dụ:
    expect(responseBody.user.email).toBe(email);

})

When("POST To Create User Account", async () => {
    name = generateUsername()
    email = name + '@test.com';
    password = uuidv4();
    const response = await apiRequest.post(`${api_url_post_register_user_account}`, {
        form: Payload.postUser(name, email, password)

    })
    console.log('body: ', Payload.postUser(name, email, password))
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log(responseBody);
    expect(responseBody.message).toBe("User created!");
})

When('DELETE A User Account', async () => {
    const response = await apiRequest.delete('https://automationexercise.com/api/deleteAccount', {
        form: Payload.deleteUser(email, password)
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log(responseBody);
});