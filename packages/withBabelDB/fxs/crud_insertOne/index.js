import { ifElse, isNil } from 'ramda'
import insertWithNoID from './withNoID'
import insertWithID from './withID'

const isIdNull = ({ _id }) => isNil(_id)
export default ({ stateSeq, ...otherArgs }) => {

    return async ({ _id = null, ...dataToInsert }) => {
        var init_stateSeq = await stateSeq
        var response = await ifElse(
            isIdNull,
            insertWithNoID,
            insertWithID
        )({
            _id, dataToInsert,
            ...otherArgs,
            stateSeq: init_stateSeq
        })
        return response
    }
}