// console.log('in abstractionlevel')
// const leveldown = require('leveldown')
// const levelup = require('levelup')
import iteratorP from './iteratorP'
const main = db => {

    return {
        put: (key, value, options = {}) => new Promise((resolve, reject) => {
            db.put(key, value, options, error => {
                if (error)
                    reject({ error })
                else
                    resolve({ error: null })
            })
        }),
        get: (key, options = {}) => new Promise((resolve, reject) => {
            db.get(key, options, (error, data) => {
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
        createReadStreamP: ({ onData = () => { }, ...options }) => new Promise(
            (resolve, reject) => {
                db.createReadStream(options)
                    .on('data', onData)
                    .on('error', function (err) {
                        reject(err)
                    })
                    .on('close', function () {
                        resolve('Stream closed')
                    })
                    .on('end', function () {
                        resolve('Stream ended')
                    })
            }),
        iteratorP: (options = {}) => iteratorP(db, options),
        abstractdb: true
    }
}

export default main