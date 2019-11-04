import { ifElse } from 'ramda'
import * as seq from './createSeq'
import * as doc from './createDoc'
import * as rev from './createRev'

const responseAllCorrect = ({ _id, document, sequence, revision, standarizedResponse }) =>
    standarizedResponse({
        data: {
            _id,
            _rev: revision._rev,
            _seq: sequence._seq
        }
    })

const seqProcess = async args => {
    var sequence = await seq.create(args)
    return ifElse(
        seq.hasError,
        seq.responseError,
        responseAllCorrect,
    )({ ...args, sequence })
}

const docsProcess = async args => {
    // console.log('rev.hasError', rev.hasError(args))
    var document = doc.create(args)
    return ifElse(
        doc.hasError,
        doc.responseError,
        seqProcess,
    )({ ...args, document })
}

const revProcess = args => {
    // console.log('revProcessArgs:', args)
    // console.log('rev.hasError', rev.hasError(args))
    return ifElse(
        rev.hasError,
        rev.responseError,
        docsProcess,
    )(args)
}

export default async ({ _id, dataDoc, get, dbs, standarizedResponse, seqHelpers }) => {
    var revision = await rev.create({ _id, dataDoc, dbs })
    // console.log('seqHelpers::', await seqHelpers)
    return revProcess({ revision, _id, dataDoc, get, dbs, standarizedResponse, seqHelpers })

}