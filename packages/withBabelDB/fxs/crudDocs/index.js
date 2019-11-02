import evol from '../../evol'
import get from './fxs/get'
import insertOne from './fxs/insertOne'
const fxsToEvol = [
    [
        'get',
        get
    ],
    [
        'insertOne',
        insertOne
    ]
]

export default ({ up_encoded_db: dbs, standarizedResponse }) => {
    const initialData = { dbs, standarizedResponse }

    const evolved = evol(...fxsToEvol)(initialData)

    return {
        get: evolved.get,
        insertOne: evolved.insertOne
    }
}