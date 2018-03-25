'use strict'
const path = require('path')
const cons = require('consolidate')
const middleware = require('../')

test('should render the templates correctly', (done) => {
  const req = {}
  const res = {}
  const next = () => {}

  const opts = {
    engine: cons.pug,
    dir: path.join(__dirname, '../example')
  }

  middleware(opts)(req, res, next)

  res.render('view.pug', { name: 'nameless' }, (error, html) => {
    expect(error).toBeNull()
    expect(html).toEqual('<p style="color:red">nameless</p>')
    done()
  })
})
