module.exports = ({ db }) => async (id, opt = {}) => {
    return await db.get(id)
}