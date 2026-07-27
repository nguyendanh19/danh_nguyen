# Reference template — Task 73 (edit cart + full checkout), clean & self-contained.
@example @task73-clean @loggedIn
Feature: Edit the cart and check out (clean template)

    Background:
        Given I am signed in on the DemoWebShop store
        And my cart is empty

    Scenario: Update quantity, remove an item, add another, then check out
        When I add the product "Build your own expensive computer" to the cart
            And I add the product "Smartphone" to the cart
            And I go to the shopping cart
        Then I should land on "/cart"
            And the page title should be "Shopping cart"

        When I set the quantity of "Smartphone" to "2"
            And I mark "Build your own expensive computer" for removal
            And I update the shopping cart
        Then the cart line "Smartphone" shows price "100.00", quantity "2", total "200.00"
            And the cart totals are:
                | Sub-Total | 200.00 |
                | Total     | 200.00 |

        When I add the product "TCP Instructor Led Training" to the cart
            And I go to the shopping cart
        Then the cart line "Smartphone" shows price "100.00", quantity "2", total "200.00"
            And the cart line "TCP Instructor Led Training" shows price "9000.00", quantity "1", total "9000.00"
            And the cart totals are:
                | Sub-Total | 9200.00 |
                | Total     | 9200.00 |

        When I check out and place the order
        Then an order number is generated
            And that order appears in my order history
