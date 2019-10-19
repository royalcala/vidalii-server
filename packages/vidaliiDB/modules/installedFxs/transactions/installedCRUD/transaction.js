const uuidv4 = require('uuid/v4')

module.exports = ({ db, type }) => async ({ idTransaction, schema, newData, prevData }) => {
    try {
        var response = await db.put({
            _id: uuidv4(),
            type,
            schema,
            //shard: '',
            idTransaction,
            prevData: {
                rev: prevData.rev,
                doc: prevData.doc,
            },
            newData: {
                rev: newData.rev,
                doc: newData.doc
            },
        });
        return response
    } catch (err) {
        console.log(err);
    }
}