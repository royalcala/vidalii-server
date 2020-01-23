import { EntitySchema } from "typeorm";
export const C_TYPEORM = 'typeorm'

const getSchemaColumn = ({ nameColumn, field }) => {
    const { types, ...otherColumnOptions } = field
    if (otherColumnOptions.ref)
        console.log('is ref')
    return {
        name: nameColumn,
        type: types.typeorm,
        ...otherColumnOptions
    }
}

const buildSchemaEntitie = schema => {
    const { name, fields } = schema

    let columns = {}
    let nameField
    for (nameField in fields) {
        let field = fields[nameField]
        console.log('nameField::', nameField)
        console.log('field::', field)
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

const buildEntitiesOnStore = ({ store }) => {
    store.schemas.forEach(
        schema => {
            const entitie = buildSchemaEntitie(schema)
            console.log('entitie::', entitie)
            store.entities.push(new EntitySchema(entitie))
        }
    )
}


export default () => {
    const store = {
        schemas: [],
        entities: []
    }
    return {
        addEntitie: schema => {
            store.schemas.push(schema)
        },
        init: () => {
            buildEntitiesOnStore({ store })
            return {
                entitieManager: () => { },
                repository: () => { }
            }
        }
    }
}