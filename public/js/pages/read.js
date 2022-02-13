/* * * * * * * *
 *     Main    *
 * * * * * * * */
// import { get } from './../helpers/requests.js'

// DOM - Elements
const dom = document

// Timer
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
      gitHubLogo.setAttribute('src', './../images/github-logo.png')
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
 *     Read    *
 * * * * * * * */

// DOM - Elements

