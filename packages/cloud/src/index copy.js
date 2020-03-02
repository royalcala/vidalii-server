//the imports require babel package module-resolver  and alias of "vidalii": "@vidalii/framework/src/"
//server 
import startServer from '@vidalii/server/fastify'
//graphql
import apolloService from "@vidalii/graphql/service/apollo.fastify";
import contextJwt from '@vidalii/graphql/context/jwt'
import { scalars } from "@vidalii";
import { directives } from "@vidalii";
//orm
import startConnection from "@vidalii/orm/service/startConnection";
//localLibrary
import config from "./orm/config.json";

startServices()
async function startServices() {
    await startConnection(config)
    await startServer({
        port: process.env.SERVER_PORT,
        plugins: [
            apolloService({
                scalars: [scalars()],
                directives: [
                    directives(),
                    "src/gql/directives/*.js"
                ],
                // types: ["src/gql/types/*.js"],
                // queries: ["src/gql/queries/*.js"],
                // mutations: ["src/gql/mutations/*.js"],
                sdls: [
                    "src/gql/sdls/*.graphql",
                    "src/gql/sdls/*.js"
                ],
                context: contextJwt
            })
        ]
    })
}