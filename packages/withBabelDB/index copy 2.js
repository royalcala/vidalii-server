import evol from './evol'
import { cond, equals } from 'ramda'
import db from './fxs/db'
import db_encode from './fxs/db_encode'
import db_encode_up from './fxs/db_encode_up'

// import hola from './src'
// import data1 from './src/data1'
// yarn add @babel/preset-env --dev
// npx babel index.js --out-file script-compiled.js

console.clear()
console.log('Screen cleaned. In WithBabel')
const test_db = [
    'test_db',
    ({ db_encode_up: db }) => {
        // test_seq()
        test_rev()
        function test_docs() {
            var obj = {
                number: 1,
                string: `string`
            }
            // obj = JSON.stringify(obj)
            // obj = Buffer.from(JSON.stringify(obj));
            // console.log('--->', obj)
            // JSON.parse(obj);
            db.docs.put(1, obj, function (err) {
                if (err) return console.log('Ooops!', err) // some kind of I/O error

                // 3) Fetch by key
                db.docs.get(1, function (err, value) {
                    if (err) return console.log('Ooops!', err) // likely the key was not found
                    console.log(
                        'value=>'
                        , value,
                        'typeOf=>',
                        // typeof result.parsed.string
                        typeof value.number
                    )

                    db.docs.createReadStream()
                        .on('data', function (data) {
                            console.log('KEY:', data.key, '=>', 'VAlUE:', data.value)
                        })
                        .on('error', function (err) {
                            console.log('Oh my!', err)
                        })
                        .on('close', function () {
                            console.log('Stream closed')
                        })
                        .on('end', function () {
                            console.log('Stream ended')
                        })

                })
            })
        }
        function test_rev() {
            db.rev.put({ _id: 1, _rev: 1 }, { number: '1' }, function (err) {
                if (err) return console.log('Ooops!', err) // some kind of I/O error

                db.rev.get({ _id: 1, _rev: 1 }, function (err, value) {
                    if (err) return console.log('Ooops!', err) // likely the key was not found
                    console.log(
                        'value=>'
                        , value,
                        'typeOf=>',
                        // typeof result.parsed.string
                        typeof value.number
                    )


                })
            })

            // db.rev.put(2, { dataRev: 'here' })
            // db.rev.put(10, { dataRev: 'here' })
            db.rev.put({ _id: 1, _rev: 1000000000 }, { dataRev: 'here' })
            db.rev.put({ _id: 1, _rev: 2 }, { dataRev: 'here' })

            db.rev.createReadStream({
                //  gte: { _id: 1, _rev: 0 } 
                reverse: true,
                limit: 1
            })
                .on('data', function (data) {
                    console.log('KEY:', data.key, '=>', 'VAlUE:', data.value)
                })
                .on('error', function (err) {
                    console.log('Oh my!', err)
                })
                .on('close', function () {
                    console.log('Stream closed')
                })
                .on('end', function () {
                    console.log('Stream ended')
                })
        }
        function test_seq() {
            db.seq.get(1, function (err, value) {
                console.log(value)
            })

            db.seq.put(1, { dataRev: 'here' }, function (err) {
                if (err) return console.log('Ooops!', err) // some kind of I/O error

                // 3) Fetch by key
                // db.seq.get(1, function (err, value) {
                //     if (err) return console.log('Ooops!', err) // likely the key was not found
                //     // console.log(
                //     //     'value=>'
                //     //     , value,
                //     //     'typeOf=>',
                //     //     // typeof result.parsed.string
                //     //     typeof value.number
                //     // )


                // })
            })

            db.seq.put(2, { dataRev: 'here' })
            db.seq.put(10, { dataRev: 'here' })
            db.seq.put(1000000000, { dataRev: 'here' })
            db.seq.put(20, { dataRev: 'here' })

            // db.seq.createReadStream()
            //     .on('data', function (data) {
            //         console.log('KEY:', data.key, '=>', 'VAlUE:', data.value)
            //     })
            //     .on('error', function (err) {
            //         console.log('Oh my!', err)
            //     })
            //     .on('close', function () {
            //         console.log('Stream closed')
            //     })
            //     .on('end', function () {
            //         console.log('Stream ended')
            //     })
        }

    }
]

const fxsToEvol = [
    [
        'config',
        (initialValue) => initialValue,
    ],
    [
        'standarizedResponse',
        () => ({ error = null, data = null }) => {
            //log errors
            return {
                data,
                error
                // ...(error === null ? {} : { error })
            }
        }
    ],
    [
        'db',
        db
    ],
    [
        'db_encode',
        db_encode
    ],
    [
        'db_encode_up',
        db_encode_up
    ],
    [
        'crudRev',
        rev
    ],
    [
        'crudDocs',
        docs
    ],
    test_db,
]

var resultEvol = evol(...fxsToEvol)({
    alias: 'test1',
    env: {
        type: 'node',//browser||node
        encoding: {
            // key: '',
            value: 'json'//must be default and unique in json
        },
        nodeConfig: {
            pathdb: __dirname + '/data'
        },
        browserConfig: {

        }
    },
    rev: {
        number: 10
    },
    replication: {
        byDatabase: [
            { db: '', from: true, to: false }
        ],
        byFx: [
            { fx: (doc) => '' }
        ]
    },
})

// console.log(
//     'resultEvol:',
//     resultEvol
// )
