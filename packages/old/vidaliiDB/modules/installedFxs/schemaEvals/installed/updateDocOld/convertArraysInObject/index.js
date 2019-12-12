const R = require('ramda')

module.exports = main


function main({ idName, object }) {
    var arrayPaths = []
    // var arrayPaths = acumArrayPaths()
    return {
        object: objectIterator({ element: object }),
        // arrayPaths:arrayPaths.getRoutes
        arrayPaths
    }


    function objectIterator({ element, concatRoute = [] }) {
        // var historyRoute = []
        return Object.entries(element).reduce(
            (acc, [key, value]) => {
                const newConcatRoute = [...concatRoute, key]
                let data = R.cond([
                    // [({ transformation }) => R.is(Function, transformation), isFunction],
                    [({ value }) => R.is(Array, value), isArray],
                    [({ value }) => R.is(Object, value), isObject],
                    [R.T, isValue] // the rest types
                ])({ key, value, idName, newConcatRoute })
                let result = R.assoc(key, data, acc)
                return result


            }, {})
    }
    function isValue({ key, value, newConcatRoute }) {
        return value
    }
    function isArray({ key, value, newConcatRoute }) {
        // pivotRoute.push(key)
        arrayPaths.push(newConcatRoute)
        // newConcatRoute = [...newConcatRoute, key]
        // console.log('newConcatRoute::',newConcatRoute)
        var toObjetID = value.reduce(
            (acc, actual) => {
                return {
                    ...acc,
                    [actual[idName]]: {
                        ...R.omit([idName], actual)
                    }
                }

            }, null
        )

        return objectIterator({ element: toObjetID, concatRoute: newConcatRoute })

    }
    function isObject({ key, value, newConcatRoute }) {
        // pivotRoute.push(key)

        return objectIterator({ element: value, concatRoute: newConcatRoute })
    }

}




