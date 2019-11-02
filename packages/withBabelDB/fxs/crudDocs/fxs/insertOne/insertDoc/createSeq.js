export const responseError = ({ standarizedResponse }) => standarizedResponse({
    error: {
        msg: `Error happened creating the sequence.`
    }
})
export const hasError = ({ sequence }) => equals(true, sequence.error)
export const create = async ({ dbs, _id, _rev }) => {
    var error
    var _seq = 1
    try {
        var response = await dbs.seq.put({ _seq })
        error = false
    } catch (error) {
        console.log('seq.put Error:', error)
        error = true
    }
    return {
        error,
        _seq
    }
}