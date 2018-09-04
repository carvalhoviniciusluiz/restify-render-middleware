import restify = require('restify');

declare function middleware(options: any): restify.RequestHandler;

export = middleware;

declare module 'restify' {
  export interface Response {
    render: Function
  }
}
