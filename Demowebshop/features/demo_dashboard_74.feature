Feature: DemoWebShop page
    # Background:
    #     Given I check the email already for sigup successfully with Username "cuibap6@yopmail.com" and Password "0987654321"
    #     Then The "cuibap6@yopmail.com" display on the Dashboard page
    @loggedIn
    @Task_74
    Scenario: Task 74
        Given I am on the Dashboard Demo Web Shop page, displaying the "Welcome to our store" title
        When I click on the "cuibap6@yopmail.com" button on the header area
        Then I should be navigate to the "/customer/info" page
            And I should see the "My account - Customer info" title
        When I click on the "Orders" on the left menu
        Then I should be navigate to the "/customer/orders" page
            And I should see the "My account - Orders" title
            And I should see that the Order number title is "2118211" appears in the My account Order list with information: Order Status "Pending", Order Date "10/13/2025 9:36:37 AM", Order Total "9207.00"
        
        # When Based on the Order number "2118211", I click on the Details button "button-2 order-details-button"
        # Then I should be navigate to the "/orderdetails/2118211" page
        #     And I should see the "Order information" title
        #     And I should see the Order overview area with information: Order "2118211", Order Date "Monday, October 13, 2025", Order Status "Pending", Order Total "9207.00"
        #     And I should see the information in the "billing-info" section on the Order details area will contain: Order Number title "Billing Address", Name "Bắp Nguyễn", Email "cuibap6@yopmail.com", Phone "0799099999", Fax "FaxNumber", Company "Fsoft", Address 1 "address1", Address 2 "address2", City state zip "Nha Trang , Prince Edward Island 1234AA", Country "Canada", Payment title "Payment Method", Payment Method "Cash On Delivery (COD)"
        #     And I should see the information in the "shipping-info" section on the Order details area will contain: Order Number title "Shipping Address", Name "Bắp Nguyễn", Email "cuibap6@yopmail.com", Phone "0799099999", Fax "FaxNumber", Company "Fsoft", Address 1 "address1", Address 2 "address2", City state zip "Nha Trang , Prince Edward Island 1234AA", Country "Canada", Shipping title "Shipping Method", Shipping Method "Next Day Air"
        #     And I should see the information in the "section products" section on the Product table will contain: Name "Smartphone", Price "100.00", Quantity "2", Total "200.00"
        #     And I should see the information in the "section products" section on the Product table will contain: Name "TCP Instructor Led Training", Price "9000.00", Quantity "1", Total "9000.00"
        #     And I should see the information Total info in the Order information page: Sub-Total "9200.00", Shipping "0.00", Payment method additional fee "7.00", Tax "0.00", Order Total "9207.00"

        # When I click on the "button-1 re-order-button" button to submit request
        # Then I should be navigate to the "/cart" page
        #     And I should see the "Shopping cart" title

        # When I update new data to Product "TCP Instructor Led Training" with the quantity is "2"
        #     And I click on the "button-2 update-cart-button" button to submit request
        # Then I should see the Product name "TCP Instructor Led Training", price "9000.00", Qty "2", Total "18000.00"
        #     And I should see the Total information, Sub-Total "18200.00", Shipping "0.00", Tax "0.00", Total "18200.00"

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
        #     And I should see the information cart item area on the Confirm Order step about: Product name "TCP Instructor Led Training", price "9000.00", Qty "2", Total "18000.00"
        #     And I should see the Total information on the Confirm Order step about, Sub-Total "18200.00", Shipping method "(Next Day Air)", Shipping "0.00", Payment "7.00", Tax "0.00", Total "18207.00"
        # When I click on the "button-1 confirm-order-next-step-button" button to submit request
        # Then I should be navigate to the "/checkout/completed/" page
        #     And I should see the "Thank you" title
        #     And I should see the Thank You message on the Thank You page, "Your order has been successfully processed!"
        # Then I should see the Order number generated
        # When I click on the "Click here for order details" button to navigate to the Order Details page
        # Then I should be redirected to the Order Details page containing that Order number
        #     And I should see the "Order information" title
        #     And I should see the same Order number appears in the Order Information section

        # Then I should see the Order Total is "18207.00" on the Order overview area
        #     And I should see the information in the "section products" section on the Product table will contain: Name "Smartphone", Price "100.00", Quantity "2", Total "200.00"
        #     And I should see the information in the "section products" section on the Product table will contain: Name "TCP Instructor Led Training", Price "9000.00", Quantity "2", Total "18000.00"
        #     And I should see the information Total info in the Order information page: Sub-Total "18200.00", Shipping "0.00", Payment method additional fee "7.00", Tax "0.00", Order Total "18207.00"

        When I click on the "Log out" button on the header area
        Then I should be redirected to the "https://demowebshop.tricentis.com/" page