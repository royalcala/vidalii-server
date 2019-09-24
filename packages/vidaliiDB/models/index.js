const R = require('ramda')
// const printGraphql = require('../graphql/printGraphql')
// const buildModel = require('./buildModel')
const selectTypeDB = require('./selectTypeDB')

function main({ crudPlugins }) {
    var storeModels = {}
    var storeSchemas = {}
    // var crudPlugins = {
    //     validatorDoc,
    //     updateDoc
    // }
    return {
        schemas: () => storeSchemas,
        models: () => storeModels,
        // loadSchema: ({ ...newModelData }) => {
        //     let { newModels, newSchemas } = buildModel({
        //         prevModels: storeModels,
        //         prevSchemas: storeSchemas,
        //         schemaTools
        //     })(newModelData)
        //     storeModels = newModels
        //     storeSchemas = newSchemas
        // },
        loadManySchemas: ({ oSchemas }) => {
            let models = R.pipe(
                R.toPairs,
                R.reduce(
                    (acc, [nameSchema, valueSchema]) =>
                        R.assoc(nameSchema, selectTypeDB({ nameSchema, valueSchema, crudPlugins }), acc),
                    storeModels
                )
            )(oSchemas)
            // console.log('modelsLoad:',models)
            storeModels = models
            storeSchemas = { ...storeSchemas, ...oSchemas }
            // Object.entries(oSchemas).map(
            //     ([nameSchema, { schema, database }]) => {
            //         let { newModels, newSchemas } = buildModel({
            //             prevModels: storeModels,
            //             prevSchemas: storeSchemas,
            //             schemaTools
            //         })({
            //             name: nameSchema,
            //             schemaValidator: schema,
            //             ...database
            //         })

            //         storeModels = newModels
            //         storeSchemas = newSchemas

            //     }
            // )
        }

    }
}

module.exports = main