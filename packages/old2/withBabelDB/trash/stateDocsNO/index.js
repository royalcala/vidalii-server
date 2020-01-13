import initInsertOne from './insertOne'
const initUpdateOne = ({ db_encode_up }) =>
    async ({ }) => {

    }





export default ({ db_encode_up, stateRev, stateSeq, standarizedResponse, crud_getOne }) => {

    var insertOne = initInsertOne({
        db_encode_up, stateRev,
        stateSeq, standarizedResponse,
        crud_getOne
    })

    return {
        insertOne
    }

}
