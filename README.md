[![Build Status](https://img.shields.io/travis/guidesmiths/systemic-service-runner/master.svg)](https://travis-ci.org/guidesmiths/systemic-service-runner)

# Systemic Service Runner
Starts [systemic](https://github.com/guidesmiths/systemic) systems

## TL;DR
```js
const Systemic = require('systemic')
const runner = require('systemic-service-runner')

const system = new Systemic()
    .add('config', { foo: 1, bar: 2 })
    .add('app', require('./my-app'))
        .dependsOn('config')

runner(system).start((err, components) => {
    if (err) throw err
    console.log('Started')
})
```
## Features
* Attempts to shutdown gracefully on error, unhandled rejection, SIGINT and SIGTERM events
* Attempts a graceful restart when ```process``` emits a ```systemic_restart``` event

## Usage
```
runner(<system>, [<options>]).start(<cb>)
```

### Default options
```js
{
    logger: console,
    restart: {
        window: '60s'
    }
}
```


