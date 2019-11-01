export default ({ init }) => {
    const { db, standarizedResponse } = init

    return async (_id) => {
        try {
            var result = await db.docs.get(_id)
            return standarizedResponse({
                data: result
            })
        } catch (error) {
            return standarizedResponse({
                error: {
                    msg: error
                }
            })
        }

    }
}