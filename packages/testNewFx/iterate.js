console.clear()
console.log('iterate.js')

var leveldown = require('leveldown')
var levelup = require('levelup')

var dbDown = leveldown('./mydb')

var dbUp = levelup(dbDown)
var millions = n => 1000000 * n
var howMany = 1
var uuid = require('uuid/v4')
console.log('howMany::', howMany)

// withDown(dbDown)
withUp(dbUp)
function withDown(db) {
    async function iterator() {
        // https://github.com/Level/leveldown/pull/185
        // https://github.com/Level/abstract-leveldown/blob/master/abstract-leveldown.js
        var options = {
            keyAsBuffer: false,
            valueAsBuffer: false,
            //  gt: 'a', 
            //  limit: 1000 
        }
        function initIterator(callback, options = {}) {
            var r = db.iterator(options)
            return {
                next: () => new Promise((resolve, reject) => {
                    r.next((error, key, value) => {
                        resolve({ key, value })
                    })
                })
            }
        }

        var ite = initIterator(options)
        // console.log('ite::', ite)
        console.time('iterator')
        // converting a buff.toString()
        // iterator: 4770.077ms
        for (var i = 0; i < howMany; i++) {
            var result = await ite.next()
            // console.log('result::', result)
            if (result.value.toString() === 'holamundo'
                + String(howMany - 1)
                // + 300000
            ) {
                console.log('yes was found ')
                break;
            }
        }
        console.timeEnd('iterator')
    }
    db.open(() => {
        iterator()
        // db.put('name', 'levelup', function (err) {
        //     if (err) return console.log('Ooops!', err)
        //     db.put('name2', 'levelup', function (err) {
        //         if (err) return console.log('Ooops!', err)
        //         db.put('name3', 'levelup', function (err) {
        //             if (err) return console.log('Ooops!', err)

        //             var options = { keyAsBuffer: false, valueAsBuffer: false, gt: 'a', limit: 1000 }

        //             var callback = (error, key, value) => {
        //                 if (error)
        //                     console.log('error:', error)
        //                 console.log(key, value)
        //                 // console.log('Buffer.toString(key)::', key.toString())
        //             }
        //             var it = db.iterator(options)
        //             // console.log('it::', it)
        //             // it.seek('0')
        //             it.next((error, key, value) => {
        //                 if (error)
        //                     console.log('error:', error)
        //                 console.log(key, value)
        //                 it.next(callback)
        //             })


        //             // it.next(callback)
        //             // it.seek('0')
        //             // console.log('it::', it)

        //         })
        //     })

        // })

    }
    )
}

const openDB = path => new Promise((resolve, reject) => {
    var db = leveldown(path)
    // const put = (key, value) => new Promise((resolve, reject) => {

    // })
    try {
        db.open(() => {
            resolve(db)

        })

    } catch (error) {
        console.log('Error Opening Database.', error)
        reject(error)
    }
})





async function withUp(db) {

    // await db.put('name1', 'levelup')
    // await db.put('name2', 'levelup')
    // await db.put('name4', 'levelup4')

    async function inserts() {
        console.time('db.put')
        //without Await
        //     howMany:: 1000000
        // db.put: 11,106.103ms
        // resGet:: is index:999999
        //with await
        //     howMany:: 1000000
        // db.put: 64,166.599ms
        // resGet:: is index:999999
        for (let index = 0; index < howMany; index++) {
            db.put(uuid(), 'holamundo' + index)
        }
        console.timeEnd('db.put')
    }
    // var resGet = await db.get(String(howMany - 1), { asBuffer: false })
    // console.log('resGet::', resGet)

    async function stream() {
        //with keys and values true
        // db.createReadStream: 4447.520ms
        //with buff.toString() and if()
        // howMany:: 1000000
        //         db.createReadStream: 3591.092ms
        // stream:: yes was found 
        //without if and buff.toString
        //         howMany:: 1000000
        // db.createReadStream: 2987.979ms
        console.time('db.createReadStream')
        var count = 0
        var stream = await new Promise((resolve, reject) => {

            var streamer = db.createReadStream({
                keys: true, values: true
            })

                .on('data', function (buff) {
                    count++
                    // console.log('buff.toString() ::', buff.toString())
                    if (buff.value.toString() === 'holamundo' + String(howMany - 1)) {
                        resolve('yes was found ')

                    }
                    // console.log('stream::', buff.key, '=', buff.value)
                    // db.createReadStream.destroy();
                })
                .on('error', function (err) {
                    console.log('Oh my!', err)
                })
                .on('close', function () {
                    // console.log('Stream closed')
                    resolve('not found')
                })
                .on('end', function () {
                    // console.log('Stream ended')
                })
        })
        console.timeEnd('db.createReadStream')
        console.log('stream::', stream)
        console.log('count::', count)
    }
    async function iterator() {
        // https://github.com/Level/leveldown/pull/185
        // https://github.com/Level/abstract-leveldown/blob/master/abstract-leveldown.js
        var options = {
            keyAsBuffer: false,
            valueAsBuffer: false,
            //  gt: 'a', 
            limit: 5,
            // fillCache:true,
            keys: false,
            values: true
        }
        function initIterator({ options = {} }) {
            var r = db.iterator(options)
            return {
                next: () => new Promise((resolve, reject) => {
                    r.next((error, key, value) => {
                        resolve(value)
                    })
                })
            }
        }

        var ite = initIterator({ options })
        // console.log('ite::', ite)
        console.time('iterator')
        //valueAsBuffer: false, keys:true
        //iterator: 11482.277ms
        //valueAsBuffer: false, keys:false
        //iterator: 3532.756ms
        var hola = []
        const fxIf = result => {
            if (result === 'holamundo'
                // + String(howMany - 1)
                + '10000'
            ) {
                console.log('yes was found ')
                // break;
                return true
            }
        }
        for (var i = 0; i < howMany; i++) {
            var result = await ite.next()
            // console.log('result::',result)
            if (fxIf(result) || result === undefined) {
                break
            }
        }
        console.timeEnd('iterator')
    }

    inserts()
    // stream()
    // iterator()



}