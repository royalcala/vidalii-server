module.exports = ({ db }) => async (id) => {
    return db.get(id)
}