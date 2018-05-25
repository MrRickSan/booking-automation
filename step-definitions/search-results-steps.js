/* global require, module, expect */
const searchResultsPage = require('../page-objects/search-results-page')

var SearchResultsSteps = function () {
  'use strict'

  this.Then(/^The search resutls are displayed$/, function () {
    return expect(searchResultsPage.searchResultsIsDisplayed()).to.eventually.equal(true)
  })

  this.When(/^I refine the search selecting "([^"]*)" rooms$/, function (num) {
    return searchResultsPage.selectNoRoms(num)
  })

  this.When(/^I check that I'm traveling for work$/, function () {
    return searchResultsPage.checkTravelingForWork()
  })

  this.Then(/^The list of hotels available is displayed$/, function () {
    return searchResultsPage.filterByRating()
  })
}

module.exports = SearchResultsSteps
