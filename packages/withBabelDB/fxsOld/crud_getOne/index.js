export default ({ db_encode_up: dbs, standarizedResponse }) => {
    return async (_id) => {
        try {
            var response = await dbs.docs.get(_id)
            return standarizedResponse({
                data: response
            })
        } catch (error) {
            return standarizedResponse({
                error: {
                    msg: 'Error on Get/ or Not Found' + error
                }
            })
        }
    }
}