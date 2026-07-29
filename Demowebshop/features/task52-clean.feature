# Reference template — Task 52 (account management), clean & self-contained.
# Registers a UNIQUE Au_-marked account each run (see support/test-data.js), so
# every record left behind is identifiable for cleanup.
@example @task52-clean @regression @guest
Feature: Account management (clean template)

    Scenario: Register, update profile, add an address, change password, then re-login
        Given I am on the DemoWebShop store as a guest
        When I register a new account named "Au_Bap" "Au_Nguyen"
        Then my registration is confirmed
            And I am signed in with my new account

        When I update my profile to gender "female", first name "Au_Bap", last name "Au_Nguyen"
        Then my profile shows first name "Au_Bap", last name "Au_Nguyen"

        When I add a new address:
            | company  | Au_Fsoft             |
            | country  | Canada               |
            | state    | Prince Edward Island |
            | city     | Au_NhaTrang          |
            | address1 | address1             |
            | zip      | 1234AA               |
            | phone    | 0799099999           |
        Then my address list shows "Au_NhaTrang" and "Canada"

        When I change my password to "0987654321"
        Then I see the account message "Password was changed"

        When I log out
        Then I should land on "https://demowebshop.tricentis.com/"
        When I sign in again with my new account and password "0987654321"
        Then I am signed in with my new account
