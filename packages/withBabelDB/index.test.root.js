import evol from './evol'
import db from './fxs/db/index.test'
import up_db from './fxs/up_db'
import encoded_db from './fxs/encoded_db'
import up_encoded_db from './fxs/up_encoded_db/index.test'
import modelTable from './fxs/modelTable/index.test'

const fs = require('fs-extra')


const getFxs = () => ([
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
    //only one instance by db is supported with levelup
    // [
    //     'up_db',
    //     up_db
    // ],
    [
        'encoded_db',
        encoded_db
    ],
    [
        'up_encoded_db',
        up_encoded_db
    ],
    [
        'modelTable',
        modelTable
    ]
])
const processEvol = ({ fxs, initialData }) => {
    var resultEvol = evol(...fxs)(initialData)
    return resultEvol
}
const initialData = () => ({
    // alias: 'test1',
    uuid: '591bb671-15a8-4bb8-84ef-5904271745a8',
    env: {
        type: 'node',//browser||node
        encoding: {
            // key: '',
            value: 'json'//must be default and unique in json
        },
        nodeConfig: {
            pathdb: __dirname + '/testingdata'
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
    }
})
const removeDataBase = ({ pathDB }) => {
    console.log('pathDb::', pathDB)
    var existPath = fs.existsSync(pathDB)
    if (existPath) {
        var removed = fs.removeSync(pathDB + '/')
        existPath = false
    }
    test('database was removed?', () => {
        expect(existPath).toEqual(false);
    })
}

describe('root', () => {
    removeDataBase({ pathDB: initialData().env.nodeConfig.pathdb })

    var result = processEvol({
        fxs: getFxs(),
        initialData: initialData()
    })
    test('resultEvol is a Object?', () => {
        expect(result).toEqual(expect.any(Object));
    })

})