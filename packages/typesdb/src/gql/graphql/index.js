import scalars from './scalars'
import { sdl, resolver } from './adds'
import schemaToStore from "./schemaToStore";
import { initStore } from './structureStore'
const addQuery = () => {

}
const addMutation = () => {

}



export default ({ getSchemas }) => {
    const store = initStore()

    const custom = {
        sdl: {
            type: sdl.type({ storeTypes: store.types }),
            query: sdl.query({ storeQuery: store.queries }),
            mutation: sdl.mutation({ storeMutation: store.mutations })
        },
        resolver: {

        }
    }



    return {
        custom,
        get: () => store,
        schemaToStore,
        mergeStores: (...stores) => {

        },
        getServices: ({ store }) => {

        }
    }
}