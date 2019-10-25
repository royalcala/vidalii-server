console.log('in vidaliiDb->db')
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
                    //RETURN only the revision used
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
        async ({ addCRUD }) => {
            // console.log('addCRUD::', addCRUD)
            var result = await addCRUD.insertOne({
                _id: 'hola10',
                msg: 'first insert'
            })
            console.log('result:', result)
        }
    ]
]

evol(...fxsToProcess)
