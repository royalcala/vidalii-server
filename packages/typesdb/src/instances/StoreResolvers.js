
const types = ({ parent, alias, fx, store }) => {
    if (parent === null)
        throw new Error(`You have an Error on resolver.type:${alias}. Needs a parent Name`)
    if (!store[parent])
        store[parent] = {}
    store = {
        ...store,
        [parent]: {
            ...store[parent],
            [alias]: fx
        }
    }
    store = types
}
const queries = ({ alias, fx, store }) => store[alias] = fx
const mutations = ({ alias, fx, store }) => store[alias] = fx
const Store = () => {
    const store = {
        types: {},
        queries: {},
        mutations: {},
    }
    return {
        add: ({ type, parent = null, ...otherData }) => {
            try {
                switch (type) {
                    case 'type':
                        types({ parent, store: store.types, ...otherData })
                        break;
                    case 'query':
                        queries({ store: store.queries, ...otherData })
                        break;
                    case 'mutation':
                        mutations({ store: store.mutations, ...otherData })
                        break;
                    default:
                        throw new Error(`You have an Error on type:${type}`)
                }
            } catch (error) {
                console.log('error::', error)
            }
        },
        getStore: () => store
    }
}
const instance = Store()

require("glob").sync(__dirname + 'src/typeDefs/*.mutation.*')
    .forEach(path => {
        instance.add(require(path))
    })
require("glob").sync(__dirname + 'src/typeDefs/*.query.*')
    .forEach(path => {
        instance.add(require(path))
    })
require("glob").sync(__dirname + 'src/typeDefs/*.type.*')
    .forEach(path => {
        instance.add(require(path))
    })
export default instance

