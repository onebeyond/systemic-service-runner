module.exports = function() {
    return {
        start: function start(cb) {
            console.log('Starting config')
            cb(null, {
                service: {
                    foo: 1
                }
            })
        },
        stop: function stop(cb) {
            console.log('Stopping config')
            cb()
        }
    }
}