Feature: Login page
    @login_success
    Scenario: Login successfully with valid credentials
        Given I am on the login page
        When I fill the "login-email" field with "dntest1@yopmail.com"
            And I fill the "login-password" field with "1234567890"
            And I click on the "login-button" button
        Then Verify that Login successfully, the "dntest1" display on the Dashboard page

    @login_fail
    Scenario: Login page failed with invalid credentials
        Given I am on the login page
        When I fill the "login-email" field with "dntest1@yopmail.com"
            And I fill the "login-password" field with "1234567899"
            And I click on the "login-button" button
        Then Verify that Login failed, the error message "Your email or password is incorrect!" display on the Login page

    @signup_success
    Scenario: Signup successfully ưith valid credentials
        Given I am on the login page
        When I fill the "signup-name" field with "dntest01"
            And I fill the "signup-email" field with "dntest01@yopmail.com"
            And I click on the "signup-button" button
        Then Verify that Signup successfully, the "Enter Account Information" display on the Dashboard page

    @signup_fail
    Scenario: Signup failed, email already exists
        Given I am on the login page
        When I fill the "signup-name" field with "dntest02"
            And I fill the "signup-email" field with "dntest1@yopmail.com"
            And I click on the "signup-button" button
        Then Verify that Signup failed, the error message "Email Address already exist!" display on the Login page