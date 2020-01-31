// import dbs from '../../databases'
// import graphqlSchema from './graphqlSchema'
import storeSDL from './StoreSDL'
import storeResolvers from './StoreResolvers'
import storeDirectives from './StoreDirectives'
const { ApolloServer } = require('apollo-server-fastify')
const fastify = require('fastify')
export default async ({ port = 4000 } = {}) => {

    try {
        const webServer = fastify()
        console.log(storeSDL.get('sdl'))
        console.log('RESOLVERS::', storeResolvers.getStore())
        const { types, queries, mutations, directives } = storeResolvers.getStore()
        const server = new ApolloServer({
            typeDefs: storeSDL.get('gql'),
            ...storeResolvers.getStore('apollo')
            // schemaDirectives: {
            //     upper: UpperCaseDirective,
            //     upperCase: UpperCaseDirective
            //   }
        })

        webServer.register(server.createHandler());
        webServer.register(require('fastify-cors'), {
            // put your options here
        })
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


}



