import { serviveGraphql, query } from './GraphqlServices'
const fastify = require('fastify')
const start = async ({ port = 4000 } = {}) => {
    try {
        // let response = await query(`{hellow}`)
        // console.log('response::', response)
        const webServer = fastify()
        webServer.register(serviveGraphql.createHandler());
        webServer.register(require('fastify-cors'), {
            // put your options here
        })
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
        console.log('El Error::', error)
        // process.exit(1)
    }
}


export default start


