const R = require('ramda')
const uuidv4 = require('uuid/v4')

module.exports = function generateAutoID({ doc, schemaValidator }) {
    const ifSchemaDoesntHasID = [
        ({ schemaValidator }) => !R.has('_id', schemaValidator),
        ({ doc, schemaValidator }) => ({
            schemaValidator: {
                _id: ({ newValue }) => newValue,
                ...schemaValidator
            },
            doc
        })
    ]
    const ifDocDoesntHasID = [
        ({ doc }) => !R.has('_id', doc),
        ({ doc, schemaValidator }) => ({
            schemaValidator: {
                _id: ({ newValue }) => newValue,
                ...schemaValidator
            },
            doc: {
                _id: uuidv4(),
                ...doc
            }
        })
    ]
    var data = R.cond([
        ifDocDoesntHasID,
        ifSchemaDoesntHasID
    ])({ doc, schemaValidator })

    // console.log('DATAKEYS::', R.keys(data))
    // console.log('DATA::', data)
    // console.log('Doc::', doc)
    return { doc: data.doc, schema: data.schemaValidator }
}