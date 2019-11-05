import seqHelpers from './fxs/seqHelpers'
import getDoc from './fxs/getDoc'
import insertOne from './fxs/insertOne'
import updateOne from './fxs/updateOne'

export default async ({ up_encoded_db: dbs, standarizedResponse }) => {
    // const initialData = { dbs, standarizedResponse }
    var init_get = getDoc({ dbs, standarizedResponse })
    var init_seqHelpers = await seqHelpers({ dbs })
    var init_insertOne = insertOne({
        getDoc: init_get,
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