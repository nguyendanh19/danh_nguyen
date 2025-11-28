    Scenario: Successful login
        Given I navigate to the login page
        When I enter valid credentials
        Then I should be redirected to the dashboard