Feature: Dashboard page

    Background:
        Given I login to the Automationexercise page with  the Email address "dntest1@yopmail.com" and Password "1234567890"
        Then The "dntest1" display on the Dashboard page
    @dashboard_home
    Scenario: Navigate to the Home page
        Given I am on Home page, the "Features Items" will displayed
        When I click on the "Home" button on the header bar
        Then The URL is "https://demowebshop.tricentis.com/", the "Features Items" displayed

    @dashboard_products
    Scenario: Navigate to the Products page
        Given I am on Home page, the "Features Items" will displayed
        When I click on the "Products" button on the header bar
        Then The URL is "/products", the "All Products" displayed

    @dashboard_cart    
    Scenario: Navigate to the Cart page
        Given I am on Home page, the "Features Items" will displayed
        When I click on the "Cart" button on the header bar
        Then Navigate to the Shopping Cart page successfully, the URL is "/view_cart", and the "Shopping Cart" is displayed

    @dashboard_testcase
    Scenario: Navigate to the Test Cases page
        Given I am on Home page, the "Features Items" will displayed
        When I click on the "Test Cases" button on the header bar
        Then The URL is "/test_cases", the "Test Cases" displayed    

    @dashboard_apitesting
    Scenario: Navigate to the API Testing page
        Given I am on Home page, the "Features Items" will displayed
        When I click on the "API Testing" button on the header bar
        Then The URL is "/api_list", the "APIs List for practice" displayed

    @dashboard_videotutorial
    Scenario: Navigate to the Video Tutorial page
        Given I am on Home page, the "Features Items" will displayed
        When I click on the "Video Tutorials" button on the header bar
        Then The URL Youtube is "https://www.youtube.com/c/AutomationExercise", the "AutomationExercise" displayed

    @dashboard_contactus
    Scenario: Navigate to the Contact Us page
        Given I am on Home page, the "Features Items" will displayed
        When I click on the "Contact us" button on the header bar
        Then The URL is "/contact_us", the "Contact Us" displayed

    @dashboard_logout
    Scenario: Logout
        Given I am on Home page, the "Features Items" will displayed
        When I click on the "Logout" button on the header bar
        Then Logout successfully, the "Login to your account" displayed

    @dashboard_deleteaccount
    Scenario: Delete Account
        Given I am on Home page, the "Features Items" will displayed
        When I click on the "Delete Account" button on the header bar
        Then The URL is "/delete_account", the "Account Deleted!" displayed