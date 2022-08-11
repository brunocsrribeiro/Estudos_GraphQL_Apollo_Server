const { profilesDB, nextId } = require('../../data/Database')
const { indexProfile } = require('./utils/utils')

module.exports = {
  newProfile(_, { data }) {
    const existingName = profilesDB
      .some(profile => profile.name === data.name)

      if (existingName) throw new Error('Profile already exists!')

      const newProfile = {
        id: nextId(),
        ...data
      }

      profilesDB.push(newProfile)

      return newProfile
  },

  removeProfile(_, { filter }) {
    const profile = indexProfile(filter)

    if (profile < 0) throw new Error('Non-existent profile!')

    const excluded = profilesDB
      .splice(profile, 1)

    return excluded ? excluded[0] : null
  },

  changeProfile(_, { filter, data }) {
    const profile = indexProfile(filter)

    if (profile < 0) throw new Error('Non-existent profile!')

    const updateProfile = {
      ...profilesDB[profile],
      ...data
    }

    profilesDB.splice(profile, 1, updateProfile)

    return updateProfile
  }
}