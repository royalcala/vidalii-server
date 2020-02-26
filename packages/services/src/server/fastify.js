import serviceGql from './gql'
const fastify = require('fastify')


//start({
//     plugins:[
//         [serviceGql.createHandler()],//graphql
//         [require('fastify-cors'),{}],

//     ]
// })


const start = async ({ plugins = [], port = 3000 } = {}) => {
    try {
        const webServer = fastify()
        plugins.forEach(
            ([...pluginAndOptions]) => webServer.register(...pluginAndOptions)
        )
        // webServer.register(serviceGql.createHandler());
        // webServer.register(require('fastify-cors'), {
        // })
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
        console.log('Error:', error)
        // process.exit(1)
    }
}

export default start


