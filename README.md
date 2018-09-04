# restify-render-middleware
Another middleware to render pages with restify. Inspired by [restify-render](https://github.com/greduan/restify-render)

[![travis][travis-image]][travis-url]
[![Code Coverage][coverage-image]][coverage-url]
[![npm][npm-image]][npm-url]

[travis-image]: https://travis-ci.org/carvalhoviniciusluiz/restify-render-middleware.svg?branch=master
[travis-url]: https://travis-ci.org/carvalhoviniciusluiz/restify-render-middleware
[coverage-image]: https://scrutinizer-ci.com/g/carvalhoviniciusluiz/restify-render-middleware/badges/quality-score.png?b=master
[coverage-url]: https://scrutinizer-ci.com/g/carvalhoviniciusluiz/restify-render-middleware/?branch=master
[npm-image]: https://img.shields.io/npm/v/restify-render-middleware.svg?style=flat
[npm-url]: https://npmjs.org/package/restify-render-middleware


### Installation:
```
npm i restify-render-middleware -S
```

### Note:
Requires Node ``>8.0.0``.

### Example:
This example is [available here as well](./example/server.js).
```js
'use strict'

const restify = require('restify')
const render = require('restify-render-middleware')

const server = restify.createServer()
server.use(render({
  engine: 'pug',
  dir: __dirname
}))

server.get('/:name', function (req, res) {
  res.render('view.pug', { name: req.params.name || 'nameless' })
})

server.listen(8080, function () {
  console.log('listening on :8080, curl /:name')
})

```

__NOTE__: if you need another engine to render the view, simply install

```js
npm install swig-templates
```

To use you must configure an object

```js
server.use(render({
  engine: {
    name: 'swig',
    extname: 'html'
  },
  dir: __dirname
}))

server.get('/:name', function (req, res) {
  res.render('view', { name: req.params.name || 'nameless' })
})
```
In this case you do not need to configure the extension to viewer. For a list of supported engines [go to the link.](https://www.npmjs.com/package/consolidate#supported-template-engines)

### Tests
```shell
npm test
```
## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018-present
