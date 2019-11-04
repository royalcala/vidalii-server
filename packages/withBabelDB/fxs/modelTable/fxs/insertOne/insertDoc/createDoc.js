import { equals } from 'ramda'

export const hasError = ({ document }) => equals(true, document.error)
export const responseError = ({ standarizedResponse }) => standarizedResponse({
    error: {
        msg: `Error happened creating the document.`
    }
})
export const create = async ({ dbs, _id, dataDoc }) => {
    var error

    try {
        var response = await dbs.docs.put(_id, dataDoc)
        error = false
    } catch (error) {
        console.log('Error createDocument:', error)
        error = true
    }
    return {
        error
    }
}