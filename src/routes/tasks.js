const { Router } = require('express')
const pagesController = require('../controllers/pages')
const tasksController = require('../controllers/tasks')

const router = Router()

/* * * * * * * * * * *
 *   Pages Requests  *
 * * * * * * * * * * */

// Create page
router.get('/create', pagesController.create)

// Update page
router.get('/update', pagesController.update)

/* * * * * * * * * * *
*   Tasks Requests  *
* * * * * * * * * * */

// Create
router.post('/create', tasksController.createTask)

// All tasks
router.get('/read', tasksController.getAllTasks)

// Update
router.get('/update/:id', tasksController.getTaskToUpdate)
router.put('/update/:id', tasksController.updateTask)
router.get('/updateStatus/:id/:status', tasksController.updateTaskStatus)

module.exports = router
