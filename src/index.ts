import * as path from 'path'
import * as restify from 'restify'
import cons from 'consolidate'

export type Valid = (val: string) => boolean
export type Format = (name: string, extname: string) => string
export type Rendering = (view: string, state: object, fn?: Function) => any
export type Render = (options: any, res: restify.Response) => Rendering
export type CallbackRender = (err: Error, html: string) => void
export interface OptionsRender {
  engine: any
  dir: string
}
export type Middleware = (options: object) => restify.RequestHandler

declare module 'restify' {
  export interface Response {
    render: Function
  }
}

const isString: Valid = (val) => typeof val === 'string'
const isObject: Valid = (val) => typeof val === 'object'
const isFunction: Valid = (val) => typeof val === 'function'

const format: Format = (name: string, extname: string) => {
  const regex: RegExp = new RegExp(`.${extname}`)

  if (regex.test(name)) {
    return name
  }

  return `${name}.${extname}`
}

const render: Render = (options: OptionsRender, res: restify.Response) => {
  const callback: CallbackRender = (err: Error, html: string) => {
    if (err) {
      throw err
    }
    res.writeHead(200)
    res.end(html)
  }
  return function (view: string, state: object = {}, fn?: Function) {
    const message: string = `Engine '${JSON.stringify(options.engine)}' nonexistent`

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

const middleware: Middleware = (options: object): restify.RequestHandler => {
  return (_req: restify.Request, res: restify.Response, next: restify.Next) => {
    res.render = render(options, res)
    next()
  }
}

export default middleware
