const { mergeSchemasFiles, updateDoc, validatorDoc } = require('./schemas')
const shared = {
    formatType: require('./shared/graphql.formatType'),
    transactions: require('./shared/model.transactions')
}

module.exports = ({ pathSchemas }) => {
    const models = require('./models')({
        crudPlugins: {
            // formatType,
            transactions: shared.transactions,
            updateDoc,
            validatorDoc,
        }
    })
    models.loadManySchemas({
        oSchemas: mergeSchemasFiles(pathSchemas)
    })

    const vidaliiGraph = require('./graphql')({ shared })

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