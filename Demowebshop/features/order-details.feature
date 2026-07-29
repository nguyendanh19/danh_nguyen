# Reference template — Task 74 (re-order + full checkout) rewritten cleanly.
# Compare with features/demo_dashboard_74.feature:
#   - NO CSS classes in the steps ("button-1 re-order-button" -> "I re-order this order")
#   - the 12-argument address/product/totals verifications become Data Tables
#   - steps are business-readable; all locators live in pages/examples/*.
#
# NOTE: this scenario is data-bound (account cuibap6 + historical order 2118211),
# so it is validated by `bddgen`/dry-run here; a green run needs that exact data.
@order-details @data-bound @loggedIn
Feature: Re-order a past order and check out (clean template)

    Background:
        Given I am signed in on the DemoWebShop store

    Scenario: Re-order order 2118211 and complete checkout
        # --- Open the order from My Account ---
        When I open my account from the header
        Then I should land on "/customer/info"
            And the page title should be "My account - Customer info"
        When I open the "Orders" section from the account menu
        Then I should land on "/customer/orders"
            And the page title should be "My account - Orders"
            And the order "2118211" is listed with status "Pending", date "10/13/2025 9:36:37 AM", total "9207.00"

        # --- Verify the order details ---
        When I open the details of order "2118211"
        Then I should land on "/orderdetails/2118211"
            And the page title should be "Order information"
            And the order overview shows order "2118211", date "Monday, October 13, 2025", status "Pending", total "9207.00"
            And the "billing" address section shows:
                | Title    | Billing Address                         |
                | Name     | Bắp Nguyễn                              |
                | Email    | cuibap6@yopmail.com                     |
                | Phone    | 0799099999                              |
                | Fax      | FaxNumber                               |
                | Company  | Fsoft                                   |
                | Address1 | address1                                |
                | Address2 | address2                                |
                | City     | Nha Trang , Prince Edward Island 1234AA |
                | Country  | Canada                                  |
                | Payment  | Cash On Delivery (COD)                  |
            And the "shipping" address section shows:
                | Title    | Shipping Address                        |
                | Name     | Bắp Nguyễn                              |
                | Email    | cuibap6@yopmail.com                     |
                | Phone    | 0799099999                              |
                | Company  | Fsoft                                   |
                | Address1 | address1                                |
                | City     | Nha Trang , Prince Edward Island 1234AA |
                | Country  | Canada                                  |
                | Shipping | Next Day Air                            |
            And the product table shows:
                | Name                        | Price   | Quantity | Total   |
                | Smartphone                  | 100.00  | 2        | 200.00  |
                | TCP Instructor Led Training | 9000.00 | 1        | 9000.00 |
            And the order totals are:
                | Sub-Total                     | 9200.00 |
                | Shipping                      | 0.00    |
                | Payment method additional fee | 7.00    |
                | Tax                           | 0.00    |
                | Order Total                   | 9207.00 |

        # --- Re-order and adjust the cart ---
        When I re-order this order
        Then I should land on "/cart"
            And the page title should be "Shopping cart"
        When I set the quantity of "TCP Instructor Led Training" to "2"
            And I update the shopping cart
        Then the cart line "TCP Instructor Led Training" shows price "9000.00", quantity "2", total "18000.00"
            And the cart totals are:
                | Sub-Total | 18200.00 |
                | Shipping  | 0.00     |
                | Tax       | 0.00     |
                | Total     | 18200.00 |
        When I accept the terms of service
            And I proceed to checkout
        Then I should land on "/onepagecheckout"
            And the page title should be "Checkout"

        # --- Walk the 5 checkout steps ---
        Then the current checkout step is "Billing address"
            And the "billing" address is preselected as "Bắp Nguyễn, address1, Nha Trang, Prince Edward Island 1234AA, Canada"
        When I continue past the "billing address" step
        Then the current checkout step is "Shipping address"
            And the "shipping" address is preselected as "Bắp Nguyễn, address1, Nha Trang, Prince Edward Island 1234AA, Canada"
        When I continue past the "shipping address" step
        Then the current checkout step is "Shipping method"
        When I choose shipping method "Next Day Air (0.00)"
            And I continue past the "shipping method" step
        Then the current checkout step is "Payment method"
        When I choose payment method "Cash On Delivery (COD) (7.00)"
            And I continue past the "payment method" step
        Then the current checkout step is "Payment information"
            And the payment information reads "You will pay by COD"
        When I continue past the "payment information" step

        # --- Confirm order (same table steps, now on the confirm screen) ---
        Then the current checkout step is "Confirm order"
            And the "billing" address section shows:
                | Name    | Bắp Nguyễn             |
                | Email   | cuibap6@yopmail.com    |
                | Country | Canada                 |
                | Payment | Cash On Delivery (COD) |
            And the "shipping" address section shows:
                | Name    | Bắp Nguyễn          |
                | Email   | cuibap6@yopmail.com |
                | Country | Canada              |
            And the product table shows:
                | Name                        | Price   | Quantity | Total    |
                | Smartphone                  | 100.00  | 2        | 200.00   |
                | TCP Instructor Led Training | 9000.00 | 2        | 18000.00 |
            And the order totals are:
                | Sub-Total   | 18200.00 |
                | Shipping    | 0.00     |
                | Tax         | 0.00     |
                | Order Total | 18207.00 |
        When I place the order
        Then I should land on "/checkout/completed/"
            And the page title should be "Thank you"
            And I see the confirmation message "Your order has been successfully processed!"

        # --- Verify the freshly placed order ---
        When I capture the generated order number
            And I open the order details from the confirmation
        Then the page title should be "Order information"
            And the order information shows the captured order number
            And the order overview shows total "18207.00"
            And the product table shows:
                | Name                        | Price   | Quantity | Total    |
                | Smartphone                  | 100.00  | 2        | 200.00   |
                | TCP Instructor Led Training | 9000.00 | 2        | 18000.00 |
            And the order totals are:
                | Sub-Total   | 18200.00 |
                | Shipping    | 0.00     |
                | Order Total | 18207.00 |

        When I log out
        Then I should land on "https://demowebshop.tricentis.com/"
