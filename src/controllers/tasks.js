const Moment = require('moment')

const tasks = {}

const validation = {
  isEmpty: data => data.length === 0,
  theLengthIsLess: (data, min) => data.length < min,
  theLengthIsGreater: (data, max) => data.length > max,
  containsWhitespaceAtTheBeginning: input => new RegExp(/^\s{1,}/).test(input),
  containstwoOrMoreWhiteSpaces: input => new RegExp(/\s{2,}/).test(input),
  containsWhitespaceAtTheEnd: input => new RegExp(/\s{1,}$/).test(input),
  thereIsAnErrorWithTheWhitespaces: checks => checks[0] || checks[1] || checks[2]
}

// Get all tasks
tasks.getAllTasks = (req, res) => {
  // Get all tasks
  req.getConnection((error, connection) => {
    connection.query('SELECT * FROM tasks;', (error, allTasks) => {
      if (error) res.json(error)

      res.render('tasks/read', {
        totalRows: allTasks.length,
        allTasks
      })
    })
  })
}

// Get a task
tasks.getTaskToUpdate = (req, res) => {
  const { id } = req.params

  req.getConnection((error, connection) => {
    connection.query(
      'SELECT id, name, description FROM tasks WHERE id = ?',
      [id],
      (error, data) => {
        if (error) res.json(error)

        res.render('tasks/update', {
          lang: 'en',
          title: 'Ejs % Update',
          iconUrl: './../../images/nodejs-logo.jpg',
          extensionIconType: 'jpg',
          routes: {
            index: '/',
            create: '/tasks/create',
            read: '/tasks/read',
            update: '/tasks/update',
            delete: '/tasks/delete',
          },
          task: data[0],
        })
      })
  })
}

// Create a new task
tasks.createTask = (req, res) => {
  const { body } = req
  const jsonData = {
    errorMessages: []
  }

  // Allocation
  const name = body.name
  const description = body.description

  // Simple validation
  const isValid = {
    name: false,
    description: false,
  }

  // Name
  if (validation.isEmpty(name) === true)
    jsonData.errorMessages.push('- The task name is empty\n')
  else {
    // Whitespaces
    const whitespaceCheckResponse = validation.thereIsAnErrorWithTheWhitespaces(
      [
        validation.containsWhitespaceAtTheBeginning(name),
        validation.containstwoOrMoreWhiteSpaces(name),
        validation.containsWhitespaceAtTheEnd(name),
      ]
    )
    
    // Check whitespaces
    if (whitespaceCheckResponse === true) {
      jsonData.errorMessages.push(
        '- The task name cannot have whitespaces at the beginning '
        + 'or end and there cannot be two or more whitespaces\n'
      )
    } else {
      // Min length = 2
      validation.theLengthIsLess(name, 2) === true
        ? jsonData.errorMessages.push('- The task name is very short\n')
        : ''

      // Max length = 50
      validation.theLengthIsGreater(name, 50) === true
        ? jsonData.errorMessages.push('- The task name is very long\n')
        : ''
    }

    if (
      validation.theLengthIsLess(name, 2) === false
      && validation.theLengthIsGreater(name, 50) === false
      && whitespaceCheckResponse === false
    ) {
      isValid.name = true
      jsonData.name = name
    }
  }

  // Description
  if (validation.isEmpty(description) === true)
    jsonData.errorMessages.push('- The task description is empty\n')
  else {
    // Whitespaces
    const whitespaceCheckResponse = validation.thereIsAnErrorWithTheWhitespaces(
      [
        validation.containsWhitespaceAtTheBeginning(description),
        validation.containstwoOrMoreWhiteSpaces(description),
        validation.containsWhitespaceAtTheEnd(description),
      ]
    )

    // Check whitespaces
    if (whitespaceCheckResponse === true) {
      jsonData.errorMessages.push(
        '- The task description cannot have whitespaces at the beginning '
          + 'or end and there cannot be two or more whitespaces\n'
      )
    } else {
      // Min length = 2
      validation.theLengthIsLess(description, 2) === true
        ? jsonData.errorMessages.push('- The task description is very short\n')
        : ''

      // Max length = 100
      validation.theLengthIsGreater(description, 100) === true
        ? jsonData.errorMessages.push('- The task description is very long\n')
        : ''
    }

    if (
      validation.theLengthIsLess(description, 2) === false
      && validation.theLengthIsGreater(description, 100) === false
      && whitespaceCheckResponse === false
    ) {
      isValid.description = true
      jsonData.description = description
    }
  }

  // Check validation values
  const validationResult = Object.values(isValid)
  let ok = true

  ok = validationResult.includes(true)

  if (ok === true) {
    const date = new Moment()
    const currentDate = date.format('YYYY/MM/DD')

    body.date = currentDate
    body.status = 1
  }

  // Create a new task
  if (ok === true) {
    req.getConnection((error, connection) => {
      connection.query('INSERT INTO tasks set ?', [body], (error, task) => {
        if (error) res.json(error)

        console.log(task)
      })
    })
  }

  res.send(jsonData)
}

// Update a task
tasks.updateTask = (req, res) => {
  const { id } = req.params
  const { body } = req
  const jsonData = {
    errorMessages: []
  }

  // Allocation
  const name = body.name
  const description = body.description

  // Simple validation
  const isValid = {
    name: false,
    description: false,
  }

  // Name
  if (validation.isEmpty(name) === true)
    jsonData.errorMessages.push('- The task name is empty\n')
  else {
    // Whitespaces
    const whitespaceCheckResponse = validation.thereIsAnErrorWithTheWhitespaces(
      [
        validation.containsWhitespaceAtTheBeginning(name),
        validation.containstwoOrMoreWhiteSpaces(name),
        validation.containsWhitespaceAtTheEnd(name),
      ]
    )
    
    // Check whitespaces
    if (whitespaceCheckResponse === true) {
      jsonData.errorMessages.push(
        '- The task name cannot have whitespaces at the beginning '
        + 'or end and there cannot be two or more whitespaces\n'
      )
    } else {
      // Min length = 2
      validation.theLengthIsLess(name, 2) === true
        ? jsonData.errorMessages.push('- The task name is very short\n')
        : ''

      // Max length = 50
      validation.theLengthIsGreater(name, 50) === true
        ? jsonData.errorMessages.push('- The task name is very long\n')
        : ''
    }

    if (
      validation.theLengthIsLess(name, 2) === false
      && validation.theLengthIsGreater(name, 50) === false
      && whitespaceCheckResponse === false
    ) {
      isValid.name = true
      jsonData.name = name
    }
  }

  // Description
  if (validation.isEmpty(description) === true)
    jsonData.errorMessages.push('- The task description is empty\n')
  else {
    // Whitespaces
    const whitespaceCheckResponse = validation.thereIsAnErrorWithTheWhitespaces(
      [
        validation.containsWhitespaceAtTheBeginning(description),
        validation.containstwoOrMoreWhiteSpaces(description),
        validation.containsWhitespaceAtTheEnd(description),
      ]
    )

    // Check whitespaces
    if (whitespaceCheckResponse === true) {
      jsonData.errorMessages.push(
        '- The task description cannot have whitespaces at the beginning '
          + 'or end and there cannot be two or more whitespaces\n'
      )
    } else {
      // Min length = 2
      validation.theLengthIsLess(description, 2) === true
        ? jsonData.errorMessages.push('- The task description is very short\n')
        : ''

      // Max length = 100
      validation.theLengthIsGreater(description, 100) === true
        ? jsonData.errorMessages.push('- The task description is very long\n')
        : ''
    }

    if (
      validation.theLengthIsLess(description, 2) === false
      && validation.theLengthIsGreater(description, 100) === false
      && whitespaceCheckResponse === false
    ) {
      isValid.description = true
      jsonData.description = description
    }
  }

  // Check validation values
  const validationResult = Object.values(isValid)
  let ok = true

  ok = validationResult.includes(true)

  // Update task
  if (ok === true) {
    req.getConnection((error, connection) => {
      connection.query(
        'UPDATE tasks set ? WHERE id = ?',
        [body, id],
        (error, task) => {
          if (error) res.json(error)

          console.log(task)
        })
    })
  }

  res.send(jsonData)
}

// Update status
tasks.updateTaskStatus = (req, res) => {
  const { id, status } = req.params
  
  const newStatus = Number(status) === 1 ? 0 : 1

  // Update status
  req.getConnection((error, connection) => {
    // Query and set status
    connection.query(
      `UPDATE tasks SET status = ${newStatus} WHERE id = ${id};`,
      (error, task) => {
        if (error) res.json(error)

        console.log(newStatus, id)

        console.log(task)
        res.redirect('../../../tasks/read')
      })
  })
}

module.exports = tasks
