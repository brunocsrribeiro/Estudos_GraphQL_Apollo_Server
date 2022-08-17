const db = require('../config/db')

const saveUser = async (name, email, password) => {
  let user = await db('users')
    .where({ email }).first()

  if (!user) {
    let [ id ] = await db.insert({ name, email, password })
      .into('users')
    
    user = await db('users')
      .where({ id }).first()
  } else {
    await db('users')
      .where({ id: user.id })
      .update({ name, email, password })
    
    user = { ...user, name, email, password }
  }

  return user
}

const saveProfile = async (name, label) => {
  let profile = await db('profiles')
  .where({ name }).first()

  if (!profile) {
    let [ id ] = await db.insert({ name, label })
      .into('profiles')

      profile = await db('profiles')
      .where({ id }).first()
  } else {
    await db('profiles')
      .where({ id: profile.id })
      .update({ name, label })
    
    profile = { ...profile, name, label }
  }

  return profile
}

const addProfile = async (user, ...profiles) => {
  const user_id = user.id
  await db('users_profiles')
    .where({ user_id })
    .delete()

  for(p of profiles) {
    const profile_id = p.id
    await db.insert({ profile_id, user_id })
      .into('users_profiles')
  }
}

const execute = async () => {
  const user = await saveUser('Bruno Ribeiro', 'bruno@empresa.com', '123456')
  const profileA = await saveProfile('admin', 'Administrator')
  // const profileB = await saveProfile('fd', 'Financial')

  console.log(user);
  console.log(profileA);
  // console.log(profileB);

  await addProfile(user, profileA)
}

execute()
  .catch(err => console.log(err))
  .finally(() => db.destroy())
