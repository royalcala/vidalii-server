import startServer from '@vidalii/framework/src/server/fastify'
import apolloService from "@vidalii/framework/src/graphql/service/apollo.fastify";
import JSON from "@vidalii/framework/src/graphql/scalars/JSON";
async function route(fastify, options) {
    fastify.get('/hello', async (request, reply) => {
        return { hello: 'world' }
    })
}

startServer({
    port: 6001,
    plugins: [
        route,
        apolloService({
            scalars: [JSON],
            directives: ["src/gql/directives/*.js"],
            types: ["src/gql/types/*.js"],
            queries: ["src/gql/queries/*.js"],
            mutations: ["src/gql/mutations/*.js"],
            sdls: ["src/gql/sdl/*.graphql"]
        })
    ]
})