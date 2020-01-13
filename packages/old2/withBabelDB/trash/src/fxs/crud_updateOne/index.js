import { ifElse, isNil } from 'ramda'
import revHelpers from '../revHelpers'
import * as responses from './responses'
import initQueueUpdate from './queueUpdate'
import updateProcess from './updateProcess'

const isCorrecRev = ({ prevDoc, _rev }) => {
    return prevDoc._rev === _rev ? true : false
}
const wasFoundID = ({ prevDoc }) => {
    return prevDoc.error === null ? true : false
}

const revProcess = args => ifElse(
    isCorrecRev,
    updateProcess,
    responses.revError
)(args)

const idProcess = args => ifElse(
    wasFoundID,
    revProcess,
    responses.IdNotFound
)(args)


export default ({ db_encode_up: dbs, crud_getOne, stateRev, standarizedResponse }) => {
    var queueUpdate = initQueueUpdate()

    return async ({ _id, _rev, ...dataToUpdate }) => {

        if (queueUpdate.checkExistQueue({ _id, _rev }) === false) {
            queueUpdate.addQueue({ _id, _rev })

            var prevDoc = await crud_getOne(_id)
            var response = await idProcess({
                prevDoc,
                _id, _rev, dataToUpdate,
                dbs, crud_getOne, standarizedResponse,
                stateRev
            })
            queueUpdate.elimateQueue({ _id, _rev })
            return response
        } else {
            return responses.queueInUse({ _id, _rev })
        }

    }
}