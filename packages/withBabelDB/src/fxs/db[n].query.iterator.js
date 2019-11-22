import { mergeDeepRight, cond, allPass, propEq, all, equals } from 'ramda'
const millions = n => 10 * n
var howMany = millions(1)
const initDefaultOptions = ({ options }) => {
    var defaults = {
        //other on link https://github.com/Level/leveldown#leveldown_get
        keys: true,
        values: true,
        reverse: false,
        limit: -1,
        keyAsBuffer: true,
        valueAsBuffer: true,
    }
    return mergeDeepRight(defaults, options)
}

const condBoth = [({ options }) => allPass([propEq('keys', true), propEq('values', true)])(options),
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

const condOnlyKeys = [({ options }) => allPass([propEq('keys', true), propEq('values', false)])(options),
async ({ iterator, onData, endCallback }) => {
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

const condOnlyValues = [({ options }) => allPass([propEq('keys', false), propEq('values', true)])(options),
async ({ iterator, onData, endCallback }) => {
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



// const initIterator = ({ db, options = {} }) => {
//     var iterator = db.iterator(options)
//     var end = () => iterator.end(e => {
//         if (e)
//             console.log('Error ending iterator::', e)
//     })
//     return cond([
//         condBoth,
//         condOnlyKeys,
//         condOnlyValues
//     ])({ options, iterator, end })
//     // return options.keys === true && options.values === true ? ({
//     //     next: () => new Promise((resolve, reject) => {
//     //         iterator.next((error, key, value) => {
//     //             resolve({ key, value })
//     //         })
//     //     }),
//     //     end
//     // }) : options.keys === true ? ({
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
//     // if (options.keys === true && options.values === true) {
//     //     return {
//     //         next: () => new Promise((resolve, reject) => {
//     //             iterator.next((error, key, value) => {
//     //                 resolve({ key, value })
//     //             })
//     //         }),
//     //         end
//     //     }
//     // } else if (options.keys === true && options.values === false) {
//     //     return {
//     //         next: () => new Promise((resolve, reject) => {
//     //             iterator.next((error, key) => {
//     //                 resolve(key)
//     //             })
//     //         }),
//     //         end
//     //     }
//     // } else if (options.keys === false && options.values === true) {
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

export default (nameDB) => ({ db }) => async ({ onData = () => { }, decoderOut = true }, options = {}) => {
    var defaultOptions = initDefaultOptions({ options })
    return cond([
        condBoth,
        condOnlyKeys,
        condOnlyValues
    ])({
        options: { ...defaultOptions },
        encoder: db[nameDB].encoder,
        iterator: db[nameDB].iterator(defaultOptions),
        onData,
        decoderOut,
        endCallback: e => {
            if (e)
                console.log('Error ending iterator::', e)
        }
    })

    // var iterator = initIterator({
    //     db: db[nameDB],
    //     options: { ...defaultOptions }
    // })

    //****RETURN TRUE IN onData for stop/break*****
    // if (defaultOptions.keys === true && defaultOptions.values === true) {
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