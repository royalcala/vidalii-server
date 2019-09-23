const { mergeSchemasFiles, updateDoc, validatorDoc } = require('./schemas')
const models = require('./models')({
    updateDoc,
    validatorDoc
})
const vidaliiGraph = require('./graphql')()

module.exports = ({ pathSchemas }) => {
    models.loadManySchemas(
        mergeSchemasFiles(pathSchemas)
    )
    vidaliiGraph.load({
        schemas: models.schemas(),
        models: models.models()
    })
    return {
        graphql: vidaliiGraph.buildGraphql(),
        models: models.models(),
        schemas: models.schemas()
    }

}