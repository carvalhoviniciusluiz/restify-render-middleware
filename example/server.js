'use strict'

const restify = require('restify')
const render = require('..')
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
