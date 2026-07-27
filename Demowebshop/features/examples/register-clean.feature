# Reference template — Task (register), clean & self-contained.
# Registers a UNIQUE account each run, so the "already exists" case is created
# by the test itself instead of relying on a pre-existing fixed email.
@example @register-clean @guest
Feature: Register (clean template)

    Background:
        Given I am on the DemoWebShop store as a guest

    Scenario: Register a new account successfully
        When I register a new account named "Bắp" "Nguyễn"
        Then my registration is confirmed
            And I am signed in with my new account

    Scenario: Registration fails when the email already exists
        When I register a new account named "Bắp" "Nguyễn"
        Then my registration is confirmed
        When I log out
            And I try to register again with the same email
        Then I see the registration error "The specified email already exists"
