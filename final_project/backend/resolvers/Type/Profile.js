const db = require('../../config/db')

module.exports = {
  async users(profile) {
    return db.select('*')
      .from('users')
      .join(
        'users_profiles',
        'users.id',
        'users_profiles.user_id'
      )
      .where({ profile_id: profile.id })
  }
}
