const { profilesDB } = require('../../data/Database')

module.exports = {
  profiles() { return profilesDB },

  profile(_, { id }) {
    return profilesDB
      .find(profile => profile.id == id)
  }
}