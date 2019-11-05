import { ifElse, isNil } from 'ramda'
import insertWithNoID from './withNoID'
import insertWithID from './withID'


const isIdNull = ({ _id }) => isNil(_id)
export default ({ dbs, getDoc, standarizedResponse, seqHelpers }) => {

    return async ({ _id = null, ...dataToInsert }) => {
        var response = await ifElse(
            isIdNull,
            insertWithNoID,
            insertWithID
        )({ _id, dataToInsert, dbs, getDoc, standarizedResponse, seqHelpers })
        return response
    }
}