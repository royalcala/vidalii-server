export default ({ db, responses }) => async (_id, options = {}) => {
    var lastDocRev = null
    var search = await db.rev.query.iterator({
        gte: _id + '!',
        lte: _id + '!' + '\xff',
        limit: 1,
        reverse: true,
        onData: data => {
            lastDocRev = data
        }
    })
    if (lastDocRev === null)
        return responses.standard({})
    else
        return responses.standard({
            data: lastDocRev
        })
}