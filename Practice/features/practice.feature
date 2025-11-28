Feature: Practice Page Navigation
    @Click_hyperlink
    Scenario: Verify navigation to qasummit.org
        Given I am on the Practice page
        When I click on the "Book Now!" link
        Then I should be navigate to the "https://qasummit.org/" page

    @Click_Homebutton
    Scenario: Verify navigation to rahulshettyacademy.com
        Given I am on the Practice page
        When I click on the "Home" button
        Then I should be navigate to the "https://rahulshettyacademy.com/" page

    @Click_Radiobutton
    Scenario: Verify selecting the "Radio1" radio button
        Given I am on the Practice page
        When I click on the "Radio2" radio button
        Then The "Radio2" radio button should be selected

    @Fill_and_select_suggestion
    Scenario: Verify filling and selecting a suggestion
        Given I am on the Practice page
        When I fill the suggestion field with "Russian Federation"
            And I select the "Russian Federation" option from the suggestion list
        Then I should see the suggestion "Russian Federation" selected

    @Select_option_from_dropdown
    Scenario: Verify selecting an option from the dropdown
        Given I am on the Practice page
        When I click the dropdown list
            And I select the "Option2" from the dropdown list
        Then I should see the "Option2" selected

    @Tick_checkbox
    Scenario: Verify the checkbox is checked
        Given I am on the Practice page
        When I tick the "option1" checkbox
        Then The "option1" checkbox should be checked

    @Tick_multiple_checkboxes
    Scenario: Verify multiple checkboxes are checked
        Given I am on the Practice page
        When I tick the following checkboxes
            | Option1 |
            | Option2 |
            | Option3 |
        Then I should see the following checkboxes selected
            | Option1 |
            | Option2 |
            | Option3 |

    @Click_Open_Window
    Scenario: Verify the new window opens
        Given I am on the Practice page
        When I click the "Open Window" button and switch to new window
        Then I should see the new window with the "https://www.qaclickacademy.com/" URL
            And I should see the "Access" button displayed

    @Click_Open_Tab
    Scenario: Verify the new tab opens
        Given I am on the Practice page
        When I click the "Open Tab" button and switch to new tab
        Then I should see the new tab with the "https://www.qaclickacademy.com/" URL
            And I should see the "Access" button displayed on the new tab

    @Click_Alertbtn_verifypopup
    Scenario: Verify the alert popup
        Given I am on the Practice page
        When I fill data "Bắp Bắp" into the Enter Your Name field
            And I click the "alertbtn" button and handle it
        Then I should see the message "Hello Bắp Bắp, share this practice page and share your knowledge" expected on the popup

    @Click_Confirmbtn_verifypopup
    Scenario: Verify the confirm popup
        Given I am on the Practice page
        When I fill data "Bắp Bắp" into the Enter Your Name field
            And I click the "confirmbtn" button and handle it
        Then I should see the message "Hello Bắp Bắp, Are you sure you want to confirm?" expected on the popup

    @Click_Confirmbtn_verifypopup_Cancel
    Scenario: Verify the confirm popup (Cancel case)
        Given I am on the Practice page
        When I fill data "Bắp Bắp" into the Enter Your Name field
            And I click the "confirmbtn" button and handle it
        Then I should see the Confirm popup with the expected message "Hello Bắp Bắp, Are you sure you want to confirm?" and click Cancel button