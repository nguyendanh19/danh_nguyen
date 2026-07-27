Feature: DemoWebShop page
    @Login_Successfully
    Scenario: Login successfully
        Given I am on the DemoWebShop registration page
        When I click on the "Log in" button on the header area
        Then I should be navigate to the "/login" page
            And I should see the "Welcome, Please Sign In!" title

        When I fill data to the username "cuibap1@yopmail.com" and password "1234567890"
            And I tick the checkbox "RememberMe" checkbox
            And I click on the "button-1 login-button" button to submit request
        Then I should be redirected to the "https://demowebshop.tricentis.com" page
            And I should be logged in successfully, and see "cuibap1@yopmail.com" account

    @Login_Failed_Without_Username_Password
    Scenario: Login failed with invalid email and password
        Given I am on the DemoWebShop registration page
        When I click on the "Log in" button on the header area
        Then I should be navigate to the "/login" page
            And I should see the "Welcome, Please Sign In!" title

        When I fill data to the username "" and password ""
            And I tick the checkbox "RememberMe" checkbox
            And I click on the "button-1 login-button" button to submit request
        Then I should see an error message "Login was unsuccessful. Please correct the errors and try again."
            And I should see an error message validate account "No customer account found"

    @Login_Failed_With_Invalid_Email_Format
    Scenario: Login failed with invalid email format
        Given I am on the DemoWebShop registration page
        When I click on the "Log in" button on the header area
        Then I should be navigate to the "/login" page
            And I should see the "Welcome, Please Sign In!" title

        When I fill data to the username "DN_test" and password ""
            And I tick the checkbox "RememberMe" checkbox
            And I click on the "button-1 login-button" button to submit request
        Then I should see an error message email "Please enter a valid email address."

    @Login_Failed_Invalid_Credentials
    Scenario: Login failed with invalid credentials
        Given I am on the DemoWebShop registration page
        When I click on the "Log in" button on the header area
        Then I should be navigate to the "/login" page
            And I should see the "Welcome, Please Sign In!" title

        When I fill data to the username "123@yopmail.com" and password "123"
            And I tick the checkbox "RememberMe" checkbox
            And I click on the "button-1 login-button" button to submit request
        Then I should see an error message "Login was unsuccessful. Please correct the errors and try again."
            And I should see an error message validate account "The credentials provided are incorrect"

    @Navigate_to_Forgot_Password
    Scenario: Navigate to forgot password page
        Given I am on the DemoWebShop registration page
        When I click on the "Log in" button on the header area
        Then I should be navigate to the "/login" page
            And I should see the "Welcome, Please Sign In!" title

        When I click on the Forgot password? "Forgot password?" button
        Then I should be redirected to the "https://demowebshop.tricentis.com/passwordrecovery" page
            And I should see the "Password recovery" title