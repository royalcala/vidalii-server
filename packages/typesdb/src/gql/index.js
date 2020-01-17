
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

const createTable = ({ nameColumn, field, tableKnex }) => {
    let { props, primary, index, unique, notNullable, types, virtual } = field
    // table.uuid('_id').primary().unique().notNullable()
    //remove if is virtual 
    if (virtual !== null) {
        let pivot = initPropertyColumn({
            nameColumn, props, tableKnex,
            typeColumn: types.knex
        })


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
const initSqlite = async ({ db, schema }) => {
    // console.log('is sqlite')
    // console.log('db::',db)
    // console.log('schema.name::', schema.name)
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

const initDatabase = ({ dbs, storeSchemas }) => {
    let promises = []
    let key
    for (key in storeSchemas) {
        let db = dbs[storeSchemas[key].db]
        console.log('schema::', key)
        if (db.type === 'sqlite')
            promises.push(initSqlite({
                db: db.lib,
                schema: storeSchemas[key]
            }))
    }
    return promises
}


export default ({ dbs }) => {
    const storeSchemas = {}
    return {
        getSchemas: () => storeSchemas,
        addSchema: schema => {
            try {
                if (storeSchemas.hasOwnProperty(schema.name))
                    throw new Error(`schema name duplicated ${schema.name}`)
                storeSchemas[schema.name] = schema

                return {
                    error: null
                }
            } catch (error) {
                return {
                    error
                }
            }

        },
        initDatabase: () => Promise.all(initDatabase({ dbs, storeSchemas }))

    }
}