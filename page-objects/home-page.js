/* global browser, helper, element, by, protractor */

class HomePage {
  constructor () {
    this.currencySelector = element(by.css('li[data-id="currency_selector"]'))
    this.languageSelector = element(by.css('li[data-id="language_selector"]'))
    this.chooseLanguage = function (language) {
      return element(by.cssContainingText('#current_language_foldout > div:nth-child(2) > div > ul:nth-child(1) > li.lang_en-us > a > span.seldescription', language))
    }
    this.chooseCurrency = function (currency) {
      return element(by.cssContainingText('#currency_dropdown_top > ul:nth-child(1) > li.currency_EUR > a > span > span.seldescription', currency))
    }
    this.activeLanguage = this.languageSelector.all(by.css('a')).first()
    this.destinationInput = element.all(by.id('ss')).first()
    this.checkDates = element(by.css('div.c2-month:nth-child(1) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(5) > td:nth-child(5)'))
    this.guestsDropdown = element(by.id('xp__guests__toggle'))
    this.adultNumber = function (number) {
      element(by.id('group_adults')).click()
      return element(by.css('#group_adults > option:nth-child(' + number + ')'))
    }
  }

  selectCurrency (currency) {
    helper.click(this.currencySelector)
    return helper.click(this.chooseCurrency(currency))
  }

  selectLanguage (language) {
    helper.click(this.languageSelector)
    return helper.click(this.chooseLanguage(language))
  }

  getCurrentCurrency () {
    return helper.getText(this.currencySelector)
  }

  getCurrentLanguage () {
    return helper.getAttribute(this.activeLanguage, 'aria-label')
  }

  async insertDestination (destination) {
    await helper.sendKeys(this.destinationInput, destination)
    await browser.sleep(1000)
    await browser.actions().sendKeys(protractor.Key.DOWN).perform()
    return browser.actions().sendKeys(protractor.Key.ENTER).perform()
  }

  selectCheckInAndCheckOut () {
    return helper.click(this.checkDates)
  }

  async selectAdultNumber (number) {
    console.log(this.guestsDropdown)
    try {
      await this.guestsDropdown.click()
    } finally {
      await this.adultNumber(number).click()
    }
  }
}

module.exports = new HomePage()
