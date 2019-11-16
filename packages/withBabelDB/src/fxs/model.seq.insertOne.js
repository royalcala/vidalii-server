export default ({ db, model }) => async (dataToInsert) => {
    console.log('ooooL', model.seq.store.counter)
    var waiting = await model.seq.store.counter
    console.log('ooooL', waiting.nextSeq())
    // var response = await db.seq.tac.put({
    //     _seq: model.seq.store.counter.nextSeq()
    // },
    //     dataToInsert
    // )
    // return response
}
