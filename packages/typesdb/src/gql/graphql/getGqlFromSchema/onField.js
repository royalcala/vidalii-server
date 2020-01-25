import { relation } from "../../schemas/types"
import * as crud from '../../databases/crud'
import schemas from '../../schemas'
// ref({
//     schemaName: 'catalogue_materials',
//     fieldName: '_id',
//     relation: relation.one_to_one
// })
const onReferencedField = ({ nameType, nameField, field, addToStore }) => {
    addToStore.sdl.type({
        nameType,
        nameField: `${nameField}(filter:JSON)`,
        typeField: field.ref.relation === relation.one_to_many ?
            `[${field.ref.schemaName}]` :
            field.ref.schemaName
    })
    // const dataRefField = getRefField({ schemas: schemas.get(), ref: field.ref })

    addToStore.resolvers.type({
        nameType,
        nameField,
        resolver: async (parent, args = {}, context, info) => {
            console.log('parent::', parent)
            //send the parent ids 
            //if is selected only key, dont run query and return id
            
            let filter = {}
            filter[field.ref.fieldName] = {}
            if (args.filter)
                filter = {
                    ...filter,
                    ...args.filter
                }

            filter[field.ref.fieldName] = parent[nameField]
            
            return crud.find({
                connectionName: schemas.get()[field.ref.schemaName].connection,
                schemaName: field.ref.schemaName,
                filter,
            })
            // return {
            //     _id: '0',
            //     name: 'material Zero'
            // }
        }
    })
}

export const onField = ({ nameType, nameField, field, addToStore }) => {
    if (field.ref)
        onReferencedField({ nameType, nameField, field, addToStore })
    else
        addToStore.sdl.type({
            nameType,
            nameField,
            typeField: field.types.graphql
        })
}