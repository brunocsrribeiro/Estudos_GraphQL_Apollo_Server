const { ApolloServer } = require('apollo-server')
const { importSchema } = require('graphql-import')
const resolvers = require('./resolvers')
require('dotenv/config')

const server = new ApolloServer({
  typeDefs: importSchema('./schema/index.graphql'),
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`Running on ${ url }`);
})
