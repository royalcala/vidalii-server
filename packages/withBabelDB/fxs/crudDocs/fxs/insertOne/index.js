import { ifElse, isNil } from 'ramda'
import insertWithNoID from './withNoID'
import insertWithID from './withID'


const hasId = ({ _id }) => isNil(_id)
export default ({ dbs, get, standarizedResponse }) => {

    return async ({ _id = null, ...data }) => {
        var response = await ifElse(
            hasId,
            insertWithNoID,
            insertWithID
        )({ _id, data, dbs, get, standarizedResponse })
        return response

        // var response = await cond([
        //     [withId, ifElse(
        //         isDuplicatedID,
        //         responseDuplicated,
        //         insertDocAndResponse
        //     )],
        //     [withoutId]
        // ])({ _id, data, dbs, get, standarizedResponse })


    }
}