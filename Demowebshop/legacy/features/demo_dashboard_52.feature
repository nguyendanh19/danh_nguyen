Feature: DemoWebShop page
    # Background:
    #     Given I check the email already for sigup successfully with Username "cuibap6@yopmail.com" and Password "0987654321"
    #     Then The "cuibap6@yopmail.com" display on the Dashboard page
    @loggedIn
    @Task_52 
    Scenario: Task 52
        Given I am on the DemoWebShop registration page
        When I click on the "Register" button on the header area
        Then I should be navigate to the "/register" page
            And I should see the "Register" title

        When I select the "gender-male" gender
            And I fill data into the registration form: First Name "Bắp", Last Name "Nguyễn", Email  "cuibap6@yopmail.com", Password "1234567890", Confirmpassword "1234567890"
            And I click on the "button-1 register-next-step-button" button to submit request
        Then I should be navigate to the "/registerresult/1" page
            And I should see a success message, "Your registration completed"
            And I should be redirected to the "https://demowebshop.tricentis.com/registerresult/1" page

        When I click on the "button-1 register-continue-button" button to submit request
            And I should see my account information display on the Dashboard page, "cuibap6@yopmail.com"

    # @Task_52_1
    # Scenario: Task 52_1
        Given I am on the Dashboard Demo Web Shop page, displaying the "Welcome to our store" title
        When I click on the "cuibap6@yopmail.com" button on the header area
        Then I should be navigate to the "/customer/info" page
            And I should see the "My account - Customer info" title
        
        When I select the "gender-female" gender
            And I update new data into the account information fields on the My account page: First name "Bắp", Last name "Nguyễn", Email "cuibap6@yopmail.com"
            And I click on the "button-1 save-customer-info-button" button to submit request
        Then I should see the updated information: First name "Bắp", Last name "Nguyễn", Email "cuibap6@yopmail.com"

        When I click on the "Addresses" on the left menu
        Then I should be navigate to the "/customer/addresses" page
            And I should see the "My account - Addresses" title

        When I click on the "button-1 add-address-button" button to submit request
        Then I should be navigate to the "/customer/addressadd" page
            And I should see the "My account - Add new address" title
        When I fill data into the Add new address page, First name "Bắp", Last name "Nguyễn", Email "cuibap6@yopmail.com", Company "Fsoft", City "Nha Trang", Address 1 "address1", Address 2 "address2", ZipPostalCode "1234AA", PhoneNumber "0799099999", FaxNumber "FaxNumber"
            And I select the Country "Canada" and State "Prince Edward Island"
            And I click on the "button-1 save-address-button" button to submit request
        Then I should see the information address about Title "Bắp Nguyễn", Name "Bắp Nguyễn", Email "cuibap6@yopmail.com", Phone "0799099999", Fax "FaxNumber", Company "Fsoft", Address 1 "address1", Address 2 "address1", City State Zip "Nha Trang, Prince Edward Island 1234AA", Country "Canada"

        When I click on the "Change password" on the left menu
        Then I should be navigate to the "/customer/changepassword" page
            And I should see the "My account - Change password" title

        When I fill data into the Change password fields, Old Password "1234567890", New Password "0987654321", Confirm Password "0987654321"
            And I click on the "button-1 change-password-button" button to submit request
        Then I should see a success message, "Password was changed"

        When I click on the "Log out" button on the header area
        Then I should be redirected to the "https://demowebshop.tricentis.com/" page

        When I click on the "Log in" button on the header area
        Then I should be redirected to the "https://demowebshop.tricentis.com/login" page
            And I should see the "Welcome, Please Sign In!" title
        When I fill data to the username "cuibap6@yopmail.com" and password "0987654321"
            And I tick the checkbox "RememberMe" checkbox
            And I click on the "button-1 login-button" button to submit request
        Then I should be redirected to the "https://demowebshop.tricentis.com" page
            And I should be logged in successfully, and see "cuibap6@yopmail.com" account