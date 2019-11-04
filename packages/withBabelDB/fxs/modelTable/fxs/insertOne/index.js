import { ifElse, isNil } from 'ramda'
import insertWithNoID from './withNoID'
import insertWithID from './withID'


const isIdNull = ({ _id }) => isNil(_id)
export default ({ dbs, get, standarizedResponse, seqHelpers }) => {

    return async ({ _id = null, ...dataDoc }) => {
        // console.log('dataDoc::',dataDoc)
        var response = await ifElse(
            isIdNull,
            insertWithNoID,
            insertWithID
        )({ _id, dataDoc, dbs, get, standarizedResponse, seqHelpers })
        return response
    }
}