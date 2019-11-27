import { pipe, reduce, assoc } from 'ramda'
import ifElse from 'ramda/es/ifElse'

const getOne = ({ db }) => key => db.get(key)

const existDoc = async ({ getOne }) => key => {
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

const updateJsonWithId = ({ db, existDoc }) => (key, value) => {
    let exist = await existDoc
    return ifElse(
        () => exist === false,
        () => ({
            error: {
                msg: `The key ${key}already exist. Please select other key`
            }
        }),
        () => {
            //schema update 
        }
    )()
}


const main = db => reduce(
    (acc, [name, fx]) => assoc(name, fx(acc), acc),
    { db },
)([
    ['getOne', getOne],
    ['existDoc', existDoc],
    ['replaceOne', replaceOne],
    ['insertOne', insertOne]
])
    // return {
    //     existDoc,
    //     insertOne: (key, value, options = {}) => {

    //         db.put(key, value, options, error => {
    //             if (error)
    //                 reject({ error })
    //             else
    //                 resolve({ error: null })
    //         })
    //     },
    //     get: (key, options = {}) => new Promise((resolve, reject) => {
    //         db.get(key, options, (error, data) => {
    //             if (error)
    //                 reject({ error })
    //             else
    //                 resolve({ error: null, data })
    //         })
    //     }),
    //     del: (key, options = {}) => new Promise((resolve, reject) => {
    //         db.del(key, options, (error) => {
    //             if (error)
    //                 reject({ error })
    //             else
    //                 resolve({ error: null })
    //         })
    //     }),
    //     createReadStreamP: ({ onData = () => { }, ...options }) => new Promise(
    //         (resolve, reject) => {
    //             db.createReadStream(options)
    //                 .on('data', onData)
    //                 .on('error', function (err) {
    //                     reject(err)
    //                 })
    //                 .on('close', function () {
    //                     resolve('Stream closed')
    //                 })
    //                 .on('end', function () {
    //                     resolve('Stream ended')
    //                 })
    //         }),
    //     iteratorP: (options = {}) => iteratorP(db, options),
    //     abstractdb: true
    // }
}

export default main