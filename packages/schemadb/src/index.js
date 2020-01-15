import initDB from './initDB'
import initMutation from './mutation'
import oGqlToSdl from './oGql_to_sdl'
import init_oGql_db from './oGqls/db'
import scalars from './gql_scalars'
const { ApolloServer, gql } = require('apollo-server-fastify');
const webServer = require('fastify')()

//name is an alias for used in graphql not for the name of the database
export default async ({ name, schema, customPipes = {}, db }) => {
    await initDB({ schema, db })
    const mutation = initMutation(schema, db, customPipes)

    return {
        mutation,
        query: '',
        startServer: async ({ port = 3000 } = {}) => {
            const oGql_db = init_oGql_db({ name, schema, db, mutation })
            //the oGqlToSdl mutate the oGql and modifies some props            
            const { sdl, resolvers } = oGqlToSdl({ oGql: oGql_db })
            // console.log('sdl::', sdl)
            const typeDefs = gql`
            ${scalars.sdl}
            ${sdl.types}
            type Query{
                ${sdl.queries}
            }
            type Mutation{
                ${sdl.mutations}
            }
            `
            const joinResolvers = {
                ...scalars.resolvers,
                ...resolvers.types,
                Query: {
                    ...resolvers.queries
                },
                Mutation: {
                    ...resolvers.mutations
                }
            }
            const server = new ApolloServer({
                typeDefs,
                resolvers: joinResolvers,
            });
            try {
                webServer.register(server.createHandler());
                await webServer.listen(port)
                // webServer.log.info(`server listening on ${webServer.server.address().port}`)
                console.log(`server listening on ${webServer.server.address().port}`)
            } catch (err) {
                webServer.log.error(err)
                process.exit(1)
            }
        },
        schema: () => schema
    }
}