Feature: LibUser management

    Scenario: Retrieve first LibUser
        When I search user 1
        Then the user is found
