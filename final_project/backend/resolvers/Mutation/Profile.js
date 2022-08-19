const db = require('../../config/db')
const { profile: getProfile } = require('../Query/Profile')

module.exports = {
  async newProfile(_, { data }) {
    try {
      const [ id ] = await db.insert({ ...data })
        .into('profiles')

      return db.select()
        .from('profiles')
        .where({ id })
        .first()
    } catch (e) {
      throw new Error(e.sqlMessage)
    }
  },

  async removeProfile(_, { filter }) {
    try {
      const profile = await getProfile(_, { filter })
      if (profile) {
        const { id } = profile
        await db.delete()
          .from('users_profiles')
          .where({ profile_id: id })
        await db.delete()
          .from('profiles')
          .where({ id })
      }

      return profile
    } catch (e) {
      throw new Error(e.sqlMessage)
    }
  },

  async changeProfile(_, { filter, data }) {
    try {
      const profile = await getProfile(_, { filter })
      if (profile) {
        const { id } = profile
        await db.update({ ...data })
          .from('profiles')
          .where({ id })
      }

      return { ...profile, ...data }
    } catch (e) {
      throw new Error(e.sqlMessage)
    }
  }
}
