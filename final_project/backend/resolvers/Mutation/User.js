const db = require('../../config/db')
const { profile: getProfile } = require('../Query/Profile')
const { user: getUser } = require('../Query/User')

module.exports = {
  async newUser(_, { data }) {
    try {
      const profilesIds = []
      if (data.profiles) {
        for(let filter of data.profiles) {
          const profile = await getProfile(_, { filter })

          if (profile) profilesIds.push(profile.id)
        }
      }

      delete data.profiles

      const [ id ] = await db.insert({ ...data })
        .into('users')

      for(let profile_id of profilesIds) {
        await db.insert({
          profile_id,
          user_id: id
        }).into('users_profiles')
      }

      return db.select()
        .from('users')
        .where({ id })
        .first()
    } catch (e) {
      throw new Error(e.sqlMessage)
    }
  },

  async removeUser(_, { filter }) {
    try {
      const user = await getUser(_, { filter })
      if (user) {
        const { id } = user
        await db.delete()
          .from('users_profiles')
          .where({ user_id: id })
        await db.delete()
          .from('users')
          .where({ id })
      }

      return user
    } catch (e) {
      throw new Error(e.sqlMessage)
    }
  },

  async changeUser(_, { filter, data }) {
    try {
      const user = await getUser(_, { filter })
      if (user) {
        const { id } = user
        if (data.profiles) {
          await db.delete()
            .from('users_profiles')
            .where({ user_id: id })

          for(let filter of data.profiles) {
            const profile = await getProfile(_, { filter })

            if (profile) {
              await db.insert({ profile_id: profile.id, user_id: id })
                .into('users_profiles')
            }
          }
        }

        delete data.profiles

        await db.upadate({ ...data })
          .from('users')
          .where({ id })
        }

        return !user ? null : { ...user, ...data }
    } catch (e) {
      throw new Error(e.sqlMessage)
    }
  }
}
