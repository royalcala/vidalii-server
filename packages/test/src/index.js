require('dotenv').config()
//server
import startServer from '@vidalii/framework/src/server/fastify'
//graphql
import apolloService from "@vidalii/framework/src/graphql/service/apollo.fastify";
import contextJwt from '@vidalii/framework/src/graphql/context/jwt'
import JSON from "@vidalii/framework/src/graphql/scalars/JSON";
//orm
import startConnection from "@vidalii/framework/src/orm/service/startConnection";
import config from "./orm/config.json";

startServices()

async function startServices() {

    await startConnection(config)
    await startServer({
        port: 6001,
        plugins: [
            oneRoute,
            apolloService({
                scalars: [JSON],
                directives: ["src/gql/directives/*.js"],
                types: ["src/gql/types/*.js"],
                queries: ["src/gql/queries/*.js"],
                mutations: ["src/gql/mutations/*.js"],
                sdls: ["src/gql/sdl/*.graphql"],
                context: contextJwt
            })
        ]
    })
}
async function oneRoute(fastify, options) {
    fastify.get('/hello', async (request, reply) => {
        return { hello: 'world' }
    })
}