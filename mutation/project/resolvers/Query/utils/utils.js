const { profilesDB } = require('../../../data/Database')

module.exports = {
  profile(parent) {
    const sels = profilesDB
      .filter(profile => profile.id === parent.profile_id)
    return sels ? sels[0] : null
  }
}
