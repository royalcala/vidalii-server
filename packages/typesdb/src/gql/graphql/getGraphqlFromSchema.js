import { initStore } from './structureStore'
import { sdl, resolver } from './composition'
import { getRefField } from "../schemas/fieldTypes"

export default ({ oSchemas, oDatabases }) => {
    const store = initStore()
    const addToStore = {
        sdl: {
            type: sdl.type({ storeTypes: store.sdl.types }),
            query: sdl.query({ storeQuery: store.sdl.queries }),
            mutation: sdl.mutation({ storeMutation: store.sdl.mutations })
        },
        resolver: {
            type: resolver.type({ storeTypes: store.resolvers.types })
        }
    }

    let schemas = oSchemas.get()
    let nameType
    for (nameType in schemas) {
        let nameField
        for (nameField in schemas[nameType].fields) {
            let field = schemas[nameType].fields[nameField]
            if (field.ref)
                addToStore.sdl.type({
                    nameType,
                    nameField,
                    typeField: getRefField({ schemas, ref: field.ref }).types.graphql
                })
            else
                addToStore.sdl.type({
                    nameType,
                    nameField,
                    typeField: field.types.graphql
                })
        }

        addToStore.sdl.query({
            nameQuery: nameType,
            args: '(conditions:JSON)',
            typeReturn: `[${nameType}]`
        })
        addToStore.sdl.mutation({
            nameMutation: `insert_${nameType}`,
            args: '(data:JSON)',
            typeReturn: `[${nameType}]`
        })
        //if has ref
        // addToStore.resolver.type({

        // })

    }

    return store


}