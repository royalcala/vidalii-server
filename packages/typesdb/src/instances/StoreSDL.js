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
const instance = Store()
const fs = require('fs');
require("glob").sync('src/typeDefs/*.graphql')
    .forEach(Path => {        
        instance.add(
            fs.readFileSync(Path, 'utf8').toString()
        )
    });

export default instance