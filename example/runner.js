var system = require('./system')
var runner = require('..')

runner(system, {
    restart: {
        window: '5s'
    }
}).start(function(err, components) {
    if (err) throw err

    setInterval(function() {
        process.emit('systemic_restart')
    }, 5000)
})