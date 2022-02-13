const controller = {}

const lang = 'en'
const iconUrl = './../images/nodejs-logo.jpg'
const extensionIconType = 'jpg'

const routes = {
  index: '/',
  create: '/tasks/create',
  read: '/tasks/read',
  update: '/tasks/update',
  delete: '/tasks/delete',
}

// Pages

// Index
controller.index = (req, res) => {
  res.render('index', {
    lang,
    title: 'Ejs % Index',
    iconUrl,
    extensionIconType,
    routes
  })
}

// Create
controller.create = (req, res) => {
  res.render('tasks/create', {
    lang,
    title: 'Ejs % Create',
    iconUrl,
    extensionIconType,
    routes
  })
}

// Update
controller.update = (req, res) => res.redirect('../../tasks/read')

// Not found
controller.notFound = (req, res) => {
  res.status(404).render('not-found', {
    lang,
    title: 'Ejs % Not Found',
    iconUrl,
    extensionIconType,
  })
}

module.exports = controller
