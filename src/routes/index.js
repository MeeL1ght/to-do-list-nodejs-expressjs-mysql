const { Router } = require('express')
const tasksRouter = require('./tasks')
const pagesController = require('../controllers/pages')

const router = Router()

// Index
router.get('/', pagesController.index)

// Tasks pages and requests
router.use('/tasks', tasksRouter)

// Not found
router.use(pagesController.notFound)

module.exports = router
