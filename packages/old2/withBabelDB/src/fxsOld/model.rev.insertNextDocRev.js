import { ifElse, equals } from 'ramda'

const insertNewOne = async ({ responses, model, newDoc, prevDoc }) => {
    var response = await model.rev.insertOne({
        _id: prevDoc._id,
        _rev: Number(prevDoc._rev) + 1,
        ...newDoc
    })
}

const responseErrorOneRev = ({ responses }) => responses.standard({
    error: {
        msg: `Error. You dont have the last revision of the document`
    }
})
const hasTheLastRev = ({ prevDoc, newDoc }) => equals(prevDoc._rev_id, newDoc._rev_id)

export default ({ model, responses }) => async ({ _id, _rev_id, ...otherData }) => {
    // check if is the last revision
    var getLastDoc = await model.rev.lastDocRev({ _id })
    return ifElse(
        hasTheLastRev,
        () => { },
        responseErrorOneRev
    )({
        prevDoc: { ...getLastDoc },
        newDoc: { _id, _rev, otherData },
        responses,
        model
    })
    return lastDocRev
    // return responses.standard({

    // })
}
