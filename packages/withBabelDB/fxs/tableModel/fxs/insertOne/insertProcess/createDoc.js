import { equals } from 'ramda'

export const hasError = ({ document }) => equals(true, document.error)
export const responseError = ({ standarizedResponse }) => standarizedResponse({
    error: {
        msg: `Error happened creating the document.`
    }
})
export const create = async ({ dbs, _id, dataToInsert, revision }) => {
    var error
    dataToInsert._rev = revision._rev
    try {
        var response = await dbs.docs.put(_id, dataToInsert)
        error = false
    } catch (error) {
        console.log('Error createDocument:', error)
        error = true
    }
    return {
        error
    }
}