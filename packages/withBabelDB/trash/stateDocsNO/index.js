import initInsertOne from './insertOne'
const initUpdateOne = ({ db_encode_up }) =>
    async ({ }) => {

    }





export default ({ db_encode_up, stateRev, stateSeq, standarizedResponse, crud_get }) => {

    var insertOne = initInsertOne({
        db_encode_up, stateRev,
        stateSeq, standarizedResponse,
        crud_get
    })

    return {
        insertOne
    }

}
