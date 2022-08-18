const db = require('../../config/db')
const { profile: getProfile } = require('../Query/Profile')
const { user: getUser } = require('../Query/User')

module.exports = {
  async newUser(_, { data }) {
    try {
      const profilesIds = []
      if (data.profiles) {
        for(filter of data.profiles) {
          const profile = await getProfile(_, { filter })

          if (profile) profilesIds.push(profile.id)
        }
      }

      delete data.profiles

      const [ id ] = await db.insert({ ...data })
        .into('users')

      for(profile_id of profilesIds) {
        await db.insert({
          profile_id,
          user_id: id
        }).into('users_profiles')
      }

      return db('users').where({ id }).first()
    } catch (e) {
      throw new Error(e.sqlMessage)
    }
  },

  async removeUser(_, { filter }) {
    try {
      const user = await getUser(_, { filter })
      if (user) {
        const { id } = user
        await db('users_profiles')
          .where({ user_id: id }).delete()
        await db('users')
          .where({ id }).delete()
      }

      return user
    } catch (e) {
      throw new Error(e.sqlMessage)
    }
  },

  async changeUser(_, { filter, data }) {

  }
}
