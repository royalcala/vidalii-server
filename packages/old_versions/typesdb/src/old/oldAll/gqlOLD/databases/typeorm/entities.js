import schemas from '../../schemas'
import dbs from '../../databases'
import { getRefField } from '../../schemas/fieldTypes'
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
    let storeEntities = {}
    let nameSchema
    for (nameSchema in storeSchemas) {
        let nameDB = storeSchemas[nameSchema].db
        let typeDB = connections[nameDB]
        if (typeDB.orm === C_TYPEORM)
            storeEntities[nameSchema] =
                new EntitySchema(
                    getSchemaEntitie({
                        schema: storeSchemas[nameSchema]
                    })
                )
    }
    console.log('storeEntities::', storeEntities)
    return storeEntities
}

