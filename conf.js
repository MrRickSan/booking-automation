const Helper = require('./support/helper')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)

exports.config = {
  directConnect: true,

  // The details of execution platform
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: [ 'lang=en-us', 'disable-infobars' ],
      prefs: {
        'profile.managed_default_content_settings.notifications': 1,
        'profile.default_content_setting_values.geolocation': 2,
        'credentials_enable_service': false,
        'profile': {'password_manager_enabled': false}
      }
    }
  },

  resultJsonOutputFile: './reports/json/cucumber_report.json',
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),

  // cucumber command line options
  cucumberOpts: {
    strict: true,
    require: ['./step-definitions/*.js', './support/*.js'],
    format: 'pretty',
    tags: ['@search-success'] // Tags are used for identify the test scenario or feature to be executed
  },

  specs: ['./features/*.feature'],

  getPageTimeout: 10 * 1000,
  allScriptsTimeout: 10 * 1000,

  onPrepare: () => {
    browser.driver.manage().deleteAllCookies() // eslint-disable-line
    browser.manage().window().maximize() // eslint-disable-line
    browser.ignoreSynchronization = true // eslint-disable-line
    global.expect = chai.expect // Chai is a assertion library used on steps
    global.helper = Helper
  }

}
