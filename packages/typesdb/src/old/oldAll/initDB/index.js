import initColumn from './initColumn'
import { SEPARATOR } from '../CONSTANTS'

const createTable = async ({ db, tableName, type }) => {
    let existTable = await db.schema.hasTable(tableName)
    if (!existTable) {
        let response
        if (type === 'root') {
            response = await db.schema.createTable(
                tableName,
                table => {
                    table.uuid('_id').primary().unique().notNullable()
                }
            )
            // console.log(`Table "${tableName}" created.`)
        } else if (type === 'extended') {
            response = await db.schema.createTable(
                tableName,
                table => {
                    table.uuid('_id').primary().unique().notNullable()
                    table.uuid('parent_id').index().notNullable()
                }
            )
            // console.log(`Extended table "${tableName}" created.`)
        }
    }
}

const iterateSchema = async ({ db, tableName, schema, type }) => {
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
            await iterateSchema({
                db,
                tableName: tableName + SEPARATOR + key,
                schema: schema[key],
                type: 'extended'
            })
        }
    }

}

export default async ({ schema, db }) => {
    let response = await iterateSchema({ db, tableName: 'root', schema, type: 'root' })
    return response
}
