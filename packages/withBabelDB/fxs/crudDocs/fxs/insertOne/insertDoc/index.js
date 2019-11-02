import { ifElse } from 'ramda'
import * as seq from './createSeq'
import * as doc from './createDoc'
import * as rev from './createRev'

export default async ({ _id, data, get, dbs, standarizedResponse }) => {
    var revision = await rev.create({ _id, data, dbs })

    return ifElse(
        rev.hasError,
        rev.responseError,
        (data) => ifElse(
            doc.hasError,
            doc.responseError,
            (data) => ifElse(
                seq.hasError,
                seq.responseError
            )({ ...data, sequence: seq.create(data) })
        )({ ...data, document: doc.create(data) })
    )({ revision, _id, data, get, dbs, standarizedResponse })

}