const { ApolloServer, gql } = require('apollo-server')
const resolvers = require('./resolvers')

const typeDefs = gql`
  type Profile {
    id: ID!
    name: String!
  }

  enum StatusUser {
    ACTIVE
    INACTIVE
    BLOCKED
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    profile: Profile
    status: StatusUser
  }

  input InputUser {
    name: String
    email: String
    age: Int
  }

  input InputProfile {
    name: String
  }

  input FilterUser {
    id: ID
    email: String
  }

  input FilterProfile {
    id: ID
  }

  # Pontos de entrada das APIs
  type Query {
    users: [User]
    user(id: ID): User
    profiles: [Profile]
    profile(id: ID): Profile
  }

  type Mutation {
    # Mutations of User
    newUser(
      data: InputUser!
    ): User!

    removeUser(
      filter: FilterUser!
    ): User

    changeUser(
      filter: FilterUser!
      data: InputUser!
    ): User!

    # Mutations of Profile
    newProfile(
      data: InputProfile!
    ): Profile!

    removeProfile(
      filter: FilterProfile!
    ): Profile

    changeProfile(
      filter: FilterProfile!
      data: InputProfile!
    ): Profile!
  }
`

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`Running on ${ url }`);
})
