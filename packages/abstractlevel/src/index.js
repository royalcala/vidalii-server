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
                        console.log('Oh my!', err)
                    })
                    .on('close', function () {
                        resolve()
                        console.log('Stream closed')
                    })
                    .on('end', function () {
                        console.log('Stream ended')
                    })
            }),
        iteratorP: (options = {}) => iteratorP(db, options)
    }
}

export default main