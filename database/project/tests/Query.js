const db = require('../config/db')

// db('profiles')
//   .then(res => res.map(p => p.name))
//   .then(names => console.log(names))
//   .catch(err => console.log(err.sqlMessage))
//   .finally(() => db.destroy())

// db('profiles')
//   .select('id', 'name')
//   .then(res => console.log(res))
//   .catch(err => console.log(err.sqlMessage))
//   .finally(() => db.destroy())

// db.select('id', 'name')
//   .from('profiles')
//   .then(res => res.map(p => p.name))
//   .then(names => console.log(names))
//   .catch(err => console.log(err.sqlMessage))
//   .finally(() => db.destroy())

// db('profiles')
//   .select('name', 'label')
//   // .where({ id: 1 })
//   // .where('id', '=', 1)
//   // .where('name', 'like', 'user%')
//   // .whereNot({ id: 2})
//   .whereIn('id', [2, 3, 4])
//   // .first()
//   .then(res => console.log(res))
//   .catch(err => console.log(err.sqlMessage))
//   .finally(() => db.destroy())

db.select('id', 'name', 'label')
  .from('profiles')
  // .where({ id: 6 })
  // .where('id', '=', 1)
  // .where('name', 'like', 'user%')
  // .whereNot({ id: 2})
  .whereIn('id', [2, 6, 7])
  // .first()
  .then(res => console.log(res))
  .catch(err => console.log(err.sqlMessage))
  .finally(() => db.destroy())
