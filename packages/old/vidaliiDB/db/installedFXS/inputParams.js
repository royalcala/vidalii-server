module.exports = (db, opt = {}) => {
    const { dir, name } = db
    return {
        db: {
            dir,
            name
        }
    }
}