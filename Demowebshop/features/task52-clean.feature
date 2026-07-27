# Reference template — Task 52 (account management), clean & self-contained.
# Registers a UNIQUE account each run (no hardcoded email), so it never clashes
# with an already-registered address the way the original (fixed cuibap6) did.
@example @task52-clean @guest
Feature: Account management (clean template)

    Scenario: Register, update profile, add an address, change password, then re-login
        Given I am on the DemoWebShop store as a guest
        When I register a new account named "Bắp" "Nguyễn"
        Then my registration is confirmed
            And I am signed in with my new account

        When I update my profile to gender "female", first name "Bắp", last name "Nguyễn"
        Then my profile shows first name "Bắp", last name "Nguyễn"

        When I add a new address:
            | company  | Fsoft                |
            | country  | Canada               |
            | state    | Prince Edward Island |
            | city     | Nha Trang            |
            | address1 | address1             |
            | zip      | 1234AA               |
            | phone    | 0799099999           |
        Then my address list shows "Nha Trang" and "Canada"

        When I change my password to "0987654321"
        Then I see the account message "Password was changed"

        When I log out
        Then I should land on "https://demowebshop.tricentis.com/"
        When I sign in again with my new account and password "0987654321"
        Then I am signed in with my new account
