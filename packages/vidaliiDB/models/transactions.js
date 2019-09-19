const R = require('ramda')
const uuidv4 = require('uuid/v4')
const { string, ID, rev } = require('@vidalii/db/schemas/valuesTypes')
const models = ''
const schema = {
    dataChanges: 'array',
    status: 'enum',
    time: {
        created: 'dataTime(now)',
        startSaving: '',
        errorTime: ''
    }
}

module.exports = (type = 'pouchDB') => {
    const newId = uuidv4()
    var storeModels = []
    var storeModelsChanged = []
    return {
        load: (modelBeforeSave) => {
            storeModels.push(modelBeforeSave)
        },
        save: async () => {
            //go through each array
            try {
                storeModels.map(
                    (fx) => {
                        //1.-
                        let result = await fx.save()
                        //2.-Save changes in the document with the uuidv4 connected

                    }
                )
                // mark db transactions deleted
            } catch (error) {
                //3.- remove all the changes
            }

        }
    }
}


