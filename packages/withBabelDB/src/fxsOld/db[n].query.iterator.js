import { mergeDeepRight, cond, allPass, propEq, all, equals } from 'ramda'
const millions = n => 1000000 * n
var howMany = millions(1)
const initDefaultquery = ({ query }) => {
    var defaults = {
        //other on link https://github.com/Level/leveldown#leveldown_get
        keys: true,
        values: true,
        reverse: false,
        limit: -1,
        keyAsBuffer: true,
        valueAsBuffer: true,
    }
    return mergeDeepRight(defaults, query)
}

const condBoth = [({ query }) => allPass([propEq('keys', true), propEq('values', true)])(query),
async ({ iterator, onData, endCallback, decoderOut, encoder }) => {
    const next = iterator => new Promise((resolve, reject) => {
        iterator.next((error, key, value) => {
            if (error) {
                console.log(error)
                reject(error)

            }
            else {
                if (key === undefined || decoderOut === false) {
                    resolve({
                        key,
                        value
                    })
                } else {
                    resolve({
                        key: encoder.keyEncoding.decode(key),
                        value: encoder.valueEncoding.decode(value)
                    })
                }
            }
        })
    })
    for (var i = 0; i < howMany; i++) {
        try {
            var result = await next(iterator)
            if (result.key === undefined || onData(result)) {
                iterator.end(endCallback)
                break
            }
        } catch (error) {
            console.log('error::', error)
            iterator.end(endCallback)
            break
        }

    }
}
]

const condOnlyKeys = [({ query }) => allPass([propEq('keys', true), propEq('values', false)])(query),
async ({ iterator, onData, endCallback, decoderOut, encoder }) => {
    const next = iterator => new Promise((resolve, reject) => {
        iterator.next((error, key, value) => {
            if (error) {
                console.log(error)
                reject(error)
            }
            else {
                if (key === undefined || decoderOut === false) {
                    resolve(key)
                } else {
                    resolve(encoder.keyEncoding.decode(key))
                }
            }
        })
    })
    for (var i = 0; i < howMany; i++) {
        var key = await next(iterator)
        if (key === undefined || onData(result)) {
            iterator.end(endCallback)
            break
        }
    }
}
]

const condOnlyValues = [({ query }) => allPass([propEq('keys', false), propEq('values', true)])(query),
async ({ iterator, onData, endCallback, decoderOut, encoder }) => {
    const next = iterator => new Promise((resolve, reject) => {
        iterator.next((error, key, value) => {
            if (error) {
                console.log(error)
                reject(error)
            }
            else {
                if (value === undefined || decoderOut === false) {
                    resolve(value)
                } else {
                    resolve(encoder.valueEncoding.decode(value))
                }
            }
        })
    })
    for (var i = 0; i < howMany; i++) {
        var value = await next(iterator)
        if (value === undefined || onData(result)) {
            iterator.end(endCallback)
            break
        }
    }
}
]



// const initIterator = ({ db, query = {} }) => {
//     var iterator = db.iterator(query)
//     var end = () => iterator.end(e => {
//         if (e)
//             console.log('Error ending iterator::', e)
//     })
//     return cond([
//         condBoth,
//         condOnlyKeys,
//         condOnlyValues
//     ])({ query, iterator, end })
//     // return query.keys === true && query.values === true ? ({
//     //     next: () => new Promise((resolve, reject) => {
//     //         iterator.next((error, key, value) => {
//     //             resolve({ key, value })
//     //         })
//     //     }),
//     //     end
//     // }) : query.keys === true ? ({
//     //     next: () => new Promise((resolve, reject) => {
//     //         iterator.next((error, key) => {
//     //             resolve(key)
//     //         })
//     //     }),
//     //     end
//     // }) : ({
//     //     next: () => new Promise((resolve, reject) => {
//     //         iterator.next((error, key, value) => {
//     //             resolve(value)
//     //         })
//     //     }),
//     //     end
//     // })
//     // if (query.keys === true && query.values === true) {
//     //     return {
//     //         next: () => new Promise((resolve, reject) => {
//     //             iterator.next((error, key, value) => {
//     //                 resolve({ key, value })
//     //             })
//     //         }),
//     //         end
//     //     }
//     // } else if (query.keys === true && query.values === false) {
//     //     return {
//     //         next: () => new Promise((resolve, reject) => {
//     //             iterator.next((error, key) => {
//     //                 resolve(key)
//     //             })
//     //         }),
//     //         end
//     //     }
//     // } else if (query.keys === false && query.values === true) {
//     //     return {
//     //         next: () => new Promise((resolve, reject) => {
//     //             iterator.next((error, key, value) => {
//     //                 resolve(value)
//     //             })
//     //         }),
//     //         end
//     //     }
//     // }

// }

// const onData = result => {
//     if (result === 'holamundo'
//         // + String(howMany - 1)
//         + '10000'
//     ) {
//         console.log('yes was found ')
//         // break;
//         return true
//     }
// }

export default (nameDB) => ({ db }) => async ({ onData = () => { }, decoderOut = true, query = {} }) => {
    var defaultquery = initDefaultquery({ query })
    return cond([
        condBoth,
        condOnlyKeys,
        condOnlyValues
    ])({
        query: { ...defaultquery },
        encoder: db[nameDB].encoder,
        iterator: db[nameDB].iterator(defaultquery),
        onData,
        decoderOut,
        endCallback: e => {
            if (e)
                console.log('Error ending iterator::', e)
        }
    })

    // var iterator = initIterator({
    //     db: db[nameDB],
    //     query: { ...defaultquery }
    // })

    //****RETURN TRUE IN onData for stop/break*****
    // if (defaultquery.keys === true && defaultquery.values === true) {
    //     if (decoderOut === true) {
    //         for (var i = 0; i < howMany; i++) {
    //             var result = await iterator.next()
    //             if (result.key === undefined || onData(result)) {
    //                 iterator.end()
    //                 break
    //             }
    //         }
    //     } else {

    //     }

    // } else {
    //     for (var i = 0; i < howMany; i++) {
    //         var result = await iterator.next()
    //         if (result === undefined || onData(result)) {
    //             iterator.end()
    //             break
    //         }
    //     }
    // }


}