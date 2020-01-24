
import { sdl, resolvers } from './composition'
import getGraphqlFromSchema from "./getGraphqlFromSchema";
import { initStore, populateStore } from './structureStore'
import startService from './startService'
const main = () => {
    const customStore = initStore()
    const addCustom = populateStore({ sdl, resolvers, store: customStore })

    return {
        addCustom,
        get: () => customStore,
        getGraphqlFromSchema,
        startService
    }
}

export default main()