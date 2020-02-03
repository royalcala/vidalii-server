// import dbs from '../../databases'
// import graphqlSchema from './graphqlSchema'
import storeSDL from './StoreSDL'
import storeResolvers from './StoreResolvers'
import storeDirectives from './StoreDirectives'
const { ApolloServer } = require('apollo-server-fastify')
const fastify = require('fastify')

const start = async ({ port = 4000 } = {}) => {
    try {
        // storeSDL.outPutFile('allgql/src/frontend','all.graphql')
        const webServer = fastify()
        console.log(storeSDL.get('sdl'))
        console.log('RESOLVERS::', storeResolvers.getStore())
        const { types, queries, mutations, directives } = storeResolvers.getStore()
        const server = new ApolloServer({
            typeDefs: storeSDL.get('gql'),
            ...storeResolvers.getStore('apollo')
        })

        webServer.register(server.createHandler());
        webServer.register(require('fastify-cors'), {
            // put your options here
        })
        await webServer.listen(port)
        // webServer.log.info(`server listening on ${webServer.server.address().port}`)
        console.log(`server listening on ${JSON.stringify(webServer.server.address())}`)
        // process.on('SIGINT', () => { console.log("Bye bye!"); process.exit(); });
        return {
            error: null,
            service: webServer.server.address()
        }
    } catch (error) {
        // webServer.log.error(err)
        console.log('El Error::', error)
        // process.exit(1)
    }


}


export default start


