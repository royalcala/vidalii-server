export default ({ db, model }) => async ({ _id, _rev, ...otherData }) => {
    var response = await db.docs.tac.put({
        _id,
    }, {
        _rev,
        ...otherData
    })

    return {
        ...response,
        _id,
        _rev
    }
}
