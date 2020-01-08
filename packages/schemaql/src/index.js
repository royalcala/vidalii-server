// import integrateSchemaValidation from './schema'
import { castingDB } from "./castingDB";
import initDB from './initDB'
import mutation from './mutation'
export default async ({ modelName, schema, customPipes = {}, db }) => {
    // db = castingDB(db)
    await initDB({ modelName, schema, db })

    // const { insertOne, updateOne } = put({ schema, db, customPipes })
    const { mutationOne } = mutation({ schema, db, customPipes })
    return {
        mutation: doc => {
            if (Array.isArray(doc)) {

            } else
                return mutationOne(doc)
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