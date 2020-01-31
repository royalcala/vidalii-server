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
const directives = ({ alias, fx, store }) => store[alias] = fx
const Store = () => {
    const store = {
        types: {},
        queries: {},
        mutations: {},
        directives: {}
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
                    case 'directive':
                        directives({ store: store.directives, ...otherData })
                        break;
                    default:
                        throw new Error(`You have an Error on type:${type}`)
                }
            } catch (error) {
                console.log('error::', error)
            }
        },
        getStore: (format = 'apollo') => {
            switch (format) {
                case 'apollo':
                    return {
                        resolvers: {
                            ...store.types,
                            'Mutation': {
                                ...store.mutations
                            },
                            'Query': {
                                ...store.queries
                            }
                        },
                        schemaDirectives: {
                            ...store.directives
                        }
                    }
                    break;
                case 'byType':
                default:
                    return store
                    break;
            }
        },
    }
}
const instance = Store()

require("glob").sync('src/resolvers/mutations/*.js')
    .forEach(path => {
        // console.log('*****',path)
        // console.log(require('../../'+path))
        instance.add(require('../../' + path))
    })
require("glob").sync('src/resolvers/queries/*.js')
    .forEach(path => {
        instance.add(require('../../' + path))
    })
require("glob").sync('src/resolvers/types/*.js')
    .forEach(path => {
        instance.add(require('../../' + path))
    })
require("glob").sync('src/directives/*')
    .forEach(path => {
        instance.add(require('../../' + path))
    })
export default instance

