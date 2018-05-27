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

  this.Then(/^I found a result with a review mark of higher than "([^"]*)" and price under "([^"]*)" EUR$/, function (reviewMark, price) {
    return searchResultsPage.getResultWithReviewMarkAndPrice(reviewMark, price)
  })
}

module.exports = SearchResultsSteps
