import { cond, T, pipe, ifElse, isNil } from 'ramda'


const insertDocAndResponse = async ({ _id, data, dbs, standarizedResponse }) => {

    const createRevision = () => {
        var inserted
        try {
            var response = await dbs.rev.put({ _id, _rev: 1 }, data)
            inserted = true
        } catch (error) {
            console.log('rev.put Error:', error)
            inserted = false
        }
        return inserted
    }
    const createSequence = (revision) => {
        var inserted
        try {
            var response = await dbs.rev.put({ _id, _rev: 1 }, data)
            inserted = true
        } catch (error) {
            console.log('rev.put Error:', error)
            inserted = false
        }
        return inserted
    }
    const createDocs = (revision) => {
        if (insertedRevision === true)
            try {
                var response = await dbs.docs.put(_id, docTest.value)
                standarizedResponse({

                })
            } catch (error) {
                console.log('putDoc Error:', error)
                inserted = false
            }
    }

    return pipe(
        createRevision,
        createSequence,
        createDocs
    )()



}

const responseDuplicated = ({ _id, standarizedResponse }) => {
    return standarizedResponse({
        error: {
            msg: `Error. The id:${_id} already exist.`
        }
    })
}
const isDuplicatedID = ({ _id, get }) => {
    var duplicatedID = await get(_id)
    if (duplicatedID.error !== null) {
        return true
    } else {
        return false
    }
}


const withoutId = () => T
const withId = ({ _id }) => isNil(_id)

export default ({ dbs, get, standarizedResponse }) => {
    return async ({ _id = null, ...data }) => {

        // if (_id === null) {
        //     //generate id 
        // } else {

        // }

        var response = await cond([
            [withId, ifElse(
                isDuplicatedID,
                responseDuplicated,
                insertDocAndResponse
            )],
            [withoutId]
        ])({ _id, data, dbs, get, standarizedResponse })


    }
}