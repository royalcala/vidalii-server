import { initStore } from './structureStore'
// import initAddType from './addType'
import { sdl, resolver } from './adds'

export default ({ schemas }) => {
    const store = initStore()
    const add = {
        sdl: {
            type: sdl.type({ storeTypes: store.types }),
            query: sdl.query({ storeQuery: store.queries }),
            mutation: sdl.mutation({ storeMutation: store.mutations })
        },
        resolver: {
            type: resolver.type({ storeTypes: store.resolvers.types })
        }
    }

    let nameType
    for (nameType in schemas) {
        let nameField
        for (nameField in schemas[nameType].fields) {
            let field = schemas[nameType].fields[nameField]
            add.sdl.type({
                nameType,
                nameField,
                typeField: field.types.graphql
            })
        }
        add.sdl.query({
            nameQuery: nameType,
            args: '(conditions:JSON)',
            typeReturn: `[${nameType}]`
        })
        add.sdl.mutation({
            nameMutation: nameType,
            args: '(data:JSON)',
            typeReturn: `[${nameType}]`
        })
        //if has ref
        add.resolver.type({

        })

    }

    console.log('store::', store)


}