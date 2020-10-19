

class Koa {
  constructor() {
    this.middlewares = []
  }
  use(fn) {
    this.middlewares.push(fn)
  }
  createContext(req, res) {
    return {
      get url() { return req.url },
      get method() { return req.method },
      get body() {
        return this._body
      },
      set body(val) {
        this._body = val
      }
    }
  }

  listen(...args) {
    const http = require('http')
    http.createServer(async (req, res) => {
      const ctx = this.createContext(req, res)
      await compose(this.middlewares)(ctx)
      res.end(ctx.body)
    }).listen(...args)
  }
}

function compose(middles) {
  return function (ctx) {
    return dispatch(0)
    function dispatch(n) {
      let fn = middles[n]
      if (!fn) return Promise.resolve()
      return Promise.resolve(fn(ctx, function next() {
        return dispatch(n + 1)
      }))
    }
  }
}
module.exports = Koa