import { equals } from 'ramda'
export default {
    responseAllCorrect: ({ _id, document, sequence, revision, standarizedResponse }) =>
        standarizedResponse({
            data: {
                _id,
                _rev: revision._rev,
                _seq: sequence._seq
            }
        }),
    responseDuplicated: ({ _id, standarizedResponse }) => {
        return standarizedResponse({
            error: {
                msg: `Error. The id:${_id} already exist.`
            }
        })
    },
    doc: {
        responseError: ({ standarizedResponse }) => standarizedResponse({
            error: {
                msg: `Error happened creating the document.`
            }
        }),
        hasError: ({ document }) => equals(true, document.error)
    },
    rev: {
        responseError: ({ standarizedResponse }) => standarizedResponse({
            error: {
                msg: 'Error happened creating the revision.'
            }
        }),
        hasError: ({ revision }) => equals(true, revision.error)
    },
    seq: {
        responseError: ({ standarizedResponse }) => standarizedResponse({
            error: {
                msg: `Error happened creating the sequence.`
            }
        }),
        hasError: ({ sequence }) => equals(true, sequence.error)
    },

}