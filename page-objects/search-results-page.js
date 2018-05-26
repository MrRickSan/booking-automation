/* global element, by, helper */

class SearchResultsPage {
  constructor () {
    this.searchResults = element(by.id('hotellist_inner'))
    this.noRomsSelector = element(by.id('no_rooms'))
    this.travelingForWork = element(by.css('.sb-booker-type-checkbox > label:nth-child(1) > input:nth-child(1)'))
    this.resultsWithRequiredRating = element.all(by.css('div.sr_item'))

    this.pathToRoomDetails = function (index) {
      return element(by.css('div.sr_item:nth-child(' + index + ') > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(3)'))
    }

    this.price = function (index) {
      console.log(`Price element index: ${index}`)
      var innerPrice = element(by.css('div.sr_item:nth-child(' + index + ') > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > strong:nth-child(1) > b:nth-child(1) > span:nth-child(1)'))
      var pathToRoomDetails = element(by.css('div.sr_item:nth-child(' + index + ') > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(3)'))

      return pathToRoomDetails.isPresent().then(async function (visible) {
        if (visible) {
          // It has price displayed
          await innerPrice.isPresent().then(function (visible) { if (visible) { return innerPrice } })
          return element(by.css('div.sr_item:nth-child(' + index + ') > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > div:nth-child(3) > div:nth-child(2)'))
        } else {
          return pathToRoomDetails
        }
      })
    }

    this.propertyName = function (index) {
      console.log(`Property name index: ${index}`)
      return element(by.css('div.sr_item:nth-child(' + index + ') > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > h3:nth-child(1) > a:nth-child(1) > span:nth-child(1)'))
    }

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
    var price = this.price
    var propertyName = this.propertyName
    var match = this.resultsWithRequiredRating.then(async function (items) {
      for (var i = 0; i < items.length; i++) {
        match = await items[i].getAttribute('data-score').then(async function (score) {
          var value = await price(i + 1).getText().then(function (value) { if (value) { return value } })
          value = value.split('$ ')
          console.log('Com valor: ' + value[1])
          if (score >= '8.0' && Number(value[1]) < 600) {
            var name = await propertyName(i + 1).getText().then(function (value) { return value })
            console.log('Caiu no if com index: ' + i)
            console.log('Com score: ' + score)
            console.log('Com nome: ' + name)
            return name
          }
        })
        if (match) {
          return match
        }
      }
      // expect(items.length).to.equal(3)
      // expect(items[1].getAttribute('data-score')).to.eventually.equal('5.0')
    })
  }
}

module.exports = new SearchResultsPage()
