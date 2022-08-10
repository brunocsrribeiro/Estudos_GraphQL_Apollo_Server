const { usersDB, profilesDB } = require('../../../data/Database')

const indexUser = (filter) => {
  if (!filter) return -1

  const { id, email } = filter

  if (id) {
    return usersDB
      .findIndex(user => user.id == id)
  } else if (email) {
    return usersDB
      .findIndex(user => user.email === email)
  }

  return -1
}

const indexProfile = (filter) => {
  if (!filter) return -1

  const { id } = filter

  if (id) {
    return profilesDB
      .findIndex(profile => profile.id == id)
  }

  return -1
}

module.exports = { indexUser, indexProfile }
