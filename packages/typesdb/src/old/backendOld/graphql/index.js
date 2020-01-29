
import { sdl, resolvers } from './composition'
import getGqlFromSchema from './getGqlFromSchema';
import { initStore, populateStore } from './structureStore'
import startService from './startService'
const main = () => {
    const customStore = initStore()
    const addCustom = populateStore({ sdl, resolvers, store: customStore })

    return {
        addCustom,
        get: () => customStore,
        getGqlFromSchema,
        startService
    }
}

export default main()