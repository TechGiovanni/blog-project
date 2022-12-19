// printing to the console.
// The logger has two functions, info for printing normal log messages,
// and error for all error messages.
// Extracting logging into its own module is a good idea in more ways than one.
// If we wanted to start writing logs to a file or send them to an external logging service
// like graylog or papertrail we would only have to make changes in one place.

const info = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log('Params', ...params)
  }
}

const error = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error('Params', ...params)
  }
}

module.exports = { info, error }
