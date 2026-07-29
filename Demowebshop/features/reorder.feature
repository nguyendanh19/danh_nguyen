# Reference template — the "right" way to test a re-order flow.
# Instead of depending on a hardcoded historical order (2118211), the test
# CREATES its own order, captures the auto-generated order number, and verifies
# THAT number. It is self-contained: it runs green on any signed-in account.
@reorder @smoke @regression @loggedIn
Feature: Re-order with dynamic order numbers (self-contained)

    Background:
        Given I am signed in on the DemoWebShop store

    Scenario: Place an order, verify it, then re-order it
        # Seed a real order so the re-order flow has genuine, self-created data
        When I add the book "Computing and Internet" to the cart
            And I check out and place the order
        Then an order number is generated
            And that order appears in my order history

        # The captured number is dynamic — asserted, never hardcoded
        When I open the details of my most recent order
        Then the same order number is shown on the order details

        # Re-order it -> a brand new order with its own new number
        When I re-order this order
        Then I should land on "/cart"
        When I check out and place the order
        Then an order number is generated
            And that order appears in my order history
