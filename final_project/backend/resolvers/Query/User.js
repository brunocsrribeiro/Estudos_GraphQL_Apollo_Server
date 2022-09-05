const db = require('../../config/db')
const bcrypt = require('bcrypt-nodejs')
const { getLoggedInUser } = require('../Common/User')

module.exports = {
  async login(_, { data }) {
    const user = await db.select()
      .from('users')
      .where({ email: data.email })
      .first()

      if (!user) {
        throw new Error('Invalid username/password')
      }

      const theyAreTheSame = bcrypt
        .compareSync(data.password, user.password)

      if (!theyAreTheSame) {
        throw new Error('Invalid username/password')
      }

      return getLoggedInUser(user)
  },

  users(_, args, context) {
    context && context.validateAdmin()
    return db.select('*')
      .from('users')
  },

  async user(_, { filter }, context) {
    context && context.validateFilterUser(filter)

    if (!filter) return null
    const { id, email } = filter

    if (id) {
      return db.select()
        .from('users')
        .where({ id })
        .first()
    } else if (email) {
      return db.select()
        .from('users')
        .where({ email })
        .where({ email })
        .first()
    } else {
      return null
    }
  }
}
