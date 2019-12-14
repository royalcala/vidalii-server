// import integrateSchemaValidation from './schema'
import { castingDB } from "./castingDB";
import InsertOne from './insertOne'
// import UpdateOne from './updateOne'
export default (schema, customPipes = {}) => db => {
    db = castingDB(db)
    const insertOne = InsertOne(schema, db, customPipes)
    // const updateOne = UpdateOne({ schema, db })
    return {
        composition: {
            ...db.composition,
            schemadb: true
        },
        insertOne,
        // updateOne,
        replaceOne: (key, value) => {

        },
        put: ({ _id = null, _rev = null, ...value }, options = {}) => {
            //validate

            return db.put(key, value, options)
        },
        schema: () => schema
    }
}