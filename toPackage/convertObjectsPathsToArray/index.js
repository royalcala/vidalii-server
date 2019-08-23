const R = require('ramda')

module.exports = main


function main({ paths, object }) {
    var arrayPaths = []

    // var pivotRoute = []
    // var parentRoute = null
    // // var arrayPaths = acumArrayPaths()
    // var arrayPaths = acumArrayPaths()
    return {
        object: objectIterator({ element: object }),
        // arrayPaths:arrayPaths.getRoutes
        arrayPaths
    }

    // function acumArrayPaths() {
    //     var storeRoutes = []
    //     return {
    //         addRoute: route => storeRoutes.push(route),
    //         getRoutes: storeRoutes
    //     }
    // }
    // function buildRoute() {
    //     var storeRoute = []
    //     return {
    //         addNode: (key) => storeRoute.push(key)
    //     }
    // }


    function objectIterator({ element, concatRoute = [] }) {
        // var historyRoute = []
        return Object.entries(element).reduce(
            (acc, [key, value]) => {
                // var route = buildRoute()
                // historyRoute.push(key)
                // pivotRoute.push(key)
                // pivotRoute.push(key)
                // const sourceArray = [1, 2, 3];
                const newConcatRoute = [...concatRoute, key]
                let data = R.cond([
                    // [({ transformation }) => R.is(Function, transformation), isFunction],
                    [({ value }) => R.is(Array, value), R.pipe(isArray, isObject)],
                    [({ value }) => R.is(Object, value), isObject],
                    [R.T, isValue] // the rest types
                ])({ key, value, idName, newConcatRoute })
                let result = R.assoc(key, data, acc)

                // arrayPaths.push(pivotRoute)
                // pivotRoute = []
                return result


            }, {})
    }
    function isValue({ key, value, newConcatRoute }) {
        // pivotRoute.push(...historyRoute)
        // pivotRoute.push(key)
        // arrayPaths.push(newConcatRoute)

        // pivotRoute = []
        return value
    }
    function isArray({ key, value, newConcatRoute }) {
        // pivotRoute.push(key)
        arrayPaths.push(newConcatRoute)
        return {
            idName,
            value: value.reduce(
                (acc, actual) => {
                    return {
                        ...acc,
                        [actual[idName]]: {
                            ...R.omit([idName], actual)
                        }
                    }

                }, null
            )
        }

    }
    function isObject({ key, value, newConcatRoute }) {
        // pivotRoute.push(key)

        return objectIterator({ element: value, idName, concatRoute: newConcatRoute })
    }

}




