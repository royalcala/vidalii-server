import scalars from './scalars'
import { sdl, resolver } from './composition'
import getGraphqlFromSchema from "./getGraphqlFromSchema";
import { initStore } from './structureStore'



export default () => {
    const customStore = initStore()

    const addCustom = {
        sdl: {
            type: sdl.type({ storeTypes: customStore.sdl.types }),
            query: sdl.query({ storeQuery: customStore.sdl.queries }),
            mutation: sdl.mutation({ storeMutation: customStore.sdl.mutations })
        },
        resolver: {

        }
    }



    return {
        addCustom,
        get: () => customStore,
        getGraphqlFromSchema,
        mergeStores: (...stores) => {

        },
        getServices: ({ store }) => {

        }
    }
}