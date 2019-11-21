console.clear()
console.log('iterate.js')

var leveldown = require('leveldown')
var levelup = require('levelup')

var dbDown = leveldown('./mydb')

var dbUp = levelup(dbDown)

// withDown(dbDown)
withUp(dbUp)
function withDown(db) {
    db.open(() => {
        db.put('name', 'levelup', function (err) {
            if (err) return console.log('Ooops!', err)
            db.put('name2', 'levelup', function (err) {
                if (err) return console.log('Ooops!', err)
                db.put('name3', 'levelup', function (err) {
                    if (err) return console.log('Ooops!', err)

                    var options = { keyAsBuffer: false, valueAsBuffer: false, gt: 'a', limit: 1000 }

                    var callback = (error, key, value) => {
                        if (error)
                            console.log('error:', error)
                        console.log(key, value)
                        // console.log('Buffer.toString(key)::', key.toString())
                    }
                    var it = db.iterator(options)
                    // console.log('it::', it)
                    // it.seek('0')
                    it.next((error, key, value) => {
                        if (error)
                            console.log('error:', error)
                        console.log(key, value)
                        it.next(callback)
                    })


                    // it.next(callback)
                    // it.seek('0')
                    // console.log('it::', it)

                })
            })

        })

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

    var resPut = await db.put('name1', 'levelup')
    var resPut = await db.put('name2', 'levelup')
    var resPut = await db.put('name3', 'levelup')

    // var resGet = await db.get('name1')
    // console.log('resGet::', resGet)

    // var stream = await new Promise((resolve, reject) => {

    //     // var streamer = db.createReadStream({ asBuffer: false })
    //     // console.log('streamer::',streamer)
    //     // .on('data', function (data) {

    //     //     console.log('stream::',data.key, '=', data.value)
    //     //     db.createReadStream.destroy();
    //     // })
    //     // .on('error', function (err) {
    //     //     console.log('Oh my!', err)
    //     // })
    //     // .on('close', function () {
    //     //     // console.log('Stream closed')
    //     //     resolve()
    //     // })
    //     // .on('end', function () {
    //     //     // console.log('Stream ended')
    //     // })
    // })
    var options = { keyAsBuffer: false, valueAsBuffer: false, gt: 'a', limit: 1000 }

    function callback(error, key, value) {
        if (error)
            console.log('error:', error)

        return new Promise((resolve, reject) => {

        })
        console.log(key)
    }
    // var it = db.iterator(options).next((error, key, value) => {
    //     if (error)
    //         console.log('error:', error)
    //     console.log(key)
    //     it.next(callback)
    // })

    function* g5() {
        var r = db.iterator(options)
        // yield r.next(callback)

        for (var i = 0; i < 2; i++) {
            r.next(callback)
        }
    }


    // iterator.next()
    // setTimeout(() => {
    //     // rs.push('trhee');
    //     iterator.next()
    // }, 1000);
    // console.log('iterator.next()::',iterator.next())




    // https://github.com/Level/leveldown/pull/185
    // https://github.com/Level/abstract-leveldown/blob/master/abstract-leveldown.js
}