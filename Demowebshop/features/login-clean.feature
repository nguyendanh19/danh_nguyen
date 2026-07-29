# Reference template — how a clean, business-readable feature looks.
# Compare with features/demo_login.feature:
#   - Background removes the repeated "go to login page" block from every scenario
#   - steps speak business language — NO CSS classes like "button-1 login-button"
#   - the last scenario shows a Data Table instead of a long parameter list
@example @login-clean @regression
Feature: Sign in (clean template)

    Background:
        Given I am on the DemoWebShop sign-in page

    @smoke
    Scenario: Sign in with valid credentials
        When I sign in with email "cuibap1@yopmail.com" and password "1234567890"
        Then I should be signed in as "cuibap1@yopmail.com"

    Scenario: Sign in with empty credentials
        When I sign in with email "" and password ""
        Then I should see the sign-in error "Login was unsuccessful. Please correct the errors and try again."
            And I should see the sign-in error "No customer account found"

    Scenario: Sign in with an invalid email format
        When I sign in with email "DN_test" and password ""
        Then I should see the field error "Please enter a valid email address."

    Scenario: Sign in with wrong credentials
        When I sign in with email "123@yopmail.com" and password "123"
        Then I should see the sign-in error "The credentials provided are incorrect"

    Scenario: Navigate to the forgot-password page
        When I follow the forgot-password link
        Then I should land on "/passwordrecovery"
            And the page title should be "Password recovery"

    # Data Table: pass structured input as a table instead of many positional args.
    Scenario: Sign in using a data table
        When I sign in with the following details:
            | Email    | cuibap1@yopmail.com |
            | Password | 1234567890          |
        Then I should be signed in as "cuibap1@yopmail.com"
