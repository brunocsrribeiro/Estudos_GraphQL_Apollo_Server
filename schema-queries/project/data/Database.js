const users = [
  {
    id: 1,
    name: "Bruno Assis",
    email: "assis@bruno.com",
    age: 36,
    profile_id: 1,
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "Daniela Souza",
    email: "souza@daniela.com",
    age: 37,
    profile_id: 2,
    status: "INACTIVE",
  },
  {
    id: 3,
    name: "Maria Aparecida",
    email: "aparecida@maria.com",
    age: 54,
    profile_id: 2,
    status: "BLOCKED",
  }
]

const profiles = [
  { id: 1, name: "Comum" },
  { id: 2, name: "Administrador" }
]

module.exports = { users, profiles }
