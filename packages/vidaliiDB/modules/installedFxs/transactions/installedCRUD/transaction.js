
module.exports = async ({ private, public }) => {
    const { db_cache, type } = private
    const { idTransaction, shardName, prevData, newData } = public
    let result = await db_cache.addTransaction({
        _id: uuidv4(),
        type,
        schema,
        idTransaction,
        prevData: {
            rev: prevData.rev,
            doc: prevData.doc,
        },
        newData: {
            rev: newData.rev,
            doc: newData.doc
        }
    })


}