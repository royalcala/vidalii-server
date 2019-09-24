const R = require('ramda')
const express = require('express');
const PouchDB = require('pouchdb');
// const { readFileSync } = require('fs')
const { ApolloServer } = require('apollo-server-express');
const vidaliiDB = require('./models')
// const { sdl, types, queries, mutations } = vidaliiGraph.buildGraphql()

const GraphQLJSON = require('graphql-type-json')

// var clients = new PouchDB('http://localhost:5984/clients')

// async function get_data() {
//     // clients.get(('65795829aeaa3a09258bec23d2004ed')).then(x => {
//     //     console.log(x)
//     // }).catch(e => {
//     //     console.log(e)
//     // })
//     try {
//         let prevDoc = await clients.get('65795829aeaa3a09258bec23d2004e5d')
//         // db.put({_id: 'charlie', age: 21})
//         // console.log('prevDoc::',prevDoc)
//         let updateDoc = await clients.put({
//             "_id": "65795829aeaa3a09258bec23d2004e5d",
//             // "_rev": "2-b4442b00e6d21bb67d28894087e4eb8a",
//             _rev: prevDoc._rev,
//             "name": "IBM",
//             "address": "boulevard IBM"
//         })
//         console.log('updateDoc::', updateDoc)
//     } catch (error) {
//         console.log('error::', error)
//     }
// }
// get_data()


var sales = new PouchDB('http://localhost:4000/sales')

async function main() {
    var app = express();
    const server = new ApolloServer({
        context: ({ req }) => ({
            // authScope: getScope(req.headers.authorization)
            // models: vidaliiGraph.models()
            models: vidaliiDB.models
        }),
        typeDefs:
            // sdl +
            vidaliiDB.graphql.sdl +
            ' scalar JSON ',
        resolvers: {
            // ...types.resolvers,
            ...vidaliiDB.graphql.types.resolvers,
            Query: {
                // ...resolvers.Query,
                // ...resolvers.query,
                // ...queries.resolvers,
                ...vidaliiDB.graphql.queries.resolvers
            },
            Mutation: {
                // ...resolvers.mutation,
                // ...mutations.resolvers
                ...vidaliiDB.graphql.mutations.resolvers
            },
            JSON: GraphQLJSON
        }
    })

    server.applyMiddleware({ app })

    app.use(require('express-pouchdb')(PouchDB))

    await app.listen({ port: 4000 }, () =>
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    );
}


module.exports = main