// Validations for forms

const isEmpty = input => (!input || input.value === '' ? true : false)

const theLengthIsLess = (input, min) => input.value.length < min

const theLengthIsGreater = (input, max) => input.value.length > max

const containsWhitespaceAtTheBeginning = input => new RegExp(/^\s{1,}/).test(input.value)

const containstwoOrMoreWhiteSpaces = input => new RegExp(/\s{2,}/).test(input.value)

const containsWhitespaceAtTheEnd = input => new RegExp(/\s{1,}$/).test(input.value)

const thereIsAnErrorWithTheWhitespaces = checks => checks[0] || checks[1] || checks[2]

export {
  isEmpty,
  theLengthIsLess,
  theLengthIsGreater,
  containsWhitespaceAtTheBeginning,
  containstwoOrMoreWhiteSpaces,
  containsWhitespaceAtTheEnd,
  thereIsAnErrorWithTheWhitespaces
}
