const startServer = require('./startServers')
const R = require('ramda')
const modules = require('@vidalii/db/modules')

var v = modules({ pathToInputs: __dirname + '/inputs' })

console.log(
    'v.databases_models_shards::',
    v.databases_models_shards
)

async function insertOne() {
    console.log('before result::')
    let result1 = await v.databases_models.testing.local.insertOne({ newDoc: { branch: 'local' } })
    console.log('after result1::', result1)
    let result2 = await v.databases_models.testing.remote.insertOne({ newDoc: { branch: 'remote' } })
    console.log('after result2::', result2)
}
async function insertOne_withShards() {
    console.log('before result::')
    let result1 = await v.databases_models_shards.testing.insertOne({ newDoc: { branch: 'local' } })
    console.log('after result1::', result1)
    let result2 = await v.databases_models_shards.testing.insertOne({ newDoc: { branch: 'remote' } })
    console.log('after result2::', result2)
}
async function test() {

}
startServer().then(() => {

    // insertOne()

    // insertOne_withShards()
})




