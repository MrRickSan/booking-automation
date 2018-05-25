@addison-global-ltd
Feature: Find a room at booking.com web page using the search mechanism
  This feature will perform a search and seek for the results

  Background:
  Given I start at "https://www.booking.com" page

  @search-success
  Scenario: Search for a destination and look for a specific review mark and price with success
    When I choose currency "Euro"
    And I choose "English (US)" language
    Then The "€" currency symbol is displayed and "English (US)" language is selected
    When I input the destination "Málaga, Andalucía, Spain"
    And I select the CheckIn in last day of current month and CheckOut in first day of next month
    And I choose "1" adult
    # And I wait five seconds
