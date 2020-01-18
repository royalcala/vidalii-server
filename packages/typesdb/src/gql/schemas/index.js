


const add = schema => {

}

// const refTypes = () => {
//     const store = {}

//     return {
//         add: schema => {

//             // search ref for get type 
//         }
//     }
// }
const extendSchema = () => {
    if (schema.extend) {

        if (Array.isArray(schema.extend)) {

        } else {
            const createIfNotExist = () => {
                if (!store[schema.extend.name])
                    store[schema.extend.name] = {}
                return store[schema.extend.name]
            }

            let schema = createIfNotExist()
            schema = {
                ...schema,

            }
        }
    }
}

export default () => {
    const store = {}
    return {
        get: () => {
            //search by ref for complete 
            // for (nameSchema in store){
            //     nameSchemaconsole.log('::',)
            // }
            return store
        },
        add: schema => {
            try {
                if (store[schema.name])
                    throw new Error(`schema name duplicated ${schema.name}`)
                store[schema.name] = schema


                // let nameSchema = schema.extend ?
                //     `${schema.extend.name}_${schema.name}` : schema.name





                return {
                    error: null
                }


            } catch (error) {
                return {
                    error
                }
            }

        }
    }
}