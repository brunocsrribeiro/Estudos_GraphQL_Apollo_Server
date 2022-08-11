const { profiles } = require('../data/Database')

module.exports = {
  salary(parent) {
    const { real_salary } = parent
    return real_salary
  },

  profile(parent) {
    const sels = profiles
      .filter(profile => profile.id === parent.profile_id)
    return sels ? sels[0] : null
  }
}
