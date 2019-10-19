const uuidv4 = require('uuid/v4')

module.exports = ({ db }) => async ({ idTransaction }) => {
    try {
        var response = await db.put({
            _id: uuidv4(),
            type: 'commit',
            idTransaction
        });
        return response
    } catch (err) {
        console.log(err);
    }
}