Feature: LibUser management

    Scenario: Retrieve first LibUser
        When I search LibUser 1
        Then the LibUser is found
