const R = require('ramda')
const uuidv4 = require('uuid/v4')
module.exports = ({ db }) => async (newDoc = {}, options = {}) => {
    try {
        let response = await R.cond([
            [R.has('_id'), db.put],
            [R.T, () => db.put(
                {
                    _id: uuidv4(),
                    ...newDoc
                }
            )]
        ])(newDoc)
        response._id = response.id
        response._rev = response.rev
        let final = {
            ...newDoc,
            ...response
        }
        return final
    } catch (err) {
        console.log(err)
        return err
    }
}
