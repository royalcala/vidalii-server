export default ({ dbs, standarizedResponse }) => {
    return async (_id) => {
        try {
            var response = await dbs.docs.get(_id)
            standarizedResponse({
                data: response
            })
        } catch (error) {
            standarizedResponse({
                error: {
                    msg: 'Error on Get/ or Not Found' + error
                }
            })
        }
    }
}