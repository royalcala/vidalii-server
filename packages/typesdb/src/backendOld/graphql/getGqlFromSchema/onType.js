import { onField } from './onField'
import * as crud from '../../databases/crud'


const addQuery_find = ({ nameType, type, addToStore }) => {
    //graphql query
    const nameQuery = `find_${nameType}`
    addToStore.sdl.query({
        nameQuery,
        args: '(filter:JSON)',
        typeReturn: `[${nameType}]`
    })
    addToStore.resolvers.query({
        nameQuery,
        resolver: async (parent, args) => {
            const { filter = {} } = args
            return crud.find({
                connectionName: type.connection,
                schemaName: nameType,
                filter,
            })
        }
    })
}
const addMutation_insert = ({ nameType, type, addToStore }) => {
    //graphql mutation
    const nameMutation = `insert_${nameType}`
    addToStore.sdl.mutation({
        nameMutation,
        args: '(data:JSON)',
        typeReturn: `[${nameType}]`
    })

    addToStore.resolvers.mutation({
        nameMutation,
        resolver: async (parent, args) => {
            const { data } = args
            return crud.insert({
                connectionName: type.connection,
                schemaName: nameType,
                doc: data,
            })
        }
    })
}
const addMutation_update = ({ nameType, type, addToStore, primariesKeys = [] }) => {

}
export const onType = ({ nameType, type, addToStore }) => {
    let nameField
    for (nameField in type.fields) {
        //getPrimariesKeys for Update
        onField({
            nameType,
            nameField,
            field: type.fields[nameField],
            addToStore
        })
    }

    addQuery_find({ nameType, type, addToStore })

    addMutation_insert({ nameType, type, addToStore })





}