var assert = require('assert')
var runner = require('../index')

describe('systemic service runner', function() {

    var system
    var exit

    beforeEach(function() {
        system = createSystem()
        exit = process.exit
    })

    afterEach(function() {
        process.removeAllListeners()
        process.exit = exit
    })

    it('should start a system', function(done) {
        runner(system).start(function() {
            assert(system.started)
            done()
        })
    })

    it('should stop a system', function(done) {
        runner(system).stop(function() {
            assert(system.stopped)
            done()
        })
    })

    it('should stop on unhandled error', function(done) {
        process.exit = function(code) {
            assert(system.stopped)
            assert.equal(code, 1)
            done()
        }
        var logger = {
            error: function(message) {
                assert.equal(message, 'Unhandled error. Invoking shutdown.')
            }
        }
        runner(system, { logger: logger }).start(function() {
            assert(system.started)
            setTimeout(function() {
                process.emit('error')
            })
        })
    })

    it('should stop on unhandled rejection', function(done) {
        process.exit = function(code) {
            assert(system.stopped)
            assert.equal(code, 1)
            done()
        }
        var logger = {
            error: function(message) {
                assert.equal(message, 'Unhandled rejection. Invoking shutdown.')
            }
        }
        runner(system, { logger: logger }).start(function() {
            assert(system.started)
            setTimeout(function() {
                process.emit('unhandledRejection')
            })
        })
    })

    it('should stop on SIGINT', function(done) {
        process.exit = function(code) {
            assert(system.stopped)
            assert.equal(code, 0)
            done()
        }
        var logger = {
            info: function(message) {
                assert.equal(message, 'Received SIGINT. Attempting to shutdown gracefully.')
            }
        }
        runner(system, { logger: logger }).start(function() {
            assert(system.started)
            setTimeout(function() {
                process.emit('SIGINT')
            })
        })
    })

    it('should stop on SIGTERM', function(done) {
        process.exit = function(code) {
            assert(system.stopped)
            assert.equal(code, 0)
            done()
        }
        var logger = {
            info: function(message) {
                assert.equal(message, 'Received SIGTERM. Attempting to shutdown gracefully.')
            }
        }
        runner(system, { logger: logger }).start(function() {
            assert(system.started)
            setTimeout(function() {
                process.emit('SIGTERM')
            })
        })
    })

    function createSystem() {
        return {
            started: false,
            stopped: false,
            restarted: false,
            start: function(cb) {
                this.started = true
                cb()
            },
            stop: function(cb) {
                this.stopped = true
                cb()
            }
        }
    }
})
