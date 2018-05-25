/* global browser, require, module, expect */
const bookingPage = require('../page-objects/home-page')
const basePage = require('../page-objects/base-page')

var BookingSteps = function () {
  'use strict'

  this.Given(/^I start at "([^"]*)" page$/, function (url) {
    return basePage.get(url)
  })

  this.When(/^I choose currency "([^"]*)"$/, function (currency) {
    return bookingPage.selectCurrency(currency)
  })

  this.When(/^I choose "([^"]*)" language$/, function (language) {
    return bookingPage.selectLanguage(language)
  })

  this.Then(/^The "([^"]*)" currency symbol is displayed and "([^"]*)" language is selected$/, async function (currencySymbol, language) {
    await browser.sleep(2000)
    await expect(bookingPage.getCurrentCurrency()).to.eventually.equal(currencySymbol)
    return expect(bookingPage.getCurrentLanguage()).to.eventually.equal('Select your language. Your current language is ' + language)
  })

  this.When(/^I input the destination "([^"]*)"$/, function (destination) {
    return bookingPage.insertDestination(destination)
  })

  this.When(/^I select the CheckIn in last day of current month and CheckOut in first day of next month$/, function () {
    browser.sleep(1000)
    return bookingPage.selectCheckInAndCheckOut()
  })

  this.When(/^I choose "([^"]*)" adult/, function (number) {
    browser.sleep(1000)
    return bookingPage.selectAdultNumber(number)
  })

  this.When(/^I wait five seconds/, function () {
    return browser.sleep(5000)
  })
}

module.exports = BookingSteps
