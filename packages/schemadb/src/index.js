import addSchema from './schema'


export default defSchema => db => {
    const schema = addSchema(defSchema)

    return {
        // ...db,
        composition: {
            ...db.composition,
            schemadb: true
        },
        insertOne: async (key, value) => {
            let validation = await schema.validateInsert(value)

            return validation
            // if (validation.error)
            //     return {
            //         error: {
            //             msg: validation.error
            //         }
            //     }
            // else
            //     db.insertOne(key, response)

        },
        updateOne: (key, value) => {

        },
        replaceOne: (key, value) => {

        },
        put: ({ _id = null, _rev = null, ...value }, options = {}) => {
            //validate

            return db.put(key, value, options)
        },
        schema: () => schema.schema
    }
}