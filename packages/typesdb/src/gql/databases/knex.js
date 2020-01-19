import { getRefField } from '../schemas/fieldTypes'

const addPropertyToColumn = (pivot, key, value) => {
    if (value !== null) {
        if (value === true)
            return pivot[key]()
        if (Array.isArray(value))
            return pivot[key](...value)
    } else
        return pivot
}
const initPropertyColumn = ({ nameColumn, props, tableKnex, typeColumn }) => {
    if (props !== null)
        return Array.isArray(props) ?
            tableKnex[typeColumn](nameColumn, ...props) :
            tableKnex[typeColumn](nameColumn, props)
    else
        return tableKnex[typeColumn](nameColumn)
}
const initTypeFromRef = ({ ref, schemas, nameColumn, props, tableKnex, types }) => {    
    if (ref !== null) {
        return initPropertyColumn({
            nameColumn, props, tableKnex,
            typeColumn: getRefField({ schemas, ref }).types.knex
            // typeColumn: schemas[ref.schemaName].fields[ref.fieldName].types.knex
        })
    } else
        return initPropertyColumn({
            nameColumn, props, tableKnex,
            typeColumn: types.knex
        })
}
const createTable = ({ nameColumn, field, tableKnex, schemas }) => {
    let { props, primary, index, unique, notNullable, types, virtual, ref } = field
    // table.uuid('_id').primary().unique().notNullable()
    if (virtual === null) {
        let pivot = initTypeFromRef({ ref, schemas, nameColumn, props, tableKnex, types })


        pivot = ([
            ['primary', primary],
            ['index', index],
            ['unique', unique],
            ['notNullable', notNullable]
        ]).reduce(
            (acc, [key, value]) => {
                return addPropertyToColumn(pivot, key, value)
            },
            pivot)
    }
}
export default async ({ db, schema, schemas }) => {
    let existTable = await db.schema.hasTable(schema.name)
    let response
    if (!existTable) {
        response = await db.schema.createTable(
            schema.name,
            tableKnex => {
                let nameColumn
                let fields = schema.fields
                for (nameColumn in fields) {
                    createTable({
                        schemas,
                        nameColumn,
                        field: fields[nameColumn],
                        tableKnex
                    })
                }
            }
        )
    }

    //add Query:sdl
    //add resolver Query
    //can be extended
    //_deleted:true || false
    //_id default

    return response


}