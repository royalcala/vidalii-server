import insertDocAndResponse from './insertDoc'

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

export default data => {
    var duplicated = isDuplicatedID(data)
    if (duplicated === true) {
        return responseDuplicated(data)
    } else {
        return insertDocAndResponse(data)
    }
}