const jwt = require('jwt-simple')
const { profiles: getProfiles } = require('../Type/User')
require('dotenv/config')

module.exports = {
  async getLoggedInUser(user) {
    const profiles = await getProfiles(user)
    const issuedAt = Math.floor(Date.now() / 1000)

    const payload = {
      id: user.id,
      name: user.name,
      email: user. email,
      profiles: profiles.map(profile => profile.name),
      iat: issuedAt,
      exp: issuedAt + (3 * 24 * 60 * 60)
    }

    const authSecret = process.env.APP_AUTH_SECRET

    return {
      ...payload,
      token: jwt.encode(payload, authSecret)
    }
  }
}
