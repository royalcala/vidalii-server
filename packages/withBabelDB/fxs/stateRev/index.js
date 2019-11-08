const initGetOne = async ({ db_encode_up, standarizedResponse }) => {
    var error = null
    var data = null
    try {
        var data = await db_encode_up.rev.get({ _id, _rev })
    } catch (error) {
        error = {
            msg: `The _id:${_id} with _rev:${_rev} doesnt found on db of Revisions `
        }
    }
    return standarizedResponse({
        data,
        error
    })
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

const firstRev = () => {
    return 1
}

export default ({ db_encode_up, standarizedResponse }) => {
    var getOne = initGetOne({ db_encode_up, standarizedResponse })
    var insertOne = initInsertOne({ db_encode_up, firstRev })

    return {
        insertOne,
        getOne
    }

}
