import { initStore } from './structureStore'
import { sdl, resolver } from './composition'
import { relation } from "../schemas/fieldTypes"

const onField = ({ schemas, nameType, nameField, addToStore }) => {
    let field = schemas[nameType].fields[nameField]
    if (field.ref) {
        addToStore.sdl.type({
            nameType,
            nameField,
            typeField: field.ref.relation === relation.one_to_many ?
                `[${field.ref.schemaName}]` :
                field.ref.schemaName
        })
        addToStore.resolvers.type({
            nameType,
            nameField,
            resolver: () => ''
        })
    } else
        addToStore.sdl.type({
            nameType,
            nameField,
            typeField: field.types.graphql
        })
}
const onType = ({ schemas, nameType, addToStore }) => {
    let nameField
    for (nameField in schemas[nameType].fields) {
        onField({ schemas, nameType, nameField, addToStore })
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


}
const onTypeExtend = ({ schemas, nameSchema, addToStore }) => {
    let extend = schemas[nameSchema].extend
    if (Array.isArray(extend)) {
        extend.forEach(
            e => {

            }
        )
    } else {
        const { schema, key, field, relation, resolver } = extend
        //if resolver is null --> use default query to database, query remote
    }
}

export default ({ oSchemas, oDatabases }) => {
    const store = initStore()
    const addToStore = {
        sdl: {
            type: sdl.type({ storeTypes: store.sdl.types }),
            query: sdl.query({ storeQuery: store.sdl.queries }),
            mutation: sdl.mutation({ storeMutation: store.sdl.mutations })
        },
        resolvers: {
            type: resolver.type({ storeTypes: store.resolvers.types }),
            // query:resolver.query({})
        }
    }

    let schemas = oSchemas.get()
    let nameSchema
    for (nameSchema in schemas) {
        onType({ schemas, nameType: nameSchema, addToStore })
        if (schemas[nameSchema].extend)
            onTypeExtend({ schemas, nameSchema, addToStore })

    }

    return store


}