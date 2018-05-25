/* global element, by, helper */

class SearchResultsPage {
  constructor () {
    this.searchResults = element(by.id('hotellist_inner'))
    this.noRomsSelector = element(by.id('no_rooms'))
    this.travelingForWork = element(by.css('.sb-booker-type-checkbox > label:nth-child(1) > input:nth-child(1)'))
    this.resultsWithRequiredRating = element.all(by.css('div.sr_item'))
    this.firstResult = element(by.css('div.sr_item:nth-child(1)'))

    this.noRoms = function (num) {
      return element(by.css('#no_rooms > option:nth-child(' + num + ')'))
    }
  }

  searchResultsIsDisplayed () {
    return helper.isDisplayed(this.searchResults)
  }

  selectNoRoms (num) {
    helper.click(this.noRomsSelector)
    return helper.click(this.noRoms(num))
  }

  checkTravelingForWork () {
    return helper.click(this.travelingForWork)
  }

  filterByRating () {
    this.resultsWithRequiredRating.then(function (items) {
      for (var i = 0; i < items.length; i++) {
        if (items[i].getAttribute('data-score').then(function (value) {
          console.log(value)

          if (value === '8.7') {
            console.log('Caiu no if com index: ' + i)
            return true
          } else {
            console.log('Caiu no else')
          }
        }) === true) {
          break
        }
      }
      // expect(items.length).to.equal(3)
      // expect(items[1].getAttribute('data-score')).to.eventually.equal('5.0')
    })
  }
}

module.exports = new SearchResultsPage()
