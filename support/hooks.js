var Cucumber = require('cucumber')
var fs = require('fs')
var reporter = require('cucumber-html-reporter')

var hooks = function () {
  'use strict'

  var jsonReports = process.cwd() + '/reports/json'
  var htmlReports = process.cwd() + '/reports/html'
  var targetJson = jsonReports + '/cucumber_report.json'

  var cucumberReporteroptions = {
    theme: 'bootstrap',
    jsonFile: jsonReports + '/cucumber_report.json',
    output: htmlReports + '/cucumber_reporter.html',
    reportSuiteAsScenarios: true,
    brandTitle: 'Cucumber Test Report',
    name: 'Addison Global Ltd. Automation Task',
    metadata: {
      'Browser': 'Chrome Version 66.0.3359.139 (Official Build) (64-bit)',
      'Platform': 'Windows 10',
      'Parallel': 'Scenarios',
      'Executed': 'Remote'
    }
  }

  var JsonFormatter = Cucumber.Listener.JsonFormatter()
  JsonFormatter.log = function (string) {
    if (!fs.existsSync(jsonReports)) {
      fs.mkdirSync(jsonReports)
    }
    try {
      fs.writeFileSync(targetJson, string)
      reporter.generate(cucumberReporteroptions)
    } catch (err) {
      if (err) {
        console.log('Failed to save cucumber test results to json file.')
        console.log(err)
      }
    }
  }
  this.registerListener(JsonFormatter)
}
module.exports = hooks
