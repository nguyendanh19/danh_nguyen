Feature: DemoWebShop page
    # Background:
    #     Given I check the email already for sigup successfully with Username "cuibap6@yopmail.com" and Password "0987654321"
    #     Then The "cuibap6@yopmail.com" display on the Dashboard page
    @loggedIn
    @Task_73
    Scenario: Task 73
        Given I am on the Dashboard Demo Web Shop page, displaying the "Welcome to our store" title
        # Then I should see the number count item is "(2)"
        # When I click on the "Shopping cart" link button on the header area
        # Then I should be navigate to the "/cart" page
        #     And I should see the "Shopping cart" title

        # When I update new data to Product "Smartphone" with the quantity is "2"
        #     And I click on the checkbox remove product "Build your own expensive computer"
        #     And I click on the "button-2 update-cart-button" button to submit request
        # Then I should see the Product name "Smartphone", price "100.00", Qty "2", Total "200.00"
        #     And I should see the Total information, Sub-Total "200.00", Shipping "0.00", Tax "0.00", Total "200.00"

        # When I fill data into the search field with "TCP Instructor Led Training" value
        #     And I click on the "button-1 search-box-button" button to submit request
        # Then I should be redirected to the "https://demowebshop.tricentis.com/search?q=TCP+Instructor+Led+Training" page
        #     And I should see the "Search" title
        #     And I should see the product name "TCP Instructor Led Training" and price "9000.00" on the product grid
        # When I choose the "TCP Instructor Led Training" featured product
        # Then I should be navigate to the "/copy-of-tcp-self-paced-training-2" page
        #     And I should see the product name "TCP Instructor Led Training" and price "9000.00"
        # When I click on the "button-1 add-to-cart-button" button to submit request
        # Then I should see the notification confirmation message, "The product has been added to your shopping cart"
        #      And I should see the "3 item(s)" count number item in mini cart

        # When I click on the "Shopping cart" link button on the header area
        # Then I should be navigate to the "/cart" page
        #     And I should see the "Shopping cart" title
        # Then I should see the Product name "Smartphone", price "100.00", Qty "2", Total "200.00"
        #     And I should see the Product name "TCP Instructor Led Training", price "9000.00", Qty "1", Total "9000.00"
        #     And I should see the Total information, Sub-Total "9200.00", Shipping "0.00", Tax "0.00", Total "9200.00"

        # When I tick on the checkbox, "termsofservice"
        #     And I click on the Checkout button "checkout"
        # Then I should be navigate to the "/onepagecheckout" page
        #     And I should see the "Checkout" title
        #     And I should see the step title on the Checkout page, "Billing address"
        #     And I should see the "billing-address-select" step on the Checkout page, Address is "Bắp Nguyễn, address1, Nha Trang, Prince Edward Island 1234AA, Canada"
        # When I submit request on the "billing-buttons-container" step via click on the "button-1 new-address-next-step-button" button on the Checkout page
        # Then I should see the step title on the Checkout page, "Shipping address"
        #     And I should see the "shipping-address-select" step on the Checkout page, Address is "Bắp Nguyễn, address1, Nha Trang, Prince Edward Island 1234AA, Canada"
        #     And I submit request on the "shipping-buttons-container" step via click on the "button-1 new-address-next-step-button" button on the Checkout page
        # Then I should see the step title on the Checkout page, "Shipping method"
        # When I select the "Next Day Air (0.00)" radio button on the Checkout page
        #     And I submit request on the "shipping-method-buttons-container" step via click on the "button-1 shipping-method-next-step-button" button on the Checkout page
        # Then I should see the step title on the Checkout page, "Payment method"
        # When I select the "Cash On Delivery (COD) (7.00)" radio button on the Checkout page
        #     And I submit request on the "payment-method-buttons-container" step via click on the "button-1 payment-method-next-step-button" button on the Checkout page
        # Then I should see the step title on the Checkout page, "Payment information"
        #     And I verify the information on the Payment Information step, "You will pay by COD"
        # When I submit request on the "payment-info-buttons-container" step via click on the "button-1 payment-info-next-step-button" button on the Checkout page
        # Then I should see the step title on the Checkout page, "Confirm order"
        #     And I should see the "billing-info" area will contain the information about: Title "Billing Address", Name "Bắp Nguyễn", Email "cuibap6@yopmail.com", Phone "0799099999", Fax "FaxNumber", Company "Fsoft", Address1 "address1", Address2 "address2", City "Nha Trang , Prince Edward Island 1234AA", Country "Canada"
        #     And I should see the "billing-info" area will contain the information about: Title "Payment Method", Payment Method "Cash On Delivery (COD)"
        #     And I should see the "shipping-info" area will contain the information about: Title "Shipping Address", Name "Bắp Nguyễn", Email "cuibap6@yopmail.com", Phone "0799099999", Fax "FaxNumber", Company "Fsoft", Address1 "address1", Address2 "address2", City "Nha Trang , Prince Edward Island 1234AA", Country "Canada"
        #     And I should see the information cart item area on the Confirm Order step about: Product name "Smartphone", price "100.00", Qty "2", Total "200.00"
        #     And I should see the information cart item area on the Confirm Order step about: Product name "TCP Instructor Led Training", price "9000.00", Qty "1", Total "9000.00"
        #     And I should see the Total information on the Confirm Order step about, Sub-Total "9200.00", Shipping method "(Next Day Air)", Shipping "0.00", Payment "7.00", Tax "0.00", Total "9207.00"
        # When I click on the "button-1 confirm-order-next-step-button" button to submit request
        # Then I should be navigate to the "/checkout/completed/" page
        #     And I should see the "Thank you" title
        #     And I should see the Thank You message on the Thank You page, "Your order has been successfully processed!"
        # Then I should see the Order number generated
        # When I click on the "Click here for order details" button to navigate to the Order Details page
        # Then I should be redirected to the Order Details page containing that Order number
        #     And I should see the "Order information" title