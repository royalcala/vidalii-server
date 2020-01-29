


// const add = schema => {

// }

// const refTypes = () => {
//     const store = {}

//     return {
//         add: schema => {

//             // search ref for get type 
//         }
//     }
// }
// const addToStore = ({ store, name, data }) => {
//     if (!store[name])
//         store[name] = {}

//     store[name] = {
//         ...store[name],
//         ...data
//     }
//     // if (store[schema.name])
//     //     throw new Error(`schema name duplicated ${schema.name}`)
//     // store[schema.name] = schema
// }
// const addFieldsExtended = ({ store, extend }) => {
//     if (Array.isArray(extend)) {

//     } else {



//     }
// }

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
                    throw new Error(`schema name duplicated ${schema.name} was replaced`)
                store[schema.name] = schema
                // addToStore({
                //     store,
                //     name: schema.name,
                //     data: schema
                // })

                // if (schema.extend)
                //     addFieldsExtended({
                //         store,
                //         extend: schema.extend
                //     })



                //     extendSchema({
                //         store,
                //         schema
                //     })
                // let nameSchema = schema.extend ?
                //     `${schema.extend.name}_${schema.name}` : schema.name





                return {
                    error: null,
                    index: schema.name,
                    schema: store[schema.name],
                }


            } catch (error) {
                return {
                    error
                }
            }

        }
    }
}