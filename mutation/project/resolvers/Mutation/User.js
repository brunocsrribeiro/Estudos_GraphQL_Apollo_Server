const { usersDB, nextId } = require('../../data/Database')
const { indexUser } = require('./utils/utils')

module.exports = {
  newUser(_, { data }) {
    const existingEmail = usersDB
      .some(user => user.email === data.email)

    if (existingEmail) throw new Error('Email already exists!')

    const newUser = {
      id: nextId(),
      ...data,
      profile_id: 1,
      status: "ACTIVE"
    }

    usersDB.push(newUser)

    return newUser
  },

  removeUser(_, { filter }) {
    const user = indexUser(filter)

    if (user < 0) throw new Error('Non-existent user!')

    const excluded = usersDB
      .splice(user, 1)

    return excluded ? excluded[0] : null
  },

  changeUser(_, { filter, data }) {
    const user = indexUser(filter)

    if (user < 0) throw new Error('Non-existent user!')

    const updateUser = {
      ...usersDB[user],
      ...data
    }

    usersDB.splice(user, 1, updateUser)

    return updateUser
  }
}
