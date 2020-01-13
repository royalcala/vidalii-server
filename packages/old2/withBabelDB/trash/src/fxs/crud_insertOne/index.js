import process from './process'

export default ({ db_encode_up, stateRev, stateSeq, standarizedResponse, crud_getOne }) => {

    return process({
        db_encode_up, stateRev,
        stateSeq, standarizedResponse,
        crud_getOne
    })

}
