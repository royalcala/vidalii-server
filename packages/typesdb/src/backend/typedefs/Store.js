const { gql } = require('apollo-server-fastify')

const Store = () => {
    let store = ''

    return {
        add: templetaString => {
            store = store.concat(templetaString)
            return 'store added'
        },
        getStore: () => store,
        getGql: () => gql(store)
    }
}

export default Store()