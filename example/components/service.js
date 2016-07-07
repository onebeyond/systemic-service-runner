module.exports = function() {
    return {
        start: function start(dependencies, cb) {
            console.log('Starting service with configuration', dependencies)
            cb()
        },
        stop: function stop(cb) {
            console.log('Stopping service')
            cb()
        }
    }
}