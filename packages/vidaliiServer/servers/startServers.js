const R = require('ramda')
const express = require('express');
const PouchDB = require('pouchdb');
const { readFileSync } = require('fs')
const { ApolloServer } = require('apollo-server-express');
const models = require('./models')

const { sdl, resolvers } = models.printGraphql()
const GraphQLJSON = require('graphql-type-json')
// console.log(
//     'models.models()::',
    // models.models().users.find(),
    // 'models.schemas()',
    // models.schemas(),
    // ':::::::::::::smodels.printGraphql()::::::::::',
    // models.printGraphql()
// )
// var typeDefs = readFileSync(__dirname + '/autoTypeDefs.graphql', 'UTF-8')
// const typeDefs =`
// type Query{
//     hello:String
// }
// `
// var toJson = JSON.parse('{"selector": {"_id": {"$gte": null}}}')
// var toJson = JSON.parse("{ 'name':'John'}")
// console.log('query to object::', toJson)
// console.log('stringify::', JSON.stringify('{"selector": {"_id": {"$gte": null}}}'))

async function main() {
    var app = express();
    // const resolvers = {
    //     Query: {
    //         hello: () => 'Hello world!',
    //     },
    // };
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