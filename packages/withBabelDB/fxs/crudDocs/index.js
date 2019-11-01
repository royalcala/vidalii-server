import evol from '../../evol'
import get from './fxs/get'
import insertOne from './fxs/insertOne'

const fxsToEvol = [
    [
        'init',
        init => init
    ],
    [
        'get',
        get
    ],
    [
        'insertOne',
        insertOne
    ]
]

const evolved = evol(...fxsToEvol)
export default ({ up_encoded_db: db, crudRev, standarizedResponse }) => {
    const result = evolved({
        db,
        crudRev,
        standarizedResponse
    })
    return {
        insertOne,
    }
}