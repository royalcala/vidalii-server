module.exports = ({ db }) => async () => {
    try {
        let result = await db.info()

        return {
            ...result,
            ok: true
        }
    } catch (error) {
        return {
            msg: error,
            ok: false
        }
    }
}