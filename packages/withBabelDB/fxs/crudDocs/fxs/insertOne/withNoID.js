import insertDocAndResponse from './insertDoc'
const uuidv1 = require('uuid/v1');
const create_id = () => {
    return uuidv1()
}
export default data => {
    var _id = create_id()
    return insertDocAndResponse({ ...data, _id })
}