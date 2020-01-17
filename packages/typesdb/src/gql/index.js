
const addPropertyColumn = (pivot, key, value) => {
    if (value !== null) {
        if (value === true)
            return pivot[key]()
        if (Array.isArray(value))
            return pivot[key](...value)
    } else
        return pivot
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
            table => {
                let key
                let fields = schema.fields
                for (key in fields) {
                    let field = fields[key]
                    if (field.types.virtual === true) {
                        //add resolver.type
                    } else {
                        let { props, primary, index, unique, notNullable, types } = field
                        let { knex } = types
                        // table.uuid('_id').primary().unique().notNullable()
                        let pivot
                        if (props !== null)
                            pivot = Array.isArray(props) ?
                                table[knex](key, ...props) :
                                table[knex](key, props)
                        else
                            pivot = table[knex](key)

                        pivot = ([
                            ['primary', primary],
                            ['index', index],
                            ['unique', unique],
                            ['notNullable', notNullable]
                        ]).reduce(
                            (acc, array) => {
                                return addPropertyColumn(pivot, ...array)
                            },
                            pivot)
                    }
                }
            }
        )
    }

    //add sdl query
    //add resolver Query

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