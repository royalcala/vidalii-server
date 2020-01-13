import insertDocAndResponse from './insertProcess'
const uuidv1 = require('uuid/v1');
const create_id = () => {
    return uuidv1()
}
export default args => {
    var _id = create_id()
    return insertDocAndResponse({ ...args, _id })
}