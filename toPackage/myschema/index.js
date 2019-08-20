const R = require('ramda')

const endPoint = ({ type, validator = null }) => ({ prevDoc = null, newDoc }) => {


}






const evolve = ({ schemaValidator, state, newData, setFS }) => {

    var result = newData instanceof Array ? [] : {};
    var transformation, key, type;

    //reset all the data
    //return initial
    //delete all the data

    for (key in schemaValidator) {
        //key its in newData?
        if (newData.hasOwnProperty(key)) { //eliminate elements that isnt in schemaValidator
            // console.log('key:', key)
            transformation = schemaValidator[key];

            type = typeof transformation;
            result[key] = type === 'function'
                ? transformation({ prev: state, next: newData[key], setState: setFS })
                // ? transformation.name === 'pipes' ? transformation({ prev: state, next: newData[key] }) : transformation(newData[key])
                : transformation && type === 'object'
                    // ? evolve(transformation, newData[key])
                    ? evolve({ schemaValidator: transformation, state, newData: newData[key], setFS })
                    : newData[key];
        }
    }
    return result
}




function myschema({ }) {
    var storageSchemas = {}
    var errorsValidation = []
    return {
        loadSchema: ({ name, schema }) => {
            storageSchemas = { ...storageSchemas, [name]: { ...schema } }
        },
        validateData: schemaName => ({ prevData = null, newData }) => {
            var newData = evolve({
                schemaValidator: storageSchemas[schemaName],
                prevData,
                newData
            })
        },
        getTypes: schemaName => {

            return 'schema with types'
        }
    }

}