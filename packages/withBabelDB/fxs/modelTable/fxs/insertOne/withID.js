import insertDocAndResponse from './insertDoc'

const responseDuplicated = ({ _id, standarizedResponse }) => {
    return standarizedResponse({
        error: {
            msg: `Error. The id:${_id} already exist.`
        }
    })
}
const isDuplicatedID = async ({ _id, get }) => {
    // console.log('get::',get)
    var duplicatedID = await get(_id)
    // console.log('duplicatedID::', duplicatedID)

    if (duplicatedID.error === null) {
        //if error is null, the id exist, because was found
        //so is duplicated id
        return true
    } else {
        return false
    }
}

export default async args => {
    var duplicated = await isDuplicatedID(args)
    if (duplicated === true) {
        return responseDuplicated(args)
    } else {
        return insertDocAndResponse(args)
    }
}