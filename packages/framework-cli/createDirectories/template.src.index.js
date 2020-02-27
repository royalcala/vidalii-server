module.exports=
`require('dotenv').config()
//server
import startServer from '@vidalii/framework/src/server/fastify'
//graphql
import apolloService from "@vidalii/framework/src/graphql/service/apollo.fastify";
import contextJwt from '@vidalii/framework/src/graphql/context/jwt'
import { scalars } from "@vidalii/framework/src";
import { directives } from "@vidalii/framework/src";
//orm
import startConnection from "@vidalii/framework/src/orm/service/startConnection";
import config from "./orm/config.json";

startServices()
async function startServices() {
    await startConnection(config)
    await startServer({
        port: process.env.SERVER_PORT,
        plugins: [
            apolloService({
                scalars: [scalars()],
                directives: [directives()],
                // types: ["src/gql/types/*.js"],
                // queries: ["src/gql/queries/*.js"],
                // mutations: ["src/gql/mutations/*.js"],
                sdls: ["src/gql/sdl/*.graphql"],
                context: contextJwt
            })
        ]
    })
}`