import opendb from './opendb'
import iteratorP from './iteratorP'
const Readable = require('stream').Readable

const main = async ({ location, options = {}, store }) => {
    let db = await opendb(store(location, options))
    // console.log('db::', db)
    return {
        composition: {
            ...db.composition,
            encapsulatedb: true
        },
        close: () => new Promise((resolve, reject) => {
            console.log('closing database...')
            db.close((err) => {
                if (err) {
                    console.log('Something happend closing the database:' + err)
                    reject(err)
                }
                else {
                    console.log('the database was closed')
                    resolve(true)
                }
            })
        }),
        put: (key, value, options = {}) => new Promise((resolve, reject) => {
            db.put(key, value, options, error => {
                if (error)
                    reject({ error })
                else
                    resolve({ error: null })
            })
        }),
        get: (key, options = {}) => new Promise((resolve, reject) => {
            console.log('key::',key)
            db.get(key, options, (error, data) => {
                console.log('error::',error)
                if (error)
                    reject({ error })
                else
                    resolve({ error: null, data })
            })
        }),
        del: (key, options = {}) => new Promise((resolve, reject) => {
            db.del(key, options, (error) => {
                if (error)
                    reject({ error })
                else
                    resolve({ error: null })
            })
        }),
        batch: (ops, options = {}) => new Promise((resolve, reject) => {
            db.batch(ops, options, (error) => {
                if (error)
                    reject({ error })
                else
                    resolve({ error: null })
            })
        }),
        preBatchExec: (ops, options = {}) => new Promise((resolve, reject) => {            
            db.batch(ops, options, (error) => {                
                if (error)
                    reject({ error })
                else
                    resolve({ error: null })
            })
        }),
        createReadStreamP: ({ onData = () => { }, ...options }) => new Promise(
            (resolve, reject) => {
                // const stream = new Readable({
                //     objectMode: true,
                //     read() {}
                //   })

                // db.createReadStream(options)
                //     .on('data', onData)
                //     .on('error', function (err) {
                //         reject(err)
                //     })
                //     .on('close', function () {
                //         resolve('Stream closed')
                //     })
                //     .on('end', function () {
                //         resolve('Stream ended')
                //     })
            }),
        iteratorP: (options = {}) => iteratorP(db, options)
    }
}
// const main = db => {

//     return {
//         put: (key, value, options = {}) => new Promise((resolve, reject) => {
//             db.put(key, value, options, error => {
//                 if (error)
//                     reject({ error })
//                 else
//                     resolve({ error: null })
//             })
//         }),
//         get: (key, options = {}) => new Promise((resolve, reject) => {
//             db.get(key, options, (error, data) => {
//                 if (error)
//                     reject({ error })
//                 else
//                     resolve({ error: null, data })
//             })
//         }),
//         del: (key, options = {}) => new Promise((resolve, reject) => {
//             db.del(key, options, (error) => {
//                 if (error)
//                     reject({ error })
//                 else
//                     resolve({ error: null })
//             })
//         }),
//         createReadStreamP: ({ onData = () => { }, ...options }) => new Promise(
//             (resolve, reject) => {
//                 db.createReadStream(options)
//                     .on('data', onData)
//                     .on('error', function (err) {
//                         reject(err)
//                     })
//                     .on('close', function () {
//                         resolve('Stream closed')
//                     })
//                     .on('end', function () {
//                         resolve('Stream ended')
//                     })
//             }),
//         iteratorP: (options = {}) => iteratorP(db, options),
//         encapsulatedb: true
//     }
// }

export default main