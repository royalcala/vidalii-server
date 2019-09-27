const { mergeSchemasFiles, updateDoc, validatorDoc } = require('./schemas')

// const formatType = require('./shared/graphql.formatType'),
const transactions = require('./shared/model.transactions')

module.exports = ({ pathSchemas }) => {
    const models = require('./models')({
        crudPlugins: {
            updateDoc,
            validatorDoc,
        }
    })
    models.loadManySchemas({
        oSchemas: mergeSchemasFiles(pathSchemas)
    })
    transactions.checkAndRestore({ models: models.models() })

    const vidaliiGraph = require('./graphql')({ shared: null })

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