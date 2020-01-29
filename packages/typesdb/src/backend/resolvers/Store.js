const Store = () => {
    const types = {}
    const queries = {}
    const mutations = {}
    return {
        add: (typeResolver, nameResolver, fx) => {
            try {
                let store
                switch (typeResolver) {
                    case 'types':
                        store = types
                        break;
                    case 'types':
                        store = queries
                        break;
                    case 'types':
                        store = mutations
                        break;
                    default:
                        throw new Error(`You have an Error on typeResolver:${typeResolver}`)
                }
                if (!store[nameResolver])
                    store[nameResolver] = {}
                else
                    store[nameResolver] = { ...store[nameResolver], ...dataResolver }
            } catch (error) {
                console.log('error::', error)
            }
        }
    }
}
export default Store()
