import { ifElse, equals, compose, over, lens, assoc, then } from 'ramda'
import { evolComposeExtended as composeE } from '@vidalii/evol'
const uuidv4 = require('uuid/v4');

const withID_insertOne = ({ isDuplicated, db, _id, fxs }) => ifElse(
    ({ isDuplicated }) => equals(true, isDuplicated),
    () => fxs.standarizedResponse({
        error: {
            msg: `Error. The _id:${_id} already exist`
        }
    })
)

const isDuplicated = over(
    lens(() => '', assoc('isDuplicated')),
    async ({ db, _id }) => {
        var response = await db.rev.tac.get({ _id, _rev: 1 })
        if (response.data === null)
            return false
        else
            return true
    }
)

const withID = compose(
    then(withID_insertOne),
    isDuplicated
)


const withoutID = async ({ db }) => {
    var key = { _id: uuidv4(), _rev: 1 }
    var response = await db.rev.tac.put(key, otherData)

    return {
        ...response,
        ...key
    }
}

export default ({ db, fxs }) =>
    async ({ _id = null, ...otherData }) =>
        ifElse(
            ({ _id }) => equals(null, _id),
            withoutID,
            withID
        )({
            db,
            _id,
            otherData,
            fxs
        })



// export default ({ db }) => async ({ ...otherData }, options = {}) => {

//     var duplicated = await isDuplicated({ db, _id })
//     if (duplicated === true) {
//         return standarizedResponse({
//             error: {
//                 msg: `The _id:${_id} is duplicated`
//             }
//         })
//     }
//     else {
//         var response = await db.rev.tac.put({ _id, _rev: 1 }, otherData)
//         return response
//     }
//     otherData._id = uuidv4()


//     var key = { _id: uuidv4(), _rev: 1 }
//     var response = await db.rev.tac.put(key, otherData)

//     return {
//         ...response,
//         ...key
//     }
// }