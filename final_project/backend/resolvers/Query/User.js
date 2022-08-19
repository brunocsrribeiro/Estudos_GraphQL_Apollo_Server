const db = require('../../config/db')

module.exports = {
  users() {
    return db.select('*')
      .from('users')
  },

  async user(_, { filter }) {
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
