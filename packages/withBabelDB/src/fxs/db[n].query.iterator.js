import { mergeDeepRight, cond, allPass, propEq, all, equals } from 'ramda'
const millions = n => 1000000 * n
var howMany = millions(5)


const condBoth = [({ options }) => allPass([propEq('keys', true), propEq('values', true)])(options),
async ({ iterator, onData, endCallback, decodeOut, encoder }) => {
    const next = iterator => new Promise((resolve, reject) => {
        iterator.next((error, key, value) => {
            if (error) {
                console.log(error)
                reject(error)

            }
            else {
                if (key === undefined || decodeOut === false) {
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
async ({ iterator, onData, endCallback, decodeOut, encoder }) => {
    const next = iterator => new Promise((resolve, reject) => {
        iterator.next((error, key, value) => {
            if (error) {
                console.log(error)
                reject(error)
            }
            else {
                if (key === undefined || decodeOut === false) {
                    resolve(key)
                } else {
                    resolve(encoder.keyEncoding.decode(key))
                }
            }
        })
    })
    for (var i = 0; i < howMany; i++) {
        var key = await next(iterator)
        if (key === undefined || onData(key)) {
            iterator.end(endCallback)
            break
        }
    }
}
]

const condOnlyValues = [({ options }) => allPass([propEq('keys', false), propEq('values', true)])(options),
async ({ iterator, onData, endCallback, decodeOut, encoder }) => {
    const next = iterator => new Promise((resolve, reject) => {
        iterator.next((error, key, value) => {
            if (error) {
                console.log(error)
                reject(error)
            }
            else {
                if (value === undefined || decodeOut === false) {
                    resolve(value)
                } else {
                    resolve(encoder.valueEncoding.decode(value))
                }
            }
        })
    })
    for (var i = 0; i < howMany; i++) {
        var value = await next(iterator)
        if (value === undefined || onData(value)) {
            iterator.end(endCallback)
            break
        }
    }
}
]

const initDefaultoptions = ({ options }) => {
    var defaults = {
        onData: () => { },
        decodeOut: true,
        //other on link https://github.com/Level/leveldown#leveldown_get
        keys: true,
        values: true,
        // reverse: false,
        // limit: -1,
        // keyAsBuffer: true,
        // valueAsBuffer: true,
    }
    return mergeDeepRight(defaults, options)
}
export default (nameDB) => ({ db }) => async (options = {}) => {
    var defaultoptions = initDefaultoptions({ options })
    return cond([
        condBoth,
        condOnlyKeys,
        condOnlyValues
    ])({
        options: { ...defaultoptions },
        encoder: db[nameDB].encoder,
        iterator: db[nameDB].iterator(defaultoptions),
        onData: defaultoptions.onData,
        decodeOut: defaultoptions.decodeOut,
        endCallback: e => {
            if (e)
                console.log('Error ending iterator::', e)
        }
    })
}