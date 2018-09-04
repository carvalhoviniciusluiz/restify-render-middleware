import 'jest'

import path = require('path')
import middleware = require('.')

test('should throw exception with empty object', (done) => {
  const req = <any>{}
  const res = <any>{}
  const next = () => {}

  const assignRenderInResponse = middleware({})
  assignRenderInResponse(req, res, (<any>next))

  res.render('view', { name: 'nameless' }, (error, html) => {
    expect(html).toBeUndefined()
    expect(error).toBeTruthy()
    done()
  })
})

test('should throw exception with template not found', (done) => {
  const req = <any>{}
  const res = <any>{}
  const next = () => {}

  const assignRenderInResponse = middleware({
    engine: '',
    dir: path.join(__dirname, 'example')
  })
  assignRenderInResponse(req, res, (<any>next))

  res.render('view', { name: 'nameless' }, (error, html) => {
    expect(html).toBeUndefined()
    expect(error).toBeTruthy()
    done()
  })
})

test('configure the engine with the name and extension, and the view without extension', (done) => {
  const req = <any>{}
  const res = <any>{}
  const next = () => {}

  const assignRenderInResponse = middleware({
    engine: {
      name: 'pug',
      extname: 'pug'
    },
    dir: path.join(__dirname, '../example')
  })
  assignRenderInResponse(req, res, (<any>next))

  res.render('view', { name: 'nameless' }, (error, html) => {
    expect(error).toBeNull()
    expect(html).toEqual('<p style="color:red">nameless</p>')
    done()
  })
})

test('configure the engine type, and the view with extension', (done) => {
  const req = <any>{}
  const res = <any>{}
  const next = () => {}

  const assignRenderInResponse = middleware({
    engine: 'pug',
    dir: path.join(__dirname, '../example')
  })
  assignRenderInResponse(req, res, (<any>next))

  res.render('view.pug', { name: 'nameless' }, (error, html) => {
    expect(error).toBeNull()
    expect(html).toEqual('<p style="color:red">nameless</p>')
    done()
  })
})
