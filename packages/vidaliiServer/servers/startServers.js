const R = require('ramda')
const express = require('express');
const PouchDB = require('pouchdb');
const { readFileSync } = require('fs')
const { ApolloServer } = require('apollo-server-express');
const models = require('./models')

const { sdl, resolvers } = models.printGraphql()
const GraphQLJSON = require('graphql-type-json')

async function main() {
    var app = express();
    const server = new ApolloServer({
        typeDefs: sdl + ' scalar JSON ',
        resolvers: {
            Query: {
                ...resolvers.Query
            },
            JSON: GraphQLJSON
        }
    })

    server.applyMiddleware({ app });

    app.use(require('express-pouchdb')(PouchDB));

    await app.listen({ port: 4000 }, () =>
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    );
}


module.exports = main