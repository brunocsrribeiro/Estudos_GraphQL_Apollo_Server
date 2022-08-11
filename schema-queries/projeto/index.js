const { ApolloServer, gql } = require('apollo-server')
const { importSchema } = require('graphql-import')
const resolvers = require('./resolvers')


// const typeDefs = gql`
//   type Profile {
//     id: ID!
//     name: String!
//   }

//   enum StatusUser {
//     ACTIVE
//     INACTIVE
//     BLOCKED
//   }

//   type User {
//     id: ID!
//     name: String!
//     email: String!
//     age: Int
//     salary: Float
//     vip: Boolean
//     profile: Profile
//     status: StatusUser
//   }

//   # Pontos de entrada das APIs
//   type Query {
//     users: [User]
//     user(id: ID): User
//     profiles: [Profile]
//     profile(id: ID): Profile
//   }
// `

const server = new ApolloServer({
  typeDefs: importSchema('./schema/index.graphql'),
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`Running on ${ url }`);
})
