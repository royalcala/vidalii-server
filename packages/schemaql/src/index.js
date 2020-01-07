// import integrateSchemaValidation from './schema'
import { castingDB } from "./castingDB";
import initDB from './initDB'
import put from './put'
export default async ({ modelName, schema, customPipes = {}, db }) => {
    // db = castingDB(db)
    let response = await initDB({ modelName, schema, db })    
    const { insertOne, updateOne } = put({ schema, db, customPipes })
    return {
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