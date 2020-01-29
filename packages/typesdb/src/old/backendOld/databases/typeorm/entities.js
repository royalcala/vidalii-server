import schemas from '../../schemas'
import dbs from '../../databases'
import { getRefField } from '../../schemas/types'
import { EntitySchema } from "typeorm";
// export const C_TYPEORM = 'typeorm'
import { C_TYPEORM } from './index'

const getSchemaColumn = ({ nameColumn, field }) => {
    const { types, ...otherColumnOptions } = field
    if (otherColumnOptions.ref)
        types.typeorm = getRefField({
            schemas: schemas.get(),
            ref: otherColumnOptions.ref
        }).types.typeorm
    return {
        name: nameColumn,
        type: types.typeorm,
        ...otherColumnOptions
    }
}

const getSchemaEntitie = ({ schema }) => {
    const { name, fields } = schema

    let columns = {}
    let nameField
    for (nameField in fields) {
        let field = fields[nameField]
        // console.log('nameField::', nameField)
        // console.log('field::', field)
        if (!field.virtual)
            columns[nameField] = getSchemaColumn({
                nameColumn: nameField,
                field
            })

    }

    return {
        name,
        columns
    }

}

export const getEntities = () => {
    let storeSchemas = schemas.get()
    let connections = dbs.get().connections
    let storeEntities = {
        byConnection: {}
    }
    let nameSchema
    for (nameSchema in storeSchemas) {
        let namedb = storeSchemas[nameSchema].connection
        let connection = connections[namedb]
        if (connection.orm === C_TYPEORM) {
            if (!storeEntities.byConnection[namedb])
                storeEntities.byConnection[namedb] = []
            storeEntities.byConnection[namedb].push(
                new EntitySchema(
                    getSchemaEntitie({
                        schema: storeSchemas[nameSchema]
                    })
                )
            )


        }
    }
    return storeEntities
}

