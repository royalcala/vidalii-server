const isDuplicated = async ({ db, id }) => {
    var response = await db.rev.tac.get({ _id, _rev: 1 })
    if (response.data !== null)
        return
}

export default ({ db, standarizedResponse }) => async ({ _id, ...otherData }) => {

    var duplicated = await isDuplicated({ db, _id })
    if (duplicated === true) {
        return standarizedResponse({
            error: {
                msg: `The _id:${_id} is duplicated`
            }
        })
    }
    else {
        var response = await db.rev.tac.put({ _id, _rev: 1 }, otherData)
        return response
    }
}