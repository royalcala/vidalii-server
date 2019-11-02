export const hasError = ({ document }) => equals(true, document.error)
export const responseError = ({ standarizedResponse }) => standarizedResponse({
    error: {
        msg: `Error happened creating the document.`
    }
})
export const create = async ({ dbs }) => {
    var error

    try {
        var response = await dbs.docs.put(_id, docTest.value)
        error = false
    } catch (error) {
        console.log('Error createDocument:', error)
        error = true
    }
    return {
        error
    }
}