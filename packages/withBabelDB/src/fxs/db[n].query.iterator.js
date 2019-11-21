import { mergeDeepRight, cond, all, equals } from 'ramda'
const initDefaultOptions = ({ options }) => {
    var defaults = {
        //other on link https://github.com/Level/leveldown#leveldown_get
        keys: true,
        values: true,
        reverse: false,
        limit: -1,
        keyAsBuffer: true,
        valueAsBuffer: true
    }
    return mergeDeepRight(defaults, options)
}
// const condBoth = [({ options: { keys, values } }) => all(equals(true))(keys, values),
// ({ iterator }) => ({
//     next: () => new Promise((resolve, reject) => {
//         r.next((error, key, value) => {
//             resolve({ key, value })
//         })
//     })
// })
// ]
const initIterator = ({ db, options = {} }) => {
    var iterator = db.iterator(options)
    var end = () => iterator.end(e => {
        if (e)
            console.log('Error ending iterator::', e)
    })
    if (options.keys === true && options.values === true) {
        return {
            next: () => new Promise((resolve, reject) => {
                iterator.next((error, key, value) => {
                    resolve({ key, value })
                })
            }),
            end
        }
    } else if (options.keys === true && options.values === false) {
        return {
            next: () => new Promise((resolve, reject) => {
                iterator.next((error, key) => {
                    resolve(key)
                })
            }),
            end
        }
    } else if (options.keys === false && options.values === true) {
        return {
            next: () => new Promise((resolve, reject) => {
                iterator.next((error, key, value) => {
                    resolve(value)
                })
            }),
            end
        }
    }

}
const millions = n => 1000000 * n
var howMany = millions(10)
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
export default (nameDB) => ({ db }) => async ({ onData = () => { } }, options = {}) => {
    var defaultOptions = initDefaultOptions({ options })
    var iterator = initIterator({
        db: db[nameDB],
        options: { ...defaultOptions }
    })

    //****RETURN TRUE IN onData for stop/break*****
    if (defaultOptions.keys === true && defaultOptions.values === true) {
        for (var i = 0; i < howMany; i++) {
            var result = await iterator.next()
            if (result.key === undefined || onData(result)) {
                iterator.end()
                break
            }
        }
    } else {
        for (var i = 0; i < howMany; i++) {
            var result = await iterator.next()
            if (result === undefined || onData(result)) {
                iterator.end()
                break
            }
        }
    }


}