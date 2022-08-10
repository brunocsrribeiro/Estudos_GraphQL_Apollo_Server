const { usersDB } = require('../../data/Database')

module.exports = {
  users() { return usersDB },

  user(_, { id }) {
    return usersDB
      .find((user) => user.id == id)
  }
}
