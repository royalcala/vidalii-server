// import evol from '../../evol'
import seqHelpers from './fxs/seqHelpers'
import getDoc from './fxs/getDoc'
import insertOne from './fxs/insertOne'
// const fxsToEvol = [
//     [
//         'get',
//         get
//     ],
//     [
//         'insertOne',
//         insertOne
//     ]
// ]

export default async ({ up_encoded_db: dbs, standarizedResponse }) => {
    // const initialData = { dbs, standarizedResponse }
    var init_seqHelpers = await seqHelpers({ dbs })
    var init_get = getDoc({ dbs, standarizedResponse })
    var init_insertOne = insertOne({
        get: init_get,
        dbs,
        standarizedResponse,
        seqHelpers: init_seqHelpers
    })

    // const evolved = evol(...fxsToEvol)(initialData)

    return {
        getDoc: init_get,
        insertOne: init_insertOne
    }
}