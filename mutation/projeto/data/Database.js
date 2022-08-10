let id = 1

const nextId = () => id++

const usersDB = [
  {
    id: nextId(),
    name: "Bruno Assis",
    email: "assis@bruno.com",
    age: 36,
    profile_id: 1,
    status: "ACTIVE",
  },
  {
    id: nextId(),
    name: "Daniela Souza",
    email: "souza@daniela.com",
    age: 37,
    profile_id: 2,
    status: "INACTIVE",
  },
  {
    id: nextId(),
    name: "Maria Aparecida",
    email: "aparecida@maria.com",
    age: 54,
    profile_id: 2,
    status: "BLOCKED",
  }
]

const profilesDB = [
  { id: 1, name: "User" },
  { id: 2, name: "Administrator" }
]

module.exports = {
  usersDB,
  profilesDB,
  nextId
}
