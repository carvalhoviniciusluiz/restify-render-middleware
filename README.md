# restify-render-middleware
Another middleware to render pages with restify. Inspired by [restify-render](https://github.com/greduan/restify-render)

[![standard][standard-image]][standard-url]
[![travis][travis-image]][travis-url]
[![Code Coverage][coverage-image]][coverage-url]
[![npm][npm-image]][npm-url]

[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[standard-url]: http://standardjs.com/
[travis-image]: https://travis-ci.org/carvalhoviniciusluiz/restify-render-middleware.svg?branch=master
[travis-url]: https://travis-ci.org/carvalhoviniciusluiz/restify-render-middleware
[coverage-image]: https://scrutinizer-ci.com/g/carvalhoviniciusluiz/restify-render-middleware/badges/quality-score.png?b=master
[coverage-url]: https://scrutinizer-ci.com/g/carvalhoviniciusluiz/restify-render-middleware/?branch=master
[npm-image]: https://img.shields.io/npm/v/restify-render-middleware.svg?style=flat
[npm-url]: https://npmjs.org/package/restify-render-middleware


### Installation:
```
npm install restify-render-middleware --save
```

### Note:
Requires Node ``>8.0.0``.

### Example:
This example is [available here as well](./example/server.js).
```javascript
'use strict'

const restify = require('restify')
const render = require('restify-render-middleware')
const cons = require('consolidate')

const server = restify.createServer()
server.use(render({
  engine: cons.pug,
  dir: __dirname
}))

server.get('/:name', function (req, res) {
  res.render('view.pug', { name: req.params.name || 'nameless' })
})

server.listen(8080, function () {
  console.log('listening on :8080, curl /:name')
})

```
### Tests
```shell
npm test
```
## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018-present
