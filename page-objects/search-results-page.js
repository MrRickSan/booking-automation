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

    // locates the price section in the passed element index
    this.price = function (index) {
      // path to room details
      var resultItem = element(by.css('div.sr_item:nth-child(' + index + ') > div:nth-child(2)')).element(by.css('div.sr_rooms_table_block.clearfix div.room_details'))

      // two possible types of price locator
      var innerPrice = resultItem.element(by.css('div.sr_gr.sr-group_recommendation div.js_rackrate_animation_anchor.smart_price_style.gray-icon.totalPrice.totalPrice_rack-rate.entire_row_clickable.animated strong.price.availprice.no_rack_rate.sr_gs_rackrate_price.jq_tooltip'))
      var innerPrice2 = resultItem.element(by.css('div.sr_gr.sr-group_recommendation div.totalPrice.totalPrice_no-rack-rate.entire_row_clickable'))

      if (innerPrice2.isPresent()) { return innerPrice2 }
      return innerPrice
    }

    // locates the hotel name in the passed element index
    this.propertyName = function (index) {
      return element(by.css('div.sr_item:nth-child(' + index + ') > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > h3:nth-child(1) > a:nth-child(1)')).element(by.css('span.sr-hotel__name'))
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

  /* This method receives a review mark and a price, and returns the first
     matching in the search result  */
  async getResultWithReviewMarkAndPrice (reviewMark, limitPrice) {
    var price = this.price
    var propertyName = this.propertyName
    var itemPriceValue, name, score, elementList

    elementList = await this.resultsWithRequiredRating
    for (var i = 0; i < elementList.length; i++) {
      score = await this.resultsWithRequiredRating.get(i).getAttribute('data-score')
      if (await price(i + 1).isPresent()) {
        itemPriceValue = await price(i + 1).getText()
        itemPriceValue = itemPriceValue.split('€ ')
        if (score >= reviewMark && Number(itemPriceValue[1]) < Number(limitPrice)) {
          name = await propertyName(i + 1).getText()
          console.log(`Review mark: ${score} Price: ${itemPriceValue[1]}`)
          console.log('Name: ' + name)
          return name
        }
      }
    }
    return name
  }
}

module.exports = new SearchResultsPage()
