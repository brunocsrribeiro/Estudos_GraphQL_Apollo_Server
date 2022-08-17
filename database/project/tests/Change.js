const db = require('../config/db')

const newUser = {
  name: 'Bruno Ribeiro',
  email: 'ribeiro@bruno.com',
  password: '123456'
}

const exercise = async () => {
  // count
  const { qtde } = await db('users')
    .count('* as qtde').first()

  if (qtde === 0) {
    await db('users').insert(newUser)
  }

  // consultar
  let { id } = await db('users')
    .select('id')
    .limit(1)
    .first()

    // alterar
    await db('users')
      .where({ id })
      .update({ name: 'Bruno Assis'})

    return db('users').where({ id })
}

exercise()
  .then(user => console.log(user))
  .finally(() => db.destroy())