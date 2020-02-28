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
            if (!parent[nameField])
                throw new Error(`Error:ResolverReferencedField:${nameField} needed`);
            // let filter = {}
            // filter[field.ref.fieldName] = {}
            const { filter = {} } = args
            //order id of parent first on top for faster sql and indexing
            if (filter.where)
                if (Array.isArray(filter.where))
                    filter.where = (filter.where).map(obj => {
                        let newObj = {
                            [field.ref.fieldName]: {},
                            ...obj
                        }
                        newObj[field.ref.fieldName] = parent[nameField]
                        return newObj
                    })
                else {
                    let newObj = {
                        [field.ref.fieldName]: {},
                        ...filter.where
                    }
                    newObj[field.ref.fieldName] = parent[nameField]
                    filter.where = newObj
                }
            else
                filter['where'] = {
                    [field.ref.fieldName]: parent[nameField]
                }


            let response = await crud.find({
                connectionName: schemas.get()[field.ref.schemaName].connection,
                schemaName: field.ref.schemaName,
                filter,
            })
            if (field.ref.relation === relation.one_to_one)
                response = response[0]
            return response
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