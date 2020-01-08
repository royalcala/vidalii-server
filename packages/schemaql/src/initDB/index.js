import initColumn from './initColumn'

const createTable = async ({ db, tableName, type }) => {
    let existTable = await db.schema.hasTable(tableName)
    if (!existTable) {
        let response
        if (type === 'main') {
            response = await db.schema.createTable(
                tableName,
                table => {
                    table.uuid('_id').primary()
                }
            )
            console.log(`Table "${tableName}" created.`)
        } else if (type === 'extended') {
            response = await db.schema.createTable(
                tableName,
                table => {
                    table.uuid('_id').primary()
                    table.uuid('parent_id').index()
                }
            )
            console.log(`Extended table "${tableName}" created.`)
        }
    }
}

const initTable = async ({ db, tableName, schema, type }) => {
    await createTable({ db, tableName, type })
    let key
    for (key in schema) {
        if (schema[key].hasOwnProperty('vidaliiLeaf')) {
            await initColumn({
                db,
                tableName,
                vidaliiLeaf: schema[key],
                columnName: key
            })
        } else if (typeof schema[key] === 'object') {
            await initTable({
                db,
                tableName: key,
                schema: schema[key],
                type: 'extended'
            })
        }
    }

}

export default async ({ modelName, schema, db }) => {
    let response = await initTable({ db, tableName: modelName, schema, type: 'main' })
    return response
}
