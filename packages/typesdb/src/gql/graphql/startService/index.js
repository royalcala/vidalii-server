import dbs from '../../databases'
import graphqlSchema from './graphqlSchema'
const { ApolloServer } = require('apollo-server-fastify')
const webServer = require('fastify')()
export default async ({ port = 3000 } = {}) => {

    try {
        await dbs.init()
        const { typeDefs, resolvers } = graphqlSchema()
        const server = new ApolloServer({
            typeDefs,
            resolvers
        })

        webServer.register(server.createHandler());
        await webServer.listen(port)
        // webServer.log.info(`server listening on ${webServer.server.address().port}`)
        console.log(`server listening on ${JSON.stringify(webServer.server.address())}`)
        return {
            error: null,
            service: webServer.server.address()
        }
    } catch (error) {
        // webServer.log.error(err)
        console.log('error::', error)
        return {
            error
        }
        // process.exit(1)
    }
    //next work with merge
    //work with start apollo server
    //test find, insertOne, conditions in find

}
