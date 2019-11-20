export default ({ model }) => async ({ _id = null, ...otherData }) => {
    // var responseSeq = await model.seq.insertNextSeq({})
    //insert start sequence
    var responseRev = await model.rev.insertOne({ _id, ...otherData })
    // var responseDocs = await model.docs.insertOne

}