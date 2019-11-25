export default ({ db, model, config }) => async (valueToInsert = {}) => {
    var _seq = model.seq.store.counter.nextSeq()
    var key = {
        _id_table: config._id_table,
        _seq,
    }
    var response = await db.seq.tac.put(key, valueToInsert)

    
    return {
        ...response,
        key
    }
}
