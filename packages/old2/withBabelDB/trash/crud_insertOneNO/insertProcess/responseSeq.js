import { equals } from 'ramda'
export const responseError = ({ standarizedResponse }) => standarizedResponse({
    error: {
        msg: `Error happened creating the sequence.`
    }
})
export const hasError = ({ sequence }) => equals(true, sequence.error)

// export const create = async ({ dbs, stateSeq }) => {
//     var error
//     // await stateSeq
//     // console.log('stateSeq.seqCounter.add():', stateSeq.seqCounter.add())
//     var _seq = stateSeq.seqCounter.add()

//     try {
//         var response = await dbs.seq.put({ _seq }, {
//             // from: ''
//         })
//         error = false
//     } catch (error) {
//         console.log('seq.put Error:', error)
//         error = true
//     }
//     return {
//         error,
//         _seq
//     }
// }