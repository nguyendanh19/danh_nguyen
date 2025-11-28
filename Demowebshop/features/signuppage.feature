Feature: Sign up page

    Background:
        Given I check the email already for sigup successfully with name "dntest02" and email address "dntest02@yopmail.com"


    Scenario: Verify that the create new account successfully
        When I choose the gender is "Mrs"
        And I fill data to the account infomation: "P@ssword", "10", "September", and "2020"
        And I tick the "Sign up for our newsletter!" and "Receive special offers from our partners!" checkboxes
        And I scroll to the "country" field
        And I fill data to the address infomation: "dntest02", "Nguyen", "DN Technology", "address02", "address202", "Singapore", "State02", "City02", "123456", and "0899069999"
        And I click on the Create Account button, "create-account"
        Then Navigate to the Account Created, "https://automationexercise.com/account_created"
        And Create new account successfully, navigate to the "Account Created!" page