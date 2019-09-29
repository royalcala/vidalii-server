// const formatType = require('./shared/graphql.formatType'),
const initModels = ({ pathSchemas }) => {
    const { mergeSchemasFiles, updateDoc, validatorDoc } = require('./schemas')
    const models = require('./models')({
        crudPlugins: {
            updateDoc,
            validatorDoc,
        }
    })
    models.loadManySchemas({
        oSchemas: mergeSchemasFiles(pathSchemas)
    })
    return models
}
const initTransactions = ({ models }) => {
    const { queue, rollback } = require('./shared/model.transactions')
    rollback({ models: models.models() })
    //init store transactions()
    return queue()
}
const initVidaliiGraph = ({ models, transactions }) => {
    const vidaliiGraph = require('./graphql')({
        transactions
    })

    vidaliiGraph.load({
        schemas: models.schemas(),
        models: models.models()
    })
    return vidaliiGraph
}

module.exports = ({ pathSchemas }) => {
    var models = initModels({ pathSchemas })
    var transactions = initTransactions({ models })
    var vidaliiGraph = initVidaliiGraph({ models, transactions })

    return {
        graphql: vidaliiGraph.buildGraphql(),
        models: models.models(),
        schemas: models.schemas()
    }
}