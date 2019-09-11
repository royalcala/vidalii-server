const R = require('ramda')
const express = require('express');
const PouchDB = require('pouchdb');
const { readFileSync } = require('fs')
const { ApolloServer } = require('apollo-server-express');
const models = require('./models')

const { sdl, resolvers } = models.printGraphql()
console.log(
    'sdl',
    sdl
)
console.log(
    ' resolvers.query:',
    resolvers.query
)

const GraphQLJSON = require('graphql-type-json')

var _ = require('lodash');
const PouchDBFind = require('pouchdb-find')
PouchDB.plugin(PouchDBFind);
var clients = new PouchDB('http://localhost:5984/clients')
async function test() {
    try {
        var response = await clients.find({
            selector: {
                _id: {
                    // $gte: null
                    $in: [
                        '65795829aeaa3a09258bec23d2004e5d'
                    ]
                }
            }
        });
        console.log('responseKeys::', response)
        return response.docs
    } catch (err) {
        console.log(err);
    }
}
// test()
var sales = new PouchDB('http://localhost:4000/sales')



const DataLoader = require('dataloader')

const batchData = async (keys) => {
    // PouchDB.plugin(PouchDBFind)
    // console.log('keys::', keys)
    try {
        var response = await clients.find({
            selector: {
                _id: {
                    $in: keys
                    // $in: [
                    //     'dk',
                    //     'falcon',
                    //     'fox'
                    // ]
                }
            }
        });
        // console.log('responseKeys::', response.docs)
        // const gs = _.groupBy(response.docs, '_id')
        // console.log('gs', gs)
        // const dataFinal = keys.map(k => gs[k] || [])
        // console.log('dataFinal', dataFinal)
        // console.log('groupBy::', R.groupBy(x => x._id, response.docs))
        const grouped = R.groupBy(x => x._id, response.docs)
        return keys.map(k => grouped[k] || [])
    } catch (err) {
        console.log(err);
    }
}
var salesloader = new DataLoader(
    keys => batchData(keys),
    // { cacheKeyFn: key => key.toString() },
)


var extendQuery = `
extend type Query{
    dataloader:[Sales2]
}
type Sales2{
    _id:ID
    id_client:ID
    joinClients2:[Clients2]
    clientname:String
}
type Clients2{
    _id:ID
    name:String
    address:String
}
input sales{
    hola:String
}
`
console.log('SDL::', sdl)
async function main() {
    var app = express();
    const server = new ApolloServer({
        typeDefs: sdl +
            ' scalar JSON ' +
            extendQuery,
        resolvers: {
            Sales2: {
                joinClients2: async (parent, args, context, info) => {

                    // return [{
                    //     name:'testname'
                    // }]
                    return await salesloader.load(parent.id_client)
                }
            },
            Query: {
                // ...resolvers.Query,
                ...resolvers.query,
                dataloader: async (parent, args, context, info) => {

                    // return [{
                    //     clientname: 'Hellows'
                    // }]
                    PouchDB.plugin(PouchDBFind)

                    try {
                        var response = await sales.find({
                            selector: { _id: { $gte: null } }
                        })
                        return response.docs
                        // return {
                        //     ...response.docs,

                        // }
                    } catch (e) {

                    }

                }
            },
            Mutation: {
                ...resolvers.mutation,
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