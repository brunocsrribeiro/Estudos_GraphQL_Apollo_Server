const db = require('../../config/db')

module.exports = {
  profiles() {
    return db.select('*')
      .from('profiles')
  },

  profile(_, { filter }) {
    if (!filter) return null
    const { id, name } = filter

    if (id) {
      return db.select()
        .from('profiles')
        .where({ id })
        .first()
    } else if (name) {
      return db.select()
        .from('profiles')
        .where({ name })
        .first()
    } else {
      return null
    }
  }
}
