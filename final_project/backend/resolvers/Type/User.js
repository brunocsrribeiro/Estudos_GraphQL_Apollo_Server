const db = require('../../config/db')

module.exports = {
  async profiles(user) {
    return db.select('*')
      .from('profiles')
      .join(
        'users_profiles',
        'profiles.id',
        'users_profiles.profile_id'
      )
      .where({ user_id: user.id })
  }
}
