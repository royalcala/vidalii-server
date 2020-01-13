// import integrateSchemaValidation from './schema'
// import { castingDB } from "./castingDB";
import initDB from './initDB'
import initMutation from './mutation'
import initServer from './server'

export default async ({ schema, customPipes = {}, db }) => {
    await initDB({ schema, db })
    const mutation = initMutation(schema, db, customPipes)
    // const server = initServer({ schema })
    return {
        mutation,
        query: '',
        // composition: {
        //     ...db.composition,
        //     schemadb: true
        // },
        // insertOne,
        // updateOne,
        // replaceOne: (key, value) => {

        // },
        schema: () => schema
    }
}