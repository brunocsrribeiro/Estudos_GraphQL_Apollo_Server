const db = require('../../config/db')

module.exports = {
  profiles(_, args, context) {
    context && context.validateAdmin()

    return db.select('*')
      .from('profiles')
  },

  profile(_, { filter }, context) {
    context && context.validateAdmin()

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
