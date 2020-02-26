


//start({
//     plugins:[
//         [serviceGql.createHandler()],//graphql
//         [require('fastify-cors'),{}],

//     ]
// })


const start = async ({ plugins = [], port = 3000 } = {}) => {    
    try {
        const fastify = require('fastify')()
        for (let index = 0; index < plugins.length; index++) {
            if (Array.isArray(plugins[index]))
                fastify.register(...plugins[index])
            else
                fastify.register(plugins[index])
        }
        // fastify.register(serviceGql.createHandler());
        // fastify.register(require('fastify-cors'), {
        // })
        
        await fastify.listen(port)
        // fastify.log.info(`server listening on ${fastify.server.address().port}`)
        console.log(`server listening on ${JSON.stringify(fastify.server.address())}`)
        // process.on('SIGINT', () => { console.log("Bye bye!"); process.exit(); });
        return {
            error: null,
            service: fastify.server.address()
        }
    } catch (error) {
        // fastify.log.error(err)
        console.log('Error:', error)
        // process.exit(1)
    }
}

export default start


