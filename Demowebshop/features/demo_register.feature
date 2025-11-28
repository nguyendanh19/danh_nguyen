Feature: DemoWebShop page
    @Register_successfully
    Scenario: Register successfully
        Given I am on the DemoWebShop registration page
        When I click on the "Register" button on the header area
        Then I should be navigate to the "/register" page
            And I should see the "Register" title

        When I select the "gender-male" gender
            And I fill data into the registration form: First Name "Bắp", Last Name "Nguyễn", Email  "cuibap4@yopmail.com", Password "1234567890", Confirmpassword "1234567890"
            And I click on the "button-1 register-next-step-button" button to submit request
        Then I should be navigate to the "/registerresult/1" page
            And I should see a success message, "Your registration completed"
            And I should be redirected to the "https://demowebshop.tricentis.com/registerresult/1" page

        When I click on the "button-1 register-continue-button" button to submit request
            And I should see my account information display on the Dashboard page, "cuibap4@yopmail.com"

    @Register_failed_existing_email
    Scenario: Register failed with existing email
        Given I am on the DemoWebShop registration page
        When I click on the "Register" button on the header area
        Then I should be navigate to the "/register" page
            And I should see the "Register" title

        When I select the "gender-male" gender
            And I fill data into the registration form: First Name "Bắp", Last Name "Nguyễn", Email  "dn1@yopmail.com", Password "1234567890", Confirmpassword "1234567890"
            And I click on the "button-1 register-next-step-button" button to submit request
        Then I should see an error message, "The specified email already exists"

    @Register_verify_fields
    Scenario: Verify fields on registration page
        Given I am on the DemoWebShop registration page
        When I click on the "Register" button on the header area
        Then I should be navigate to the "/register" page
            And I should see the "Register" title

        When I select the "gender-male" gender
            And I fill data into the registration form: First Name "", Last Name "", Email  "", Password "", Confirmpassword "1234567890"
            And I click on the "button-1 register-next-step-button" button to submit request
        Then I should see an error message, "First name is required."
            And I should see an error message, "Last name is required."
            And I should see an error message, "Email is required."
            And I should see an error message, "Password is required."
            And I should see an error message, "The password and confirmation password do not match."

        When I fill data into the registration form: First Name "", Last Name "", Email  "", Password "1234567890", Confirmpassword ""
            And I click on the "button-1 register-next-step-button" button to submit request
        Then I should see an error message, "Password is required."

        When I fill data into the registration form: First Name "", Last Name "", Email  "", Password "1", Confirmpassword ""
            And I click on the "button-1 register-next-step-button" button to submit request
        Then I should see an error message, "The password should have at least 6 characters."
