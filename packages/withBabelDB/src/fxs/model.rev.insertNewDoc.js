import { ifElse, equals, compose, then } from 'ramda'
// import { evolComposeExtended as composeE } from '@vidalii/evol'
const uuidv4 = require('uuid/v4');

// const withID_insertOne = ifElse(
//     ({ isDuplicated }) => equals(true, isDuplicated),
//     ({ responses }) => responses.standard({
//         error: {
//             msg: `Error. The _id:${_id} already exist`
//         }
//     }),
//     async ({ db, _id, otherData }) => {
//         var key = { _id, _rev: 1 }
//         var response = await db.rev.tac.put(key, otherData)

//         return {
//             ...response,
//             ...key
//         }
//     }
// )

// const o_isDuplicated = async (o) => {
//     var isDuplicated
//     var response = await db.rev.tac.get({ _id: o._id, _rev: 1 })
//     if (response.data === null)
//         isDuplicated = false
//     else
//         isDuplicated = true

//     return {
//         ...o,
//         isDuplicated
//     }
// }

// const withID = compose(
//     then(withID_insertOne),
//     o_isDuplicated
// )
const withID = async ({ model, db, _id, otherData, responses }) => {
    var isDuplicated = await model.rev.getLastDocRev(_id)    
    if (isDuplicated.data === null) {
        var key = { _id, _rev: 1, _rev_id: uuidv4() }
        var response = await db.rev.tac.put(key, otherData)

        return {
            ...response,
            key
        }

    } else {
        return responses.standard({
            error: {
                msg: `Error. The _id:${_id} already exist`
            }
        })
    }
}


const withoutID = async ({ db, otherData }) => {
    var key = { _id: uuidv4(), _rev: 1, _rev_id: uuidv4() }
    var response = await db.rev.tac.put(key, otherData)

    return {
        ...response,
        key
    }
}
const hasId = ({ _id }) => equals(null, _id)

/*::
type Output = {
    //response
    data:any,
    error:any,
    //endResponse
  _id: any,
  _rev: number
};
*/
export default ({ db, model, responses }) =>
    async ({ _id = null, ...otherData }) /*: Output */ =>
        ifElse(
            hasId,
            withoutID,
            withID
        )({
            db,
            _id,
            otherData,
            model,
            responses
        })