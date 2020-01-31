const { gql } = require('apollo-server-fastify')
const Store = () => {
    let store = ''

    return {
        add: graphqlFile => {
            store = store.concat(graphqlFile)
            return 'store added'
        },
        get: (format = 'gql') => {
            switch (format) {
                case 'gql':
                    return gql(store)
                    break;
                case 'sdl':
                default:
                    return store
                    break;
            }
        }
    }
}
const instance = Store()
const fs = require('fs');
// require("glob").sync('src/typeDefs/*(Connection|Schema|Field).graphql')
// require("glob").sync(__dirname + 'src/typeDefs/*.mutation.*')
require("glob").sync('src/typeDefs/*.graphql')
    .forEach(Path => {
        instance.add(
            fs.readFileSync(Path, 'utf8').toString()
        )
    });
require("glob").sync('src/directives/*.js')
    .forEach(path => {
        // console.log(path)
        // console.log(require('../../' + path))
        // let directive = require('../../' + path).sdl
        instance.add(
            require('../../' + path).sdl
            + `\n`)
    })

export default instance