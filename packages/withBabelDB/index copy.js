console.clear()
console.log('+++Se borro la consola,in vidaliiDb->db+++')
const R = require('ramda')
const fxs = require('./readInstalled')(__dirname + '/installedFXS')
const evol = require('./evol')
const uuidv4 = require('uuid/v4')

const fxsToProcess = [
    [
        'input',
        () => ({
            db: {
                dir: __dirname + '/data',
                name: 'test1'
            }
        }),

    ],
    [
        'build_response',
        () => ({
            error = null,
            ...data
        }) => {
            //log errors
            return {
                data,
                ...(error === null ? {} : { error })
            }
        }
    ],
    [
        'db',
        fxs.dbSelectType('level', { valueEncoding: 'json' }),
    ],
    [
        'addCRUD',
        ({ db, build_response }) => ({
            insertOne: async ({ _id = uuidv4(), ...data }) => {
                const checkIfExist = async ({ _id }) => {
                    try {
                        let result = await db.main.get(_id)
                        result._id = _id
                        return {
                            doc: result,
                            exist: true
                        }
                    } catch (notFound) {
                        return {
                            doc: null,
                            exist: false
                        }
                    }

                }
                const duplicateDoc = ({ _id, doc }) => {
                    return build_response({
                        error: {
                            msg: `Error.The _id:${_id}, already exist.`,
                            doc
                        }
                    })

                }
                const insertNewDoc = async ({ _id, data }) => {
                    try {
                        let result = await db.main.put(_id, data)
                        return build_response({
                            _rev: 'revision here'
                        })
                    } catch (err) {
                        return build_response({
                            error: {
                                msg: 'Error on addCRUD->insertOne->insertNewDoc:', err
                            }
                        })
                    }
                }


                let { exist, doc } = await checkIfExist({ _id })
                let result
                if (exist === true) {
                    result = duplicateDoc({ _id, doc })
                } else {
                    result = await insertNewDoc({ _id, data })
                }

                return result

            }
        })
    ],
    [
        'test_addCRUD',
        async ({ db, addCRUD }) => {
            // console.log('addCRUD::', addCRUD)
            var result = await addCRUD.insertOne({
                _id: '1',
                // msg: 'first insert'
            })
            console.log('result:', result)
            result = await addCRUD.insertOne({
                _id: '2',
                // msg: 'first insert'
            })
            console.log('result:', result)
            result = await addCRUD.insertOne({
                _id: '10',
                // msg: 'first insert'
            })
            console.log('result:', result)


        }
    ],
    [
        'readAll',
        ({ db }) => {
            // console.group('createReadStream')
            var table = []
            db.main.createReadStream({reverse:false})
                .on('data', function (data) {
                    // console.log('stream:', 'key:', data.key, 'value:', data.value)
                    table.push([data.key, data.value])
                })
                .on('error', function (err) {
                    console.log('Oh my!', err)
                })
                .on('close', function () {
                    console.log('Stream closed')
                })
                .on('end', function () {
                    console.log('Stream ended')
                    console.log(
                        'read All:',
                        table
                    )
                })
            // console.groupEnd('createReadStream')
        }
    ],
    [
        'iterator',
        ({ db }) => {
            var iterator = db.main.iterator()
            // iterator.next((error, key, value) => {
            //     console.log('iterator')
            //     console.log('error:', error)
            //     console.log('nextKey:', key)
            //     console.log('nextValue:', value)
            // })
            iterator.seek('c', (error, key, value) => {
                console.log('iterator')
                console.log('error:', error)
                console.log('nextKey:', key)
                console.log('nextValue:', value)
            })

            // .next((error, key, value) => {
            //     console.log('iterator')
            //     console.log('error:', error)
            //     console.log('nextKey:', key)
            //     console.log('nextValue:', value)
            // })
            // iterator2.next((error, key, value) => {
            //     console.log('iterator')
            //     console.log('error:', error)
            //     console.log('nextKey:', key)
            //     console.log('nextValue:', value)
            // })

        }
    ],
    [
        'streamSearch',
        ({ db }) => {
            // console.group('createReadStream')
            var table = []
            db.main.createReadStream({gt:'a', lt:'c'})
                .on('data', function (data) {
                    // console.log('stream:', 'key:', data.key, 'value:', data.value)
                    table.push([data.key, data.value])
                })
                .on('error', function (err) {
                    console.log('Oh my!', err)
                })
                .on('close', function () {
                    console.log('Stream closed')
                })
                .on('end', function () {
                    console.log('Stream ended')
                    console.log(
                        'read with search',
                        table
                    )
                })
            // console.groupEnd('createReadStream')
        }
    ]
]

evol(...fxsToProcess)
