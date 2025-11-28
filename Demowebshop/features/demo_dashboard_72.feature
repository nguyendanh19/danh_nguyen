Feature: DemoWebShop page
    # Background:
    #     Given I check the email already for sigup successfully with Username "cuibap6@yopmail.com" and Password "0987654321"
    #     Then The "cuibap6@yopmail.com" display on the Dashboard page
    @loggedIn
    @Task_72
    Scenario: Task 72
        Given I am on the Dashboard Demo Web Shop page, displaying the "Welcome to our store" title
        When I click on the "Computers" category in main menu
            And I select the "Desktops" category item
        Then I should be navigate to the "/desktops" page
            And I should see the "Desktops" title

        # When I choose the "Build your own expensive computer" featured product
        # Then I should be navigate to the "/build-your-own-expensive-computer-2" page
        #     And I should see the product name "Build your own expensive computer" and price "1800.00"
        # When I click on the "button-1 add-to-cart-button" button to submit request
        # Then I should see the notification confirmation message, "The product has been added to your shopping cart"

        # When I fill data into the search field with "Smartphone" value
        #     And I click on the "button-1 search-box-button" button to submit request
        # Then I should be redirected to the "https://demowebshop.tricentis.com/search?q=Smartphone" page
        #     And I should see the "Search" title
        #     And I should see the product name "Smartphone" and price "100.00" on the product grid
        # When I choose the "Smartphone" featured product
        # Then I should be navigate to the "/smartphone" page
        #     And I should see the product name "Smartphone" and price "100.00"
        # When I click on the "button-1 add-to-cart-button" button to submit request
        # Then I should see the notification confirmation message, "The product has been added to your shopping cart"
        #      And I should see the "2 item(s)" count number item in mini cart
        # Then I should see the mini cart information, item "item first", product name "Smartphone", price "100.00", quantity "1", and Sub-Total "1915.00"