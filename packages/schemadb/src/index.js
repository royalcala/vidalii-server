import initDB from './initDB'
import initMutation from './mutation'
import initServiceGraphql from './serviceGraphql'
const webServer = require('fastify')()

export default async ({ name, schema, customPipes = {}, db }) => {
    await initDB({ schema, db })
    const mutation = initMutation(schema, db, customPipes)


    return {
        mutation,
        query: '',
        startServer: async ({ port = 3000 } = {}) => {
            const server = await initServiceGraphql({ name, schema, db })

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
        // composition: {
        //     ...db.composition,
        //     schemadb: true
        // },
        // insertOne,
        // updateOne,
        // replaceOne: (key, value) => {

        // },
        schema: () => schema
    }
}