/* global browser, require, module, expect */
const bookingHomePage = require('../page-objects/home-page')
const basePage = require('../page-objects/base-page')

var BookingSteps = function () {
  'use strict'

  this.Given(/^I start at "([^"]*)" page$/, function (url) {
    return basePage.get(url)
  })

  this.When(/^I choose currency "([^"]*)"$/, function (currency) {
    return bookingHomePage.selectCurrency(currency)
  })

  this.When(/^I choose "([^"]*)" language$/, function (language) {
    return bookingHomePage.selectLanguage(language)
  })

  this.Then(/^The "([^"]*)" currency symbol is displayed and "([^"]*)" language is selected$/, function (currencySymbol, language) {
    browser.sleep(2000)
    expect(bookingHomePage.getCurrentCurrency()).to.eventually.equal(currencySymbol)
    return expect(bookingHomePage.getCurrentLanguage()).to.eventually.equal('Select your language. Your current language is ' + language)
  })

  this.When(/^I input the destination "([^"]*)"$/, function (destination) {
    return bookingHomePage.insertDestination(destination)
  })

  this.When(/^I select the CheckIn in last day of current month and CheckOut in first day of next month$/, function () {
    browser.sleep(1000)
    return bookingHomePage.selectCheckInAndCheckOut()
  })

  this.When(/^I choose "([^"]*)" adult$/, function (number) {
    browser.sleep(1000)
    return bookingHomePage.selectAdultNumber(number)
  })

  this.When(/^I choose "([^"]*)" child "([^"]*)" years old$/, function (number, age) {
    return bookingHomePage.selectChildren(number, age)
  })

  this.When(/^I click on Search button$/, function () {
    return basePage.clickSubmitSearch()
  })
}

module.exports = BookingSteps
