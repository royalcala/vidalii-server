
function objectIterator({ element, schemaValidator, prevDoc }) {
    // ({ key, value, schemaValidator, transformation, prevDoc, newDoc })
    return Object.entries(element).reduce(
        (acc, [key, value]) => {
            if (schemaValidator.hasOwnProperty(key)) {
                let transformation = schemaValidator[key]
                // let prevValue = prevDoc === null ? null : prevDoc.hasOwnProperty(key) ? prevDoc[key] : null
                console.log('key:', key, 'value:', value)
                let data = R.cond([
                    [({ transformation }) => R.is(Function, transformation), isFunction],
                    [({ transformation }) => R.is(Array, transformation), isArray],
                    [({ transformation }) => R.is(Object, transformation), isObject]
                ])({ key, value, schemaValidator, transformation, prevDoc, newDoc })
                let result = R.assoc(key, data, acc)
                // console.log('result1:', result)
                return result
            } else {
                return acc
            }

        }, {})
}

function isArray({ key, value, schemaValidator, transformation, prevDoc, newDoc }) {
    // console.log('transformation[0]::', transformation[0])

    schemaValidator = transformation[0]

    // return value.map(
    //     element => {
    //         return Object.entries(element).reduce(
    //             (acc, [key, value]) => {
    //                 if (schemaValidator.hasOwnProperty(key)) {
    //                     let transformation = schemaValidator[key]
    //                     // let prevValue = prevDoc === null ? null : prevDoc.hasOwnProperty(key) ? prevDoc[key] : null
    //                     console.log('key:', key, 'value:', value)
    //                     let data = R.cond([
    //                         [({ transformation }) => R.is(Function, transformation), isFunction],
    //                         [({ transformation }) => R.is(Array, transformation), isArray],
    //                         [({ transformation }) => R.is(Object, transformation), isObject]
    //                     ])({ key, value, schemaValidator, transformation, prevDoc, newDoc })
    //                     let result = R.assoc(key, data, acc)
    //                     // console.log('result1:', result)
    //                     return result
    //                 } else {
    //                     return acc
    //                 }

    //             }, {})
    //     }
    // )
    return value.map(
        element => {
            return objectIterator({ element, schemaValidator, prevDoc, newDoc })
        }
    )

}
function isObject({ key, value, schemaValidator, transformation, prevDoc, newDoc }) {
    // result[key] = evolve({
    //     schemaValidator: transformation,
    //     prevDoc: prevValue,
    //     newDoc: newValue
    // })
    schemaValidator = transformation//next object

    // return Object.entries(value).reduce(
    //     (acc, [key, value]) => {
    //         if (schemaValidator.hasOwnProperty(key)) {
    //             let transformation = schemaValidator[key]
    //             // let prevValue = prevDoc === null ? null : prevDoc.hasOwnProperty(key) ? prevDoc[key] : null
    //             // console.log('key1:', key, 'value:', value, 'isArray:', R.is(Array, transformation))
    //             // console.log('hola')
    //             let data = R.cond([
    //                 [({ transformation }) => R.is(Function, transformation), isFunction],
    //                 [({ transformation }) => R.is(Array, transformation), isArray],
    //                 [({ transformation }) => R.is(Object, transformation), isObject]
    //             ])({ key, value, schemaValidator, transformation, prevDoc, newDoc })
    //             let result = R.assoc(key, data, acc)
    //             // console.log('result1:', result)
    //             return result
    //         } else {
    //             return acc
    //         }

    //     }, {})
    return objectIterator({ element: value, schemaValidator, prevDoc, newDoc })
}

function isFunction({ transformation, value, prevDoc, newDoc }) {
    // transformation({ prevValue, newValue, prevDoc, newDoc })
    // let prevValue = prevDoc === null ? null : prevDoc.hasOwnProperty(key) ? prevDoc[key] : null
    // // console.log('prevValue:', prevValue)
    // let newValue = newDoc === null ? null : newDoc.hasOwnProperty(key) ? newDoc[key] : null

    let result = transformation({ newValue: value, prevDoc, newDoc })
    // console.log('fx result::', result)
    return result
}
// let conditionals = R.cond([
//     [({ value }) => R.is(Function, value), isFunction],
//     [({ value }) => R.is(Object, value), isObject]
// ])({ key, value, schemaValidator, prevDoc, newDoc })

// let recursiveFx = R.reduce(conditionals, 0, [1, 2, 3, 4])

const evolve2 = ({ schemaValidator, prevDoc = null, newDoc }) => {

    // return Object.entries(newDoc).reduce(
    //     (acc, [key, value]) => {
    //         if (schemaValidator.hasOwnProperty(key)) {
    //             let transformation = schemaValidator[key]
    //             // let prevValue = prevDoc === null ? null : prevDoc.hasOwnProperty(key) ? prevDoc[key] : null
    //             // console.log('key:', key, 'value:', value)
    //             let data = R.cond([
    //                 [({ transformation }) => R.is(Function, transformation), isFunction],
    //                 [({ transformation }) => R.is(Array, transformation), isArray],
    //                 [({ transformation }) => R.is(Object, transformation), isObject]
    //             ])({ key, value, schemaValidator, transformation, prevDoc, newDoc })
    //             // let result = R.assoc(key, data, acc)
    //             // console.log('result1:', result)
    //             // return result
    //             return R.assoc(key, data, acc)
    //         } else {
    //             return acc
    //         }

    //     }, {})
    return objectIterator({ element: newDoc, schemaValidator, prevDoc, newDoc })
}

const evolve = ({ schemaValidator, prevDoc = null, newDoc }) => {
    // console.log('newDoc', newDoc)
    var result = newDoc instanceof Array ? [] : {};
    var transformation, key, type, prevValue, newValue;


    for (key in newDoc) {
        if (schemaValidator.hasOwnProperty(key)) { //eliminate elements that isnt in schemaValidator
            console.log('key:', key, ', value:', newDoc[key])
            transformation = schemaValidator[key];
            type = typeof transformation;
            console.log('type::', type, 'instanceof array', transformation instanceof Array)
            prevValue = prevDoc === null ? null : prevDoc.hasOwnProperty(key) ? prevDoc[key] : null
            console.log('prevValue:', prevValue)
            newValue = newDoc === null ? null : newDoc.hasOwnProperty(key) ? newDoc[key] : null
            // newValue = newDoc.hasOwnProperty(key) ? newDoc[key] : null
            if (type === 'function') {
                result[key] = transformation({ prevValue, newValue, prevDoc, newDoc })
            } else {
                if (type === 'object') { // both array and object are objects
                    if (transformation instanceof Array) {
                        console.log('transformation[0]::', transformation[0])
                        result[key] = newValue.map(
                            element => {
                                console.log('element::', element)
                                return evolve({
                                    schemaValidator: transformation[0],
                                    prevDoc: newValue,
                                    newDoc: element
                                })
                            }
                        )
                    } else {
                        result[key] = evolve({
                            schemaValidator: transformation,
                            prevDoc: prevValue,
                            newDoc: newValue
                        })
                    }

                } else {
                    result[key] = newDoc[key]
                }
            }

        }
    }
    return result
}



function validation({ schemaValidator, prevDoc = null, newDoc }) {
    var cycles = 0
    const evolve = ({ schemaValidator, prevDoc = null, newDoc }) => {
        // console.log('newDoc', newDoc)
        var result = newDoc instanceof Array ? [] : {};
        var transformation, key, type, prevValue, newValue;
        console.log('tiene el id::', newDoc.hasOwnProperty('id'))
        if (cycles === 0 && newDoc.hasOwnProperty('id') === false) {
            schemaValidator = {
                id: ({ newValue }) => newValue,
                ...schemaValidator
            }
            newDoc = {
                id: uuidv4(),
                ...newDoc
            }
            cycles++
        }

        for (key in newDoc) {
            if (schemaValidator.hasOwnProperty(key)) { //eliminate elements that isnt in schemaValidator
                // console.log('key:', key, ', value:', newDoc[key])
                transformation = schemaValidator[key];
                type = typeof transformation;
                // console.log('type::', type, 'instanceof array', transformation instanceof Array)
                prevValue = prevDoc === null ? null : prevDoc.hasOwnProperty(key) ? prevDoc[key] : null
                // console.log('prevValue:', prevValue)
                newValue = newDoc === null ? null : newDoc.hasOwnProperty(key) ? newDoc[key] : null
                // newValue = newDoc.hasOwnProperty(key) ? newDoc[key] : null
                if (type === 'function') {
                    result[key] = transformation({ prevValue, newValue, prevDoc, newDoc })
                } else {
                    if (type === 'object') { // both array and object are objects
                        if (transformation instanceof Array) {
                            console.log('transformation[0]::', transformation[0])
                            result[key] = newValue.map(
                                element => {
                                    console.log('element::', element)
                                    return evolve({
                                        schemaValidator: transformation[0],
                                        prevDoc: newValue,
                                        newDoc: element
                                    })
                                }
                            )
                        } else {
                            result[key] = evolve({
                                schemaValidator: transformation,
                                prevDoc: prevValue,
                                newDoc: newValue
                            })
                        }

                    } else {
                        result[key] = newDoc[key]
                    }
                }

            }
        }
        return result
    }
    return evolve({ schemaValidator, prevDoc, newDoc })

}


const schemaValidator = {
    a: ({ prevValue, newValue, prevDoc, newDoc }) => {
        return newValue
    },
    b: ({ prevValue, newValue, prevDoc, newDoc }) => {
        return newValue
    },
    c: { d: () => 100, f: () => 200 },
    d: [{ a: ({ newValue }) => newValue, b: () => 22 }],
    f: { a: { a: () => 'Jalo' } }
}

const prevDoc = {
    a: 1,
    b: 2,
    // c: { d: 1, f: 2 }
}

var newDoc = {
    a: 2,
    b: 3,
    c: { d: 1, f: 2 },
    f: { a: { a: 1 } }
}
var newDoc2 = {
    a: 2,
    c: { d: 1, f: 2 },
    d: [{ a: 1, b: 2 }, { a: 2, b: 33 }]
}
var result = evolve2({
    schemaValidator,
    prevDoc,
    // newDoc,
    newDoc: newDoc2
})

console.log('RESULT:', result)

// var m1 = {
//     a: 1,
//     b: [{ a: 1, b: 1, c: 1 }]
// }
// var m2 = {
//     a: 2,
//     b: [{ a: 2, b: 2 }]
// }
// console.log('mergeDeepRight::',
//     R.mergeDeepRight(m1,
//         m2)
// )
