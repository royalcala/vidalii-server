import { reduce, assoc, ifElse } from 'ramda'
import * as updateJsonBy from './updateJson'
// const lockKeys = () => {
//     let lockedKeysStore = {}

//     return {
//         lock: key => { lockedKeysStore[key] = true },
//         unlock: key => { delete lockedKeysStore[key] }
//     }
// }
const getOne = ({ db }) => key => db.get(key)

const existDoc = ({ getOne }) => async  key => {
    let response = await getOne(key)
    if (response.error === null)
        return false
    else
        return true
}
const replaceOne = ({ db }) => (key, value) => db.put(key, value)

const insertOne = ({ replaceOne, existDoc }) => async (key, value) => {
    let exist = await existDoc
    return ifElse(
        () => exist === false,
        () => ({
            error: {
                msg: `The key ${key}already exist. Please select other key`
            }
        }),
        () => replaceOne(key, value)
    )()
}

const main = db => {

    let result = reduce(
        (acc, [name, fx]) => assoc(name, fx(acc), acc),
        { db },
    )([
        // ['lockKeys', lockKeys],
        ['getOne', getOne],
        ['existDoc', existDoc],
        ['replaceOne', replaceOne],
        ['insertOne', insertOne],
        ['updateJsonByDoc', updateJsonBy.doc]
    ])
    delete result.db
    return result
}

export default main