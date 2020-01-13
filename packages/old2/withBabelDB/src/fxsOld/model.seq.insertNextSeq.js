export default ({ db, model, config }) => async (valueToInsert = {}) => {
    var _seq = model.seq.store.counter.nextSeq()
    var response = await db.seq.tac.put({
        _id_table: config._id_table,
        _seq,
    }, valueToInsert)

    return response
    // return {
    //     ...response,
    //     _seq
    // }
}
