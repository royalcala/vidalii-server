require('dotenv').config()
//server
import startServer from '@vidalii/framework/src/server/fastify'
//graphql
import apolloService from "@vidalii/framework/src/graphql/service/apollo.fastify";
import contextJwt from '@vidalii/framework/src/graphql/context/jwt'
import JSON from "@vidalii/framework/src/graphql/scalars/JSON";
import { scalars } from "@vidalii/framework/src";
import { directives } from "@vidalii/framework/src";
// console.log('%cscalars:', 'color: #00a3cc', scalars());
//orm
import startConnection from "@vidalii/framework/src/orm/service/startConnection";
import config from "./orm/config.json";
startServices()

async function startServices() {
    await startConnection(config)
    await startServer({
        port: process.env.SERVER_PORT,
        plugins: [
            oneRoute,
            apolloService({
                // scalars: [JSON],
                scalars: [scalars()],
                // directives: ["src/gql/directives/*.js"],
                directives: ["src/gql/directives/*.js", directives()],
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