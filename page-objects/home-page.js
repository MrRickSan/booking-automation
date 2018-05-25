/* global browser, helper, element, by, protractor */

class HomePage {
  constructor () {
    this.currencySelector = element(by.css('li[data-id="currency_selector"]'))
    this.languageSelector = element(by.css('li[data-id="language_selector"]'))
    this.activeLanguage = this.languageSelector.all(by.css('a')).first()
    this.destinationInput = element.all(by.id('ss')).first()
    this.checkDates = element(by.css('div.c2-month:nth-child(1) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(5) > td:nth-child(5)'))
    this.guestsDropdown = element(by.id('xp__guests__toggle'))
    this.groupAdults = element(by.id('group_adults'))
    this.groupChildren = element(by.id('group_children'))
    this.groupChildAgeForm = element(by.css('#frm > div:nth-child(10) > div > div > div > div.sb-group__field.sb-group-children.sb-group-children-universal > div.sb-group__children__field.clearfix > div > div > select'))
    this.groupChildAge = element(by.css('.sb-group__children__field > select:nth-child(2)'))

    this.chooseLanguage = function (language) {
      return element(by.cssContainingText('#current_language_foldout > div:nth-child(2) > div > ul:nth-child(1) > li.lang_en-us > a > span.seldescription', language))
    }

    this.chooseCurrency = function (currency) {
      return element(by.cssContainingText('#currency_dropdown_top > ul:nth-child(1) > li.currency_EUR > a > span > span.seldescription', currency))
    }

    this.adultNumber = function (number) {
      return element(by.css('#group_adults > option:nth-child(' + number + ')'))
    }

    this.childNumber = function (number) {
      number = Number(number) + 1
      return element(by.css('#group_children > option:nth-child(' + number + ')'))
    }

    this.childAge = function (age) {
      age = Number(age) + 2
      return element(by.css('.sb-group__children__field > select:nth-child(2) > option:nth-child(' + age + ')'))
    }

    this.childAgeForm = function (age) {
      age = Number(age) + 2
      return element(by.css(' #frm > div:nth-child(10) > div > div > div > div.sb-group__field.sb-group-children.sb-group-children-universal > div.sb-group__children__field.clearfix > div > div > select > option:nth-child(' + age + ')'))
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

  selectAdultNumber (number) {
    var guestsDropdown = this.guestsDropdown
    var adultNumber = this.adultNumber
    var groupAdults = this.groupAdults

    this.guestsDropdown.isPresent().then(function (visible) {
      if (visible) {
        // form type 2
        helper.click(guestsDropdown)
        helper.click(groupAdults)
        return helper.click(adultNumber(number))
      } else {
        // form type 1
        groupAdults.click()
        return helper.click(adultNumber(number))
      }
    })
  }

  selectChildren (number, age) {
    helper.click(this.groupChildren)
    helper.click(this.childNumber(number))
    helper.click(this.groupChildren)

    var groupChildAge = this.groupChildAge
    var groupChildAgeForm = this.groupChildAgeForm
    var childAge = this.childAge
    var childAgeForm = this.childAgeForm

    this.groupChildAge.isPresent().then(function (visible) {
      if (visible) {
        // form type 1
        helper.click(groupChildAge)
        return helper.click(childAge(age))
      } else {
        // form type 2
        helper.click(groupChildAgeForm)
        return helper.click(childAgeForm(age))
      }
    })
  }
}

module.exports = new HomePage()
