import { ifElse, equals, compose, then } from 'ramda'
// import { evolComposeExtended as composeE } from '@vidalii/evol'
const uuidv4 = require('uuid/v4');

const withID = async ({ model, db, _id, otherData, responses }) => {
    var isDuplicated = await model.rev.lastDocRev({ _id })
    if (isDuplicated.data === null) {
        var key = { _id, _rev: 1, _rev_id: uuidv4() }
        var response = await db.rev.tac.put(key, otherData)

        return {
            ...response,
            ...key
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
        ...key
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