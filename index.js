'use strict'

const path = require('path')

const renderFactory = (options, res, next) => {
  const callback = (err, html) => {
    if (err) {
      throw err
    }
    res.setHeader('Content-Type', 'text/html')
    res.writeHead(200)
    res.end(html)
  }
  return function (view, state = {}, userCallback) {
    options.engine(path.join(options.dir, view), state, userCallback || callback)
  }
}

const middlewareFactory = (options) => {
  return function (req, res, next) {
    res.render = renderFactory(options, res, next)
    next()
  }
}

module.exports = middlewareFactory
