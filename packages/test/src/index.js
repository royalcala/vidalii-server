import startServer from '@vidalii/framework/src/server/fastify'
// import apolloService from "@vidalii/framework/src/graphql/service/apollo.fastify";
// import vidalii from '../../framework/src';
// import test from '#src/test'
// test()


async function route(fastify, options) {
    fastify.get('/hello', async (request, reply) => {
        return { hello: 'world' }
    })
}
startServer({
    port: 6001,
    plugins: [
        route,
        // apolloService
    ]
})