//the imports require babel package module-resolver  and alias of "@vidalii": "@vidalii/framework/src/"
//server 
import services from '@vidalii/server'
//graphql
import contextJwt from '@vidalii/graphql/context/jwt'
import { scalars, directives } from "@vidalii";
//orm
import ormConfig from "./orm/config.json";

startServices()
async function startServices() {
    await services({
        ormConfig,        
        port: process.env.SERVER_PORT,
        gqlConfig: {
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
        }
    })
}