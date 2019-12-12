const uuidv4 = require('uuid/v4')

module.exports = ({ dbs }) => async ({ idTransaction }) => {
    try {
        var response = await dbs.transactions.put({
            _id: uuidv4(),
            type: 'commit',
            idTransaction
        });
        return response
    } catch (err) {
        console.log(err);
    }
}