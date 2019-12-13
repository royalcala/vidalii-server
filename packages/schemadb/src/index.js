import addSchema from './schema'


export default defSchema => db => {
    const schema = addSchema(defSchema)
    return {
        // ...db,
        composition: {
            ...db.composition,
            schemadb: true
        },
        insertOne: () => {

        },
        updateOne: () => {

        },
        replaceOne: () => {

        },
        put: ({ _id = null, _rev = null, ...value }, options = {}) => {
            //validate

            return db.put(key, value, options)
        },
        schema: () => schema
    }
}