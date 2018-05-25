/* globals browser, protractor */

function Helper () {
  var waitTime = 30000

  this.waitTime = function () {
    return waitTime
  }

  // receives a locator and click on it
  this.click = function (locator) {
    browser.wait(protractor.ExpectedConditions.visibilityOf(locator), waitTime)
    locator.click()
  }

  // receives a locator and return the text from it
  this.getText = function (locator) {
    browser.wait(protractor.ExpectedConditions.visibilityOf(locator), waitTime)
    return locator.getText()
  }

  // receives a locator and the attribute name, and return the data
  this.getAttribute = function (locator, name) {
    browser.wait(protractor.ExpectedConditions.visibilityOf(locator), waitTime)
    return locator.getAttribute(name)
  }

  // receives a locator and the input data and write the input data
  this.sendKeys = function (locator, data) {
    browser.wait(protractor.ExpectedConditions.visibilityOf(locator), waitTime)
    locator.clear()
    locator.sendKeys(data)
  }

  // receives a locator and return true if the element is being displayed
  this.isDisplayed = function (locator) {
    return browser.wait(protractor.ExpectedConditions.visibilityOf(locator), waitTime)
  }

  // receives a locator and return true if the element is present
  this.isPresent = function (locator) {
    return browser.wait(protractor.ExpectedConditions.presenceOf(locator), waitTime)
    // return locator.isDisplayed()
  }

  // receives a locator and return true if the element is not present
  this.isNotPresent = function (locator) {
    return browser.wait(protractor.ExpectedConditions.stalenessOf(locator), waitTime)
  }

  // receives a locator of a textfield element and clear it
  this.clear = function (locator) {
    browser.wait(protractor.ExpectedConditions.visibilityOf(locator), waitTime)
    locator.clear()
  }
}

module.exports = new Helper()
