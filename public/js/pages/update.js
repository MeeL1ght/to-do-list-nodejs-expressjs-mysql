/* eslint-disable no-undef */

/* * * * * * * *
 *     Main    *
 * * * * * * * */

import {
  isEmpty,
  theLengthIsLess,
  theLengthIsGreater,
  containsWhitespaceAtTheBeginning,
  containstwoOrMoreWhiteSpaces,
  containsWhitespaceAtTheEnd,
  thereIsAnErrorWithTheWhitespaces
} from './../helpers/validations/form-validate.js'

import { put } from './../helpers/requests.js'

// DOM - Elements
const dom = document

// Timer
const SEVEN_HUNDRED_AND_TWENTY_FIVE_MILLISECONDS = 725
const SEVEN_HUNDRED_AND_FIFTY_MILLISECONDS = 750

// Spinner
const spinner = dom.querySelector('.spinner-body')

// All content
const content = dom.querySelector('#content')

// Navbar > dropdown toggle > dropdown item
const dropdownToggle = dom.querySelector('.dropdown-toggle')
const dropdownItem = dom.querySelectorAll('.dropdown-item')

// Navbar > dropdown item > positions
const firstPositionDropdownItem = dropdownItem[0]
const secondPositionDropdownItem = dropdownItem[1]
const thirdPositionDropdownItem = dropdownItem[2]
const fourthPositionDropdownItem = dropdownItem[3]

// (1) Navbar > dropdown item > create icon / create text
const createNavbarIcon = dom.querySelector('.create-navbar-icon')
const createNavbarText = dom.querySelector('.create-navbar-text')

// (2) Navbar > dropdown item > read icon / read text
const readNavbarIcon = dom.querySelector('.read-navbar-icon')
const readNavbarText = dom.querySelector('.read-navbar-text')

// (3) Navbar > dropdown item > update icon / update text
const updateNavbarIcon = dom.querySelector('.update-navbar-icon')
const updateNavbarText = dom.querySelector('.update-navbar-text')

// (4) Navbar > dropdown item > delete icon / delete text
const deleteNavbarIcon = dom.querySelector('.delete-navbar-icon')
const deleteNavbarText = dom.querySelector('.delete-navbar-text')

// Navbar logo / avatar
const gitHubAvatar = dom.querySelector('#github-avatar')
const gitHubLogo = dom.querySelector('#github-logo')
const gitHubProfileUrl = dom.querySelector('#profile-url')

// Footer
const footer = dom.querySelector('footer')
const footerAuthor = dom.querySelector('.footer-author')

// CURL
const GITHUB_REST_API_URL = 'https://api.github.com/users/MeeL1ght'

/* * * * * * * * * * * * * *
 *  Navbar - Interaction   *
 * * * * * * * * * * * * * */

dropdownToggle.addEventListener('click', e => e.preventDefault())

// (1) Hover effects > dropdown item > create icon / create text
firstPositionDropdownItem.addEventListener('mouseover', () => {
  createNavbarIcon.classList.add('create-navbar-icon-hover')
  createNavbarText.classList.add('create-navbar-text-hover')
})

firstPositionDropdownItem.addEventListener('mouseout', () => {
  createNavbarIcon.classList.remove('create-navbar-icon-hover')
  createNavbarText.classList.remove('create-navbar-text-hover')
})

// (2) Hover effects > dropdown item > read icon / read text
secondPositionDropdownItem.addEventListener('mouseover', () => {
  readNavbarIcon.classList.add('read-navbar-icon-hover')
  readNavbarText.classList.add('read-navbar-text-hover')
})

secondPositionDropdownItem.addEventListener('mouseout', () => {
  readNavbarIcon.classList.remove('read-navbar-icon-hover')
  readNavbarText.classList.remove('read-navbar-text-hover')
})

// (3) Hover effects > dropdown item > update icon / update text
thirdPositionDropdownItem.addEventListener('mouseover', () => {
  updateNavbarIcon.classList.add('update-navbar-icon-hover')
  updateNavbarText.classList.add('update-navbar-text-hover')
})

thirdPositionDropdownItem.addEventListener('mouseout', () => {
  updateNavbarIcon.classList.remove('update-navbar-icon-hover')
  updateNavbarText.classList.remove('update-navbar-text-hover')
})

// (4) Hover effects > dropdown item > delete icon / delete text
fourthPositionDropdownItem.addEventListener('mouseover', () => {
  deleteNavbarIcon.classList.add('delete-navbar-icon-hover')
  deleteNavbarText.classList.add('delete-navbar-text-hover')
})

fourthPositionDropdownItem.addEventListener('mouseout', () => {
  deleteNavbarIcon.classList.remove('delete-navbar-icon-hover')
  deleteNavbarText.classList.remove('delete-navbar-text-hover')
})

// Request

// Await 750 milliseconds
setTimeout(() => {
  // Search and get info
  fetch(GITHUB_REST_API_URL)
    .then(res => res.json())
    .then(res => {
      gitHubAvatar.setAttribute('src', res.avatar_url)
      gitHubAvatar.setAttribute('alt', res.login)
      gitHubAvatar.setAttribute('title', res.login)
      // const willThereBeAnUpdate = form.dataset.server

      gitHubLogo.setAttribute('src', './../../images/github-logo.png')
      gitHubLogo.setAttribute('alt', 'GitHub logo')
      gitHubLogo.setAttribute('title', res.login)
      gitHubProfileUrl.setAttribute('href', res.html_url)
      footerAuthor.innerHTML = res.login

      // Hide spinner
      spinner.style.display = 'none'

      // Show content and footer
      content.style.display = 'block'
      footer.style.display = 'block'

      // GitHub logo - Effects
      gitHubLogo.addEventListener('mouseover', () => {
        gitHubAvatar.style.cssText =
					'transition: 400ms; z-index: -1; box-shadow: 0 0px 2px 3px rgba(150, 153, 161, 0.6) !important;'
      })

      gitHubLogo.addEventListener('mouseout', () => {
        gitHubAvatar.style.cssText = 'transition: 400ms; z-index: -1;'
      })

      // GitHub avatar - Effects
      gitHubAvatar.addEventListener('mouseover', () => {
        gitHubLogo.style.cssText =
					'transition: 400ms; z-index: 1; box-shadow: 0  0px 3px 3px rgba(150, 153, 161, 0.6) !important;'
      })

      gitHubAvatar.addEventListener('mouseout', () => {
        gitHubLogo.style.cssText = 'transition: 400ms; z-index: 1;'
      })
    })
}, SEVEN_HUNDRED_AND_FIFTY_MILLISECONDS)

/* * * * * * * *
 *    Update   *
 * * * * * * * */

// DOM - Elements

// Form
const form = dom.querySelector('#update-task-form')
const taskNameInput = dom.querySelector('#task_name')
const taskDescriptionInput = dom.querySelector('#task_description')
const submitButton = dom.querySelector('.submit-button')

// Create a spinner for submit button
const spinnerButton = dom.createElement('span')

// Add attributes
spinnerButton.setAttribute('class', 'spinner-border spinner-border-sm ms-2')
spinnerButton.setAttribute('role', 'status')
spinnerButton.setAttribute('aria-hidden', 'true')

// Create a New PenIcon for submit button
const newPenIcon = dom.createElement('i')

// Add attributes
newPenIcon.setAttribute('class', 'fas fa-pen')

// Real-time input validation

// Name
taskNameInput.addEventListener('keyup', () => {
  const whitespaceCheckResponse = thereIsAnErrorWithTheWhitespaces(
    [
      containsWhitespaceAtTheBeginning(taskNameInput),
      containstwoOrMoreWhiteSpaces(taskNameInput),
      containsWhitespaceAtTheEnd(taskNameInput),
    ]
  )

  if (
    taskNameInput.value.length < 2
    || taskNameInput.value.length > 50
    || whitespaceCheckResponse === true
  ) {
    taskNameInput.classList.remove('default')
    taskNameInput.classList.add('error')
  } else if (
    taskNameInput.value.length >= 2
    && taskNameInput.value.length <= 50
    && whitespaceCheckResponse !== true
  ) {
    if (taskNameInput.classList.contains('default'))
      taskNameInput.classList.remove('default')
    else
      taskNameInput.classList.remove('error')
    
    taskNameInput.classList.add('correct')
  }
})

// Description
taskDescriptionInput.addEventListener('keyup', () => {
  const whitespaceCheckResponse = thereIsAnErrorWithTheWhitespaces(
    [
      containsWhitespaceAtTheBeginning(taskDescriptionInput),
      containstwoOrMoreWhiteSpaces(taskDescriptionInput),
      containsWhitespaceAtTheEnd(taskDescriptionInput),
    ]
  )

  if (
    taskDescriptionInput.value.length < 2
    || taskDescriptionInput.value.length > 100
    || whitespaceCheckResponse === true
  ) {
    taskDescriptionInput.classList.remove('default')
    taskDescriptionInput.classList.add('error')
  } else if (
    taskDescriptionInput.value.length >= 2
    && taskDescriptionInput.value.length <= 100
    && whitespaceCheckResponse !== true
  ) {
    if (taskDescriptionInput.classList.contains('default'))
      taskDescriptionInput.classList.remove('default')
    else
      taskDescriptionInput.classList.remove('error')
    
    taskDescriptionInput.classList.add('correct')
  }
})

// Submit event - Creating task
form.addEventListener('submit', e => {
  e.preventDefault()

  // Simple validation
  const errorMessages = []

  // Name
  if (isEmpty(taskNameInput))
    errorMessages.push('- The task name is empty\n')
  else {
    const whitespaceCheckResponse = thereIsAnErrorWithTheWhitespaces(
      [
        containsWhitespaceAtTheBeginning(taskNameInput),
        containstwoOrMoreWhiteSpaces(taskNameInput),
        containsWhitespaceAtTheEnd(taskNameInput),
      ]
    )

    if (whitespaceCheckResponse === true) {
      errorMessages.push(
        '- The task name cannot have whitespaces at the beginning '
        + 'or end and there cannot be two or more whitespaces\n'
      )
    } else {
      // Min length = 2
      if (theLengthIsLess(taskNameInput, 2))
        errorMessages.push('- The task name is very short\n')

      // Max length = 50
      if (theLengthIsGreater(taskNameInput, 50))
        errorMessages.push('- The task name is very long\n')
    }
  }

  // Description
  if (isEmpty(taskDescriptionInput))
    errorMessages.push('- The task description is empty\n')
  else {
    const whitespaceCheckResponse = thereIsAnErrorWithTheWhitespaces(
      [
        containsWhitespaceAtTheBeginning(taskDescriptionInput),
        containstwoOrMoreWhiteSpaces(taskDescriptionInput),
        containsWhitespaceAtTheEnd(taskDescriptionInput),
      ]
    )

    if (whitespaceCheckResponse === true) {
      errorMessages.push(
        '- The task description cannot have whitespaces at the beginning '
        + 'or end and there cannot be two or more whitespaces\n'
      )
    } else {
      // Min length = 2
      if (theLengthIsLess(taskDescriptionInput, 2))
        errorMessages.push('- The task description is very short\n')

      // Max length = 100
      if (theLengthIsGreater(taskDescriptionInput, 100))
        errorMessages.push('- The task description is very long\n')
    }
  }

  const whitespaceCheckFirstResponse = thereIsAnErrorWithTheWhitespaces(
    [
      containsWhitespaceAtTheBeginning(taskNameInput),
      containstwoOrMoreWhiteSpaces(taskNameInput),
      containsWhitespaceAtTheEnd(taskNameInput),
    ]
  )

  const whitespaceCheckSecondResponse = thereIsAnErrorWithTheWhitespaces(
    [
      containsWhitespaceAtTheBeginning(taskDescriptionInput),
      containstwoOrMoreWhiteSpaces(taskDescriptionInput),
      containsWhitespaceAtTheEnd(taskDescriptionInput),
    ]
  )

  // Check inputs
  if (
    !isEmpty(taskNameInput)
    && !isEmpty(taskDescriptionInput)
    && !theLengthIsLess(taskNameInput, 2)
    && !theLengthIsGreater(taskNameInput, 50)
    && !theLengthIsLess(taskDescriptionInput, 2)
    && !theLengthIsGreater(taskDescriptionInput, 100)
    && whitespaceCheckFirstResponse === false
    && whitespaceCheckSecondResponse === false
  ) {
    // Disable inputs
    taskNameInput.setAttribute('disabled', '')
    taskDescriptionInput.setAttribute('disabled', '')

    // Submit button effect
    submitButton.setAttribute('disabled', '')
    submitButton.classList.remove('submit-button')
    submitButton.classList.add('updated-style-button')
    submitButton.removeChild(submitButton.childNodes[0])
    submitButton.textContent = 'Updating Task'
    submitButton.appendChild(spinnerButton)
  
    // Data
    const body = JSON.stringify({
      name: taskNameInput.value,
      description: taskDescriptionInput.value,
    })

    const id = form.dataset.server

    // Await 725 milliseconds
    setTimeout(() => {
      // Request
      put(`./${id}`, body)
        .then(res => {
          if (res.errorMessages.length === 0) {
            taskNameInput.textContent = ''
            taskDescriptionInput.textContent = ''

            swal({
              title: 'Well done!',
              text: 'The task has been updated',
              icon: 'success',
              visible: true,
              button: {
                text: 'Ok',
              },
              timer: 3200,
              closeModal: true,
              closeOnEsc: false,
              closeOnClickOutside: false,
            })

            setTimeout(() => {
              window.location.href = 'http://localhost:3000/tasks/read'
            }, 1500)
          } else {
            swal({
              title: 'Oops!',
              text: `Could not update task.\nCheck for the following errors:\n
              ${res.errorMessages.join('\n')}`,
              icon: 'error',
              visible: true,
              button: {
                text: 'Ok',
              },
              closeModal: true,
              closeOnEsc: false,
              closeOnClickOutside: false,
            })
          }
        })

      // Submit Button
      submitButton.removeAttribute('disabled')
      submitButton.classList.remove('updated-style-button')
      submitButton.classList.add('submit-button')
      submitButton.removeChild(spinnerButton)
      submitButton.textContent = 'Update '
      submitButton.appendChild(newPenIcon)
    }, SEVEN_HUNDRED_AND_TWENTY_FIVE_MILLISECONDS)
    
    // Inputs

    // Name
    taskNameInput.removeAttribute('disabled')
    taskNameInput.classList.remove('correct')
    taskNameInput.classList.add('default')

    // Description
    taskDescriptionInput.removeAttribute('disabled')
    taskDescriptionInput.classList.remove('correct')
    taskDescriptionInput.classList.add('default')

    form.reset()
  } else {
    swal({
      title: 'Oops!',
      text: `Could not update task. Check for the following errors:\n
      ${errorMessages.join('\n')}`,
      icon: 'error',
      visible: true,
      button: {
        text: 'Ok',
      },
      closeModal: true,
      closeOnEsc: false,
      closeOnClickOutside: false,
    })
  }
})
