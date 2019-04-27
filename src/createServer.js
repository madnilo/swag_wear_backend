const { GraphQLServer } = require('graphql-yoga')
const Mutation = require('./resolvers/Mutation') //used to expose graphql mutations
const Query = require('./resolvers/Query') //used to expose graphql queries
const db = require('./db') //database

//create graphql yoga server

function createServer() {
    return new GraphQLServer({
        typeDefs: 'src/schema.graphql',
        resolvers: {
            Mutation,
            Query,
        },
        resolverValidationOptions: {
            requireResolversForResolveType: false,
        },
        context: req => ({ ...req, db }),
    })
}

module.exports = createServer;