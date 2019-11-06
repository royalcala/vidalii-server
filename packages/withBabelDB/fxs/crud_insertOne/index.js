import { ifElse, isNil } from 'ramda'
import insertWithNoID from './withNoID'
import insertWithID from './withID'

// var init_get = getDoc({ dbs, standarizedResponse })
//     // var init_seqHelpers = await seqHelpers({ dbs })
//     var init_stateSeq = await stateSeq
//     var init_insertOne = insertOne({
//         getDoc: init_get,
//         dbs,
//         standarizedResponse,
//         stateSeq: init_stateSeq
//     })
const isIdNull = ({ _id }) => isNil(_id)
export default ({ db_encode_up: dbs, crud_get, standarizedResponse, stateSeq }) => {
    
    return async ({ _id = null, ...dataToInsert }) => {
        var init_stateSeq = await stateSeq
        var response = await ifElse(
            isIdNull,
            insertWithNoID,
            insertWithID
        )({
            _id, dataToInsert, dbs, crud_get, standarizedResponse,
            stateSeq: init_stateSeq
        })
        return response
    }
}