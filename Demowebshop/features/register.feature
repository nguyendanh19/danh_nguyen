# Reference template — Task (register), clean & self-contained.
# Registers a UNIQUE Au_-marked account each run, so the "already exists" case is
# created by the test itself instead of relying on a pre-existing fixed email.
@register @regression @guest
Feature: Register (clean template)

    Background:
        Given I am on the DemoWebShop store as a guest

    @smoke
    Scenario: Register a new account successfully
        When I register a new account named "Au_Bap" "Au_Nguyen"
        Then my registration is confirmed
            And I am signed in with my new account

    Scenario: Registration fails when the email already exists
        When I register a new account named "Au_Bap" "Au_Nguyen"
        Then my registration is confirmed
        When I log out
            And I try to register again with the same email
        Then I see the registration error "The specified email already exists"
