import { ifElse } from 'ramda'
import * as seq from './responseSeq'
import * as doc from './createDoc'
import * as rev from './responseRev'

const responseAllCorrect = ({ _id, document, sequence, revision, standarizedResponse }) =>
    standarizedResponse({
        data: {
            _id,
            _rev: revision._rev,
            _seq: sequence._seq
        }
    })

const seqProcess = async args => {
    var sequence = await args.stateSeq.insertOne()
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

export default async ({ _id, dataToInsert, db_encode_up: dbs, stateRev, ...otherArgs }) => {
    var revision = await stateRev.insertOne({ _id, dataToInsert })
    // console.log('stateSeq::', await stateSeq)
    return revProcess({ revision, _id, dataToInsert, dbs, ...otherArgs })
}