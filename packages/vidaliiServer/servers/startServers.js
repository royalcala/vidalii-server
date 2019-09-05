const R = require('ramda')
const express = require('express');
const PouchDB = require('pouchdb');
const { readFileSync } = require('fs')
const { ApolloServer } = require('apollo-server-express');
var typeDefs = readFileSync(__dirname + '/autoTypeDefs.graphql', 'UTF-8')

async function main() {
    var app = express();
    const resolvers = {
        Query: {
            hello: () => 'Hello world!',
        },
    };
    const server = new ApolloServer({ typeDefs, resolvers });

    server.applyMiddleware({ app });

    app.use(require('express-pouchdb')(PouchDB));

    await app.listen({ port: 4000 }, () =>
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    );
    // var db = await new PouchDB('schemas');

    // await db.put({
    //     _id: 'dave@gmail.com',
    //     name: 'David',
    //     age: 69
    // });

}


module.exports = main