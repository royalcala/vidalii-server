import { equals } from 'ramda'
export const responseError = ({ standarizedResponse }) => standarizedResponse({
    error: {
        msg: `Error happened creating the sequence.`
    }
})
export const hasError = ({ sequence }) => equals(true, sequence.error)

export const create = async ({ dbs, seqHelpers }) => {
    var error
    // await seqHelpers
    // console.log('seqHelpers.seqCounter.add():', seqHelpers.seqCounter.add())
    var _seq = seqHelpers.seqCounter.add()

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