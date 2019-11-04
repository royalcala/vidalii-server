import { equals } from 'ramda'
export const responseError = ({ standarizedResponse }) => standarizedResponse({
    error: {
        msg: `Error happened creating the sequence.`
    }
})
export const hasError = ({ sequence }) => equals(true, sequence.error)

export const create = async ({ dbs, seqHelpers }) => {
    var error
    var _seq = seqHelpers.seqCounter.add()
    console.log('seqHelpers:', seqHelpers)
    try {
        var response = await dbs.seq.put({ _seq }, {
            // from: ''
        })
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