@addison-global-ltd
Feature: Find a room at booking.com web page using the search mechanism
  This feature will perform a search and seek for the results

  Background:
  Given I start at "https://www.booking.com/searchresults.html?aid=376377&label=booking-name-pt-row-BebSrDpYXzat*XUq7s6l1wS248132184233%3Apl%3Ata%3Ap1%3Ap21.835.000%3Aac%3Aap1t1%3Aneg%3Afi%3Atiaud-146342138230%3Akwd-65526620%3Alp1001625%3Ali%3Adec%3Adm&sid=1d860cd99e724461e66955130c1e7640&age=5&checkin_month=5&checkin_monthday=31&checkin_year=2018&checkout_month=6&checkout_monthday=1&checkout_year=2018&class_interval=1&dest_id=-390787&dest_type=city&dtdisc=0&from_sf=1&group_adults=1&group_children=1&inac=0&index_postcard=0&label_click=undef&lang=en-us&no_rooms=1&offset=0&postcard=0&room1=A%2C5&sb_price_type=total&soz=1&src=index&src_elem=sb&ss=M%C3%A1laga%2C%20Andaluc%C3%ADa%2C%20Spain&ss_all=0&ssb=empty&sshis=0&user_changed_date=1&lang_click=top&cdl=pt-br&nflt=" page

  @search-success
  Scenario: Search for a destination and look for a specific review mark and price with success
    # When I choose currency "Euro"
    # And I choose "English (US)" language
    # Then The "€" currency symbol is displayed and "English (US)" language is selected
    # When I input the destination "Málaga, Andalucía, Spain"
    # And I select the CheckIn in last day of current month and CheckOut in first day of next month
    # And I choose "1" adult
    # And I choose "1" child "5" years old
    # And I click on Search button
    Then The search resutls are displayed
    When I refine the search selecting "2" rooms
    And I check that I'm traveling for work
    And I click on Search button
    Then The list of hotels available is displayed
