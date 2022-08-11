const db = require('../config/db')

const newProfile = {
  name: 'user_' + Math.random(),
  label: 'User'
}

db('profiles')
  .insert(newProfile)
  .then(res => console.log(res))
  .catch(err => console.log(err.sqlMessage))
  .finally(() => db.destroy())


// db.insert(sudoProfile)
//   .into('profiles')
//   .then(res => console.log(res))
//   .catch(err => console.log(err.sqlMessage))
//   .finally(() => db.destroy())
