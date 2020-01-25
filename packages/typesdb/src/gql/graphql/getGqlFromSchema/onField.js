import { relation } from "../../schemas/types"
import * as crud from '../../databases/crud'
export const onField = ({ nameType, nameField, field, addToStore }) => {
    if (field.ref) {
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
            resolver: async (parent, args) => {
                //if is selected only key, dont run query and return id
                const { filter = {} } = args
                return crud.find({
                    connectionName: schemas.get()[field.ref.schemaName].connection,
                    schemaName: field.ref.schemaName,
                    filter,
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