const initUpdateOne = ({ db_encode_up }) =>
    async ({ }) => {

    }

const initInsertOne = ({ db_encode_up, firstRev }) =>
    async ({ _id, dataDoc }) => {
        var error
        var _rev = firstRev()
        try {
            var response = await db_encode_up.rev.put({ _id, _rev }, dataDoc)
            error = false
        } catch (error) {
            console.log('Error createRevision:', error)
            error = true
        }
        return {
            error,
            _rev
        }
    }

const nextRev = ({ prevRev }) => {
    return prevRev + 1
}
const firstRev = () => {
    return 1
}

export default ({ db_encode_up }) => {

    var insertOne = initInsertOne({ db_encode_up, firstRev })

    return {
        insertOne
    }

}
