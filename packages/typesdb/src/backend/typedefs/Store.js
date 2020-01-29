const { gql } = require('apollo-server-fastify')

const Store = () => {
    let store = ''

    return {
        add: graphqlFile => {
            store = store.concat(graphqlFile)
            return 'store added'
        },
        getStore: () => store,
        getGql: () => gql(store)
    }
}

export default Store()