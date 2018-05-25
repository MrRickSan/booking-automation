/* global browser */
class BasePage {
  get (url) {
    return browser.get(url)
  }
}

module.exports = new BasePage()
