export const revisionHasError = ({ revision }) => equals(true, revision.error)
export const responseError = ({ standarizedResponse }) => standarizedResponse({
    error: {
        msg: 'Error happened creating the revision.'
    }
})
export const create = async ({ _id, data, dbs }) => {
    var error
    var _rev = 1
    try {
        var response = await dbs.rev.put({ _id, _rev }, data)
        error = false
    } catch (error) {
        console.log('Error createRevision:', error)
        error = true
    }
    return {
        error,
        _rev
    }
}