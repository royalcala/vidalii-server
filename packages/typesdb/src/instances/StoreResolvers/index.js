import { loadResolvers } from './loadInitials'
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
const scalar = ({ alias, fx, store }) => store[alias] = fx
const Store = () => {
    const store = {
        types: {},
        queries: {},
        mutations: {},
        directives: {},
        scalar: {}
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
                    case 'scalar':
                        scalar({ store: store.scalar, ...otherData })
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
                            ...store.scalar,
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
loadResolvers(instance, 'mutation', 'src/resolvers/mutations/*.js')
loadResolvers(instance, 'query', 'src/resolvers/queries/*.js')
loadResolvers(instance, 'scalar', 'src/scalars/*')
loadResolvers(instance, 'type', 'src/resolvers/types/*.js')
loadResolvers(instance, 'directive', 'src/directives/*')


export default instance

