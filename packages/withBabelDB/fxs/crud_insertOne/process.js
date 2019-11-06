import { ifElse, isNil, equals } from 'ramda'
import responses from './responses'
// import insertWithNoID from './withNoID'
// import insertWithID from './withID'
const uuidv1 = require('uuid/v1');
const insertDoc = async ({ _id, dataToInsert, revision, db_encode_up }) => {
    var error
    dataToInsert._rev = revision._rev
    try {
        var response = await db_encode_up.docs.put(_id, dataToInsert)
        error = false
    } catch (error) {
        console.log('Error createDocument:', error)
        error = true
    }
    return {
        error
    }
}

const processDocs = async args => {
    var document = await insertDoc(args)
    return await ifElse(
        responses.doc.hasError,
        responses.doc.responseError,
        responses.responseAllCorrect
    )({ ...args, document })
}

const processSeq = async args => {
    let sequence = await args.stateSeq.insertOne()
    // console.log('revision::',revision)
    return ifElse(
        responses.seq.hasError,
        responses.seq.responseError,
        processDocs
    )({ ...args, sequence })
}

const processRev = async args => {
    let revision = await args.stateRev.insertOne({
        _id: args._id,
        dataDoc: args.dataToInsert
    })

    return ifElse(
        responses.rev.hasError,
        responses.rev.responseError,
        processSeq
    )({ ...args, revision })
}

const processWithNoId = async args => {
    let _id = uuidv1()
    return processRev({ ...args, _id })
}
const processWithId = async args => {
    var duplicatedID = await args.crud_get(args._id)
    if (duplicatedID.error === null) {
        //if error is null, the id exist, because was found
        //so is duplicated id
        return responses.responseDuplicated(args)
    } else {
        return processRev(args)
    }

}

const isIdNull = ({ _id }) => isNil(_id)
export default ({ stateSeq, ...otherArgs }) =>
    async ({ _id = null, ...dataToInsert }) => {
        var init_stateSeq = await stateSeq
        var response = await ifElse(
            isIdNull,
            processWithNoId,
            processWithId
        )({
            ...otherArgs,
            _id, dataToInsert,
            stateSeq: init_stateSeq
        })
        return response
    }