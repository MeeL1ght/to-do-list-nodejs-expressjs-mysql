const dotenv = require('dotenv')
const { static } = require('express')
const Server = require('./models/server')
const morgan = require('morgan')
const path = require('path')
const mysql = require('mysql')
const mysqlConnection = require('express-myconnection')

// Server
const server = new Server()

// Configuring environment variables
dotenv.config()

// Config
server.setName('ToDo-List App (using: Mysql)')
server.setPort(dotenv.config().parsed.PORT)
server.setViewEngine('ejs')
server.setViews(path.join(__dirname, 'views'))

// Middlewares

// Morgan - Get responses to requests
server.use(morgan('dev'))

// Mysql
server.use(mysqlConnection(mysql, {
  host: '',
  user: '',
  password: '',
  port: 3306,
  database: ''
}, 'single'))

// Body request
server.use(server.express().json())

// Static route
server.use(static(path.join(__dirname, '../public')))

// Routes
server.use(require('./routes'), '/')

// Listen
server.listen()
