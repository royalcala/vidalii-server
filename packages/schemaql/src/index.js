// import integrateSchemaValidation from './schema'
// import { castingDB } from "./castingDB";
import initDB from './initDB'
import initMutation from './mutation'
export default async ({ schema, customPipes = {}, db }) => {
    await initDB({ schema, db })
    const mutation = initMutation(schema, db, customPipes)
    return {
        mutation: async doc => {
            let response = await mutation(doc)
            return response
        },
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