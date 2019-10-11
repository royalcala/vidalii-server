module.exports = ({ db }) => async (id) => {
    return await db.get(id)
}