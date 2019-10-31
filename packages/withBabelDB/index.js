import evol from './evol'
import { cond, equals } from 'ramda'
import db from './fxs/db'
// import hola from './src'
// import data1 from './src/data1'
// yarn add @babel/preset-env --dev
// npx babel index.js --out-file script-compiled.js

console.clear()
console.log('Screen cleaned. In WithBabel')
const test_db = [
    'test_db',
    ({ up_encoded_leveldb: db }) => {
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
        () => ({
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
        }),
    ],
    [
        'buildResponse',
        () => ({ error = null, data }, options = {}) => {
            //log errors
            return {
                data,
                error
                // ...(error === null ? {} : { error })
            }
        }
    ],
    [
        'leveldb',
        db
    ],
    [
        'encoded_leveldb',
        ({ config, leveldb }) => {
            var encode = require('encoding-down')
            var lexint = require('lexicographic-integer');
            const encodingdb = ({ config }) => {
                if (config.env.hasOwnProperty('encoding')) {
                    const { value = 'json', key = null } = config.env.encoding

                    return {
                        // ...(value === null ? {} : { valueEncoding: value }),
                        valueEncoding: value,
                        ...(key === null ? {} : { keyEncoding: key })
                    }
                } else {
                    //values defaults are utf8
                    return {
                        valueEncoding: 'json'
                    }
                }
            }

            var encoding = encodingdb({ config })
            // console.log(leveldb)
            return {
                docs: encode(leveldb.docs, encoding),
                rev: encode(leveldb.rev, {
                    keyEncoding: {
                        type: 'revision',
                        encode: ({ _id, _rev }) => {
                            var toEncode = _id + '!' + lexint.pack(_rev, 'hex')
                            console.log('encode:', toEncode)
                            return toEncode
                        },
                        decode: (n) => {
                            console.log('decode:', n)
                            var toDecode = n.split('!');
                            return {
                                _id: toDecode[0],
                                _rev: lexint.unpack(toDecode[1])
                            }
                        },
                        buffer: false
                    },
                    valueEncoding: 'json'
                }),
                seq: encode(leveldb.seq, {
                    keyEncoding: {
                        type: 'lexicographic-integer',
                        encode: (n) => {
                            console.log('encoder::', n)
                            return lexint.pack(n, 'hex')
                        },
                        decode: (n) => {
                            console.log('decoder:', n)
                            return lexint.unpack(n)
                        },
                        buffer: false
                    },
                    valueEncoding: 'json'
                })
            }
        }
    ],
    [
        'up_encoded_leveldb',
        ({ encoded_leveldb }) => {
            // console.log(encoded_leveldb)
            var levelup = require('levelup')
            return {
                docs: levelup(encoded_leveldb.docs),
                rev: levelup(encoded_leveldb.rev),
                seq: levelup(encoded_leveldb.seq)
            }

        }
    ],
    [
        'rev_up_encoded_leveldb',
        ({ up_encoded_leveldb: db }) => {
            return {
                getLast: (_id) => new Promise((resolve, reject) => {
                    //get last revision
                    db.rev.createReadStream({
                        //  gte: { _id: 1, _rev: 0 } 
                        reverse: true,
                        limit: 1
                    }).on('data', function (data) {
                        // console.log('KEY:', data.key, '=>', 'VAlUE:', data.value)
                        resolve({
                            _id,
                            _rev: data.key._rev,
                            data: data.value
                        })
                    }).on('error', function (err) {
                        console.log('error on rev_up_encoded_leveldb:last.', err)
                    }).on('close', function () {
                        console.log('Stream closed')
                    }).on('end', function () {
                        console.log('Stream ended')
                    })
                }),
                conflictCheck: ({ _id, _rev }) => {

                },
                getAll: (_id) => {

                }
            }
        }
    ],
    test_db,
    // [
    //     'crud',
    //     ({ up_encoded_leveldb: db, buildResponse }) => ({
    //         insertOne: async ({ _id = uuidv4(), ...data }) => {
    //             const checkIfExist = async ({ _id }) => {
    //                 try {
    //                     let result = await db.docs.get(_id)
    //                     result._id = _id
    //                     return {
    //                         doc: result,
    //                         exist: true
    //                     }
    //                 } catch (notFound) {
    //                     return {
    //                         doc: null,
    //                         exist: false
    //                     }
    //                 }

    //             }
    //             const responseErrorDuplicatedDoc = ({ _id, doc }) => {
    //                 return buildResponse({
    //                     error: {
    //                         msg: `Error.The _id:${_id}, already exist.`,
    //                         doc
    //                     }
    //                 })

    //             }
    //             const insertNewDoc = async ({ _id, data }) => {
    //                 try {
    //                     let result = await db.docs.put(_id, data)
    //                     return buildResponse({
    //                         _rev: 'revision here'
    //                     })
    //                 } catch (err) {
    //                     return buildResponse({
    //                         error: {
    //                             msg: 'Error on crud->insertOne->insertNewDoc:', err
    //                         }
    //                     })
    //                 }
    //             }


    //             let { exist, doc } = await checkIfExist({ _id })
    //             let result
    //             if (exist === true) {
    //                 result = responseErrorDuplicatedDoc({ _id, doc })
    //             } else {
    //                 result = await insertNewDoc({ _id, data })
    //             }

    //             return result

    //         }
    //     })
    // ],
    // [
    //     'test_crud',
    //     async ({ db, crud }) => {
    //         // console.log('crud::', crud)
    //         var result = await crud.insertOne({
    //             _id: '1',
    //             msg: 'first insert'
    //         })
    //         console.log('result:', result)
    //         result = await crud.insertOne({
    //             _id: '2',
    //             msg: 'first insert'
    //         })
    //         console.log('result:', result)
    //         result = await crud.insertOne({
    //             _id: '10',
    //             msg: 'first insert'
    //         })
    //         console.log('result:', result)
    //     }
    // ],
    // [
    //     'readAll',
    //     ({ up_encoded_leveldb: db }) => {
    //         // console.group('createReadStream')
    //         var table = []
    //         db.docs.createReadStream({ reverse: false })
    //             .on('data', function (data) {
    //                 // console.log('stream:', 'key:', data.key, 'value:', data.value)
    //                 table.push([data.key, data.value])
    //             })
    //             .on('error', function (err) {
    //                 console.log('Oh my!', err)
    //             })
    //             .on('close', function () {
    //                 console.log('Stream closed')
    //             })
    //             .on('end', function () {
    //                 console.log('Stream ended')
    //                 console.log(
    //                     'read All:',
    //                     table
    //                 )
    //             })
    //         // console.groupEnd('createReadStream')
    //     }
    // ],
    // [
    //     'iterator',
    //     ({ db }) => {
    //         var iterator = db.docs.iterator()
    //         // iterator.next((error, key, value) => {
    //         //     console.log('iterator')
    //         //     console.log('error:', error)
    //         //     console.log('nextKey:', key)
    //         //     console.log('nextValue:', value)
    //         // })
    //         iterator.seek('c', (error, key, value) => {
    //             console.log('iterator')
    //             console.log('error:', error)
    //             console.log('nextKey:', key)
    //             console.log('nextValue:', value)
    //         })

    //         // .next((error, key, value) => {
    //         //     console.log('iterator')
    //         //     console.log('error:', error)
    //         //     console.log('nextKey:', key)
    //         //     console.log('nextValue:', value)
    //         // })
    //         // iterator2.next((error, key, value) => {
    //         //     console.log('iterator')
    //         //     console.log('error:', error)
    //         //     console.log('nextKey:', key)
    //         //     console.log('nextValue:', value)
    //         // })

    //     }
    // ],
    // [
    //     'streamSearch',
    //     ({ db }) => {
    //         // console.group('createReadStream')
    //         var table = []
    //         db.docs.createReadStream({ gt: 'a', lt: 'c' })
    //             .on('data', function (data) {
    //                 // console.log('stream:', 'key:', data.key, 'value:', data.value)
    //                 table.push([data.key, data.value])
    //             })
    //             .on('error', function (err) {
    //                 console.log('Oh my!', err)
    //             })
    //             .on('close', function () {
    //                 console.log('Stream closed')
    //             })
    //             .on('end', function () {
    //                 console.log('Stream ended')
    //                 console.log(
    //                     'read with search',
    //                     table
    //                 )
    //             })
    //         // console.groupEnd('createReadStream')
    //     }
    // ]
]

var resultEvol = evol(...fxsToEvol)

// console.log(
//     'resultEvol:',
//     resultEvol
// )
// var requireContext = require('require-context');
// var data = requireContext(__dirname + '/src', true, /\.index\.js$/)
// console.log(
//     'data::',
//     data('data1/index.js')
// )

// function importAll(r) {

//     console.log('r::', r)
//     console.log('keys::',r.keys())

//     r.keys().forEach((key) => {
//         console.log('keys:', key)
//         console.log(
//             'resolve:',
//             r(key)
//         )
//         return key
//     });
// }

// importAll(requireContext(__dirname + '/src', true, /\.js$/));