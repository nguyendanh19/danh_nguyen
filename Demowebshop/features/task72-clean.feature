# Reference template — Task 72 (browse + search + add to cart + mini cart), clean.
# Self-contained: it empties the cart first, so the mini-cart totals are stable.
@example @task72-clean @regression @loggedIn
Feature: Browse, search and add to cart (clean template)

    Background:
        Given I am signed in on the DemoWebShop store
        And my cart is empty

    Scenario: Add a product from a category and one via search, then check the mini cart
        When I open the "Computers" category
            And I open the "Desktops" sub-category
        Then I should land on "/desktops"
            And the page title should be "Desktops"
        When I open the product "Build your own expensive computer"
        Then I should land on "/build-your-own-expensive-computer-2"
            And the product page shows name "Build your own expensive computer" and price "1800.00"
        When I add the product to the cart
        Then I see the "added to your shopping cart" notification

        When I search for "Smartphone"
        Then I should land on "https://demowebshop.tricentis.com/search?q=Smartphone"
            And the page title should be "Search"
            And the grid shows product "Smartphone" priced "100.00"
        When I open the product "Smartphone"
        Then I should land on "/smartphone"
            And the product page shows name "Smartphone" and price "100.00"
        When I add the product to the cart
        Then I see the "added to your shopping cart" notification

        When I open the mini cart
        Then the mini cart shows:
            | count    | 2       |
            | subTotal | 1915.00 |
            And the mini cart contains "Smartphone" priced "100.00" quantity "1"
