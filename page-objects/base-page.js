/* global browser, element, by, helper */
class BasePage {
  constructor () {
    this.submitSearch = element.all(by.css('.sb-searchbox__button')).first()
  }

  get (url) {
    return browser.get(url)
  }

  clickSubmitSearch () {
    return helper.click(this.submitSearch)
  }
}

module.exports = new BasePage()
