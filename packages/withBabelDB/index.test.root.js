import evol from './evol'
import db from './fxs/db/index.test'
import encoded_db from './fxs/encoded_db'
import up_encoded_db from './fxs/up_encoded_db/index.test'
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
        'encoded_db',
        encoded_db
    ],
    [
        'up_encoded_db',
        up_encoded_db
    ],
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

describe('root', () => {

    test('resultEvol', () => {
        expect(resultEvol).toEqual(expect.any(Object));
    })
})