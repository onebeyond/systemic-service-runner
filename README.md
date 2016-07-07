# Systemic System Runner
Starts [systemic](https://github.com/guidesmiths/systemic) systems within a domain

## TL;DR
```js
const Systemic = require('systemic')
const runner = require('systemic-system-runner')

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
* Attempts to shutdown gracefully on SIGINT and SIGTERM
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


