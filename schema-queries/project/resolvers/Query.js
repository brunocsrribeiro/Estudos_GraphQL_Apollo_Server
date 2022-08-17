const { users, profiles } = require('../data/Database')

module.exports = {
  users() {
    return users
  },

  user(_, args) {
    const { id } = args
    return users
      .find((user) => user.id == id)
  },

  profiles() {
    return profiles
  },

  profile(_, args) {
    const { id } = args
    return profiles
      .find(profile => profile.id == id)
  }
}
