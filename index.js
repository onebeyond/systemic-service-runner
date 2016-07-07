var merge = require('lodash.merge')
var duration = require('parse-duration')
var format = require('util').format
var signals = ['SIGINT', 'SIGTERM']

module.exports = function(system, options) {

    if (!system) throw new Error('system is required')

    var config = merge({ restart: { window: '60s' }}, options)
    var logger = config.logger || system.logger || console

    function start(cb) {
        system.start(function(err, components) {
            if (err) return cb(err)

            process.on('systemic_restart', scheduleRestart)

            signals.forEach(function(signal) {
                process.on(signal, function() {
                    logger.info(format('Received %s. Attempting to shutdown gracefully.', signal))
                    system.stop(function() {
                        process.exit(0)
                    })
                })
            })

            function scheduleRestart() {
                const delay = Math.floor(Math.random() * duration(config.restart.window) / 1000) * 1000
                logger.info(format('Service will restart in %s seconds.', delay / 1000))

                clearTimeout(scheduleRestart.timeout)
                scheduleRestart.timeout = setTimeout(function(){
                    system.restart(function(err, components) {
                        if (err) {
                            logger.error('Error restarting system.')
                            logger.error(err)
                            process.exit(1)
                        }
                    })
                }, delay)
                scheduleRestart.timeout.unref()
            }

            cb(null, components)
        })
    }

    function stop(cb) {
        system.stop(cb)
    }

    return {
        start: start,
        stop: stop
    }
}
