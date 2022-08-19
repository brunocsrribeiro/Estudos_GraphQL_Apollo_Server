const { ApolloServer } = require('apollo-server')
const { importSchema } = require('graphql-import')
require('dotenv/config')

const resolvers = require('./resolvers')
const context = require('./config/context')

const server = new ApolloServer({
  typeDefs: importSchema('./schema/index.graphql'),
  resolvers,
  context,
})

server.listen().then(({ url }) => {
  console.log(`Running on ${ url }`);
})
