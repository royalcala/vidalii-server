import { ifElse } from 'ramda'

const seqProcess = async data => {
    var sequence = await data.dbs.seq
    return ifElse(

    )(sequence, ...data)
}
const responseErrorRev = ({ standarizedResponse, _id, _rev }) => standarizedResponse({
    error: {
        msg: `Error. Trying to create a new revision for _id:${_id} and _rev:${_rev}`
    }
})
const hasErrorRev = ({ revision }) => revision.error === true
const revProcess = args => ifElse(
    hasErrorRev,
    responseErrorRev,
    seqProcess
)(args)
const insertRev = async ({ dbs, _id, _rev, stateRev, dataToUpdate }) => {
    var error
    try {
        var keyRev = {
            _id,
            _rev: stateRev().nextRev({ _rev })
        }
        var response = await dbs.rev(keyRev, dataToUpdate)
        error = false
    } catch (error) {
        console.log('Error createRevision:', error)
        error = true
    }
    return {
        error,
        keyRev
    }
}

export default async (data) => {
    const { _id, _rev, dbs, stateRev, dataToUpdate, standarizedResponse } = data
    const revision = await insertRev(data)

    return revProcess({
        revision,
        ...data
    })


}