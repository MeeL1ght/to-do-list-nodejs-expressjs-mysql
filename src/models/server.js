const express = require('express')
require('colors')

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT || 3000
  }

  setName(name) {
    this.app.set('name', name)
  }

  setPort(port) {
    this.app.set('port', port)
  }

  setViewEngine(viewEngine) {
    this.app.set('view engine', viewEngine)
  }

  setViews(path) {
    this.app.set('views', path)
  }

  getName() {
    this.app.get('name')
  }

  getPort() {
    this.app.get('port')
  }

  getViewEngine() {
    this.app.get('view engine')
  }

  getViews() {
    this.app.get('views')
  }

  use(middleware, path = '') {
    this.app.use(path, middleware)
  }

  express() {
    return express
  }

  listen() {
    this.app.listen(this.app.get('port'), () => {
      console.log(`Server on port ${this.app.get('port')}`.bold.italic.brightGreen)
      console.log('App:'.brightCyan, this.app.get('name').brightWhite)
    })
  }
}

module.exports = Server
