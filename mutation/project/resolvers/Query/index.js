const users = require('./User')
const profiles = require('./Profile')

module.exports = {
  ...users,
  ...profiles
}
