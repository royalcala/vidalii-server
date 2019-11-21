export default ({ db, responses }) => async ({ _id }, options = {}) => {
    const { keys = true, values = false } = options
    var lastRevKey = null
    var search = await db.rev.query.stream({
        query: {
            keys,
            values,
            gte: _id + '!',
            lte: _id + '!' + '\xff',
            limit: 1,
            reverse: true
        },
        onData: data => {
            lastRevKey = data
        }
    })
    return responses.standard({
        data: lastRevKey
    })
}