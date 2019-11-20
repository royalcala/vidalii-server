export default ({ db, model }) => async (valueToInsert = {}) => {
    var _seq = model.seq.store.counter.nextSeq()
    var response = await db.seq.tac.put({
        _seq,
    }, valueToInsert)

    return {
        ...response,
        _seq
    }
}
