import { initStore, populateStore } from './structureStore'
import { sdl, resolvers } from './composition'
import { relation } from "../schemas/types"
import schemas from '../schemas'
import * as crud from '../databases/crud'

const onField = ({ nameType, nameField, field, addToStore }) => {
    if (field.ref) {
        addToStore.sdl.type({
            nameType,
            nameField: `${nameField}(conditions:JSON)`,
            typeField: field.ref.relation === relation.one_to_many ?
                `[${field.ref.schemaName}]` :
                field.ref.schemaName
        })
        // const dataRefField = getRefField({ schemas: schemas.get(), ref: field.ref })

        addToStore.resolvers.type({
            nameType,
            nameField,
            resolver: async (parent, args) => {
                //if is selected only key, dont run query and return id
                const { conditions = {} } = args
                return crud.find({
                    connectionName: schemas.get()[field.ref.schemaName].connection,
                    schemaName: field.ref.schemaName,
                    conditions,
                })
            }
        })
    } else
        addToStore.sdl.type({
            nameType,
            nameField,
            typeField: field.types.graphql
        })
}


const onType = ({ nameType, type, addToStore }) => {
    let nameField
    for (nameField in type.fields) {
        onField({
            nameType,
            nameField,
            field: type.fields[nameField],
            addToStore
        })
    }

    //graphql query
    const nameQuery = `find_${nameType}`
    addToStore.sdl.query({
        nameQuery,
        args: '(conditions:JSON)',
        typeReturn: `[${nameType}]`
    })
    addToStore.resolvers.query({
        nameQuery,
        resolver: async (parent, args) => {
            const { conditions = {} } = args
            return crud.find({
                connectionName: type.connection,
                schemaName: nameType,
                conditions,
            })
        }
    })


    //graphql mutation
    const nameMutation = `insertOne_${nameType}`
    addToStore.sdl.mutation({
        nameMutation,
        args: '(data:JSON)',
        typeReturn: `[${nameType}]`
    })

    addToStore.resolvers.mutation({
        nameMutation,
        resolver: async (parent, args) => {
            const { data } = args
            return crud.insertOne({
                connectionName: type.connection,
                schemaName: nameType,
                doc: data,
            })
        }
    })


}
const onTypeExtend = ({ typeExtend, addToStore }) => {
    if (Array.isArray(typeExtend)) {
        extend.forEach(
            e => {

            }
        )
    } else {
        const { schema, key, field, relation, resolver } = typeExtend
        //if resolver is null --> use default query to database, query remote
    }
}

export default () => {
    const store = initStore()
    const addToStore = populateStore({ sdl, resolvers, store })

    let storeSchemas = schemas.get()
    let nameSchema
    for (nameSchema in storeSchemas) {
        onType({
            nameType: nameSchema,
            type: storeSchemas[nameSchema],
            addToStore
        })
        if (storeSchemas[nameSchema].extend)
            onTypeExtend({
                typeExtend: storeSchemas[nameSchema].extend,
                nameType: nameSchema,
                addToStore
            })
    }

    return store

}