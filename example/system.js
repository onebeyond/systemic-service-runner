var Systemic = require('systemic')
var config = require('./components/config')
var service = require('./components/service')

module.exports = new Systemic()
    .configure(config())
    .add('service', service()).dependsOn('config')
