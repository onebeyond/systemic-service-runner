[![NPM version](https://img.shields.io/npm/v/systemic-service-runner.svg?style=flat-square)](https://www.npmjs.com/package/systemic-service-runner)
[![NPM downloads](https://img.shields.io/npm/dm/systemic-service-runner.svg?style=flat-square)](https://www.npmjs.com/package/systemic-service-runner)
[![Node.js CI](https://github.com/guidesmiths/systemic-service-runner/workflows/Node.js%20CI/badge.svg)](https://github.com/guidesmiths/systemic-service-runner/actions?query=workflow%3A%22Node.js+CI%22)
[![Maintainability](https://api.codeclimate.com/v1/badges/e9fe57c5023dd0239626/maintainability)](https://codeclimate.com/github/cressie176/systemic-service-runner/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/e9fe57c5023dd0239626/test_coverage)](https://codeclimate.com/github/cressie176/systemic-service-runner/test_coverage)
[![Code Style](https://img.shields.io/badge/code%20style-prettier-brightgreen.svg)](https://github.com/prettier/prettier)
[![systemic-service-runner](https://snyk.io/advisor/npm-package/systemic-service-runner/badge.svg)](https://snyk.io/advisor/npm-package/systemic-service-runner)
[![Discover zUnit](https://img.shields.io/badge/Discover-zUnit-brightgreen)](https://www.npmjs.com/package/zunit)

# Systemic Service Runner

Starts [systemic](https://github.com/guidesmiths/systemic) systems

## TL;DR

```js
const Systemic = require('systemic');
const runner = require('systemic-service-runner');

const system = new Systemic().add('config', { foo: 1, bar: 2 }).add('app', require('./my-app')).dependsOn('config');

runner(system).start((err, components) => {
  if (err) throw err;
  console.log('Started');
});
```

## Features

- Attempts to shutdown gracefully on error, unhandled rejection, SIGINT and SIGTERM events
- Attempts a graceful restart when `process` emits a `systemic_restart` event

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
