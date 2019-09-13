const R = require('ramda')
const { mergeSchemasFiles, updateDoc, validatorDoc } = require('@vidalii/db/schemas')
const vidaliiGraph = require('@vidalii/db/graphql')()

const models = require('@vidalii/db/models')({
    updateDoc,
    validatorDoc
})
models.loadManySchemas(
    mergeSchemasFiles(__dirname + '/schemasInstalled')
)

vidaliiGraph.load({
    schemas: models.schemas(),
    models: models.models()
})

const { sdl, resolvers } = vidaliiGraph.buildGraphql()
module.exports = {
    sdl,resolvers
}
