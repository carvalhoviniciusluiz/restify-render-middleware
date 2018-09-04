import path = require('path')
import restify = require('restify')
import cons = require('consolidate')

const isString = (val) => typeof val === 'string'
const isObject = (val) => typeof val === 'object'
const isFunction = (val) => typeof val === 'function'

const format  = (name: string, extname: string) => {
  const regex = new RegExp(`.${extname}`)

  if (regex.test(name)) {
    return name
  }

  return `${name}.${extname}`
}

const render = (options: any, res: restify.Response) => {
  const callback = (err, html) => {
    if (err) {
      throw err
    }
    res.setHeader('Content-Type', 'text/html')
    res.writeHead(200)
    res.end(html)
  }
  return function (view: string, state: object = {}, fn?: Function) {
    const message = `Engine '${JSON.stringify(options.engine)}' nonexistent`

    if (!options || !options.engine) {
      return fn(new Error(message))
    }

    if (isObject(options.engine) && isFunction(cons[options.engine.name])) {
      const { name, extname } = options.engine
      return cons[name](path.join(options.dir, `${format(view, extname)}`), state, fn || callback)
    }

    if (isString(options.engine) && isFunction(cons[options.engine])) {
      return cons[options.engine](path.join(options.dir, view), state, fn || callback)
    }

    fn(new Error(message))
  }
}

function middleware (options: object): restify.RequestHandler {
  return (_req: restify.Request, res: restify.Response, next: restify.Next) => {
    (<any>res).render = render(options, res)
    next()
  }
}

export = middleware
